import './globals.css'

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#082636' }

export const metadata = {
  title: 'Positive AI Innovations',
  description:
    'Positive AI Innovations Private Limited builds empathetic AI agents for mental wellbeing: MINDS.AI, MITRA.AI, Dr Positive and the Positive Mind Care portal and app.',
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'Positive AI Innovations',
    description: 'Empathetic, responsible AI agents for mental wellbeing. Empowering minds, transforming lives with AI.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
