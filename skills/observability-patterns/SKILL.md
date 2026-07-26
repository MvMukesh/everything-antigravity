---
name: observability-patterns
description: Production monitoring, distributed tracing, and structured logging patterns for hyperscale backend and ML systems. Covers OpenTelemetry, Prometheus, Grafana, ELK, and SLO/SLI definition.
license: MIT
metadata:
  origin: EAG
---

# Observability Patterns

Use this skill when architecting or debugging distributed systems, microservices, or complex AI pipelines. It enforces the implementation of the "Three Pillars of Observability": Tracing, Metrics, and Logging.

## 1. Structured Logging

Never use plain text logs in production (e.g., `print("User logged in")`). All logs must be structured JSON to allow aggregation tools (Elasticsearch, Datadog, Splunk) to query them effectively.

```json
{
  "timestamp": "2026-07-26T14:00:00Z",
  "level": "INFO",
  "service": "inference-gateway",
  "trace_id": "8a3c9b2f11e9...",
  "user_id": "usr_99823",
  "event": "model_inference_completed",
  "duration_ms": 142.5,
  "model_version": "v2.1.4-lora"
}
```

## 2. Distributed Tracing (OpenTelemetry)

When a request spans multiple microservices (e.g., Gateway -> Embedder -> VectorDB -> LLM -> Client), you must propagate a `trace_id` through every HTTP header or gRPC metadata context.
- Use **OpenTelemetry** as the standard instrumentation library.
- Export traces to Jaeger, Zipkin, or Datadog APM.
- Always trace the exact latency of external database queries and AI model generation loops.

## 3. Metrics & Prometheus Scraping

Expose a `/metrics` endpoint on every service for Prometheus to scrape. Track:
- **RED Metrics**: Rate (requests/sec), Errors (5xx/4xx), Duration (latency p50, p90, p99).
- **USE Metrics**: Utilization (CPU/GPU %), Saturation (Queue depth), Errors.

## 4. Defining SLOs and SLIs

Do not set alerts on CPU usage (e.g., "Alert if CPU > 80%"). Set alerts on **Service Level Objectives (SLOs)**.
- **SLI (Service Level Indicator):** "Percentage of inference requests returning a 200 OK within 500ms."
- **SLO (Objective):** "99.9% of requests over a rolling 30-day window."
- **Alert:** Trigger a PagerDuty alert only if the error budget burn rate exceeds 5% in 1 hour.

## Implementation Checklist
- [ ] All logs are emitted as JSON.
- [ ] OpenTelemetry auto-instrumentation is enabled for the web framework (FastAPI, Express, Spring Boot).
- [ ] `trace_id` is automatically injected into all log statements via middleware.
- [ ] No PII (emails, passwords, API keys) is ever logged or traced.
