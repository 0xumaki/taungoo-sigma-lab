export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECTOR_CODES = ["INIT", "MAN", "SYS", "VLT", "COL", "LOG", "DAT", "CAP", "ALL", "ACS", "STS"];

export async function GET() {
  const encoder = new TextEncoder();
  let tick = 0;
  let closed = false;
  let interval: ReturnType<typeof setInterval> | null = null;
  let comment: ReturnType<typeof setInterval> | null = null;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const stop = () => {
        closed = true;
        if (interval) clearInterval(interval);
        if (comment) clearInterval(comment);
      };

      const safeEnqueue = (chunk: Uint8Array) => {
        if (closed) return;
        try {
          controller.enqueue(chunk);
        } catch {
          stop();
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

      // send initial event immediately
      sendEvent();

      // then send every 2 seconds
      interval = setInterval(sendEvent, 2000);

      // keep the stream alive with a comment every 15s
      comment = setInterval(() => {
        safeEnqueue(encoder.encode(": keepalive\n\n"));
      }, 15000);

      // cleanup on cancel
      return () => {
        stop();
        try {
          controller.close();
        } catch {
          // already closed
        }
      };
    },
    cancel() {
      closed = true;
      if (interval) clearInterval(interval);
      if (comment) clearInterval(comment);
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
