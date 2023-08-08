'use client';

import React from 'react'
import ColorSwatch from "@/components/ColorSwatch/ColorSwatch"

interface ResultsProps {
  palette: ConvertedColorData
}

export const ResultsLoading = () => (
  <p className="font-bold text-center text-fluid-2 text-neutral-300 leading-none">{`Robots are generating the palettes!`}</p>
)

export default async function Results (props: ResultsProps) {
  const [activeSpace, setActiveSpace] = React.useState<string>('oklab')
  const switchActiveSpace = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveSpace(event.target.value)
  }
  return (
    <>
      <select onChange={switchActiveSpace}>
        {['oklab', 'oklch', 'p3', 'hsl', 'hex', 'rgb'].map(space => (
          <option key={space} value={space}>{space}</option>
        ))}
      </select>
      {
        [
          "base",
          "monochromatic",
          "complementary",
          "analogous",
          "triadic_complementary",
          "split_complementary",
          "tetradic",
        ]
        .map((palette) => {
          return (
            <section key={palette} className="grid gap-6 text-center">
              <h2>{`${palette.split('_').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')}`}</h2>
              <div className="grid">
                {props.palette[palette as keyof ConvertedColorData].map((color: Color, index: number) => {
                  return (
                    <ColorSwatch key={`${palette}--${index}`} id={`${palette}--${index}`} color={color} activeSpace={activeSpace as keyof Color} />
                  )
                })}
              </div>
            </section>
          )})
      }
    </>
  )
}