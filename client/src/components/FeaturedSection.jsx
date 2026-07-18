import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import MovieCard from './MovieCard'
import { dummyShowsData } from '../assets/assets'

function FeaturedSection() {
  const navigate = useNavigate()

  return (
    <section className="relative w-full px-6 md:px-16 lg:px-36 py-16 bg-[#09090B] overflow-hidden">
      {/* Background glow circle behind View All / Top Right */}
      <BlurCircle 
        color="bg-primary" 
        size="w-96 h-96" 
        blur="blur-[120px]" 
        opacity="opacity-20" 
        top="0px" 
        right="-80px" 
      />

      {/* Header Container */}
      <div className="flex items-center justify-between w-full relative z-10 mb-10">
        {/* Now Showing Title */}
        <h2 className="text-white text-xl md:text-2xl font-semibold tracking-wide select-none">
          Now Showing
        </h2>
        
        {/* View All Button */}
        <button 
          onClick={() => { navigate('/movies'); scrollTo(0, 0); }} 
          className="flex items-center gap-2 text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300 font-medium cursor-pointer group"
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
        {dummyShowsData.map((movie) => (
          <MovieCard key={movie._id || movie.id} movie={movie} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center mt-12 relative z-10">
        <button 
          onClick={() => { navigate('/movies'); scrollTo(0, 0); }} 
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull text-white transition duration-300 rounded-md font-medium cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
        >
          Show more
        </button>
      </div>
    </section>
  )
}

export default FeaturedSection
