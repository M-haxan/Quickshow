import React from 'react'

function BlurCircle({ 
  color = 'bg-primary', 
  size = 'w-72 h-72', 
  blur = 'blur-[80px]', 
  opacity = 'opacity-25', 
  top,
  right,
  bottom,
  left,
  className = '',
  style = {}
}) {
  const positionStyles = {
    ...(top !== undefined && { top }),
    ...(right !== undefined && { right }),
    ...(bottom !== undefined && { bottom }),
    ...(left !== undefined && { left }),
    ...style
  }

  return (
    <div 
      className={`absolute rounded-full pointer-events-none ${color} ${size} ${blur} ${opacity} ${className}`}
      style={positionStyles}
    />
  )
}

export default BlurCircle
