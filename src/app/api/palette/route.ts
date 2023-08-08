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

const getQuery = (keyword: string) => `
  You will be generating CSS color palettes.

  Create an Array of colors associated with "${keyword}" (Max. 10).

  Put this Array in a JSON object under the key "base".

  Generate "triadic complementary", "monochromatic", "analogous", "split complementary", "tetradic", and "complementary" based on ${keyword}.

  Return them as Arrays under the respective keys in the JSON object using snakeCase for the keys.

  All colors must be in the CSS "hsl" format. Don't explain anything.
`

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { query, format } = await req.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: false,
    messages: [
    {
      role: 'system',
      content: 'You are a helpful assistant',
    },
    {
      role: 'user',
      content: getQuery(query),
    }]
  })

  // Catch any issues with the request and send back
  if (response.status !== 200) {
    const { status, statusText } = response
    return new Response(statusText, {
      status 
    })
  }

  // As long as there are no errors, update the KV store
  await kv.hincrby('inspector:count', 'requests', 1)

  const data = await response.json()
  
  // const data = {
  //   base: [
  //     'hsl(222, 94%, 39%)',
  //     'hsl(222, 95%, 59%)',
  //     'hsl(222, 94%, 79%)'
  //   ],
  //   triadic_complementary: [ 'hsl(42, 94%, 39%)', 'hsl(42, 95%, 59%)', 'hsl(42, 94%, 79%)' ],
  //   monochromatic: [
  //     'hsl(222, 88%, 19%)',
  //     'hsl(222, 78%, 39%)',
  //     'hsl(222, 68%, 59%)',
  //     'hsl(222, 58%, 79%)'
  //   ],
  //   analogous: [
  //     'hsl(217, 94%, 39%)',
  //     'hsl(222, 94%, 39%)',
  //     'hsl(227, 94%, 39%)'
  //   ],
  //   split_complementary: [
  //     'hsl(192, 94%, 39%)',
  //     'hsl(222, 94%, 39%)',
  //     'hsl(252, 94%, 39%)'
  //   ],
  //   tetradic: [
  //     'hsl(292, 94%, 39%)',
  //     'hsl(222, 94%, 39%)',
  //     'hsl(152, 94%, 39%)',
  //     'hsl(332, 94%, 39%)'
  //   ],
  //   complementary: [ 'hsl(42, 94%, 39%)', 'hsl(222, 94%, 39%)' ]
  // }

  // Convert the colors and get the CSS Color Level 4 stuff as ChatGPT doesn't do well.
  // const converted = convertColor(data)
  
  const converted = convertColor(JSON.parse(data.choices[0].message.content))


  return NextResponse.json({
    // palette: JSON.parse(data.choices[0].message.content)
    palette: converted
  }, {
    status: 200,
    statusText: 'Generated palette'
  })
}