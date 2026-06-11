const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema(
  {
    title:       { type: String, required: [true, 'Offer title is required'], trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 300 },
    badge:       { type: String, required: [true, 'Badge text is required'], trim: true, maxlength: 50 },
    icon:        { type: String, default: '🏷' },
    discount:    { type: Number, default: 0, min: 0, max: 100 },
    startDate:   { type: Date },
    endDate:     { type: Date },
    active:      { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Virtual: is the offer currently valid by date?
offerSchema.virtual('isDateValid').get(function () {
  const now = new Date()
  if (this.startDate && now < this.startDate) return false
  if (this.endDate   && now > this.endDate)   return false
  return true
})

offerSchema.index({ active: 1 })

module.exports = mongoose.model('Offer', offerSchema)
