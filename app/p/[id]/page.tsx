'use client'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import WordCloudView from '@/components/WordCloudView'

export default function Presenter({ params }: { params: { id: string } }) {
  const { id } = params
  const [question, setQuestion] = useState<string>('')
  const [texts, setTexts] = useState<string[]>([])

  useEffect(() => {
    (async () => {
      const q = query(collection(db, 'sessions'), where('id', '==', id))
      const snap = await getDocs(q)
      const doc = snap.docs[0]
      setQuestion((doc?.data() as any)?.question ?? '')
    })()

    const respCol = collection(db, 'sessions', id, 'responses')
    const unsub = onSnapshot(respCol, (snap) => {
      setTexts(snap.docs.map(d => (d.data() as any).text as string))
    })
    return () => unsub()
  }, [id])

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">登壇者ビュー</h1>
      <div className="text-2xl">{question}</div>
      <WordCloudView texts={texts} />
      <div className="text-sm text-gray-500">回答数: {texts.length}</div>
    </main>
  )
}
