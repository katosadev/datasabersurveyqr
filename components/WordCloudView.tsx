'use client'
import dynamic from 'next/dynamic'
import { toWordCounts } from '@/lib/text'

const ReactWordcloud = dynamic(() => import('react-wordcloud'), { ssr: false })

export default function WordCloudView({ texts }: { texts: string[] }) {
  const words = toWordCounts(texts)
  return (
    <div style={{ height: 480, width: '100%' }}>
      <ReactWordcloud words={words} options={{ rotations: 2, rotationAngles: [0, 0] }} />
    </div>
  )
}
