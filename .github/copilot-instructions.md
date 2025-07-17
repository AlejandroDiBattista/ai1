# Copilot Style Rules

- All new CSS must use variables defined in `src/styles/variables.css`.
- Import `src/styles/variables.css` in any global style entry if not already present.
- Prefer `var(--spacing-X)` for spacing multiples of 4px.
- Colors, typography values, radii and shadows should reference the corresponding CSS variables.
