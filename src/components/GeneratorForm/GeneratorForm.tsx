import React from 'react'

const GeneratorForm = () => {
  return (
    <form className="grid gap-4 w-full" action="/chat">
      <div className="flex w-full">
        <input className="text-neutral-800 p-2 px-4 flex-grow rounded-l-full" required name="query" id="query" type="text" placeholder="Dr. Pepper, Barbie Pink, Happiness, Zelda, etc." />
        <button className="border-transparent outline-transparent border-4 rounded-r-full text-fluid--1 flex gap-x-1 items-center text-white bg-purple-600 transition hover:bg-purple-500 px-3 py-1">Generate</button>
      </div>
    </form>
  )
}

export default GeneratorForm