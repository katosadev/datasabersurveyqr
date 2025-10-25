import TinySegmenter from 'tiny-segmenter'

const segmenter = new (TinySegmenter as any)()

export function normalizeText(s: string) {
  return s
    .replace(/[ 　]+/g, ' ')
    .replace(/[
	]+/g, ' ')
    .trim()
}

const STOPWORDS_JA = new Set([
  'の','に','は','を','た','が','で','て','と','し','れ','さ','ある','いる','も','する','から','な','こと','として','い','や','など','よう','それ','これ','あれ'
])

export function tokenizeJa(text: string) {
  const tokens = segmenter.segment(text) as string[]
  return tokens
    .map(t => t.trim())
    .filter(t => t && !STOPWORDS_JA.has(t) && /\p{Letter}/u.test(t))
}

export function toWordCounts(texts: string[]) {
  const counts = new Map<string, number>()
  for (const t of texts) {
    const tokens = tokenizeJa(normalizeText(t))
    for (const w of tokens) counts.set(w, (counts.get(w) ?? 0) + 1)
  }
  return Array.from(counts.entries()).map(([text, value]) => ({ text, value }))
}
