'use client';

import React from 'react'

interface ColorSwatchProps {
  color: Color
  id: string
  activeSpace?: keyof Color
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ id, color, activeSpace = 'oklab' }) => {
  const [copied, setCopied] = React.useState<boolean>(false)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color[activeSpace as keyof Omit<Color, 'dark'>])
    setCopied(true)
  }
  React.useEffect(() => {
    let timer: number
    if (copied) timer = window.setTimeout(() => setCopied(false), 1000)
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [copied])

  return (
    <button onClick={copyToClipboard} key={id} className={`group p-4 focus-visible:z-10 relative text-fluid-1 font-bold ${color.dark ? 'text-neutral-100' : 'text-neutral-900'}`} style={{background: color[activeSpace as keyof Omit<Color, 'dark'>], outlineColor: color[activeSpace as keyof Omit<Color, 'dark'>]}}>
      {
        copied ?
          <span>Copied!</span>
        : 
          <>
            <span className="group-hover:opacity-0 transition">{color[activeSpace]}</span> 
            <span className="opacity-0 group-hover:opacity-100 transition">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-fluid-2 aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
              <span className="sr-only">{`Copy ${activeSpace} color`}</span>
            </span>
          </>
      }
    </button>
  )
}

export default ColorSwatch