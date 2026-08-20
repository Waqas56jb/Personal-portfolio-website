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

## Deployment (Vercel)

| | URL |
|---|---|
| Frontend | https://waqas-naveed.vercel.app |
| Backend | https://waqas-backend.vercel.app |

`client/.env.production` already points the build at the deployed backend, so
`npm run build` and Vercel both wire the frontend to the live API.

**The backend's environment variables live in the Vercel dashboard**, not in a
file — `server/.env` is git-ignored and never reaches the deploy. Set these under
*waqas-backend → Settings → Environment Variables*, then redeploy:

```
NODE_ENV            production
CLIENT_ORIGIN       https://waqas-naveed.vercel.app,https://*.vercel.app,http://localhost:3000
MAIL_USER           waqas56jb@gmail.com
MAIL_APP_PASSWORD   <google app password>
MAIL_TO             waqas56jb@gmail.com
SEND_AUTO_REPLY     true
OPENAI_API_KEY      <openai key with realtime access>
OPENAI_REALTIME_MODEL   gpt-realtime
OPENAI_REALTIME_VOICE   alloy
```

`CLIENT_ORIGIN` accepts wildcards, so `https://*.vercel.app` also lets every
preview deployment through without listing each one.

Check it landed:

```bash
curl https://waqas-backend.vercel.app/api/health
curl -i -X POST https://waqas-backend.vercel.app/api/contact   -H "Origin: https://waqas-naveed.vercel.app"   -H "Content-Type: application/json"   -d '{"name":"Test","email":"you@example.com","message":"hello from prod"}'
```

A `403 ... not allowed by CORS` means `CLIENT_ORIGIN` is still missing the
frontend origin.

## Security

- `.env` files are git-ignored. Never commit them.
- Contact endpoint: 5 requests / 15 min per IP, plus a honeypot field.
- Realtime endpoint: 20 sessions / 10 min per IP.
- If an app password or API key ever appears somewhere public, rotate it.
