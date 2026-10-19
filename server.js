/**
 * server.js — startup file for SPanel Node.js Manager (Passenger / LiteSpeed)
 * ===========================================================================
 * SPanel's Node.js Manager launches your app with Passenger, which expects a
 * single JS entry point that opens an HTTP server on the port it hands you in
 * process.env.PORT. Next.js ships no such file, so this is it.
 *
 * WHERE TO PUT IT
 *   Repository root — the same folder as package.json.
 *
 * SPANEL NODE.JS MANAGER FIELDS
 *   Application root          : the folder containing this file + package.json
 *   Application URL           : your domain
 *   Application startup file  : server.js
 *   Node.js version           : 20 or 22   (NOT 18 — Next 16 needs >= 20.9)
 *
 * BEFORE FIRST START
 *   Run NPM Install, then run the "build" script (next build).
 *   This file only *serves* an existing .next/ build — it does not create one.
 *
 * NOTE ON package.json
 *   Its "start" script points at `bun .next/standalone/server.js`, but the repo
 *   never sets output:"standalone", so that file is never produced. Ignore that
 *   script; Passenger calls this file directly. If your manager insists on
 *   `npm start`, change it to:  "start": "node server.js"
 */

const { createServer } = require("http");
const next = require("next");

// Passenger passes the listen target here. It is normally a TCP port, but some
// Passenger builds pass a unix socket path instead — handle both.
const listenTarget = process.env.PORT || "3000";
const isPort = /^\d+$/.test(listenTarget);
const hostname = process.env.HOSTNAME || "127.0.0.1";

// Production unless explicitly told otherwise. Running `dev: true` here would
// recompile on every request and is far too slow for a live site.
const dev = process.env.NODE_ENV === "development";

const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        await handle(req, res);
      } catch (err) {
        // Never let one bad request take down the Passenger worker.
        console.error("[server] request failed:", req.method, req.url, err);
        // Next starts sending the response inside handle(), so headers may
        // already be flushed — writing them again would throw.
        if (!res.headersSent) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end("Internal Server Error");
        } else {
          res.destroy();
        }
      }
    });

    const onListening = () =>
      console.log(
        `[server] ready on ${isPort ? `http://${hostname}:${listenTarget}` : listenTarget} (dev=${dev})`
      );

    if (isPort) {
      server.listen(parseInt(listenTarget, 10), hostname, onListening);
    } else {
      server.listen(listenTarget, onListening);
    }

    // Passenger sends SIGTERM when it recycles a worker; exit cleanly so the
    // restart is not counted as a crash.
    const shutdown = (signal) => {
      console.log(`[server] ${signal} received, closing`);
      server.close(() => process.exit(0));
      setTimeout(() => process.exit(0), 5000).unref();
    };
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  })
  .catch((err) => {
    console.error("[server] failed to start:", err);
    process.exit(1);
  });
