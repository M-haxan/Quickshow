import React from 'react'
import BlurCircle from '../components/BlurCircle'
import { MapPin, Phone, Film, Sparkles } from 'lucide-react'

const theatersData = [
  {
    id: 1,
    name: "Quickshow Grand Mall Cinema",
    city: "Lahore",
    address: "5th Floor, Grand Mall, Main Boulevard, Gulberg III, Lahore",
    phone: "+92 42 111-222-333",
    screens: "4 Screens (IMAX, Gold Lounge, Audi 1, Audi 2)",
    facilities: ["IMAX 3D", "Dolby Atmos", "Recliner Seats", "Valet Parking", "Food Court Access"],
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Quickshow Centaurus Cineplex",
    city: "Islamabad",
    address: "4th Floor, Centaurus Mall, Jinnah Avenue, F-8, Islamabad",
    phone: "+92 51 111-222-333",
    screens: "3 Screens (4DX, Screen 1, Screen 2)",
    facilities: ["4DX Cinema", "Dolby Atmos 7.1", "Luxury Seating", "Wheelchair Accessible"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Quickshow Emporium Multiplex",
    city: "Lahore",
    address: "2nd Floor, Emporium Mall, Johar Town, Lahore",
    phone: "+92 42 444-555-666",
    screens: "6 Screens (IMAX, Kids Screen, Audi 1 - 4)",
    facilities: ["IMAX 3D", "Laser Projection", "Dolby Surround", "Kids Play Area"],
    image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Quickshow Millennium Cinema",
    city: "Karachi",
    address: "Millennium Mall, Rashid Minhas Road, Gulshan-e-Iqbal, Karachi",
    phone: "+92 21 111-222-333",
    screens: "2 Screens (Standard, Gold)",
    facilities: ["3D Projection", "Dolby Digital", "Snack Bar", "Executive Lounge"],
    image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=600&auto=format&fit=crop"
  }
];

function Theaters() {
  return (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      {/* Background decoration */}
      <BlurCircle top="100px" left="0px" color="bg-primary" opacity="opacity-15" size="w-96 h-96" />
      <BlurCircle bottom="100px" right="50px" color="bg-primary" opacity="opacity-15" size="w-96 h-96" />

      <h1 className='text-3xl font-semibold text-white tracking-wide mb-2'>Our Theaters</h1>
      <p className='text-zinc-400 text-sm md:text-base mb-12 max-w-2xl font-light'>
        Experience cinema like never before in our state-of-the-art theaters. Equipped with the latest IMAX, 4DX, and Dolby Atmos audio systems.
      </p>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10'>
        {theatersData.map((theater) => (
          <div 
            key={theater.id} 
            className='bg-[#121214] border border-white/5 rounded-2xl overflow-hidden hover:scale-[1.01] hover:border-white/10 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 flex flex-col sm:flex-row group'
          >
            {/* Theater Image */}
            <div className='w-full sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden bg-zinc-800 relative'>
              <img 
                src={theater.image} 
                alt={theater.name} 
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                loading="lazy"
              />
              <div className='absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-md'>
                {theater.city}
              </div>
            </div>

            {/* Theater Details */}
            <div className='p-6 flex-1 flex flex-col justify-between'>
              <div>
                <h3 className='text-white text-lg font-bold group-hover:text-primary transition-colors duration-300 mb-3'>
                  {theater.name}
                </h3>
                
                {/* Location */}
                <div className='flex items-start gap-2.5 text-zinc-400 text-xs font-light mb-3.5'>
                  <MapPin className='w-4 h-4 text-primary shrink-0 mt-0.5' />
                  <span>{theater.address}</span>
                </div>

                {/* Screens */}
                <div className='flex items-center gap-2.5 text-zinc-400 text-xs font-light mb-3.5'>
                  <Film className='w-4 h-4 text-primary shrink-0' />
                  <span>{theater.screens}</span>
                </div>

                {/* Contact */}
                <div className='flex items-center gap-2.5 text-zinc-400 text-xs font-light mb-4'>
                  <Phone className='w-4 h-4 text-primary shrink-0' />
                  <span>{theater.phone}</span>
                </div>
              </div>

              {/* Facilities Badges */}
              <div className='border-t border-white/5 pt-4'>
                <div className='flex items-center gap-1.5 text-zinc-300 text-xs font-semibold mb-2'>
                  <Sparkles className='w-3.5 h-3.5 text-primary animate-pulse' />
                  <span>Premium Facilities</span>
                </div>
                <div className='flex flex-wrap gap-1.5'>
                  {theater.facilities.map((fac, idx) => (
                    <span 
                      key={idx} 
                      className='bg-white/5 border border-white/5 text-zinc-300 text-[10px] md:text-xs px-2 py-0.5 rounded-full'
                    >
                      {fac}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Theaters
