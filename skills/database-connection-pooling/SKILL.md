---
name: database-connection-pooling
description: Mandates strict connection pooling architectures (PgBouncer/Prisma Accelerate) to prevent connection exhaustion during serverless hyperscale spikes.
license: MIT
metadata:
  origin: EAG
---

# Database Connection Pooling

Use this skill when architecting backend databases and vector databases (PostgreSQL, pgvector, MySQL) accessed by highly concurrent or serverless compute layers (AWS Lambda, Vercel Edge, Cloudflare Workers).

## 1. The Connection Exhaustion Threat

PostgreSQL handles connections as heavy OS processes. A standard managed database maxes out at ~500 concurrent connections. If 10,000 serverless functions spin up simultaneously, they will attempt to open 10,000 TCP connections, instantly crashing the database with a "FATAL: sorry, too many clients already" error.

## 2. Mandatory Pooling Infrastructure

- **Serverless RAG**: Serverless functions **MUST NEVER** connect directly to the database.
- **PgBouncer**: You must deploy a PgBouncer instance (Transaction Mode) in front of the database. All clients connect to PgBouncer, which holds a small pool of actual database connections open and multiplexes the queries.
- **Managed Proxies**: Alternatively, use managed connection pools like Prisma Accelerate, Supabase Connection Pooling, or AWS RDS Proxy.

## 3. Configuration Rules

- **Pool Size**: The backend pool size (connections to the DB) should be `(Num_Cores * 2) + Effective_Spindle_Count`.
- **Client Pool Size**: The frontend pool size (allowed client connections to the proxy) can be 10,000+.
- **Timeout**: Enforce strict query timeouts (e.g., `statement_timeout = 5000ms`) to prevent poorly optimized vector similarity searches from locking the pool.
