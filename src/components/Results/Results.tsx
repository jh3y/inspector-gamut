'use client';

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import ColorSwatch from "@/components/ColorSwatch/ColorSwatch"
import { Message } from 'ai';
import { useChat } from 'ai/react';
import convertColor from '@/utils/converter';
import getQuery from '@/utils/query';

interface ResultsProps {
  query: string,
}

export const ResultsLoading = () => (
  <p className="font-bold text-center text-fluid-2 text-neutral-300 leading-none">{`Robots are generating the palettes!`}</p>
)

export default function Results ({query}: ResultsProps) {
  const [activeSpace, setActiveSpace] = React.useState<string>('oklab')
  const [result, setResult] = React.useState<ConvertedColorData | null>(null)
  const switchActiveSpace = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveSpace(event.target.value)
  }
  const { messages, input, handleInputChange, handleSubmit, reload } = useChat({
    api: '/api/generate',
    onFinish: async (message) => {
      const converted = convertColor(JSON.parse(message.content))
      setResult(converted)
    },
    initialMessages: [
      {
        id: 'first',
        role: 'system',
        content: 'You are a helpful assistant',
      } as Message,
      {
        id: 'second',
        role: 'user',
        content: getQuery(query)
      } as Message
    ]
  })

  // Necessary in order to trigger GPT on page load.
  React.useEffect(() => {
    reload()
  }, [reload])

  if (!result) return <div>Loading...</div>
 
  return (
    <>
      <p className="font-bold leading-none grid gap-2">
        <span className="text-fluid-1">Showing results for:</span>
        <span>{`"${query}"`}</span>
      </p>
      <Select onValueChange={setActiveSpace}>
        <SelectTrigger className="w-full focus-visible:outline-purple-200">
          <SelectValue className="text-center block" placeholder="Select Color Space" />
        </SelectTrigger>
        <SelectContent>
          {['oklab', 'oklch', 'p3', 'hsl', 'hex', 'rgb'].map(space => (
            <SelectItem key={space} value={space}>{space}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {result &&
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
            <section key={palette} className="grid gap-6 text-center">
              <h2 className="text-fluid-1 font-bold opacity-50">{`${palette.split('_').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')}`}</h2>
              <div className="grid">
                {result[palette as keyof ConvertedColorData].map((color: Color, index: number) => {
                  return (
                    <ColorSwatch key={`${palette}--${index}`} id={`${palette}--${index}`} color={color} activeSpace={activeSpace as keyof Color} />
                  )
                })}
              </div>
            </section>
          )})
      }
    </>
  )
}