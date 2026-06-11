const Product    = require('../models/Product')
const { cloudinary, uploadProductImage } = require('../config/cloudinary')

// GET /api/products
const getProducts = async (req, res) => {
  const filter = {}
  if (req.query.category)   filter.category   = req.query.category
  if (req.query.status)     filter.status      = req.query.status
  if (req.query.featured)   filter.featured    = req.query.featured === 'true'
  if (req.query.bestSeller) filter.bestSeller  = req.query.bestSeller === 'true'

  const products = await Product.find(filter).sort({ order: 1, createdAt: -1 })
  res.status(200).json({ success: true, count: products.length, data: products })
}

// GET /api/products/:id
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' })
  res.status(200).json({ success: true, data: product })
}

// POST /api/products  (protected)
const createProduct = async (req, res) => {
  // If an image file was uploaded, push it to Cloudinary from the buffer
  if (req.file) {
    const result = await uploadProductImage(req.file.buffer)
    req.body.imageUrl      = result.secure_url
    req.body.imagePublicId = result.public_id
  }
  const product = await Product.create(req.body)
  res.status(201).json({ success: true, data: product })
}

// PUT /api/products/:id  (protected)
const updateProduct = async (req, res) => {
  const existing = await Product.findById(req.params.id)
  if (!existing) return res.status(404).json({ success: false, message: 'Product not found' })

  if (req.file) {
    // Delete old Cloudinary image
    if (existing.imagePublicId) {
      await cloudinary.uploader.destroy(existing.imagePublicId).catch(() => {})
    }
    const result = await uploadProductImage(req.file.buffer)
    req.body.imageUrl      = result.secure_url
    req.body.imagePublicId = result.public_id
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  })
  res.status(200).json({ success: true, data: product })
}

// DELETE /api/products/:id  (protected)
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' })

  if (product.imagePublicId) {
    await cloudinary.uploader.destroy(product.imagePublicId).catch(() => {})
  }
  await product.deleteOne()
  res.status(200).json({ success: true, message: 'Product deleted' })
}

// PATCH /api/products/reorder  (protected)
const reorderProducts = async (req, res) => {
  const { order } = req.body
  if (!Array.isArray(order)) {
    return res.status(400).json({ success: false, message: 'order must be an array of IDs' })
  }
  const ops = order.map((id, index) => ({
    updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
  }))
  await Product.bulkWrite(ops)
  res.status(200).json({ success: true, message: 'Products reordered' })
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct, reorderProducts }
