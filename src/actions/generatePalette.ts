export default async function generatePalette(data: FormData) {
  const request = await fetch(`${process.env.API_ENDPOINT}/api/palette`, {
    method: 'post',
    body: JSON.stringify({
      query: data.get("query"),
    })
  })
  return request
}