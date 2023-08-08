import { Suspense } from "react";
import generatePalette from '@/actions/generatePalette'
import GeneratorForm from '@/components/GeneratorForm/GeneratorForm'
import Counter, { CounterLoading } from '@/components/Counter/Counter'
import Results, { ResultsLoading } from "@/components/Results/Results";

export const metadata = {
  title: 'Inspector Gamut',
  description: 'Generate a modern CSS color palette with AI',
}

export default async function Generate(props: any) {
  let data: {
    palette: ColorData
  } | undefined = undefined

  if (props?.searchParams?.query) {
    const submit = new FormData()
    submit.append("query", props.query)
    data = await (await generatePalette(submit)).json()
  }

  if (!data) return null
    
  return (
    <main className="content flex-grow grid content-start gap-16 items-center p-4">
      <GeneratorForm />
      <Suspense fallback={<ResultsLoading/>}>
        <Results palette={data.palette} />
      </Suspense>
    </main>
  )
}