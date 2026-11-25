'use client'

import { useEffect, useRef, useState } from 'react'
import ChatWidget from './ChatWidget'
import { PAGE_IDS, PRODUCT_IDS, PRODUCT_NAMES, TITLES } from './siteData'

const EMAIL = 'info@positivemindcare.com'

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

// The page markup comes from the design file (built on the server from our own content);
// this component only wires up routing, the mobile menu, the contact form and the Dr Positive chat.
export default function Site({ html }) {
  const rootRef = useRef(null)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const $ = (s) => root.querySelector(s)

    function show() {
      const h = location.hash.slice(1)
      const id = PAGE_IDS.includes(h) ? h : 'home'
      root.querySelectorAll('[data-page]').forEach((e) => e.classList.toggle('show', e.dataset.page === id))
      const navId = PRODUCT_IDS.includes(id) ? 'products' : id
      root.querySelectorAll('.links a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + navId && !a.classList.contains('btn')))
      document.title = PRODUCT_NAMES[id] ? PRODUCT_NAMES[id] + ' · Positive AI' : TITLES[id] || TITLES.home
      window.scrollTo(0, 0)
      $('#links')?.classList.remove('open')
      $('#menuBtn')?.setAttribute('aria-expanded', 'false')
    }

    function onClick(e) {
      const t = e.target
      if (t.closest('[data-open-chat]')) {
        e.preventDefault()
        setChatOpen(true)
        return
      }
      const menu = t.closest('#menuBtn')
      if (menu) {
        const open = $('#links').classList.toggle('open')
        menu.setAttribute('aria-expanded', String(open))
        return
      }
      const cp = t.closest('#cp')
      if (cp && cp.dataset.text) {
        navigator.clipboard.writeText(cp.dataset.text).then(
          () => (cp.textContent = 'Copied'),
          () => (cp.textContent = 'Copy not available here'),
        )
      }
    }

    function onSubmit(e) {
      if (e.target.id !== 'cform') return
      e.preventDefault()
      const v = (id) => $('#' + id).value.trim()
      const ok = $('#ok')
      if (!v('f-name') || !/^\S+@\S+\.\S+$/.test(v('f-email')) || !v('f-msg')) {
        ok.className = 'ok show'
        ok.style.borderColor = 'var(--sun)'
        ok.textContent = 'Please add your name, a valid email and a message.'
        return
      }
      const subject = `${v('f-topic')} — ${v('f-name')}${v('f-org') ? ' (' + v('f-org') + ')' : ''}`
      const body = `${v('f-msg')}\n\n${v('f-name')}\n${v('f-email')}${v('f-org') ? '\n' + v('f-org') : ''}`
      const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      ok.className = 'ok show'
      ok.style.borderColor = ''
      ok.innerHTML = `Thank you, ${esc(v('f-name'))}. Your message is ready — <a href="${href}"><b>open it in your email app</b></a> to send, or copy it to ${EMAIL}. <button type="button" class="btn sec" id="cp" style="min-height:40px;margin-top:10px">Copy message</button>`
      $('#cp').dataset.text = `To: ${EMAIL}\nSubject: ${subject}\n\n${body}`
    }

    show()
    window.addEventListener('hashchange', show)
    root.addEventListener('click', onClick)
    root.addEventListener('submit', onSubmit)
    return () => {
      window.removeEventListener('hashchange', show)
      root.removeEventListener('click', onClick)
      root.removeEventListener('submit', onSubmit)
    }
  }, [])

  return (
    <>
      <div ref={rootRef} className="site" dangerouslySetInnerHTML={{ __html: html }} />
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  )
}
