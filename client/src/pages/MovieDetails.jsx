import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import BlueCircle from '../components/BlurCircle';
import { Heart, PlayCircleIcon, StarIcon, X } from 'lucide-react';
import timeFormate from '../lib/timeFormat';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import { useAppContext } from '../../context/AppContext';

function MovieDetail() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const {shows, axios, getToken, user, fetchFavoriteMovies, favoriteMovies, image_base_url } = useAppContext()

  const getShow = async ()=>{
    try {
        const { data } = await axios.get(`/api/shows/${id}`)
        if(data.success){
            setShow(data)
        }
    } catch (error) {
        console.log(error)
    }
}
const handleFavorite = async ()=>{
    try {
        if(!user) return toast.error("Please login to proceed");
        setIsUpdatingFavorite(true);
        const { data } = await axios.post('/api/user/update-favorite', {movieId: id},
        {headers: { Authorization: `Bearer ${await getToken()}` }})

        if(data.success){
            await fetchFavoriteMovies()
            toast.success(data.message)
        }
    } catch (error) {
        console.log(error)
    } finally {
        setIsUpdatingFavorite(false);
    }
}

  useEffect(() => {
    getShow();
  }, [id]);

  if (!show) {
    return <Loading />;
  }

  if (!show.movie) {
    return (
      <div className='min-h-screen flex flex-col justify-center items-center text-white'>
        <p className='text-xl font-medium'>Movie not found or has been deleted.</p>
        <button onClick={() => navigate('/')} className='mt-4 px-6 py-2 bg-primary rounded-md text-sm font-medium'>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-10 max-w-6xl mx-auto'>

        {/* Left Column: Image */}
        <img
          src={image_base_url + show.movie.poster_path}
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
            <button 
              onClick={() => {
                if (show.movie.trailer_url) {
                  setIsTrailerOpen(true);
                } else {
                  toast.error("Trailer not available for this movie");
                }
              }}
              className='w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'
            >
              <PlayCircleIcon className="w-5 h-5 shrink-0" />
              <span className="whitespace-nowrap">Watch Trailer</span>
            </button>

            <div className='flex items-center gap-3 w-full sm:w-auto'>
              {/* Buy Tickets Button */}
              <a href='#dateSelect' className='flex-1 sm:flex-none flex justify-center px-8 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95 text-white whitespace-nowrap'>
                Buy Tickets
              </a>

              {/* Favorite (Heart) Button */}
              <button onClick={handleFavorite} disabled={isUpdatingFavorite} className='bg-gray-700 p-3 rounded-md sm:rounded-full transition cursor-pointer active:scale-95 hover:bg-gray-600 shrink-0 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed'>
                <Heart className={`w-5 h-5 text-white ${favoriteMovies.find(movie=> movie._id === id)? 'fill-primary text-primary':""}`} />
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
              <img src={image_base_url + cast.profile_path} alt="" className='w-24 h-24 rounded-full object-cover' />
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
        {shows.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className='flex justify-center mt-20 pb-20'>
        <button onClick={() => navigate('/movies')} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>
          Show More
        </button>
      </div>

      {/* Trailer Modal */}
      {isTrailerOpen && show.movie.trailer_url && (
        <div 
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-10 transition-all duration-300'
          onClick={() => setIsTrailerOpen(false)}
        >
          <div 
            className='relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsTrailerOpen(false)}
              className='absolute top-4 right-4 bg-black/60 hover:bg-black/90 p-2 rounded-full text-white transition cursor-pointer z-10 hover:scale-110 active:scale-95'
            >
              <X className='w-6 h-6' />
            </button>
            {/* Iframe for YouTube Trailer */}
            <div className='aspect-video w-full'>
              <iframe
                src={`${show.movie.trailer_url}?autoplay=1&rel=0`}
                title={`${show.movie.title} Trailer`}
                className='w-full h-full border-0'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MovieDetail;