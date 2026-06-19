# Python Domain Rules & Best Practices

1. **Type Hints**: Use type annotations for all function parameters and return values (Python 3.10+ syntax: `list[str]`, `str | None`).
2. **Package & Environment Management**: Use `uv` or `poetry` for fast dependency locking.
3. **Linting & Formatting**: Enforce `ruff` for ultra-fast linting and code formatting, and `pyright` or `mypy` for static type enforcement.
4. **Async Best Practices**: Avoid mixing synchronous blocking IO calls with `asyncio` loops. Use `asyncio.to_thread()` for blocking calls if necessary.
5. **Data Structures**: Use Pydantic v2 for data validation and API response serialization; use `dataclasses(frozen=True)` for internal immutable value objects.
