const Message = require('../models/Message')

// POST /api/messages  — public (contact form submission)
const createMessage = async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(422).json({ success: false, message: 'Name, email and message are required' })
  }
  const msg = await Message.create(req.body)
  res.status(201).json({ success: true, message: 'Message received! We will respond shortly.', data: msg })
}

// GET /api/messages  (protected) — optional ?read=false
const getMessages = async (req, res) => {
  const filter = {}
  if (req.query.read !== undefined) filter.read = req.query.read === 'true'
  const messages = await Message.find(filter).sort({ createdAt: -1 })
  res.status(200).json({ success: true, count: messages.length, data: messages })
}

// GET /api/messages/:id  (protected)
const getMessage = async (req, res) => {
  const msg = await Message.findById(req.params.id)
  if (!msg) return res.status(404).json({ success: false, message: 'Message not found' })

  // Auto-mark as read when opened
  if (!msg.read) { msg.read = true; await msg.save() }

  res.status(200).json({ success: true, data: msg })
}

// PATCH /api/messages/:id/read  (protected)
const markRead = async (req, res) => {
  const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
  if (!msg) return res.status(404).json({ success: false, message: 'Message not found' })
  res.status(200).json({ success: true, data: msg })
}

// DELETE /api/messages/:id  (protected)
const deleteMessage = async (req, res) => {
  const msg = await Message.findByIdAndDelete(req.params.id)
  if (!msg) return res.status(404).json({ success: false, message: 'Message not found' })
  res.status(200).json({ success: true, message: 'Message deleted' })
}

module.exports = { createMessage, getMessages, getMessage, markRead, deleteMessage }
