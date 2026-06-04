# 🎪 Carnival Bakery — Unified Website + Admin Panel

A full-stack-ready React application combining a **premium bakery website** and a **live-sync admin dashboard** in a single codebase. Changes made in the admin panel reflect on the public website instantly — no page reload required.

---

## ✨ Features

### Public Website (`/`)
- Animated hero section with parallax scroll
- Live product catalog with category filtering
- Best sellers carousel
- Gallery with lightbox
- Active special offers
- Approved testimonials carousel
- Contact form (submissions appear in admin inbox instantly)
- Fully responsive, mobile-first design

### Admin Dashboard (`/admin`)
- **Products** — Add, edit, delete, toggle featured/status
- **Best Sellers** — Mark products, drag-to-reorder display sequence
- **Special Offers** — Create, activate/deactivate, date ranges
- **Gallery** — Upload, show/hide, drag-to-reorder
- **Testimonials** — Add, approve/unapprove, edit, delete
- **Messages** — View contact submissions with read/unread state
- **Bakery Info** — Edit name, address, hours, social links (live preview)
- **Hero Content** — Edit heading, subheading, CTA buttons (live preview)
- **Settings** — Theme colors, SEO meta, footer content

---

## 🔄 How Live Sync Works

```
StoreProvider  ← single React context
├── /          → WebsitePage   (reads from shared state)
└── /admin/*   → AdminLayout   (writes to shared state)
```

Both the website and admin share one `StoreContext`. Every `dispatch()` in the admin instantly re-renders any part of the website that consumes that data.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/carnival-bakery.git
cd carnival-bakery

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open **http://localhost:5173** for the website  
Open **http://localhost:5173/admin** for the admin panel

---

## 📁 Project Structure

```
carnival-unified/
├── public/
├── src/
│   ├── App.jsx                        # Root router — one StoreProvider wraps everything
│   ├── main.jsx
│   ├── index.css                      # All styles: website + admin
│   │
│   ├── context/
│   │   └── StoreContext.jsx           # Shared state — THE sync engine
│   │
│   ├── data/
│   │   └── initialData.js             # Seed data for all sections
│   │
│   ├── hooks/
│   │   └── useCounter.js              # Animated number counter hook
│   │
│   ├── utils/
│   │   └── helpers.js                 # genId, formatCurrency, formatDate…
│   │
│   ├── pages/
│   │   ├── WebsitePage.jsx            # Full public website
│   │   ├── AdminLayout.jsx            # Admin shell (sidebar + navbar)
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminProducts.jsx
│   │       ├── AdminBestSellers.jsx
│   │       ├── AdminOffers.jsx
│   │       ├── AdminGallery.jsx
│   │       ├── AdminTestimonials.jsx
│   │       ├── AdminMessages.jsx
│   │       ├── AdminBakeryInfo.jsx
│   │       └── AdminSettings.jsx
│   │
│   └── components/
│       ├── admin/                     # Admin-only UI components
│       │   ├── Sidebar.jsx
│       │   ├── AdminNavbar.jsx
│       │   ├── StatsCard.jsx
│       │   ├── DataTable.jsx
│       │   ├── Modal.jsx
│       │   ├── ProductForm.jsx
│       │   ├── ConfirmDialog.jsx
│       │   └── Toast.jsx
│       └── website/                   # Public website components
│           ├── WebsiteNavbar.jsx
│           ├── Hero.jsx
│           ├── About.jsx
│           ├── FeaturedProducts.jsx
│           ├── BestSellers.jsx
│           ├── WhyChooseUs.jsx
│           ├── Testimonials.jsx
│           ├── Gallery.jsx
│           ├── SpecialOffers.jsx
│           ├── Contact.jsx
│           ├── Footer.jsx
│           └── AnimateOnScroll.jsx
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion 11 | Animations & transitions |
| React Router 6 | Client-side routing |
| React Icons 5 | Icon library |

---

## 📦 Available Scripts

```bash
npm run dev       # Start development server (hot reload)
npm run build     # Build for production → /dist
npm run preview   # Preview production build locally
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repo on [vercel.com](https://vercel.com) for automatic deployments on every push.

### Netlify

```bash
npm run build
# Drag and drop the /dist folder to netlify.com/drop
```

Add a `_redirects` file in `/public` for SPA routing:
```
/*    /index.html   200
```

### GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy
```

Add to `vite.config.js`:
```js
export default defineConfig({
  base: '/carnival-bakery/',  // your repo name
  plugins: [react()],
})
```

---

## 🔌 Backend Integration

The project is structured to connect to a REST API. In `StoreContext.jsx`, replace each local `dispatch()` with an API call:

```js
// BEFORE (local state only)
dispatch({ type: 'ADD_PRODUCT', payload: { ...data, id: genId() } })

// AFTER (with Express + MongoDB)
const res = await axios.post('/api/products', data)
dispatch({ type: 'ADD_PRODUCT', payload: res.data })
```

### Suggested API endpoints

| Resource | Endpoints |
|---|---|
| Products | `GET /api/products` · `POST /api/products` · `PUT /api/products/:id` · `DELETE /api/products/:id` |
| Offers | `GET /api/offers` · `POST /api/offers` · `PUT /api/offers/:id` · `DELETE /api/offers/:id` |
| Gallery | `GET /api/gallery` · `POST /api/gallery/upload` · `PATCH /api/gallery/reorder` · `DELETE /api/gallery/:id` |
| Testimonials | `GET /api/testimonials` · `POST /api/testimonials` · `PUT /api/testimonials/:id` · `DELETE /api/testimonials/:id` |
| Messages | `GET /api/messages` · `PATCH /api/messages/:id/read` · `DELETE /api/messages/:id` |
| Content | `GET /api/content` · `PUT /api/content/hero` · `PUT /api/content/bakery-info` |
| Settings | `GET /api/settings` · `PUT /api/settings` · `POST /api/settings/logo` |

### Persistence without a backend

To persist data across page refreshes without a backend, replace the `useReducer` in `StoreContext.jsx` with a localStorage-backed version:

```js
// In StoreContext.jsx, after useReducer:
useEffect(() => {
  localStorage.setItem('carnival-store', JSON.stringify(state))
}, [state])

// And initialize from localStorage:
const INITIAL = JSON.parse(localStorage.getItem('carnival-store')) || DEFAULT_INITIAL
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use this project for personal or commercial purposes.

---

## 📬 Contact

**Carnival Bakery**  
42 Ring Road, Adajan, Surat, Gujarat 395009  
📞 +91 99799 44444  
📧 hello@carnivalbakery.in

---

*Built with ❤️ and lots of 🎂 in Surat, Gujarat.*
