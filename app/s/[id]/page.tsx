'use client';
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db, ensureAnonAuth } from '../../../lib/firebase';

export default function Audience({ params }: { params: { id: string } }) {
  const { id } = params;
  const [question, setQuestion] = useState<string>('');
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    ensureAnonAuth();
    (async () => {
      const snap = await getDoc(doc(db, 'sessions', id));
      setQuestion((snap.data() as any)?.question ?? '');
    })();
  }, [id]);

  async function submit() {
    const t = text.trim();
    if (!t) return;
    await addDoc(collection(db, 'sessions', id, 'responses'), {
      text: t,
      createdAt: new Date(),
    });
    setSent(true);
  }

  if (sent) return (
    <main className="max-w-xl mx-auto p-6 space-y-4 text-center">
      <div className="text-sm px-2 py-1 inline-block rounded bg-black text-white">回答者用</div>
      <div className="text-xl">回答ありがとうございました！</div>
    </main>
  );

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <div className="text-sm px-2 py-1 inline-block rounded bg-black text-white">回答者用</div>
      <div className="text-lg">セッションID: {id}</div>
      <div className="text-2xl font-semibold">{question}</div>
      <textarea
        className="w-full h-32 p-3 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="例：寿司、ラーメン、焼き鳥..."
      />
      <button onClick={submit} className="px-4 py-2 bg-black text-white rounded w-full">送信</button>
    </main>
  );
}
