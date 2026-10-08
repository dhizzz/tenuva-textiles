import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Mock endpoint: validates the shape and returns 200. Nothing is stored or sent. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("email" in body) || !("type" in body)) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
