import React from 'react'
import { assets } from '../assets/assets'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import {useNavigate} from 'react-router-dom'

function HeroSection() {
 
  const navigate = useNavigate()
  return (
    <div className='relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen w-full'>
      {/* Dark gradient overlay to make text highly readable while keeping the characters visible */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none'></div>

      <div className='relative z-10 flex flex-col items-start gap-4 max-w-2xl'>
        {/* Marvel Logo */}
        <img src={assets.marvelLogo} alt="Marvel Studios" className='w-28 md:w-36 max-h-11 lg:h-11 mt-20' />

        {/* Title */}
        <h1 className='text-white text-5xl md:text-[70px] font-semi-bold md:leading-18 max-w-110'>
          Guardians <br className='hidden sm:block' /> of the Galaxy
        </h1>

        {/* Meta info */}
        <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base text-gray-300 font-medium my-2'>
          <span>Action | Adventure | Sci-Fi</span>
          <span className='flex items-center gap-1.5'>
            <Calendar className='w-4 h-4 text-primary' />
            2018
          </span>
          <span className='flex items-center gap-1.5'>
            <Clock className='w-4 h-4 text-primary' />
            2h 8m
          </span>
        </div>

        {/* Description */}
        <p className='text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-light'>
          In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
        </p>

        {/* Button */}
        <button onClick={()=>navigate('/movies')} className='flex items-center gap-2 bg-primary hover:bg-primary-dull text-white px-6 py-3 rounded-full font-medium text-sm sm:text-base cursor-pointer transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 mt-4'>
          Explore Movies
          <ArrowRight className='w-4 h-4' />
        </button>
      </div>
    </div>
  )
}

export default HeroSection