import { kv } from "@vercel/kv";

const Counter = async () => {
  const count = await kv.hget('inspector:count', 'requests');
  return <h2>{`${count}+ palettes generated!`}</h2>
}

export default Counter