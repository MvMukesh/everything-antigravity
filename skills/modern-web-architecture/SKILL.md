---
name: modern-web-architecture
description: Best practices for modern web application architecture using Next.js 15, Vite, Vanilla CSS, design tokens, glassmorphism, and responsive layouts.
---

# Modern Web Architecture Skill Pack

## Overview
This skill pack guides the construction of modern, ultra-performant, aesthetically stunning web applications.

## Key Directives

### 1. Technology Stack Selection
- **Core**: HTML5 semantic markup + Vanilla CSS / modern CSS features (CSS variables, backdrop-filter, container queries, `:has()`, `:user-valid`).
- **Frameworks**: Next.js 15 (App Router) or Vite (React/TypeScript). Use `npx -y` for initialization.
- **Styling**: Vanilla CSS with comprehensive token definitions in `index.css`. Avoid Tailwind unless requested.

### 2. Design System Tokens (`index.css`)
Define CSS custom properties at the `:root` level:
```css
:root {
  --bg-primary: #0a0d14;
  --bg-secondary: #121824;
  --glass-surface: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --accent-glow: #6366f1;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --radius-lg: 16px;
  --shadow-glow: 0 8px 32px 0 rgba(99, 102, 241, 0.25);
}
```

### 3. Visual Excellence Checklist
- Glassmorphism: `backdrop-filter: blur(12px)` with subtle borders and linear gradients.
- Typography: Import Google Fonts (e.g. Inter, Outfit) at the top of CSS.
- Smooth Motion: `transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1)`.
- Responsive Grid: Use CSS Grid and Flexbox with fluid dynamic sizing (`clamp()`).
