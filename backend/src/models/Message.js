const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    name:    { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
    email:   { type: String, required: [true, 'Email is required'], trim: true, lowercase: true, maxlength: 200 },
    phone:   { type: String, trim: true, maxlength: 30, default: '—' },
    subject: { type: String, trim: true, maxlength: 200, default: 'General Enquiry' },
    message: { type: String, required: [true, 'Message is required'], trim: true, maxlength: 2000 },
    read:    { type: Boolean, default: false },
  },
  { timestamps: true }   // createdAt = date received
)

messageSchema.index({ read: 1 })
messageSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Message', messageSchema)
