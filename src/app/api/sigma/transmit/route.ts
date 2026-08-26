import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const identity = String(body?.identity ?? "").slice(0, 120);
    const channel = String(body?.channel ?? "OTHER").slice(0, 24);
    const message = String(body?.message ?? "").slice(0, 4000);

    if (!identity || !message) {
      return NextResponse.json(
        { ok: false, error: "identity + message required" },
        { status: 400 }
      );
    }

    // Log to server console (the lab's inbox)
    const ref = `TSL-${Date.now().toString(36).toUpperCase()}`;
    console.log(
      `[SIGMA·TRANSMIT] ref=${ref} channel=${channel} from=${identity} bytes=${message.length}`
    );

    return NextResponse.json({
      ok: true,
      ref,
      received: new Date().toISOString(),
      channel,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "invalid transmission" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    channel: "SECURE",
    status: "NOMINAL",
    note: "POST identity + channel + message to transmit.",
  });
}
