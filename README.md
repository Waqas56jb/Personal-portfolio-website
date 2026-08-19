# Waqas Naveed — Portfolio

Data Engineer portfolio with a working contact pipeline and a realtime
speech-to-speech voice agent.

```
.
├── client/     React 18 + Tailwind frontend
└── server/     Node.js + Express API (Nodemailer + OpenAI Realtime)
```

## 1. Server

```bash
cd server
npm install
cp .env.example .env      # then fill in the real values
npm run dev               # http://localhost:5000
```

`server/.env`:

| Variable | What it is |
|---|---|
| `MAIL_USER` | Gmail address that sends the mail |
| `MAIL_APP_PASSWORD` | Google **App Password** (not the account password) |
| `MAIL_TO` | Where enquiries land — defaults to `MAIL_USER` |
| `SEND_AUTO_REPLY` | `true` sends a branded acknowledgement to the sender |
| `OPENAI_API_KEY` | Key with Realtime API access |
| `OPENAI_REALTIME_MODEL` | e.g. `gpt-realtime` |
| `OPENAI_REALTIME_VOICE` | e.g. `alloy`, `verse`, `marin` |
| `CLIENT_ORIGIN` | Comma-separated origins allowed by CORS |

Endpoints:

- `GET  /api/health` — reports whether mail and voice are configured
- `POST /api/contact` — validates, rate-limits, emails the enquiry
- `GET  /api/realtime/session` — mints a short-lived OpenAI token for the browser

## 2. Client

```bash
cd client
npm install
cp .env.example .env      # REACT_APP_API_URL=http://localhost:5000
npm start                 # http://localhost:3000
npm run build             # production bundle in client/build
```

**Add `client/public/widget.png`** — that image is the voice agent avatar in the
bottom-right launcher and inside the panel. If it is missing the widget falls
back to a gradient orb, so nothing breaks.

## Voice agent

The browser never receives the OpenAI key. `GET /api/realtime/session` mints an
ephemeral client secret on the server, the browser opens a WebRTC peer
connection with it, and audio flows both ways — speech in, speech out, no
transcription round-trip.

The agent's behaviour lives in `server/src/prompts/agent.js`. It is scoped hard:
it presents Waqas as a Data Engineer first, covers AI/ML, full-stack and prompt
engineering when asked, and refuses anything unrelated to him.

## Security

- `.env` files are git-ignored. Never commit them.
- Contact endpoint: 5 requests / 15 min per IP, plus a honeypot field.
- Realtime endpoint: 20 sessions / 10 min per IP.
- If an app password or API key ever appears somewhere public, rotate it.
