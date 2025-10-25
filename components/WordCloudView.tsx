'use client';
import { useMemo } from 'react';
import { toWordCounts } from '@/lib/text';
import WordCloud from 'react-d3-cloud';

export default function WordCloudView({ texts }: { texts: string[] }) {
  const words = useMemo(
    () => toWordCounts(texts).map(w => ({ text: w.text, value: w.value })),
    [texts]
  );

  return (
    <div style={{ height: 480, width: '100%' }}>
      <WordCloud
        data={words}
        width={960}
        height={480}
        font="sans-serif"
        fontSize={(word: any) => 16 + Math.sqrt(word.value) * 10}
        rotate={0}
        padding={2}
      />
    </div>
  );
}
