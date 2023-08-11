'use client'

import React from 'react' 
import { Message, useChat } from 'ai/react'
import { kv } from '@vercel/kv'
 
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, reload } = useChat({
    onFinish: async () => {
      // await kv.hincrby('inspector:count', 'requests', 1)
      console.info('incremented')
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
        content: 'Give me the blue color used for Pepsi in CSS oklab format',
      } as Message
    ]
  })

  React.useEffect(() => {
    reload()
  }, [])
 
  return (
    <div>
      {messages.map((m, index) => {
        if (index <= 1) return null
        return (
          <div key={m.id}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        )
      })}
 
      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}