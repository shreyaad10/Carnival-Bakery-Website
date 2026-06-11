const mongoose = require('mongoose')

const galleryItemSchema = new mongoose.Schema(
  {
    label:       { type: String, required: [true, 'Image label is required'], trim: true, maxlength: 80 },
    emoji:       { type: String, default: '🎂' },
    imageUrl:    { type: String, default: '' },
    imagePublicId:{ type: String, default: '' },
    bg:          { type: String, default: 'linear-gradient(135deg,#E8192C,#8B0000)' },
    size:        { type: String, enum: ['normal','tall'], default: 'normal' },
    order:       { type: Number, default: 0 },
    visible:     { type: Boolean, default: true },
  },
  { timestamps: true }
)

galleryItemSchema.index({ visible: 1, order: 1 })

module.exports = mongoose.model('GalleryItem', galleryItemSchema)
