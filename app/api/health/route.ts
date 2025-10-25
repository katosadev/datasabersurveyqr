// app/api/health/route.ts
export const runtime = 'edge'; // 任意。NodeでもOKなら削っても可。

export async function GET() {
  return new Response('ok', {
    status: 200,
    headers: { 'content-type': 'text/plain' },
  });
}
