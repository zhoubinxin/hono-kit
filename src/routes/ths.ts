// routes/ths.ts
import { Context, Hono } from "hono";

export const ths = new Hono();

ths.post('/token', async (c: Context) => {
  const body = await c.req.json();

  const url = 'https://api.bxin.top/ths'

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json() as any;
  if (data.hasOwnProperty('error')) {
    return c.json({ error: data.error }, 400)
  }
  return c.json({ refresh_token: data.token.data.refresh_token, expired_time: data.token.data.expired_time })
})
