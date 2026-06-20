# Go Domain Rules & Best Practices

1. **Explicit Error Handling**: Always check errors explicitly (`if err != nil`). Never ignore returned errors with `_`.
2. **Concurrency Safety**: Pass contexts (`ctx context.Context`) as the first argument to API boundaries. Avoid goroutine leaks by ensuring channel receivers exit cleanly.
3. **Interfaces**: Define small, consumer-side interfaces (e.g. `io.Reader`, `io.Writer`). High cohesion, low coupling.
4. **Code Quality**: Pass `golangci-lint` without warnings. Maintain standard project layout (`cmd/`, `internal/`, `pkg/`).
