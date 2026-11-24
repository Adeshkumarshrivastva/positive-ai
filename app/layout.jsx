import './globals.css'

export const metadata = {
  title: 'Positive AI - AI for Human Potential',
  description: 'Positive AI Innovation Private Limited - human-centred AI for thinking, companionship, and wellbeing.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
