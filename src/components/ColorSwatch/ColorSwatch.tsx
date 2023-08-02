import React from 'react'

interface ColorSwatchProps {
  color: string
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color }) => {
  return (
    <div className="w-4 aspect-square" style={{background: color}}>
      <span>{color}</span>
    </div>
  )
}

export default ColorSwatch