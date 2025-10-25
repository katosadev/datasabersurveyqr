'use client';
import { useEffect, useMemo, useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, ensureAnonAuth } from '../lib/firebase';
import QR from '../components/QR';
import { newSessionId } from '../utils/id';

export default function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [question, setQuestion] = useState('好きな食べ物は？');

  useEffect(() => { ensureAnonAuth(); }, []);

  async function createSession() {
    const id = newSessionId();
    await setDoc(doc(db, 'sessions', id), {
      id,
      question,
      createdAt: serverTimestamp(),
      owner: null,
    });
    setSessionId(id);
  }

  const baseOrigin = useMemo(() => {
    if (typeof window !== 'undefined') return window.location.origin;
    return process.env.NEXT_PUBLIC_SITE_URL || '';
  }, []);

  const audienceURL = sessionId ? new URL(`/s/${sessionId}`, baseOrigin).toString() : '';
  const presenterURL = sessionId ? new URL(`/p/${sessionId}`, baseOrigin).toString() : '';

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="text-sm px-2 py-1 inline-block rounded bg-black text-white">登壇者トップ</div>
      <h1 className="text-2xl font-bold">Realtime Survey WordCloud</h1>

      <div className="space-y-2">
        <label className="block text-sm font-medium">質問</label>
        <input
          className="w-full p-3 rounded border"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      <button onClick={createSession} className="px-4 py-2 bg-black text-white rounded">セッションを作成</button>

      {sessionId && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">共有用 QR（回答者用）</h2>
          <QR url={audienceURL} />
          <div className="text-sm space-y-1">
            <div>回答者用URL: <a className="underline" href={audienceURL}>{audienceURL}</a></div>
            <div>登壇者用URL: <a className="underline" href={presenterURL}>{presenterURL}</a></div>
          </div>
        </div>
      )}
    </main>
  );
}
