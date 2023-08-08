import { Suspense } from "react";
import generatePalette from '@/actions/generatePalette'
import GeneratorForm from '@/components/GeneratorForm/GeneratorForm'
import Counter, { CounterLoading } from '@/components/Counter/Counter'

export const metadata = {
  title: 'Inspector Gamut',
  description: 'Generate a modern CSS color palette with AI',
}

export default async function Generate(props: any) {
  return (
    <main className="content flex-grow grid content-center gap-16 items-center justify-items-center p-4">
      <header className="grid gap-4">
        <h1 className="font-bold text-center">
          Generate color palettes using AI and CSS Color Level 4
        </h1>
        <Suspense fallback={<CounterLoading/>}>
          <Counter/>
        </Suspense>
      </header>
      <div className="grid gap-4 max-w-[400px]">
        <p className="text-center">Enter a search term. Be as descriptive as you like.</p>
        <GeneratorForm />
      </div>
    </main>
  )
}