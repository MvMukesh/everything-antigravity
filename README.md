<div align="center">

# 🚀 Everything Antigravity (EAG) v3.0.0
### The "God-Level" AI Engineering OS

[![Version](https://img.shields.io/badge/version-3.0.0-blue?style=for-the-badge)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-22C55E?style=for-the-badge)](LICENSE)
[![CI Status](https://img.shields.io/github/actions/workflow/status/MvMukesh/everything-antigravity/ci.yml?branch=main&label=CI&style=for-the-badge)](https://github.com/MvMukesh/everything-antigravity/actions)

> **The ultimate agent harness, performance optimization system, and subagent fleet —
> natively engineered for Google Antigravity.**

</div>

---

## What Is EAG v3.0.0?

**Everything Antigravity (EAG)** has evolved from a simple plugin into a full **God-Level AI Engineering Operating System**. It supercharges your Antigravity AI assistant to not just write code, but architect, scale, and orchestrate hyperscale infrastructure.

- 🤖 **27 Specialized Subagents** (Tier: Pro & Flash) handling everything from UX Design to Bare-Metal Network Architecture.
- 📚 **24 Native Skill Packs** covering Hyperscale Serving (vLLM), Semantic Cache Poisoning Defense, WebGPU Edge Compute, and more.
- 🛡️ **Hyperscale Armor Patch**: Built-in `workflow-circuit-breaker` for infinite loop defense and `memory-compressor` for continuous LLM context pruning.
- 🔁 **Multi-Agent Orchestration**: Featuring the `chief-of-staff` agent to manage the fleet automatically.
- 🛠️ **CLI Dashboard**: Local visualization and health diagnostics (`eag doctor`).

---

## The Fleet (27 Agents)

Here is a subset of our Tier: Pro specialized agents:

| Subagent | Role |
|---|---|
| `chief-of-staff` | **Master Orchestrator.** Manages other agents, assigns tasks, tracks Jira-style backlogs. |
| `performance-optimizer` | Scours code for O(N^2) bottlenecks; writes custom C++/Rust/CUDA kernels. |
| `workflow-circuit-breaker` | **Security.** Halts infinite agent loops and prevents API token burnout. |
| `memory-compressor` | Continuously dense-packs context windows to prevent "Lost in the Middle" hallucinations. |
| `agent-evaluator` | **LLM-as-a-Judge.** QA tests the output of other agents before execution. |
| `streaming-data-engineer` | Builds Apache Kafka, Flink, and real-time event streaming pipelines. |
| `edge-ai-specialist` | Offloads inference to user browsers via WebGPU, ONNX Web, and CoreML. |
| `network-architect` | Designs bare-metal GPU clusters, VPC peering, and InfiniBand networking. |
| `silent-failure-hunter` | Injects OpenTelemetry and hunts swallowed exceptions in production. |
| `security-auditor` | Secret scanning, OWASP Top 10 prevention, and input sanitization. |

---

## Hyperscale Skill Architecture (24 Skills)

EAG is loaded with Enterprise-grade AI skills:
- **`hyperscale-serving-patterns`**: Mandates vLLM PagedAttention, Triton dynamic batching, and Token Bucket Load Shedding.
- **`semantic-caching-patterns`**: Mandates Redis Vector caching with strict `Tenant_ID` partition routing to prevent cache poisoning.
- **`database-connection-pooling`**: Protects VectorDBs from Serverless DDoS by enforcing PgBouncer/Prisma Accelerate proxies.
- **`tdd-workflow`**: Strict Red-Green-Refactor testing enforcement.
- **`zero-symptom-debugging`**: Prohibits agents from swallowing errors or modifying linters to bypass failures.

---

## Quickstart

### Global Installation *(Recommended)*

Installs EAG into your Antigravity plugin directory so it's active across all your projects:

```bash
git clone https://github.com/MvMukesh/everything-antigravity.git
cd everything-antigravity
npm run install:global
```

### Health Diagnostics

Check that your EAG installation is complete and healthy, verifying all 27 agents and 24 skills:

```bash
npm run doctor
```

---

## Core Operational Rules (`SOUL.md`)

1. **Verification-First** — Never complete a task without running build or test verification.
2. **Zero-Symptom Fixing** — Never swallow exceptions or comment out failing assertions.
3. **Context Efficiency** — Delegate heavy research to subagents; prune the main context tree.
4. **Fail-Closed Security** — If a prompt is ambiguous or violates boundary protections, agents must reject execution.
5. **Secret Safety** — Never hardcode credentials; never log secrets; always use environment variables.

---

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for:
- How to add a new subagent or skill.
- Commit message conventions (Conventional Commits).

## License
MIT License — see [LICENSE](LICENSE) for details.

---
<div align="center">
Built with ❤️ by [MvMukesh](https://github.com/MvMukesh) & The EAG Agent Swarm
</div>
