---
name: pkdesigner-workflow
description: >-
  Workflows, commands, and rules for developing pkdesigner (React 19 + TypeScript + TailwindCSS v4 + FastAPI).
---

# pkdesigner Workflow & Conventions

## Tech Stack & Architecture
- **Frontend**: React 19, TypeScript, Vite.
- **Styling**: TailwindCSS v4 with CLI. Command: `npm run gen-tw` (or on Windows PowerShell: `npx.cmd @tailwindcss/cli -i ./src/css/input.css -o ./src/css/output.css`).
- **Icons**: Google Material Symbols (`material-symbols-outlined`), imported via Google Fonts. No emojis in the interface.
- **Theme**: Light & Dark mode support. Neutral grayscale palette with 1-2 primary accent colors (e.g. violet / indigo).
- **Backend**: FastAPI (Python), Jinja2 templates, SQLite (for future phases).

## Coding & Collaboration Rules
- **Comments**: Inline code comments must be in English, concise, explaining *why* rather than *what*.
- **Icons**: Never use emojis in UI. Use `<span className="material-symbols-outlined">...</span>`.
- **CSS Generation**: Rebuild CSS with Tailwind CLI whenever new classes are introduced in JSX/TSX.
