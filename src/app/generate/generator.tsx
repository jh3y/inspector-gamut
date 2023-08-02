// import generatePalette from '../actions/generatePalette'
import React from 'react'

interface GeneratorProps {
  
}

export default async function Generator (props: GeneratorProps) {
  // 'use server'

  // const [result, setResult] = React.useState<string | undefined>(undefined)
  
  // async function generatePalette(data: FormData) {

  //   console.info({ data })

  //   console.info({ query: data.get("query") })

  //   setResult('Howdy')
  // }

  return (
    <form>
      <input required name="query" id="query" type="text" placeholder="Generate a palette based on Pepsi, clowns, clouds, etc." />
      <button>Generate</button>
    </form>
  )
}