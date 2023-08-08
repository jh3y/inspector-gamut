import { kv } from "@vercel/kv";

export const CounterLoading = () => (
  <p className="font-bold text-center text-fluid-2 text-neutral-300 leading-none">{`xxx+ palettes generated to date!`}</p>
)

const Counter = async () => {
  const count = await kv.hget('inspector:count', 'requests');
  return <p className="font-bold text-center text-fluid-2 text-neutral-300 leading-none">{`${count}+ palettes generated to date!`}</p>
}

export default Counter