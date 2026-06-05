---
name: performance-profiler
description: Performance optimization guidelines covering Core Web Vitals (LCP, INP, CLS), memory leak debugging, and bundle size reduction.
---

# Performance Profiler Skill Pack

## Overview
Guidelines for measuring, diagnosing, and optimizing application performance and responsiveness.

## Performance Checklist

### 1. Core Web Vitals Optimization
- **LCP (Largest Contentful Paint)**: Preload hero images (`<link rel="preload">`), use WebP/AVIF formats, optimize critical render path.
- **INP (Interaction to Next Paint)**: Defer heavy JS computations off main thread using Web Workers or `requestIdleCallback`.
- **CLS (Cumulative Layout Shift)**: Set explicit `width` and `height` attributes on all dynamic image and video containers.

### 2. Memory Leak Prevention
- Always cleanup event listeners, subscriptions (`unsubscribe()`), and timers (`clearInterval`) inside component unmount hooks.
- Avoid global array mutations or keeping uncollected DOM node references in closure state.

### 3. Bundle Optimization
- Use dynamic imports (`import()`) for code splitting routes and heavy modal components.
- Audit node_modules using bundle analyzers (`vite-plugin-inspect` or `webpack-bundle-analyzer`).
