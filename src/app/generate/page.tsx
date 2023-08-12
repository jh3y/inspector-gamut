import React from 'react' 
import GeneratorForm from '@/components/GeneratorForm/GeneratorForm'
import Results from '@/components/Results/Results'

const getQuery = (keyword: string) => `
  You will be generating CSS color palettes.

  Create an Array of colors associated with "${keyword}" (Max. 10).

  Put this Array in a JSON object under the key "base".

  Generate "triadic complementary", "monochromatic", "analogous", "split complementary", "tetradic", and "complementary" based on ${keyword}.

  Return them as Arrays under the respective keys in the JSON object using snakeCase for the keys.

  All colors must be in the CSS "hsl" format. Don't explain anything.
`
 
export default function Chat({ searchParams }: { searchParams: { query: string }}) {
 
  return (
    <main className="content flex-grow grid content-start gap-4 items-center p-4">
      <GeneratorForm />
      <Results query={getQuery(searchParams.query)}/>
    </main>
  )
}