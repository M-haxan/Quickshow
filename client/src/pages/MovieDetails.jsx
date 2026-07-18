import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import BlueCircle from '../components/BlurCircle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeFormate from '../lib/timeFormat';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

function MovieDetail() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if(show){
      setShow({
      movie: show,
      dateTime: dummyDateTimeData,
    });
    }
    
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-10 max-w-6xl mx-auto'>

        {/* Left Column: Image */}
        <img
          src={show.movie.poster_path}
          className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'
          alt={show.movie.title}
        />

        {/* Right Column: All Movie Details Wrapped Here */}
        <div className='flex flex-col gap-4 flex-1 pt-2'>

          <div className='relative flex flex-col gap-3'>
            <BlueCircle top="-100px" left="-100px" />
            <p className='text-primary'>ENGLISH</p> {/* text-priamry typo fixed */}
            <h1 className='text-4xl font-semibold max-w-96 text-balance'>
              {show.movie.title}
            </h1>
          </div>

          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className='w-5 h-5 text-primary fill-primary' />
            <span>{show.movie.vote_average.toFixed(1)} User Rating</span>
          </div>

          <p className='text-gray-300 leading-relaxed'>
            {show.movie.overview}
          </p>

          <p className='text-gray-400'>
            {timeFormate(show.movie.runtime)} &bull; {show.movie.genres.map((genre) => genre.name).join(', ')} &bull; {show.movie.release_date.split('-')[0]}
          </p>

          <div className='flex flex-wrap sm:flex-nowrap items-stretch sm:items-center gap-3 mt-4 w-full max-sm:flex-col'>

            {/* Watch Trailer Button */}
            <button className='w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
              <PlayCircleIcon className="w-5 h-5 shrink-0" />
              <span className="whitespace-nowrap">Watch Trailer</span>
            </button>

            <div className='flex items-center gap-3 w-full sm:w-auto'>
              {/* Buy Tickets Button */}
              <a href='#dateSelect' className='flex-1 sm:flex-none flex justify-center px-8 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95 text-white whitespace-nowrap'>
                Buy Tickets
              </a>

              {/* Favorite (Heart) Button */}
              <button className='bg-gray-700 p-3 rounded-md sm:rounded-full transition cursor-pointer active:scale-95 hover:bg-gray-600 shrink-0 flex justify-center items-center'>
                <Heart className='w-5 h-5 text-white' />
              </button>
            </div>

          </div>
        </div>
      </div>
      <p className='text-lg font-medium mt-20'>Your Favorite Cast</p>
      <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
        <div className='flex items-center gap-4 w-max px-4'>
          {show.movie.casts.slice(0,12).map((cast, index)=>(
            <div key={index} className='flex flex-col items-center text-center'>
              <img src={cast.profile_path} alt="" className='w-24 h-24 rounded-full object-cover' />
              <p className='font-medium text-xs mt-3'>{cast.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* 1. Yahan div mein id="dateSelect" laga diya taake button click par yahan scroll ho */}
      <div id="dateSelect">
        <DateSelect dateTime={show.dateTime} id={id} />
      </div>

      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
      
      {/* 2. Yahan flex-wrap ki jagah Grid classes laga di */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {dummyShowsData.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className='flex justify-center mt-20 pb-20'>
        <button onClick={() => navigate('/movies')} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>
          Show More
        </button>
      </div>
    </div>
  ) : (
    <Loading/>
  );
}

export default MovieDetail;