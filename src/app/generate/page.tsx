import React from 'react' 
import GeneratorForm from '@/components/GeneratorForm/GeneratorForm'
import Results from '@/components/Results/Results'
 
export default function Chat({ searchParams }: { searchParams: { query: string }}) {
 
  return (
    <main className="content flex-grow grid content-start gap-4 items-center p-4">
      <GeneratorForm />
      <Results query={searchParams.query}/>
    </main>
  )
}