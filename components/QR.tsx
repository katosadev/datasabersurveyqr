'use client'
import { QRCodeCanvas } from 'qrcode.react'

export default function QR({ url }: { url: string }) {
  return (
    <div className="p-4 bg-white inline-block rounded-xl shadow">
      <QRCodeCanvas value={url} size={220} includeMargin={true} />
      <div className="mt-2 text-center text-sm">{url}</div>
    </div>
  )
}
