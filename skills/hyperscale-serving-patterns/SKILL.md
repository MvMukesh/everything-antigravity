---
name: hyperscale-serving-patterns
description: Inference architecture for hyperscale traffic (millions of users). Mandates continuous batching, PagedAttention, and multi-tenant LoRA routing using vLLM and Triton Inference Server.
license: MIT
metadata:
  origin: EAG
---

# Hyperscale Serving Patterns

Use this skill when deploying models that must handle thousands of Requests Per Second (QPS) without linearly increasing cloud GPU costs. A naive Flask/FastAPI wrapper around `model.generate()` will crash at scale.

## 1. LLM Serving: Continuous Batching & vLLM

Never serve LLMs using basic HuggingFace Transformers pipelines in production.
- **Engine Requirement**: Always use **vLLM** or **TensorRT-LLM** as the inference engine.
- **PagedAttention**: You must rely on engines that manage the KV-Cache identically to operating system virtual memory (PagedAttention) to prevent VRAM fragmentation.
- **Continuous Batching**: Unlike static batching which waits for the longest sequence to finish, use continuous batching to eject finished requests and slot in new ones at the millisecond level.

## 2. Multi-Tenant LLMs (LoRA Routing)

When serving hundreds of enterprise clients who each have their own fine-tuned model behavior:
- **Never boot a separate base model** for each client.
- Use **LoRAX (LoRA eXchange)** or vLLM's multi-LoRA feature.
- Keep one massive base model (e.g., Llama 3 70B) in VRAM and dynamically swap the lightweight LoRA adapters (10-50MB each) on a per-request basis.

## 3. Deep Learning & CV Models: Triton Inference Server

For ResNet, YOLO, Embedding models, and classical neural networks at scale:
- Use **NVIDIA Triton Inference Server**.
- Enforce **Dynamic Batching** in the model config (`dynamic_batching { max_queue_delay_microseconds: 50000 }`). This batches incoming requests at the C++ level before hitting the GPU.
- Export all models to **TensorRT** or **ONNX** formats before deploying to Triton for massive throughput gains over standard PyTorch `.pt` files.

## 4. Hardware Optimization
- Always deploy inference workloads on lower-precision quantization (FP8, AWQ, or GPTQ) when mathematically acceptable. 
- A 4-bit quantized model serves >2x faster and requires roughly 1/4 the VRAM of its FP16 counterpart.
