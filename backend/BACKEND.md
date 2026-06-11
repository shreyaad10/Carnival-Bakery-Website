# 🎪 Carnival Bakery — Backend Setup Guide

Express + MongoDB REST API that powers the admin dashboard and public website.

---

## Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://cloud.mongodb.com) account (free tier is fine)
- A [Cloudinary](https://cloudinary.com) account (free tier is fine)

---

## 1. Local Development Setup

### Step 1 — Install dependencies

```bash
cd carnival-backend
npm install
```

### Step 2 — Create your `.env` file

```bash
cp .env.example .env
```

Open `.env` and fill in each value:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://...         # from MongoDB Atlas
JWT_SECRET=...                      # run: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
CLOUDINARY_CLOUD_NAME=...           # from cloudinary.com dashboard
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=owner@carnivalbakery.in
ADMIN_PASSWORD=YourStrongPassword1!
```

### Step 3 — Get your MongoDB URI

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster (M0 Sandbox)
3. Click **Connect → Drivers**
4. Copy the connection string and replace `<password>` with your DB user password
5. Paste into `MONGO_URI` in your `.env`

**Also:** Go to **Network Access → Add IP Address → Allow Access from Anywhere** (for development)

### Step 4 — Seed the database

```bash
npm run seed
```

This creates:
- All products, offers, gallery, testimonials
- The admin account using your `.env` credentials
- The site content singleton document

To wipe and re-seed:
```bash
npm run seed -- --destroy
```

### Step 5 — Start the server

```bash
npm run dev       # development (auto-restarts on save)
npm start         # production
```

Server runs on: `http://localhost:5000`  
Health check: `http://localhost:5000/health`

### Step 6 — Test the API

```bash
node src/utils/apiTest.js
```

---

## 2. Connect the Frontend

In your `carnival-unified` frontend, add this to `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Then replace `carnival-unified/src/context/StoreContext.jsx` with the updated version at `src/utils/StoreContext.updated.jsx`.

The frontend automatically:
- Loads all data from the API on startup
- Syncs every admin action to MongoDB in the background
- Falls back to local data if the API is unreachable

---

## 3. API Reference

All protected routes require: `Authorization: Bearer <token>`

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | — | Login with email + password → returns JWT |
| GET  | `/api/auth/me` | ✅ | Get current admin info |
| PATCH | `/api/auth/change-password` | ✅ | Change password |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | — | Get all (filter: `?category=Cake&status=active&featured=true`) |
| GET | `/api/products/:id` | — | Get single product |
| POST | `/api/products` | ✅ | Create (multipart/form-data with optional `image` file) |
| PUT | `/api/products/:id` | ✅ | Update |
| DELETE | `/api/products/:id` | ✅ | Delete (also removes Cloudinary image) |
| PATCH | `/api/products/reorder` | ✅ | Reorder: `{ order: ["id1","id2",…] }` |

### Offers
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/offers` | — | Get all (filter: `?active=true`) |
| POST | `/api/offers` | ✅ | Create |
| PUT | `/api/offers/:id` | ✅ | Update |
| DELETE | `/api/offers/:id` | ✅ | Delete |

### Gallery
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/gallery` | — | Get all (filter: `?visible=true`) |
| POST | `/api/gallery` | ✅ | Upload image (multipart/form-data with `image` file) |
| PATCH | `/api/gallery/:id` | ✅ | Update label/visibility |
| DELETE | `/api/gallery/:id` | ✅ | Delete (also removes from Cloudinary) |
| PATCH | `/api/gallery/reorder` | ✅ | Reorder: `{ order: ["id1","id2",…] }` |

### Testimonials
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/testimonials` | — | Get all (filter: `?approved=true`) |
| POST | `/api/testimonials` | ✅ | Create |
| PUT | `/api/testimonials/:id` | ✅ | Update (toggle approved here) |
| DELETE | `/api/testimonials/:id` | ✅ | Delete |

### Messages
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/messages` | — | Submit contact form (public, rate-limited) |
| GET | `/api/messages` | ✅ | Get all (filter: `?read=false`) |
| GET | `/api/messages/:id` | ✅ | Get one (auto-marks as read) |
| PATCH | `/api/messages/:id/read` | ✅ | Mark as read |
| DELETE | `/api/messages/:id` | ✅ | Delete |

### Site Content
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/content` | — | Get all content (bakery info + hero + settings) |
| PUT | `/api/content/bakery-info` | ✅ | Update bakery name, address, hours, social links |
| PUT | `/api/content/hero` | ✅ | Update hero heading, subheading, CTA buttons |
| PUT | `/api/content/settings` | ✅ | Update theme, SEO, footer |
| POST | `/api/content/logo` | ✅ | Upload logo (multipart/form-data with `logo` file) |

---

## 4. Deployment

### Option A — Railway (Easiest, Recommended)

1. Push your backend to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select `carnival-backend`
4. Add all `.env` variables under **Variables**
5. Railway auto-detects Node.js and deploys

Your API will be live at: `https://carnival-bakery-api.up.railway.app`

Then update your frontend `.env` on Vercel:
```
VITE_API_URL=https://carnival-bakery-api.up.railway.app/api
```

### Option B — Render

1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repo
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all environment variables
6. Deploy

### Option C — Heroku

```bash
heroku create carnival-bakery-api
heroku config:set MONGO_URI=... JWT_SECRET=... CLOUDINARY_CLOUD_NAME=...
git push heroku main
heroku run npm run seed
```

### Option D — VPS (DigitalOcean / Linode)

```bash
# On your server
git clone https://github.com/YOUR_USERNAME/carnival-bakery-backend.git
cd carnival-bakery-backend
npm install
cp .env.example .env
nano .env  # fill in values
npm run seed
npm install -g pm2
pm2 start src/server.js --name carnival-api
pm2 startup && pm2 save
```

---

## 5. MongoDB Atlas Setup (Visual Guide)

1. Sign up at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Click **Build a Database** → Choose **M0 Free**
3. Choose a cloud provider and region (pick closest to your users)
4. Create a database user with a strong password
5. Click **Connect** → **Drivers** → copy the URI
6. Go to **Network Access** → **Add IP Address** → `0.0.0.0/0` (allow all for now)
7. Paste URI into your `.env` replacing `<password>`

---

## 6. Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard → copy **Cloud Name**, **API Key**, **API Secret**
3. Paste into your `.env`

Images are automatically organized into folders:
- `carnival-bakery/products/` — product images
- `carnival-bakery/gallery/`  — gallery images
- `carnival-bakery/logo/`     — bakery logo

---

## 7. Project Structure

```
carnival-backend/
├── src/
│   ├── server.js              # Express app entry point
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── cloudinary.js      # Cloudinary + Multer setup
│   ├── models/
│   │   ├── Product.js
│   │   ├── Offer.js
│   │   ├── GalleryItem.js
│   │   ├── Testimonial.js
│   │   ├── Message.js
│   │   ├── SiteContent.js     # Singleton: bakery info + hero + settings
│   │   └── Admin.js           # Admin user + bcrypt
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── offerController.js
│   │   ├── galleryController.js
│   │   ├── testimonialController.js
│   │   ├── messageController.js
│   │   └── contentController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── offerRoutes.js
│   │   ├── galleryRoutes.js
│   │   ├── testimonialRoutes.js
│   │   ├── messageRoutes.js
│   │   └── contentRoutes.js
│   ├── middleware/
│   │   ├── auth.js            # JWT protect middleware
│   │   ├── errorHandler.js    # Global error handler
│   │   └── validate.js        # Request body validator
│   └── utils/
│       ├── seed.js            # Database seeder
│       ├── apiTest.js         # Manual API test script
│       ├── api.frontend.js    # Copy to frontend/src/services/api.js
│       └── StoreContext.updated.jsx  # Copy to frontend/src/context/StoreContext.jsx
├── uploads/                   # Temp storage (Cloudinary handles permanent storage)
├── .env.example
├── .gitignore
├── nodemon.json
├── package.json
└── BACKEND.md
```

---

## 8. Security Checklist

Before going to production:

- [ ] Change `ADMIN_PASSWORD` to a strong password
- [ ] Generate a new `JWT_SECRET` (64+ random chars)
- [ ] Set `NODE_ENV=production`
- [ ] Set `CLIENT_URL` to your actual frontend domain
- [ ] Restrict MongoDB Network Access to your server's IP only
- [ ] Enable Cloudinary signed uploads
- [ ] Set up HTTPS (handled automatically by Railway/Render/Heroku)

---

*Built with ❤️ in Surat, Gujarat.*
