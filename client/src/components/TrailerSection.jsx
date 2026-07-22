import React, {useState} from 'react'
import { dummyTrailers } from '../assets/assets'
import BlueCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'
function TrailerSection() {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])
  const [isPlaying, setIsPlaying] = useState(false)

  // Extract YouTube Video ID from URL
  const videoId = currentTrailer.videoUrl.split('v=')[1]?.split('&')[0] || '';
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0${isPlaying ? '&autoplay=1' : ''}`;

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
      <p className='text-gray-300 font-medium text-lg max-w-[960px]'>
        Trailers
      </p>
      <div className='relative mt-6 aspect-video max-w-[960px] mx-auto overflow-hidden rounded-xl border border-gray-800 shadow-2xl w-full'>
        <BlueCircle top='-100px' right='-100px' />
        <iframe
          src={embedUrl}
          title="Movie Trailer"
          className="absolute top-0 left-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className='group grid grid-cols-4 gap-3 md:gap-8 mt-8 max-w-3xl mx-auto'>
        {dummyTrailers.map((trailor)=>(
          <div key={trailor.image} className='relative aspect-video rounded-lg overflow-hidden group-hover:opacity-50 hover:!opacity-100 hover:-translate-y-1 duration-300 transition cursor-pointer'
           onClick={() => { setCurrentTrailer(trailor); setIsPlaying(true); }}>
            <img src={trailor.image} alt="trailer" className='w-full h-full object-cover brightness-75'
            />
          </div>
        ))}

      </div>
      
    </div>
  )
}
export default TrailerSection

