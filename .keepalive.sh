#!/bin/bash
cd /home/z/my-project
while true; do
  ALIVE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null)
  if [ "$ALIVE" != "200" ]; then
    pkill -f "next-server" 2>/dev/null
    sleep 3
    rm -rf .next/cache 2>/dev/null
    NODE_OPTIONS="--max-old-space-size=768" bun run dev >> dev.log 2>&1
  fi
  sleep 15
done
