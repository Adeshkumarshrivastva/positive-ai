'use client'

import { useEffect, useRef, useState } from 'react'

const SITE = 'https://positivemindcare.com'
const WHATSAPP = 'https://api.whatsapp.com/send?phone=%2B918920530832&text=Hi%2C%20I%20have%20a%20question!'
const ANXIETY = 'https://forestgreen-scorpion-490773.hostingersite.com/anxiety-screening/'
const DEPRESSION = 'https://forestgreen-scorpion-490773.hostingersite.com/depression-screening/'
const STORAGE_KEY = 'positive-ai-chat-v1'

const START_CHIPS = ["I just want to talk", "I'm feeling stressed", "I've been overthinking a lot", 'Help me relax']
const MORE_CHIPS = ['Take a screening', 'Book a counsellor']

const WELCOME = {
  role: 'assistant',
  text: "Hi, I'm Dr Positive 💙\nYour calm space to talk, breathe and reflect. There's no judgement here.\n\nHow are you feeling today?",
  chips: START_CHIPS,
  time: Date.now(),
}

// Each entry: keywords -> one or more reply variants + quick-reply chips.
// `weight` lets important topics win over generic ones.
const faqs = [
  {
    id: 'crisis',
    weight: 100,
    crisis: true,
    keys: ['suicide', 'suicidal', 'kill myself', 'end my life', 'want to die', 'self harm', 'hurt myself', "don't want to live"],
    replies: [
      "I'm really glad you told me, and I'm so sorry you're in this much pain. You matter, and you don't have to face this alone.\n\nPlease reach out right now:\n• Positive AI Team: +91 94409 93344\n• Or your local emergency number\n• Or tell someone you trust to stay with you.\n\nI'm still here with you. Can you tell me if you're safe right now?",
    ],
    chips: ["I'm safe right now", 'Talk to a counsellor'],
  },
  {
    id: 'breathe',
    weight: 8,
    keys: ['relax', 'breathe', 'breathing', 'calm down', 'calm', 'grounding', 'exercise'],
    replies: [
      "Let's slow things down together. Try the **4-6 breath**:\n\n1. Breathe in through your nose for 4 seconds\n2. Breathe out gently for 6 seconds\n3. Repeat 5 times\n\nThen look around and name **5 things you can see**. This brings your mind back to the present.\n\nHow do you feel after trying it?",
    ],
    chips: ['I feel a bit better', 'Still anxious', 'I just want to talk'],
  },
  {
    id: 'better',
    weight: 7,
    keys: ['feel better', 'bit better', 'im better', "i'm better", 'much better', 'feeling good', 'feeling great', 'happy'],
    replies: [
      "That's lovely to hear 🌱 Notice what helped, so you can come back to it whenever you need.\n\nWould you like to keep talking or explore something else?",
    ],
    chips: ['Take a screening', 'I just want to talk'],
  },
  {
    id: 'safe',
    weight: 9,
    keys: ["i'm safe", 'im safe', 'i am safe'],
    replies: [
      "Thank you for telling me. I'm glad you're safe. Would you like to talk about what's been happening? A counsellor can also support you personally.",
    ],
    chips: ['I just want to talk', 'Book a counsellor'],
  },
  {
    id: 'talk',
    weight: 5,
    keys: ['just want to talk', 'want to talk', 'need to talk', 'vent', 'listen'],
    replies: [
      "I'm here, and I'm listening. Take your time, there's no rush.\n\nWhat would you like to share?",
      "Thank you for trusting me with this. Start wherever feels easiest, I'm listening.",
    ],
    chips: ["I'm feeling stressed", "I've been overthinking a lot", 'I feel low and sad'],
  },
  {
    id: 'overthink',
    weight: 6,
    keys: ['overthink', 'racing thoughts', 'cant stop thinking', "can't stop thinking", 'mind wont stop', 'too many thoughts'],
    replies: [
      "Overthinking can be exhausting, and it doesn't mean something is wrong with you.\n\nTry this: write the thought down, then ask yourself **\"Is this in my control right now?\"** If not, take 5 slow breaths and gently shift your attention.\n\nDoes it mostly happen at night or throughout the day?",
    ],
    chips: ['Mostly at night', 'Throughout the day', 'Take an anxiety screening'],
  },
  {
    id: 'sleep',
    weight: 6,
    keys: ['night', 'sleep', 'insomnia', 'cant sleep', "can't sleep"],
    replies: [
      "Night-time thoughts are really common. A few things that help:\n\n• Keep a fixed sleep time\n• Avoid screens 30 minutes before bed\n• Try slow breathing (in 4s, out 6s)\n\nIf it continues for weeks, a professional can help.",
    ],
    chips: ['Book a counsellor', 'Take an anxiety screening'],
  },
  {
    id: 'stress',
    weight: 5,
    keys: ['stress', 'stressed', 'tension', 'pressure', 'overwhelm', 'burnout', 'burnt out'],
    replies: [
      "That sounds heavy, and I'm glad you said it out loud. A short pause can help: breathe in for 4, hold for 4, out for 6.\n\nWhat is stressing you the most right now?",
      "Feeling stressed is your mind telling you it's carrying a lot. Let's look at it together.\n\nWhat's weighing on you the most?",
    ],
    chips: ['Work or studies', 'Relationships', 'Everything feels too much'],
  },
  {
    id: 'work',
    weight: 4,
    keys: ['work', 'stud', 'exam', 'job', 'career', 'boss', 'office'],
    replies: [
      "Work and study pressure is very real. Break big tasks into small steps, take short breaks, and protect your rest. You don't have to do it all at once.\n\nIf it keeps building up, talking to a counsellor can really help.",
    ],
    chips: ['Book a counsellor', 'Help me relax'],
  },
  {
    id: 'relationship',
    weight: 4,
    keys: ['relationship', 'family', 'partner', 'friend', 'breakup', 'divorce', 'marriage', 'parents'],
    replies: [
      "Relationships can affect us deeply, and your feelings are valid. Talking it through with someone neutral, like a counsellor, can bring a lot of clarity.\n\nWould you like to tell me more about what happened?",
    ],
    chips: ['Book a counsellor', 'I just want to talk'],
  },
  {
    id: 'toomuch',
    weight: 4,
    keys: ['too much', 'everything'],
    replies: [
      "I'm sorry it feels this way. You don't have to carry it all alone. Let's take it one small step at a time. A screening can help you understand where you stand.",
    ],
    chips: ['Take an anxiety screening', 'Book a counsellor'],
  },
  {
    id: 'anxiety',
    weight: 6,
    keys: ['anxiety', 'anxious', 'worry', 'worried', 'panic', 'nervous', 'scared', 'fear'],
    replies: [
      `Feeling anxious is common and very manageable. You can take our free **Anxiety Screening**:\n${ANXIETY}\n\nA counsellor can also guide you personally. Want a quick breathing exercise meanwhile?`,
    ],
    chips: ['Help me relax', 'Book a counsellor'],
  },
  {
    id: 'depression',
    weight: 6,
    keys: ['depress', 'sad', 'low', 'hopeless', 'lonely', 'empty', 'crying', 'worthless', 'numb'],
    replies: [
      `I'm sorry you're feeling this way. You are not alone, and what you feel is real. You can take our **Depression Screening**:\n${DEPRESSION}\n\nTalking to a mental health professional can really help.`,
    ],
    chips: ['Book a counsellor', 'I just want to talk'],
  },
  {
    id: 'adhd',
    weight: 6,
    keys: ['adhd'],
    replies: [`You can take the ADHD assessment here:\n${SITE}/adhd-assessment`],
    chips: MORE_CHIPS,
  },
  {
    id: 'autism',
    weight: 6,
    keys: ['autism'],
    replies: [`You can take the Autism assessment here:\n${SITE}/autism-assessment`],
    chips: MORE_CHIPS,
  },
  {
    id: 'iq',
    weight: 6,
    keys: ['iq', 'intelligence'],
    replies: [`You can take the IQ assessment here:\n${SITE}/iq-assessment`],
    chips: MORE_CHIPS,
  },
  {
    id: 'personality',
    weight: 6,
    keys: ['personality'],
    replies: [`You can take the Personality assessment here:\n${SITE}/personality-assessment`],
    chips: MORE_CHIPS,
  },
  {
    id: 'screening',
    weight: 3,
    keys: ['screening', 'test', 'minds', 'assessment', 'check'],
    replies: [
      `**MINDS AI** offers Anxiety and Depression screening (${SITE}/minds-ai). We also have ADHD, Autism, IQ and Personality assessments on ${SITE}\n\nWhich one would you like to start with?`,
    ],
    chips: ['Take an anxiety screening', 'Depression screening'],
  },
  {
    id: 'mitra',
    weight: 5,
    keys: ['mitra', 'companion'],
    replies: ['**Mitra AI** is our personal AI companion for thoughtful conversations and support. Open it from the Mitra AI card on this page.'],
    chips: ['Book a counsellor', 'I just want to talk'],
  },
  {
    id: 'book',
    weight: 5,
    keys: ['book', 'appointment', 'counsel', 'therapist', 'therapy', 'psychologist', 'psychiatrist', 'doctor', 'session', 'expert'],
    replies: [
      `You can find psychologists, psychiatrists and counsellors (virtual or in-clinic) here:\n${SITE}/portal/experts\n\nOr message us on WhatsApp:\n${WHATSAPP}`,
    ],
    chips: ['Take a screening', 'I just want to talk'],
  },
  {
    id: 'contact',
    weight: 3,
    keys: ['contact', 'phone', 'whatsapp', 'call', 'help', 'support'],
    replies: [`You can reach Positive Mind Care on WhatsApp:\n${WHATSAPP}\n\nOr visit ${SITE}/contact-us`],
    chips: ['Book a counsellor', 'I just want to talk'],
  },
  {
    id: 'who',
    weight: 5,
    keys: ['who are you', 'what are you', 'your name', 'what can you do'],
    replies: [
      "I'm **Dr Positive**, a wellness companion. I can listen, share simple calming exercises, point you to free screenings and help you reach a real counsellor.\n\nI'm not a doctor, and I don't replace professional care.",
    ],
    chips: START_CHIPS,
  },
  {
    id: 'thanks',
    weight: 2,
    keys: ['thank', 'thanks', 'thankyou', 'shukriya', 'ok', 'okay'],
    replies: ["You're always welcome 💙 I'm here whenever you want to talk."],
    chips: START_CHIPS,
  },
  {
    id: 'hello',
    weight: 1,
    keys: ['hi', 'hii', 'hiii', 'hello', 'hey', 'namaste'],
    replies: ["Hey, I'm glad you reached out.\n\nWhat's been on your mind lately?"],
    chips: START_CHIPS,
  },
]

