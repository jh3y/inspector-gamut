interface ResultsProps {
  data: any
}

export default async function Results (props: ResultsProps) {
  console.info({ results: props.data })
  return (
    <>
    <h1>Here be them colors you wanted</h1>
    {JSON.stringify(props.data.palette.seed, undefined, 2)}
    {props.data.palette.seed.map((color: string, index: number) => {
      return (
        <div key={`seed--${index}`} style={{
          background: color,
        }}>
          Cool!
        </div>
      )
    })}
    </>
  )
}