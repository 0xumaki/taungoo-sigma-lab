#!/bin/bash
# Keep-alive dev server script for Taungoo Sigma Lab
# This script restarts the Next.js dev server if it crashes (OOM-kill, etc.)
# Usage: bash .dev-server.sh

cd /home/z/my-project

# Kill any existing dev servers
pkill -f "next dev" 2>/dev/null
pkill -f "bun run dev" 2>/dev/null
sleep 2

# Clear old cache to reduce memory
rm -rf .next/cache 2>/dev/null

echo "▮ TAUNGOO SIGMA LAB — DEV SERVER KEEP-ALIVE"
echo "▮ Memory limit: 768MB per restart cycle"
echo "▮ Server will auto-restart if OOM-killed"
echo "▮ Press Ctrl+C to stop"
echo ""

# Auto-restart loop
while true; do
  echo "[$(date '+%H:%M:%S')] ▸ Starting dev server..."
  
  # Start with memory limit to prevent OOM-kill of entire system
  NODE_OPTIONS="--max-old-space-size=768" bun run dev > dev.log 2>&1 &
  PID=$!
  echo "[$(date '+%H:%M:%S')] ▸ Server PID: $PID"
  
  # Wait for server to be ready (max 30s)
  for i in $(seq 1 30); do
    sleep 1
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null | grep -q "200"; then
      echo "[$(date '+%H:%M:%S')] ▸ Server ready at http://localhost:3000"
      break
    fi
  done
  
  # Wait for process to exit (OOM-kill, crash, etc.)
  wait $PID 2>/dev/null
  EXIT_CODE=$?
  echo "[$(date '+%H:%M:%S')] ▮ Server exited (code: $EXIT_CODE) — restarting in 3s..."
  
  # Clear cache to free memory
  rm -rf .next/cache 2>/dev/null
  sleep 3
done
