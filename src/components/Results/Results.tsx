import React from 'react'
import generatePalette from '@/actions/generatePalette'
import ColorSwatch from "@/components/ColorSwatch/ColorSwatch"

interface ResultsProps {
  query: string
}

export default async function Results (props: ResultsProps) {
  let data: any

  if (props.query) {
    const submit = new FormData()
    submit.append("query", props.query)
    data = await (await generatePalette(submit)).json()
  }

  if (!data) return null

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
              {data.palette[palette].map((color: string, index: number) => {
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