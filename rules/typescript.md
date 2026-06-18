# TypeScript Domain Rules & Best Practices

1. **Strict Type Safety**: Enable `strict: true` in `tsconfig.json`. NEVER use `any`. Use `unknown` with type guards or discriminative unions for dynamic data.
2. **Explicit Return Types**: Explicitly define return types for exported functions and API boundaries.
3. **Immutability**: Prefer `readonly` properties, `ReadonlyArray<T>`, and `const` declarations.
4. **Error Handling**: Throw typed errors extending `Error`. Handle promise rejections explicitly; never use unhandled floating promises (`void asyncFunc()`).
5. **Linting & Formatting**: Prefer Biome or ESLint with `@typescript-eslint/recommended-type-checked`.
