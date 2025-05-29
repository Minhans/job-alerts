# Indian Job Alerts Website

This repo contains a full-stack job alert website with:

- Real-time job updates via WebSocket
- Backend API built with Node.js + Express + Socket.IO
- Frontend built with Next.js (React) with SSR for SEO
- Google Adsense placeholders for monetization

## Setup

### Backend

1. Go to `backend/`
2. Run `npm install`
3. Run `npm start` to start backend on port 4000

### Frontend

1. Go to `frontend/`
2. Run `npm install`
3. Run `npm run dev` to start frontend on http://localhost:3000

## Notes

- Replace all `ca-pub-XXXXXXXXXXXX` and `data-ad-slot` values with your Google Adsense details.
- Backend saves jobs to `jobs.json` for basic persistence.
- Add real DB and HTTPS for production.
- Feel free to extend with pagination, state filters, testimonials, and blogs.

## Adding jobs

Send POST requests to:

# AI-TOOLS
