import React from 'react'
import ColorSwatch from "@/components/ColorSwatch/ColorSwatch"

interface ResultsProps {
  data: any
}

export default async function Results (props: ResultsProps) {
  return (
    <>
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
            <section key={palette}>
              <h2>{palette}</h2>
              {props.data.palette[palette].map((color: string, index: number) => {
                return (
                  <ColorSwatch key={`${palette}--${index}`} color={color} />
                )
              })}
            </section>
          )})
      }
    </>
  )
}