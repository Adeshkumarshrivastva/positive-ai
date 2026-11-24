'use client'

import { useEffect, useRef, useState } from 'react'

const SITE = 'https://positivemindcare.com'
const WHATSAPP = 'https://api.whatsapp.com/send?phone=%2B918920530832&text=Hi%2C%20I%20have%20a%20question!'
const ANXIETY = 'https://forestgreen-scorpion-490773.hostingersite.com/anxiety-screening/'
const DEPRESSION = 'https://forestgreen-scorpion-490773.hostingersite.com/depression-screening/'

const START_CHIPS = ["I just want to talk", "I'm feeling stressed", "I've been overthinking a lot"]
const MORE_CHIPS = ['Take a screening', 'Book a counsellor']

// Each entry: keywords -> reply text + quick-reply chips shown after it.
const faqs = [
  {
    keys: ['suicide', 'kill myself', 'end my life', 'self harm', 'hurt myself'],
    text: 'I am really sorry you are in so much pain. Please reach out right now to someone you trust or your local emergency number. In India, Tele-MANAS (14416) offers free 24x7 support. You deserve help.',
    chips: ['Talk to a counsellor'],
  },
  {
    keys: ['just want to talk', 'want to talk', 'talk'],
    text: "I'm here, and I'm listening. Take your time.\n\nWhat would you like to share?",
    chips: ["I'm feeling stressed", "I've been overthinking a lot", "I feel low and sad"],
  },
  {
    keys: ['overthink', 'racing thoughts', 'cant stop thinking', "can't stop thinking"],
    text: "Overthinking can be exhausting. Try this: write the thought down, then ask \"Is this in my control right now?\" If not, take 5 slow breaths and gently shift your attention.\n\nDoes it mostly happen at night or throughout the day?",
    chips: ['Mostly at night', 'Throughout the day', 'Take an anxiety screening'],
  },
  {
    keys: ['night', 'sleep', 'insomnia'],
    text: 'Night-time thoughts are common. Keep a fixed sleep time, avoid screens 30 minutes before bed and try slow breathing (inhale 4s, exhale 6s). If it continues for weeks, a professional can help.',
    chips: ['Book a counsellor', 'Take an anxiety screening'],
  },
  {
    keys: ['stress', 'stressed', 'tension', 'pressure', 'overwhelm'],
    text: "That sounds heavy, thank you for telling me. A short pause can help: breathe in for 4, hold for 4, out for 6, and repeat a few times.\n\nWhat is stressing you the most right now?",
    chips: ['Work or studies', 'Relationships', 'Everything feels too much'],
  },
  {
    keys: ['work', 'stud', 'exam', 'job', 'career'],
    text: 'Work and study pressure is very real. Break tasks into small steps, take short breaks, and do not skip rest. If it keeps building up, talking to a counsellor can really help.',
    chips: ['Book a counsellor', 'Take an anxiety screening'],
  },
  {
    keys: ['relationship', 'family', 'partner', 'friend', 'breakup'],
    text: 'Relationships can affect us deeply. Your feelings are valid. Talking it through with someone neutral, like a counsellor, can bring clarity.',
    chips: ['Book a counsellor', 'I just want to talk'],
  },
  {
    keys: ['too much', 'everything'],
    text: "I'm sorry it feels this way. You don't have to carry it alone. Let's take it one small step at a time. A screening can help you understand where you stand.",
    chips: ['Take an anxiety screening', 'Book a counsellor'],
  },
  {
    keys: ['anxiety', 'anxious', 'worry', 'panic'],
    text: `Feeling anxious is common and manageable. You can take our Anxiety Screening: ${ANXIETY}\n\nA counsellor can also guide you personally.`,
    chips: ['Book a counsellor', 'I just want to talk'],
  },
  {
    keys: ['depress', 'sad', 'low', 'hopeless', 'lonely', 'empty'],
    text: `I'm sorry you're feeling this way, you are not alone. You can take our Depression Screening: ${DEPRESSION}\n\nTalking to a mental health professional can really help.`,
    chips: ['Book a counsellor', 'I just want to talk'],
  },
  {
    keys: ['adhd'],
    text: `ADHD assessment: ${SITE}/adhd-assessment`,
    chips: MORE_CHIPS,
  },
  {
    keys: ['autism'],
    text: `Autism assessment: ${SITE}/autism-assessment`,
    chips: MORE_CHIPS,
  },
  {
    keys: ['iq', 'intelligence'],
    text: `IQ assessment: ${SITE}/iq-assessment`,
    chips: MORE_CHIPS,
  },
  {
    keys: ['personality'],
    text: `Personality assessment: ${SITE}/personality-assessment`,
    chips: MORE_CHIPS,
  },
  {
    keys: ['screening', 'test', 'minds', 'assessment'],
    text: `MINDS AI offers Anxiety and Depression screening (${SITE}/minds-ai). We also have ADHD, Autism, IQ and Personality assessments on ${SITE}`,
    chips: ['Take an anxiety screening', 'Depression screening'],
  },
  {
    keys: ['mitra', 'companion'],
    text: 'Mitra AI is our personal AI companion for thoughtful conversations and support. Open it from the Mitra AI card on this page.',
    chips: ['Book a counsellor', 'I just want to talk'],
  },
  {
    keys: ['book', 'appointment', 'counsel', 'therapist', 'psychologist', 'psychiatrist', 'doctor', 'session'],
    text: `You can find psychologists, psychiatrists and counsellors (virtual or in-clinic) at ${SITE}/portal/experts\n\nOr message us on WhatsApp: ${WHATSAPP}`,
    chips: ['Take a screening', 'I just want to talk'],
  },
  {
    keys: ['contact', 'phone', 'whatsapp', 'call', 'help', 'support'],
    text: `Reach Positive Mind Care on WhatsApp: ${WHATSAPP}\n\nOr visit ${SITE}/contact-us`,
    chips: ['Book a counsellor'],
  },
  {
    keys: ['thank', 'thanks', 'ok', 'okay'],
    text: "You're welcome. I'm here whenever you want to talk.",
    chips: START_CHIPS,
  },
  {
    keys: ['hi', 'hii', 'hiii', 'hello', 'hey', 'namaste'],
    text: "Hey, glad you reached out.\n\nWhat's been on your mind lately?",
    chips: START_CHIPS,
  },
]