const FALLBACKS = [
  "I want to understand you better. Could you tell me a little more about how you're feeling? You can also pick an option below.",
  "I'm listening. Tell me more, or choose something that fits where you are right now.",
]

function normalize(s) {
  return s.toLowerCase().replace(/[’‘]/g, "'")
}

// Score every topic by how many of its keywords appear; the best score wins.
function getReply(text, turn) {
  const t = normalize(text)
  const words = t.split(/[^a-z']+/)
  let best = null
  let bestScore = 0
  for (const f of faqs) {
    let hits = 0
    for (const k of f.keys) {
      if (k.length <= 4 ? words.includes(k) : t.includes(k)) hits += 1
    }
    const score = hits ? f.weight + hits : 0
    if (score > bestScore) {
      best = f
      bestScore = score
    }
  }
  if (best) {
    return { text: best.replies[turn % best.replies.length], chips: best.chips, crisis: !!best.crisis }
  }
  return { text: FALLBACKS[turn % FALLBACKS.length], chips: START_CHIPS }
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Renders **bold**, bullet lines and clickable links.
function renderInline(line, keyPrefix) {
  return line.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g).map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={`${keyPrefix}-${i}`} className="font-semibold">{part.slice(2, -2)}</strong>
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={`${keyPrefix}-${i}`} href={part} target="_blank" rel="noopener noreferrer" className="break-all font-semibold text-[#3b82f6] underline underline-offset-2">
          {part}
        </a>
      )
    }
    return part
  })
}

