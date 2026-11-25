import fs from 'node:fs'
import path from 'node:path'
import Site from './Site'
import { buildHtml } from './siteData'

// Markup of the site design (header, pages, footer) + generated sections, built at request/build time.
const html = buildHtml(fs.readFileSync(path.join(process.cwd(), 'app', 'site-static.html'), 'utf8'))

export default function Home() {
  return <Site html={html} />
}