const FALLBACK = {
  text: `I am here to support you with mental wellbeing, so I may not be the right help for that. Tell me how you are feeling, or choose an option below.`,
  chips: START_CHIPS,
}

function getReply(text) {
  const t = text.toLowerCase()
  const words = t.split(/[^a-z]+/)
  const hit = faqs.find((f) => f.keys.some((k) => (k.length <= 4 ? words.includes(k) : t.includes(k))))
  return hit || FALLBACK
}

function linkify(text) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-all font-semibold text-[#3b82f6] underline">
        {part}
      </a>
    ) : (
      part
    ),
  )
}

export default function ChatWidget({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm Positive AI, your wellness companion. How are you feeling today?",
      chips: [],
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function send(raw) {
    const text = raw.trim()
    if (!text || typing) return
    setMessages((m) => [...m, { role: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const r = getReply(text)
      setMessages((m) => [...m, { role: 'assistant', text: r.text, chips: r.chips }])
      setTyping(false)
    }, 700)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const last = messages[messages.length - 1]
  const chips = !typing && last.role === 'assistant' ? (messages.length === 1 ? START_CHIPS : last.chips) : []

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-end justify-center bg-[#17352d]/60 p-3 sm:items-center sm:p-5">
      <div className="flex h-[85dvh] max-h-[680px] w-full max-w-[430px] flex-col gap-4" role="dialog" aria-label="Positive AI chat" onClick={(e) => e.stopPropagation()}>
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(0,0,0,.3)]">
          <header className="flex shrink-0 items-center justify-between border-b border-[#e8eaee] px-6 py-4">
            <h2 className="m-0 flex items-center gap-2 text-[17px] font-semibold text-black">
              Positive AI <span className="text-[13px] text-[#6b7280]">⌄</span>
            </h2>
            <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full text-[26px] leading-none text-[#374151] hover:bg-[#f3f4f6]" aria-label="Close chat">
              ×
            </button>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
            {messages.map((message, index) =>
              message.role === 'user' ? (
                <div key={index} className="mb-4 flex justify-end">
                  <div className="max-w-[80%] whitespace-pre-wrap rounded-[18px] bg-[#3b82f6] px-5 py-3 text-[16px] leading-6 text-black">
                    {message.text}
                  </div>
                </div>
              ) : (
                <div key={index} className="mb-4">
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#3b82f6] text-[14px] font-semibold text-black">PA</div>
                  <p className="m-0 whitespace-pre-wrap text-[16px] leading-7 text-[#111827]">{linkify(message.text)}</p>
                </div>
              ),
            )}
            {typing && <p className="m-0 text-[15px] text-[#9ca3af]">Positive AI is typing...</p>}
            {chips.length > 0 && (
              <div className="mt-2 flex flex-col items-end gap-3">
                {chips.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-[#3b82f6] bg-white px-5 py-2.5 text-[15px] text-[#3b82f6] hover:bg-[#eff6ff]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>
        </section>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="shrink-0 rounded-full bg-[linear-gradient(90deg,#3b82f6,#ec4899,#f97316)] p-[3px]"
        >
          <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#3b82f6] text-white" aria-hidden="true">💬</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={messages.length === 1 ? 'Ask me anything...' : 'Continue conversation...'}
              className="h-10 min-w-0 flex-1 border-0 bg-transparent text-[16px] text-[#111827] outline-none placeholder:text-[#9ca3af]"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#3b82f6] text-white disabled:opacity-40"
              aria-label="Send"
            >
              ➤
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
