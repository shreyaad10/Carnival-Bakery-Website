const cloudinary = require('cloudinary').v2
const multer     = require('multer')
const path       = require('path')

// Configure Cloudinary v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ── Use memory storage — we stream the buffer directly to Cloudinary ──────────
// This avoids needing multer-storage-cloudinary entirely
const memoryStorage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
  if (allowed.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only JPEG, PNG, WebP and SVG images are allowed'), false)
  }
}

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

// One multer instance for all uploads — folder is set per-controller
const upload = multer({ storage: memoryStorage, fileFilter, limits: { fileSize: MAX_SIZE } })

// ── Helper: upload a buffer to a specific Cloudinary folder ──────────────────
// Returns { secure_url, public_id }
const uploadToCloudinary = (buffer, folder, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      resource_type: 'auto',
      ...options,
    }

    const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })

    stream.end(buffer)
  })
}

// ── Convenience uploaders per folder ─────────────────────────────────────────
const uploadProductImage = (buffer) =>
  uploadToCloudinary(buffer, 'carnival-bakery/products', {
    transformation: [{ width: 600, height: 600, crop: 'fill', quality: 'auto' }],
  })

const uploadGalleryImage = (buffer) =>
  uploadToCloudinary(buffer, 'carnival-bakery/gallery', {
    transformation: [{ width: 1200, height: 900, crop: 'limit', quality: 'auto' }],
  })

const uploadLogoImage = (buffer) =>
  uploadToCloudinary(buffer, 'carnival-bakery/logo', {
    transformation: [{ width: 400, height: 400, crop: 'limit', quality: 'auto' }],
  })

// Multer middleware instances
const uploadProduct = upload
const uploadGallery = upload
const uploadLogo    = upload

module.exports = {
  cloudinary,
  upload,
  uploadProduct,
  uploadGallery,
  uploadLogo,
  uploadToCloudinary,
  uploadProductImage,
  uploadGalleryImage,
  uploadLogoImage,
}
