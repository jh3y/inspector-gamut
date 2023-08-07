import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inspector Gamut',
  description: 'An AI-powered proof of concept for generating CSS color palettes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>Inspector Gamut</h1>
        </header>
        {children}
      </body>
    </html>
  )
}
