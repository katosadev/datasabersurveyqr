'use client'
import { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ensureAnonAuth } from '@/lib/firebase'
import { newSessionId } from '@/utils/id'
import QR from '@/components/QR'

export default function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [question, setQuestion] = useState('好きな食べ物は？')

  useEffect(() => { ensureAnonAuth() }, [])

  async function createSession() {
    const id = newSessionId()
    await addDoc(collection(db, 'sessions'), {
      id, question, createdAt: serverTimestamp(), owner: null,
    })
    setSessionId(id)
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL || ''
  const audienceURL = sessionId ? `${site}/s/${sessionId}` : ''
  const presenterURL = sessionId ? `${site}/p/${sessionId}` : ''

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Realtime Survey WordCloud</h1>
      <div className="space-y-2">
        <label className="block text-sm font-medium">質問</label>
        <input className="w-full p-3 rounded border" value={question} onChange={e => setQuestion(e.target.value)} />
      </div>
      <button onClick={createSession} className="px-4 py-2 bg-black text-white rounded">セッションを作成</button>
      {sessionId && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">共有用 QR</h2>
          <QR url={audienceURL} />
          <div className="text-sm">
            登壇者ビュー: <a className="underline" href={presenterURL}>{presenterURL}</a>
          </div>
        </div>
      )}
    </main>
  )
}
