#!/bin/bash
# Keep-alive dev server for Taungoo Sigma Lab
# Uses a cron-like loop to check and restart the server every 30 seconds
# Usage: nohup bash .dev-keepalive.sh &

cd /home/z/my-project

LOG="/home/z/my-project/dev.log"
PIDFILE="/home/z/my-project/.dev-server.pid"

while true; do
  # Check if server is alive
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null | grep -q "200"; then
    # Server is alive, just wait
    sleep 30
    continue
  fi

  # Server is dead — restart it
  echo "[$(date '+%H:%M:%S')] ▮ Server dead — restarting..." >> "$LOG"

  # Kill any zombie processes
  pkill -f "next dev" 2>/dev/null
  pkill -f "bun run dev" 2>/dev/null
  sleep 2

  # Clear cache to free memory
  rm -rf .next/cache 2>/dev/null

  # Start fresh with memory limit
  NODE_OPTIONS="--max-old-space-size=768" setsid bash -c 'exec bun run dev' >> "$LOG" 2>&1 &
  echo $! > "$PIDFILE"
  echo "[$(date '+%H:%M:%S')] ▸ Started PID: $(cat $PIDFILE)" >> "$LOG"

  # Wait for it to be ready
  for i in $(seq 1 30); do
    sleep 1
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null | grep -q "200"; then
      echo "[$(date '+%H:%M:%S')] ▸ Server ready" >> "$LOG"
      break
    fi
  done

  sleep 10
done
