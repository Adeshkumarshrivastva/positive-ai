'use client'

import { useState } from 'react'
import ChatWidget from './ChatWidget'

const cards = [
  {
    name: 'Minds AI',
    label: 'Mental wellness screening',
    description: 'Check your mental wellbeing with a quick online screening.',
    icon: 'brain',
    color: 'border-[#dfe8e1] bg-[#eef5ef]',
    iconColor: 'bg-[#dceadf] text-[#58765e]',
    links: [
      { label: 'Anxiety Screening', href: 'https://forestgreen-scorpion-490773.hostingersite.com/anxiety-screening/' },
      { label: 'Depression Screening', href: 'https://forestgreen-scorpion-490773.hostingersite.com/depression-screening/' },
    ],
  },
  {
    name: 'Mitra AI',
    label: 'Personal AI companion',
    description: 'Connect with Mitra for thoughtful conversations and support.',
    icon: 'chat',
    color: 'border-[#efdeda] bg-[#faf1ed]',
    iconColor: 'bg-[#f3ddd5] text-[#b85f49]',
    links: [
      { label: 'Open Mitra AI', href: 'https://mitra.timbleglance.com/login?next=/' },
    ],
  },
  {
    name: 'Positive AI',
    label: 'Your AI assistant',
    description: 'Ask questions and get calm, helpful guidance.',
    icon: 'spark',
    color: 'border-[#dfdeee] bg-[#f1f0f8]',
    iconColor: 'bg-[#dddaf0] text-[#69639a]',
  },
]

