# CVify AI — Render deployment

Structure
- server.js — Express server: serves /public and mounts the AI API
- ai/analyze.js — POST /api/analyze (Google Gemini via @google/genai, structured JSON output; the key stays on the server)
- public/index.html — the whole front end (React, Paddle.js v2, PDF export)
- public/fonts/ — Japanese / Chinese PDF fonts (loaded only when needed)
- render.yaml — optional Blueprint (you can ignore it for an existing service)

Render settings (Dashboard > your service)
- Build Command: npm install
- Start Command: npm start
- Environment variables:
  - GEMINI_API_KEY (required for AI analysis; get one free at https://aistudio.google.com/apikey)
  - GEMINI_MODEL (optional, default gemini-2.5-flash)
  - ALLOWED_ORIGIN (default https://cvify-ai.onrender.com; comma-separate if you add a custom domain)
  - AI_DAILY_LIMIT (optional, requests per IP per day, default 20)
  - NODE_ENV=production

Already have an Express server on Render?
1. Copy ai/analyze.js and public/fonts/ into your repo.
2. Add: app.use('/api', require('./ai/analyze'));
3. Replace your index.html with public/index.html.

Notes
- Paddle: make sure your Render domain is approved in Paddle and set as the Default payment link.
- Owner key: long-press the logo (about 1 second) to open the access-key box.
