const Testimonial = require('../models/Testimonial')

// GET /api/testimonials  — public, optional ?approved=true
const getTestimonials = async (req, res) => {
  const filter = {}
  if (req.query.approved !== undefined) filter.approved = req.query.approved === 'true'
  const items = await Testimonial.find(filter).sort({ date: -1 })
  res.status(200).json({ success: true, count: items.length, data: items })
}

// POST /api/testimonials  (protected — admin adds manually)
const createTestimonial = async (req, res) => {
  if (req.body.name) req.body.avatar = req.body.name.charAt(0).toUpperCase()
  const item = await Testimonial.create(req.body)
  res.status(201).json({ success: true, data: item })
}

// PUT /api/testimonials/:id  (protected)
const updateTestimonial = async (req, res) => {
  if (req.body.name) req.body.avatar = req.body.name.charAt(0).toUpperCase()
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  })
  if (!item) return res.status(404).json({ success: false, message: 'Testimonial not found' })
  res.status(200).json({ success: true, data: item })
}

// DELETE /api/testimonials/:id  (protected)
const deleteTestimonial = async (req, res) => {
  const item = await Testimonial.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ success: false, message: 'Testimonial not found' })
  res.status(200).json({ success: true, message: 'Testimonial deleted' })
}

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial }
