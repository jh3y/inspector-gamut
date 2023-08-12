import { kv } from "@vercel/kv";
import { NextResponse } from 'next/server'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import convertColor from '../../../utils/converter'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  })

  const stream = OpenAIStream(response, {
    onCompletion: async () => {
      await kv.hincrby('inspector:count', 'requests', 1)
    }
  })
  // Respond with the stream
  return new StreamingTextResponse(stream)
}