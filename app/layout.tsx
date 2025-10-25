import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Realtime Survey WordCloud',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}
