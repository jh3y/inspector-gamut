'use server'
export default async function generatePalette(data: FormData) {

  // console.info({ data })

  // console.info({ query: data.get("query") })

  const request = await fetch(`${process.env.API_ENDPOINT}/api/palette`, {
    method: 'post',
    body: JSON.stringify({
      query: data.get("query"),
    })
  })

  return request
}