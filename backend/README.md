# 🎪 Carnival Bakery — API Server

REST API backend for the Carnival Bakery website and admin dashboard.

**Stack:** Node.js · Express · MongoDB (Mongoose) · Cloudinary · JWT

---

## Quick Start

```bash
npm install
cp .env.example .env    # fill in your values
npm run seed            # seed database with sample data
npm run dev             # start dev server on :5000
```

→ Full setup instructions: **[BACKEND.md](./BACKEND.md)**

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server with auto-reload |
| `npm start` | Production server |
| `npm run seed` | Seed database with initial data |
| `npm run seed -- --destroy` | Wipe and re-seed |

## API Endpoints

| Resource | Base URL |
|---|---|
| Auth | `POST /api/auth/login` |
| Products | `GET/POST/PUT/DELETE /api/products` |
| Offers | `GET/POST/PUT/DELETE /api/offers` |
| Gallery | `GET/POST/PATCH/DELETE /api/gallery` |
| Testimonials | `GET/POST/PUT/DELETE /api/testimonials` |
| Messages | `POST /api/messages` (public) · `GET/DELETE /api/messages` (admin) |
| Content | `GET /api/content` · `PUT /api/content/bakery-info` etc. |

Full reference: [BACKEND.md → API Reference](./BACKEND.md#3-api-reference)

## Deployment

Recommended: **Railway** or **Render** (free tiers available)

See [BACKEND.md → Deployment](./BACKEND.md#4-deployment) for step-by-step instructions.
