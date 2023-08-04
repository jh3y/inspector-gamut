import { kv } from "@vercel/kv";
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import generatePalette from '@/actions/generatePalette'

import Results from '@/components/Results/Results'
import Counter from '@/components/Counter/Counter'
import { Suspense } from "react";

const Loading = () => <p>Loading...</p>

export const metadata = {
  title: 'Generate a color palette',
  description: 'Generated by create next app',
}

export default async function Generate(props: any) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Generate a palette...</h1>
      <Suspense fallback={<Loading/>}>
        <Counter/>
      </Suspense>
      <form>
        <input required name="query" id="query" type="text" placeholder="Generate a palette based on Pepsi, clowns, clouds, etc." />
        <button>Generate</button>
      </form>
      <Suspense fallback={<Loading/>}>
        <Results query={props?.searchParams?.query} />
      </Suspense>
    </main>
  )
}