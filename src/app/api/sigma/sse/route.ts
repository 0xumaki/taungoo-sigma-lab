export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECTOR_CODES = ["INIT", "MAN", "SYS", "VLT", "COL", "LOG", "DAT", "CAP", "ALL", "ACS", "STS"];

export async function GET() {
  const encoder = new TextEncoder();
  let tick = 0;

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = () => {
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
        controller.enqueue(encoder.encode(msg));
      };

      // send initial event immediately
      sendEvent();

      // then send every 2 seconds
      const interval = setInterval(sendEvent, 2000);

      // keep the stream alive with a comment every 15s
      const comment = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": keepalive\n\n"));
        } catch {
          // stream closed
        }
      }, 15000);

      // cleanup on cancel
      return () => {
        clearInterval(interval);
        clearInterval(comment);
        controller.close();
      };
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
