export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECTOR_CODES = ["INIT", "MAN", "SYS", "VLT", "COL", "LOG", "DAT", "CAP", "ALL", "ACS", "STS"];

export async function GET() {
  const encoder = new TextEncoder();
  let tick = 0;
  let closed = false;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const safeEnqueue = (chunk: Uint8Array) => {
        if (closed) return;
        try {
          controller.enqueue(chunk);
        } catch {
          closed = true;
        }
      };

      const sendEvent = () => {
        if (closed) return;
        tick++;
        const data = {
          tick,
          ts: new Date().toISOString(),
          sector: SECTOR_CODES[tick % SECTOR_CODES.length],
          metrics: {
            neural: 40 + Math.sin(tick / 3) * 18 + Math.random() * 10,
            infer: 30 + Math.cos(tick / 4) * 14 + Math.random() * 8,
            ops: 184320 + tick * 87,
            packets: 8142233 + tick * 612,
          },
          status: tick % 40 < 3 ? "CALIBRATING" : "ONLINE",
        };
        const msg = `data: ${JSON.stringify(data)}\n\n`;
        safeEnqueue(encoder.encode(msg));
      };

      // send initial event
      sendEvent();

      // send every 2 seconds
      const interval = setInterval(() => {
        if (!closed) sendEvent();
      }, 2000);

      // keepalive every 15s
      const keepalive = setInterval(() => {
        safeEnqueue(encoder.encode(": keepalive\n\n"));
      }, 15000);

      // cleanup
      return () => {
        closed = true;
        clearInterval(interval);
        clearInterval(keepalive);
        try { controller.close(); } catch {}
      };
    },
    cancel() {
      closed = true;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
