const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema(
  {
    name:        { type: String, required: [true, 'Name is required'], trim: true, maxlength: 80 },
    role:        { type: String, trim: true, maxlength: 80, default: 'Customer' },
    rating:      { type: Number, min: 1, max: 5, default: 5 },
    text:        { type: String, required: [true, 'Review text is required'], trim: true, maxlength: 600 },
    avatar:      { type: String, default: '' },          // initials fallback
    avatarColor: { type: String, default: '#E8192C' },
    approved:    { type: Boolean, default: false },
    date:        { type: Date, default: Date.now },
  },
  { timestamps: true }
)

testimonialSchema.index({ approved: 1 })

module.exports = mongoose.model('Testimonial', testimonialSchema)
