// Server-side proxy to the Claude API. The key never reaches the browser.
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5'
const API_URL = 'https://api.anthropic.com/v1/messages'

const SYSTEM_PROMPT = `You are Dr Positive, the warm, calm AI health and wellness guide of Positive AI Innovations Private Limited (Positive Mind Care).

How to respond:
- Listen first. Reflect the person's feelings in one short line, then offer ONE gentle idea or question. Never lecture.
- Keep replies short: 2-5 sentences. Plain, kind language. Match the user's language (English, Hindi, or Hinglish).
- You may suggest simple evidence-based techniques (4-6 breathing, 5-4-3-2-1 grounding, journaling, sleep hygiene).
- You are NOT a doctor. Never diagnose, never prescribe or suggest medication.
- When it fits, point to these real resources (use the exact URLs, do not invent others):
  - Anxiety screening: https://forestgreen-scorpion-490773.hostingersite.com/anxiety-screening/
  - Depression screening: https://forestgreen-scorpion-490773.hostingersite.com/depression-screening/
  - Book a counsellor / psychologist / psychiatrist: https://positivemindcare.com/portal/experts
  - WhatsApp support: https://api.whatsapp.com/send?phone=%2B918920530832&text=Hi%2C%20I%20have%20a%20question!
  - Mitra AI companion: https://mitra.timbleglance.com/login?next=/
- If the person mentions suicide, self-harm or being in danger: respond with deep empathy, urge them to call the Positive AI Team on +91 94409 93344 or their local emergency number, encourage them to be with someone they trust, and ask if they are safe. Do not give any method-related information.
- Politely steer off-topic requests (coding, homework, politics, etc.) back to wellbeing.
- Use **bold** sparingly. No headings, no emojis except an occasional 💙.`

// Tiny in-memory rate limiter (per server instance). Use Redis/Upstash in production.
const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000)
  arr.push(now)
  hits.set(ip, arr)
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > 60_000) hits.delete(k)
  return arr.length > 20
}

function hasRealKey() {
  const k = process.env.ANTHROPIC_API_KEY
  return Boolean(k) && !/dummy|your[-_]?key|placeholder|xxxx/i.test(k)
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (limited(ip)) return Response.json({ error: 'Too many messages. Please slow down a little.' }, { status: 429 })

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Validate + trim history: alternating roles, last 20 turns, bounded length.
  const raw = Array.isArray(body?.messages) ? body.messages : []
  const messages = raw
    .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.text === 'string' && m.text.trim())
    .map((m) => ({ role: m.role, content: m.text.slice(0, 1500) }))
    .slice(-20)
  while (messages.length && messages[0].role !== 'user') messages.shift()
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return Response.json({ error: 'No message' }, { status: 400 })
  }

  // No (real) key yet -> tell the client to use its built-in offline replies.
  if (!hasRealKey()) return Response.json({ fallback: true }, { status: 503 })

  let upstream
  try {
    upstream = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 500, stream: true, system: SYSTEM_PROMPT, messages }),
      signal: AbortSignal.timeout(30_000),
    })
  } catch {
    return Response.json({ fallback: true }, { status: 503 })
  }

  if (!upstream.ok || !upstream.body) {
    console.error('Claude API error', upstream.status, await upstream.text().catch(() => ''))
    return Response.json({ fallback: true }, { status: 503 })
  }

  // Convert Anthropic SSE into a plain text stream for the browser.
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ''
  const stream = upstream.body.pipeThrough(
    new TransformStream({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          try {
            const evt = JSON.parse(line.slice(5).trim())
            if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
              controller.enqueue(encoder.encode(evt.delta.text))
            }
          } catch {}
        }
      },
    }),
  )

  return new Response(stream, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' } })
}