function Icon({ type, className = '' }) {
  if (type === 'brain') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M24 9a8 8 0 0 0-8 8v14a8 8 0 0 0 16 0V17a8 8 0 0 0-8-8Z" />
        <path d="M16 21c-4 0-7 3-7 7m23-7c4 0 7 3 7 7M24 9v30" />
      </svg>
    )
  }
  if (type === 'chat') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9 12h30v21H22l-10 7v-7H9V12Z" />
        <path d="M17 21h14M17 26h9" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M24 7l3.7 10.3L38 21l-10.3 3.7L24 35l-3.7-10.3L10 21l10.3-3.7L24 7Z" />
      <path d="M37 32l1.5 4.5L43 38l-4.5 1.5L37 44l-1.5-4.5L31 38l4.5-1.5L37 32Z" />
    </svg>
  )
}

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#fbfcf8]">
      <header className="mx-auto flex h-[82px] max-w-[1320px] items-center justify-center px-5 md:px-8">
        <a href="/" className="inline-flex items-center gap-2.5 no-underline" aria-label="Positive AI home">
          <span className="relative h-8 w-8">
            <span className="absolute left-0 top-1 h-5 w-5 rounded-full border-[3px] border-[#ec765b]" />
            <span className="absolute right-0 top-1 h-5 w-5 rounded-full border-[3px] border-[#17352d]" />
          </span>
          <span className="font-[Georgia] text-[24px] font-bold tracking-[-1px] text-[#17352d]">
            Positive<span className="text-[#ec765b]">AI</span>
          </span>
        </a>
      </header>

      <section className="mx-auto max-w-[1320px] px-5 pb-14 pt-8 md:px-8 md:pb-20">
        <div className="mb-8">
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[2px] text-[#7b867f]">Explore our AI services</p>
          <h1 className="m-0 font-[Georgia] text-[42px] font-medium leading-[1.05] tracking-[-2px] text-[#17352d] md:text-[58px]">
            Support for a <em className="font-normal text-[#ec765b]">healthier mind.</em>
          </h1>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.name} className={`flex flex-col rounded-[22px] border p-6 ${card.color}`}>
              <div className="mb-8 flex items-start justify-between">
                <div className={`grid h-[68px] w-[68px] place-items-center rounded-full ${card.iconColor}`}>
                  <Icon type={card.icon} className="h-9 w-9" />
                </div>
              </div>

              <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#78847d]">{card.label}</p>
              <h2 className="m-0 font-[Georgia] text-[32px] font-medium text-[#17352d]">{card.name}</h2>
              <p className="mt-3 text-[14px] leading-6 text-[#66756e]">{card.description}</p>

              {card.links ? (
                <div className="mt-7 grid gap-2.5">
                  {card.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-between rounded-full border border-[#17352d]/10 bg-white/75 px-4 text-[12px] font-extrabold text-[#17352d] no-underline transition hover:border-[#17352d]/30 hover:bg-white"
                    >
                      {link.label}<span>↗</span>
                    </a>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setChatOpen(true)}
                  className="mt-7 flex h-11 items-center justify-between rounded-full bg-[#69639a] px-4 text-[12px] font-extrabold text-white"
                >
                  Start chat<span>↗</span>
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#17352d]/10 bg-[#f3f5ee]">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
          <div>
            <a href="/" className="inline-flex items-center gap-2.5 no-underline" aria-label="Positive AI home">
              <span className="relative h-8 w-8">
                <span className="absolute left-0 top-1 h-5 w-5 rounded-full border-[3px] border-[#ec765b]" />
                <span className="absolute right-0 top-1 h-5 w-5 rounded-full border-[3px] border-[#17352d]" />
              </span>
              <span className="font-[Georgia] text-[22px] font-bold tracking-[-1px] text-[#17352d]">
                Positive<span className="text-[#ec765b]">AI</span>
              </span>
            </a>
            <p className="mt-4 max-w-[340px] text-[13px] leading-6 text-[#66756e]">
              Human-centred AI for thinking, companionship and wellbeing. Calm, helpful support for a healthier mind.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-extrabold uppercase tracking-[1.5px] text-[#7b867f]">Explore</h3>
            <ul className="m-0 grid list-none gap-2.5 p-0 text-[13px]">
              <li><a className="text-[#17352d] no-underline hover:text-[#ec765b]" href="https://forestgreen-scorpion-490773.hostingersite.com/anxiety-screening/" target="_blank" rel="noopener noreferrer">Anxiety Screening</a></li>
              <li><a className="text-[#17352d] no-underline hover:text-[#ec765b]" href="https://forestgreen-scorpion-490773.hostingersite.com/depression-screening/" target="_blank" rel="noopener noreferrer">Depression Screening</a></li>
              <li><a className="text-[#17352d] no-underline hover:text-[#ec765b]" href="https://mitra.timbleglance.com/login?next=/" target="_blank" rel="noopener noreferrer">Mitra AI</a></li>
              <li><a className="text-[#17352d] no-underline hover:text-[#ec765b]" href="https://positivemindcare.com/portal/experts" target="_blank" rel="noopener noreferrer">Book a Counsellor</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-extrabold uppercase tracking-[1.5px] text-[#7b867f]">Company</h3>
            <ul className="m-0 grid list-none gap-2.5 p-0 text-[13px]">
              <li><a className="text-[#17352d] no-underline hover:text-[#ec765b]" href="https://positivemindcare.com/about-us" target="_blank" rel="noopener noreferrer">About Us</a></li>
              <li><a className="text-[#17352d] no-underline hover:text-[#ec765b]" href="https://positivemindcare.com/contact-us" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
              <li><a className="text-[#17352d] no-underline hover:text-[#ec765b]" href="https://positivemindcare.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a className="text-[#17352d] no-underline hover:text-[#ec765b]" href="https://positivemindcare.com/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#17352d]/10">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-5 py-5 text-[12px] text-[#78847d] md:flex-row md:items-center md:justify-between md:px-8">
            <p className="m-0">© {new Date().getFullYear()} Positive AI Innovation Private Limited. All rights reserved.</p>
            <p className="m-0">This is a general wellness tool, not a medical diagnosis.</p>
          </div>
        </div>
      </footer>

      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
    </main>
  )
}
