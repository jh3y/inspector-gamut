import React from 'react'

interface ColorSwatchProps {
  color: Color
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color }) => {
  return (
    <div className="w-4 aspect-square" style={{background: color.p3}}>
      <span>{color.p3}</span>
    </div>
  )
}

export default ColorSwatch