function RichText({ text }) {
  return (
    <div className="space-y-1.5">
      {text.split('\n').map((line, i) =>
        line.trim() === '' ? (
          <div key={i} className="h-1.5" />
        ) : (
          <p key={i} className="m-0">{renderInline(line, i)}</p>
        ),
      )}
    </div>
  )
}

function Avatar() {
  return (
    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] text-[11px] font-bold text-white shadow-sm">
      DP
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      <Avatar />
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-[#f3f4f8] px-4 py-3.5" aria-label="Dr Positive is typing">
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot h-2 w-2 rounded-full bg-[#9ca3af]" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  )
}

export default function ChatWidget({ open, onClose }) {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const sessionRef = useRef(0)
  const endRef = useRef(null)
  const inputRef = useRef(null)
  const abortRef = useRef(null)

  // Every time the chat is closed the conversation is thrown away, so the next open starts fresh.
  // Nothing is stored in the browser (old saved chats from earlier versions are wiped too).
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }, [])

  useEffect(() => {
    if (open) return
    sessionRef.current += 1 // late replies from the old session are ignored
    abortRef.current?.abort()
    setMessages([{ ...WELCOME, time: Date.now() }])
    setInput('')
    setTyping(false)
  }, [open])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing, open])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden' // no background scrolling behind the chat
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  // Cancel any in-flight request if the widget unmounts.
  useEffect(() => () => abortRef.current?.abort(), [])

  async function send(raw) {
    const text = raw.trim()
    if (!text || typing) return
    const turn = messages.filter((m) => m.role === 'user').length
    const history = [...messages, { role: 'user', text, time: Date.now() }]
    setMessages(history)
    setInput('')
    setTyping(true)

    const session = sessionRef.current
    const update = (fn) => {
      if (sessionRef.current === session) setMessages(fn)
    }
    const offline = getReply(text, turn) // used for chips, crisis flag and as fallback
    const addReply = (extra) => update((m) => [...m, { role: 'assistant', time: Date.now(), ...extra }])

    // Safety first: never leave a crisis message to the AI. Show the vetted reply instantly.
    if (offline.crisis) {
      await new Promise((r) => setTimeout(r, 500))
      addReply({ text: offline.text, chips: offline.chips, crisis: true })
      if (sessionRef.current === session) setTyping(false)
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    let full = ''
    let started = false

    try {
      const res = await fetch('/api/chat', {
        signal: controller.signal,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history.map(({ role, text }) => ({ role, text })) }),
      })
      if (res.status === 429) {
        addReply({ text: 'You are sending messages very quickly. Please take a breath and try again in a minute 💙', chips: [] })
        return
      }
      if (!res.ok || !res.body) throw new Error('fallback')

      // Stream the answer in word by word.
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        if (!started) {
          started = true
          if (sessionRef.current === session) setTyping(false)
          addReply({ text: full, streaming: true })
        } else {
          update((m) => m.map((x, i) => (i === m.length - 1 ? { ...x, text: full } : x)))
        }
      }
      if (!full.trim()) throw new Error('empty')
      const chips = offline.chips === START_CHIPS ? ['Help me relax', 'Take a screening', 'Book a counsellor'] : offline.chips
      update((m) => m.map((x, i) => (i === m.length - 1 ? { ...x, streaming: false, chips, crisis: offline.crisis } : x)))
    } catch (err) {
      if (err?.name === 'AbortError') return
      if (started && full.trim()) {
        // Connection dropped mid-answer: keep what we already have.
        update((m) => m.map((x, i) => (i === m.length - 1 ? { ...x, streaming: false, chips: ['Help me relax', 'Book a counsellor'] } : x)))
        return
      }
      // No API key / network problem: use the built-in offline replies.
      await new Promise((r) => setTimeout(r, Math.min(1800, 600 + offline.text.length * 4)))
      update((m) => {
        const lastMsg = m[m.length - 1]
        const base = lastMsg?.streaming ? m.slice(0, -1) : m
        return [...base, { role: 'assistant', text: offline.text, chips: offline.chips, crisis: offline.crisis, time: Date.now() }]
      })
    } finally {
      if (sessionRef.current === session) setTyping(false)
    }
  }

  function clearChat() {
    setMessages([{ ...WELCOME, time: Date.now() }])
    setTyping(false)
  }

  if (!open) return null

  const last = messages[messages.length - 1]
  const chips = !typing && last.role === 'assistant' && !last.streaming ? last.chips || [] : []
  const hasCrisis = messages.some((m) => m.crisis)

  return (
    <div onClick={onClose} className="chat-backdrop fixed inset-0 z-50 flex items-end justify-center bg-[#0f2a23]/60 p-3 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="chat-pop flex h-[88dvh] max-h-[720px] w-full max-w-[440px] flex-col gap-3" role="dialog" aria-label="Dr Positive chat" onClick={(e) => e.stopPropagation()}>
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(0,0,0,.35)]">
          <header className="flex shrink-0 items-center gap-3 bg-gradient-to-r from-[#17352d] to-[#25544a] px-5 py-4 text-white">
            <div className="relative">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] text-[14px] font-bold">DP</div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#17352d] bg-[#34d399]" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="m-0 text-[16px] font-semibold leading-tight">Dr Positive</h2>
              <p className="m-0 text-[12px] text-white/70">Online · Your wellness companion</p>
            </div>
            <button type="button" onClick={clearChat} title="New conversation" className="grid h-9 w-9 place-items-center rounded-full text-[16px] text-white/80 hover:bg-white/10" aria-label="Start new conversation">
              ↻
            </button>
            <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full text-[24px] leading-none text-white/80 hover:bg-white/10" aria-label="Close chat">
              ×
            </button>
          </header>

          {hasCrisis && (
            <div className="shrink-0 border-b border-[#fecaca] bg-[#fef2f2] px-5 py-2.5 text-[13px] text-[#991b1b]">
              Need help now? Call the <strong>Positive AI Team: +91 94409 93344</strong> or your local emergency number.
            </div>
          )}

          <div className="chat-scroll min-h-0 flex-1 space-y-4 overflow-y-auto bg-white px-5 py-5" role="log" aria-live="polite" aria-label="Conversation">
            {messages.map((message, index) =>
              message.role === 'user' ? (
                <div key={index} className="msg-in flex flex-col items-end">
                  <div className="max-w-[82%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-gradient-to-br from-[#3b82f6] to-[#6366f1] px-4 py-2.5 text-[15px] leading-6 text-white shadow-sm">
                    {message.text}
                  </div>
                  <span className="mt-1 text-[11px] text-[#9ca3af]">{formatTime(message.time || Date.now())}</span>
                </div>
              ) : (
                <div key={index} className="msg-in flex items-end gap-2">
                  <Avatar />
                  <div className="max-w-[84%]">
                    <div className="rounded-2xl rounded-bl-md bg-[#f3f4f8] px-4 py-3 text-[15px] leading-6 text-[#111827]">
                      <RichText text={message.text} />
                    </div>
                    <span className="mt-1 block text-[11px] text-[#9ca3af]">{formatTime(message.time || Date.now())}</span>
                  </div>
                </div>
              ),
            )}
            {typing && <TypingDots />}
            {chips.length > 0 && (
              <div className="msg-in flex flex-wrap justify-end gap-2 pt-1">
                {chips.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-[#3b82f6]/40 bg-[#eff6ff] px-4 py-2 text-[14px] font-medium text-[#2563eb] transition hover:-translate-y-0.5 hover:border-[#3b82f6] hover:bg-[#dbeafe]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <p className="m-0 shrink-0 border-t border-[#eef0f4] bg-[#fafbfc] px-5 py-2 text-center text-[11px] text-[#9ca3af]">
            Dr Positive is a wellness guide, not a substitute for professional care.
          </p>
        </section>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="shrink-0 rounded-full bg-[linear-gradient(90deg,#3b82f6,#ec4899,#f97316)] p-[2.5px] shadow-lg"
        >
          <div className="flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder={messages.length <= 1 ? 'Share what is on your mind...' : 'Continue conversation...'}
              className="h-10 min-w-0 flex-1 border-0 bg-transparent text-[15px] text-[#111827] outline-none placeholder:text-[#9ca3af]"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing || last.streaming}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#6366f1] text-white transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              aria-label="Send"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M3.4 20.4 21 12 3.4 3.6l-.1 6.5L15 12 3.3 13.9l.1 6.5Z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
