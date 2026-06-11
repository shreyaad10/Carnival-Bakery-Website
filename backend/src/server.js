require('dotenv').config()
require('express-async-errors')  // patches async route errors → errorHandler automatically

const express    = require('express')
const cors       = require('cors')
const helmet     = require('helmet')
const morgan     = require('morgan')
const rateLimit  = require('express-rate-limit')
const path       = require('path')

const connectDB      = require('./config/db')
const errorHandler   = require('./middleware/errorHandler')

// ── Routes ────────────────────────────────────────────────────────────────────
const authRoutes        = require('./routes/authRoutes')
const productRoutes     = require('./routes/productRoutes')
const offerRoutes       = require('./routes/offerRoutes')
const galleryRoutes     = require('./routes/galleryRoutes')
const testimonialRoutes = require('./routes/testimonialRoutes')
const messageRoutes     = require('./routes/messageRoutes')
const contentRoutes     = require('./routes/contentRoutes')

// ── Connect DB ────────────────────────────────────────────────────────────────
connectDB()

const app = express()

// ── Security & Logging ────────────────────────────────────────────────────────
app.use(helmet())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',  // vite preview
]

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (Postman, mobile apps, etc.)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error(`CORS blocked: ${origin}`))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// ── Rate limiting ─────────────────────────────────────────────────────────────
// Strict limit on contact form to prevent spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max:      10,
  message:  { success: false, message: 'Too many submissions — please wait 15 minutes.' },
})

// General API limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      300,
})

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) =>
  res.status(200).json({
    status: 'ok',
    env:    process.env.NODE_ENV,
    time:   new Date().toISOString(),
  })
)

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api',           apiLimiter)
app.use('/api/auth',      authRoutes)
app.use('/api/products',  productRoutes)
app.use('/api/offers',    offerRoutes)
app.use('/api/gallery',   galleryRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/messages',  contactLimiter, messageRoutes)
app.use('/api/content',   contentRoutes)

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use('*', (req, res) =>
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
)

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler)

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🎪  Carnival Bakery API`)
  console.log(`🚀  Server running on port ${PORT}`)
  console.log(`🌍  Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`📡  http://localhost:${PORT}/health\n`)
})

module.exports = app
