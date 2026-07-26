---
name: semantic-caching-patterns
description: Strategies for intercepting duplicate RAG queries and LLM prompts before they consume expensive GPU compute, utilizing Redis and vector similarity matching.
license: MIT
metadata:
  origin: EAG
---

# Semantic Caching Patterns

Use this skill to drastically reduce GPU compute costs and latency in GenAI applications by serving identical or semantically identical queries from a cache instead of generating them from scratch.

## 1. The Core Architecture (GPTCache)

Do not rely strictly on exact string matching. "What is the capital of France?" and "Tell me the capital of France" are semantically identical but hash differently.
- Use an embedding model to convert incoming queries into vectors.
- Search a vector database or Redis Vector Search for the closest existing embedding.
- If the cosine similarity is above a strict threshold (e.g., `0.98`), return the cached LLM response.

## 2. Infrastructure Setup: Redis

- **Primary Store:** Use **Redis** with the RediSearch/RedisJSON modules to store the embeddings and the cached string responses.
- **Eviction Policy:** Configure Redis with an `allkeys-lru` eviction policy so that the least utilized prompt answers are evicted first when memory fills up.

## 3. Cache Invalidation Triggers

A cached LLM response for a dynamic query (e.g., "Summarize today's news") becomes stale.
- **TTL (Time to Live):** Set explicit TTLs on the cached objects (e.g., 5 minutes for news, 30 days for documentation questions).
- **RAG Invalidation:** If the underlying context documents in your VectorDB change, you must programmatically invalidate the semantic cache for related queries.

## 4. Bypassing the GPU

```python
# Conceptual Architecture Loop
query_embedding = generate_embedding(user_query) # Cheap (CPU/Edge)
cache_hit = redis_vector_search(query_embedding, threshold=0.95)

if cache_hit:
    return cache_hit.response # 5ms Latency, $0 GPU cost

# Cache Miss: Pay the cost
response = vllm_inference(user_query) # 1500ms Latency, Expensive
redis_store(query_embedding, response)
return response
```
