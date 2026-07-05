# Autocerfa API

A lightweight Node.js proxy that wraps the [Autocerfa.com](https://www.autocerfa.com) vehicle stock API and exposes clean REST endpoints. Built with [Fastify](https://fastify.dev).

## Requirements

- Node.js 22+
- An Autocerfa Elite or Accélérateur account
- Your Autocerfa API token (see [Getting your token](#getting-your-token))

## Getting started

```bash
git clone https://github.com/your-username/autocerfa-api.git
cd autocerfa-api
npm install
cp .env.example .env
```

Fill in your token in `.env`, then:

```bash
npm run dev
```

The server starts at `http://localhost:3000`.

## Getting your token

1. Open this URL in your browser:
   ```
   https://www.autocerfa.com/all-post/?action=authorize-autocerfa&redirect_url=http://localhost
   ```
2. Log in with your Autocerfa account.
3. The browser will redirect to `http://localhost` — the page won't load, but your token is visible in the address bar as `?autocerfa_token=<token>`.
4. Copy that token and paste it as `AUTOCERFA_TOKEN` in your `.env` file.

The token is long-lived — you only need to repeat this if it expires or is revoked.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `AUTOCERFA_TOKEN` | Yes | Your Autocerfa API token |
| `PORT` | No | Port to listen on (default: `3000`) |

## Endpoints

### Get vehicle stock

```
GET /v1/stock
```

Returns all vehicles currently in your Autocerfa stock.

**Example:**
```bash
curl http://localhost:3000/v1/stock
```

**Response:**
```json
{
  "success": true,
  "data": {
    "leads": [
      {
        "lead_id": "1477023",
        "title": "RENAULT ESPACE V 1.6 DCI 160 ZEN EDC 2018",
        "price": "19490",
        "marque": "RENAULT",
        "model": "ESPACE V",
        "energy": "Diesel",
        "gear_box": "automatique",
        "milage": "130200",
        "photos": ["https://..."],
        "..."
      }
    ]
  }
}
```

> Note: this endpoint can be slow (up to 180 seconds) depending on the size of your stock.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start with hot reload (Node.js `--watch`) |
| `npm start` | Start in production mode |

## License

MIT
