import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({
      error: "Variables de entorno no configuradas",
      url: url ? "✓ presente" : "✗ falta",
      key: key ? "✓ presente" : "✗ falta",
    });
  }

  try {
    const res = await fetch(`${url}/auth/v1/settings`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });

    const data = await res.json();

    return NextResponse.json({
      status: res.status,
      ok: res.ok,
      url: url.substring(0, 30) + "...",
      key_prefix: key.substring(0, 20) + "...",
      supabase_response: data,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) });
  }
}
