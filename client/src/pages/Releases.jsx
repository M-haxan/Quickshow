import React, { useEffect, useState } from 'react'
import { Calendar, Lock, Star } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'
import toast from 'react-hot-toast'

function Releases() {
  const { axios, image_base_url } = useAppContext()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const { data } = await axios.get('/api/shows/upcoming')
        if (data.success) {
          // Filter out movies without posters or release dates
          const validMovies = data.movies.filter(m => m.release_date && (m.backdrop_path || m.poster_path))
          setMovies(validMovies)
        } else {
          toast.error(data.message || 'Failed to fetch upcoming releases')
        }
      } catch (error) {
        console.error(error)
        toast.error('Error fetching upcoming releases')
      } finally {
        setLoading(false)
      }
    }

    fetchUpcoming()
  }, [axios])

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Coming Soon'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      {/* Background decoration */}
      <BlurCircle top="150px" left="0px" color="bg-primary" opacity="opacity-15" size="w-96 h-96" />
      <BlurCircle bottom="50px" right="50px" color="bg-primary" opacity="opacity-15" size="w-96 h-96" />

      <h1 className='text-2xl font-semibold text-white tracking-wide mb-2'>
        Upcoming Releases and Recntly Released Movies </h1>
      <p className='text-zinc-400 text-sm md:text-base mb-12 max-w-2xl font-light'>
        Get a sneak peek at the most anticipated movies coming soon to our theaters. Keep an eye out for booking launch dates!
      </p>
      {movies.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10'>
          {movies.map((movie) => {
            const releaseDateFormatted = formatDate(movie.release_date)
            return (
              <div 
                key={movie.id}
                className="bg-[#121214] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60 hover:border-white/10 transition-all duration-300 group"
              >
                <div>
                  {/* Movie Banner */}
                  <div className="overflow-hidden rounded-xl aspect-video w-full relative bg-zinc-800">
                    <img 
                      src={image_base_url + (movie.backdrop_path || movie.poster_path)} 
                      alt={movie.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-base font-semibold mt-4 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                    {movie.title}
                  </h3>

                  {/* Tagline or Genre */}
                  <div className="flex items-center gap-1.5 text-primary text-xs font-medium mt-1">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>Releasing: {releaseDateFormatted}</span>
                  </div>

                  {/* Overview */}
                  <p className="text-zinc-400 text-xs font-light mt-3 line-clamp-2 leading-relaxed">
                    {movie.overview || "No overview available for this upcoming release."}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/5">
                  <button 
                    disabled
                    className="bg-zinc-800/70 border border-white/5 text-zinc-500 text-xs px-4 py-2 rounded-full font-medium flex items-center gap-1.5 cursor-not-allowed"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Booking Closed</span>
                  </button>

                  {movie.vote_average > 0 && (
                    <div className="flex items-center gap-1 text-zinc-300 text-sm font-medium">
                      <Star className="w-4 h-4 text-primary fill-primary animate-pulse" />
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center text-gray-400 text-lg px-6 py-20 text-center relative z-10'>
          <p>No upcoming movies found at the moment.</p>
        </div>
      )}
    </div>
  )
}

export default Releases
