# Rust Domain Rules & Best Practices

1. **Memory & Concurrency Safety**: Avoid `unsafe` code blocks unless strictly necessary and documented with safety invariants.
2. **Error Handling**: Use `Result<T, E>` and `Option<T>` with `thiserror` or `anyhow`. Avoid `unwrap()` or `panic!()` in production paths.
3. **Clippy Compliance**: Pass `cargo clippy -- -D warnings` cleanly.
4. **Ownership**: Prefer immutable references (`&T`) over cloning (`.clone()`) where possible. Use `Arc<T>` / `Mutex<T>` for thread-safe shared state.
