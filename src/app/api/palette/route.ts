import { NextResponse } from 'next/server'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'
 
// const getQuery = (keyword: string, format: string = 'hsl') => `Generate a color palette based on the keyword "Pepsi". Return the colors in the CSS format ${format} as Arrays in a json object with the key "seed". The "seed" Array contains all related colors to the keyword. Inside the same JSON object, return "triadic", "analogue", "monochromatic", and "complimentary" color palettes based on the first color in the "seed" Array. These should also be Arrays under their respective keys in the same json object. Return only the json object and no explanation.`
// const getQuery = (keyword: string, format: string = 'oklab') => `You are a web designer. Generate a "seed" Array of colors based on the keyword "${keyword}". Create triadic, complimentary, analogue, and monochromatic color palettes with the first color from the "seed" Array. Return a json object where each color palette and the seed array are keys. All colors should be defined using the CSS oklab color format/space as an Array of 3 numbers. Don't explain it.`
// const getQuery = (keyword: string, format: string = 'oklab') => `
//   Generate an Array of related colors for "${keyword}".

//   Use this as the "seed" Array.

//   Then generate "triadic", "analogue", "complimentary", and "monochromatic" color palettes using
//   the first color from the "seed" Array.
  
//   Return a JSON object with the colors in CSS HSL format.
  
//   The output format should be like this:
  
//   {
//     "seed": [...],
//     "triadic": [...],
//     ...
//   }
// `

const getQuery = (keyword: string) => `
  Generate a CSS color palette for "${keyword}". Use the HSL format.

  Return it in a JSON object.

  The output should use this structure:

  {
    "seed": ["hsl()", "hsl()", ...]
  }
`

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { query, format } = await req.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: false,
    messages: [{
      role: 'user',
      content: getQuery(query, format),
    }]
  })

  // Catch any issues with the request and send back
  if (response.status !== 200) {
    const { status, statusText } = response
    return new Response(statusText, {
      status 
    })
  }

  const data = await response.json()
  
  // console.info({ data: JSON.stringify(data.choices[0].message.content, undefined, 2) })
  
  return NextResponse.json({
    palette: JSON.parse(data.choices[0].message.content)
  }, {
    status: 200,
    statusText: 'Generated palette'
  })

  // console.info({ data: JSON.stringify(data.content, undefined, 2)})

  // Convert the response into a friendly text-stream
  // const stream = OpenAIStream(response)
  // Respond with the stream
  // return new StreamingTextResponse(stream)
}