import React from 'react'
import { Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function MovieCard({ movie }) {
  const navigate = useNavigate()

  // Format date, genre, and runtime
  const year = movie.release_date ? movie.release_date.split('-')[0] : '2025'
  const genreList = movie.genres ? movie.genres.map(g => g.name).slice(0, 2).join(', ') : 'Action'
  const hours = movie.runtime ? Math.floor(movie.runtime / 60) : 0
  const minutes = movie.runtime ? movie.runtime % 60 : 0
  const formattedRuntime = movie.runtime ? `${hours}h ${minutes}m` : '2h'

  return (
    <div 
      onClick={() => { navigate(`/movie/${movie._id || movie.id}`); scrollTo(0, 0); }}
      className="bg-[#121214] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 cursor-pointer group"
    >
      <div>
        {/* Landscape Cover Image */}
        <div className="overflow-hidden rounded-xl aspect-video w-full relative bg-zinc-800">
          <img 
            src={movie.backdrop_path || movie.poster_path} 
            alt={movie.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Movie Title */}
        <h3 className="text-white text-base font-semibold mt-4 line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {movie.title}
        </h3>

        {/* Subtitle Category */}
        <p className="text-primary text-xs font-medium mt-0.5">
          Movies
        </p>

        {/* Metadata: Year, Genre, Runtime */}
        <p className="text-zinc-400 text-xs font-light mt-2">
          {year} &bull; {genreList} &bull; {formattedRuntime}
        </p>
      </div>

      {/* Footer: Buy Ticket Button and Rating */}
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/5">
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            navigate(`/movie/${movie._id || movie.id}`); 
            scrollTo(0, 0); 
          }} 
          className="bg-primary hover:bg-primary-dull text-white text-xs px-5 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95"
        >
          Buy Ticket
        </button>

        <div className="flex items-center gap-1 text-zinc-300 text-sm font-medium">
          <Star className="w-4 h-4 text-primary fill-primary animate-pulse" />
          <span>{movie.vote_average ? movie.vote_average.toFixed(1) : '4.5'}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
