const GalleryItem    = require('../models/GalleryItem')
const { cloudinary, uploadGalleryImage } = require('../config/cloudinary')

// GET /api/gallery
const getGallery = async (req, res) => {
  const filter = {}
  if (req.query.visible !== undefined) filter.visible = req.query.visible === 'true'
  const items = await GalleryItem.find(filter).sort({ order: 1, createdAt: 1 })
  res.status(200).json({ success: true, count: items.length, data: items })
}

// POST /api/gallery  (protected + file upload)
const addGalleryItem = async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Image file is required' })

  const result = await uploadGalleryImage(req.file.buffer)
  const count  = await GalleryItem.countDocuments()

  const item = await GalleryItem.create({
    label:         req.body.label || 'Gallery Image',
    emoji:         req.body.emoji || '🎂',
    imageUrl:      result.secure_url,
    imagePublicId: result.public_id,
    size:          req.body.size || 'normal',
    order:         count,
  })
  res.status(201).json({ success: true, data: item })
}

// PATCH /api/gallery/:id  (protected)
const updateGalleryItem = async (req, res) => {
  const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  })
  if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' })
  res.status(200).json({ success: true, data: item })
}

// DELETE /api/gallery/:id  (protected)
const deleteGalleryItem = async (req, res) => {
  const item = await GalleryItem.findById(req.params.id)
  if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' })

  if (item.imagePublicId) {
    await cloudinary.uploader.destroy(item.imagePublicId).catch(() => {})
  }
  await item.deleteOne()
  res.status(200).json({ success: true, message: 'Gallery item deleted' })
}

// PATCH /api/gallery/reorder  (protected)
const reorderGallery = async (req, res) => {
  const { order } = req.body
  if (!Array.isArray(order)) {
    return res.status(400).json({ success: false, message: 'order must be an array of IDs' })
  }
  const ops = order.map((id, index) => ({
    updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
  }))
  await GalleryItem.bulkWrite(ops)
  res.status(200).json({ success: true, message: 'Gallery reordered' })
}

module.exports = { getGallery, addGalleryItem, updateGalleryItem, deleteGalleryItem, reorderGallery }
