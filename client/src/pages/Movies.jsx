import React from 'react'
import MovieCard from '../components/MovieCard'
import BlueCircle from '../components/BlurCircle'
import { useAppContext } from '../../context/AppContext'
function Movies() {
  const {shows} = useAppContext()
  return shows.length>0? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlueCircle top="150px" left="0px"/>
      <BlueCircle bottom="50px" right="50px"/>
      <h1 className='text-lg font-medium my-4'>Now Showing</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {shows.filter(movie => movie != null).map((movie)=>(
          <MovieCard movie={movie} key={movie._id}/>
        ))}
      </div>
    </div>
  ):(
    <div className='pt-32 min-h-[80vh] flex flex-col justify-center items-center text-gray-400 text-lg px-6 text-center relative overflow-hidden'>
      <BlueCircle top="150px" left="10%"/>
      <p>No movies showing currently.</p>
    </div>
  )
}

export default Movies