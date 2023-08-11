'use client'

import { Suspense } from "react";
import generatePalette from '@/actions/generatePalette'
import GeneratorForm from '@/components/GeneratorForm/GeneratorForm'
import Counter, { CounterLoading } from '@/components/Counter/Counter'
import Results, { ResultsLoading } from "@/components/Results/Results";
// import { getQuery } from "../api/palette/route";
import { Message } from "ai";

// export const metadata = {
//   title: 'Inspector Gamut',
//   description: 'Generate a modern CSS color palette with AI',
// }

export default async function Generate(props: any) {
  // let data: {
  //   palette: ConvertedColorData
  // } | undefined = undefined

  // const initialMessages = [
  //   {
  //     id: 'first',
  //     role: 'system',
  //     content: 'You are a helpful assistant',
  //   } as Message,
  //   {
  //     id: 'second',
  //     role: 'user',
  //     content: getQuery(props?.searchParams?.query),
  //   } as Message
  // ]

  // console.info({ initialMessages })

  // if (props?.searchParams?.query) {
  //   const submit = new FormData()
  //   submit.append("query", props.query)
  //   data = await (await generatePalette(submit)).json()
  // }

  // if (!data) return null
    
  return (
    <main className="content flex-grow grid content-start gap-4 items-center p-4">
      {/*<GeneratorForm />*/}
      <Results />
    </main>
  )
}