export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const startedAt = Date.now();

export async function GET() {
  const mem = process.memoryUsage();
  const uptimeSec = (Date.now() - startedAt) / 1000;

  // Prometheus exposition format
  const metrics = `# HELP sigma_uptime_seconds Server uptime in seconds
# TYPE sigma_uptime_seconds counter
sigma_uptime_seconds ${uptimeSec}

# HELP sigma_sectors_total Total number of sectors
# TYPE sigma_sectors_total gauge
sigma_sectors_total 11

# HELP sigma_projects_total Total portfolio projects
# TYPE sigma_projects_total gauge
sigma_projects_total 11

# HELP sigma_operators_total Total operators
# TYPE sigma_operators_total gauge
sigma_operators_total 8

# HELP sigma_memory_rss_bytes Resident Set Size in bytes
# TYPE sigma_memory_rss_bytes gauge
sigma_memory_rss_bytes ${mem.rss}

# HELP sigma_memory_heap_used_bytes Heap used in bytes
# TYPE sigma_memory_heap_used_bytes gauge
sigma_memory_heap_used_bytes ${mem.heapUsed}

# HELP sigma_memory_heap_total_bytes Heap total in bytes
# TYPE sigma_memory_heap_total_bytes gauge
sigma_memory_heap_total_bytes ${mem.heapTotal}

# HELP sigma_memory_external_bytes External memory in bytes
# TYPE sigma_memory_external_bytes gauge
sigma_memory_external_bytes ${mem.external}

# HELP sigma_status Health status (1=operational, 0=degraded)
# TYPE sigma_status gauge
sigma_status 1

# HELP sigma_build_info Build information
# TYPE sigma_build_info gauge
sigma_build_info{version="2.7.SIGMA",codename="TAUNGOO",nextjs="16.1.1",react="19.0.0",node="${process.version}"} 1

# HELP sigma_api_requests_total API request counter (simulated)
# TYPE sigma_api_requests_total counter
sigma_api_requests_total{endpoint="telemetry"} ${Math.floor(uptimeSec * 0.83)}
sigma_api_requests_total{endpoint="transmit"} ${Math.floor(uptimeSec * 0.12)}
sigma_api_requests_total{endpoint="health"} ${Math.floor(uptimeSec * 0.05)}
sigma_api_requests_total{endpoint="version"} ${Math.floor(uptimeSec * 0.02)}
`;

  return new Response(metrics, {
    headers: {
      "Content-Type": "text/plain; version=0.0.4; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
