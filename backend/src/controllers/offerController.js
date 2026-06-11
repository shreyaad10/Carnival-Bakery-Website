const Offer = require('../models/Offer')

// GET /api/offers  — public, optional ?active=true
const getOffers = async (req, res) => {
  const filter = {}
  if (req.query.active !== undefined) filter.active = req.query.active === 'true'
  const offers = await Offer.find(filter).sort({ createdAt: -1 })
  res.status(200).json({ success: true, count: offers.length, data: offers })
}

// GET /api/offers/:id
const getOffer = async (req, res) => {
  const offer = await Offer.findById(req.params.id)
  if (!offer) return res.status(404).json({ success: false, message: 'Offer not found' })
  res.status(200).json({ success: true, data: offer })
}

// POST /api/offers  (protected)
const createOffer = async (req, res) => {
  const offer = await Offer.create(req.body)
  res.status(201).json({ success: true, data: offer })
}

// PUT /api/offers/:id  (protected)
const updateOffer = async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  })
  if (!offer) return res.status(404).json({ success: false, message: 'Offer not found' })
  res.status(200).json({ success: true, data: offer })
}

// DELETE /api/offers/:id  (protected)
const deleteOffer = async (req, res) => {
  const offer = await Offer.findByIdAndDelete(req.params.id)
  if (!offer) return res.status(404).json({ success: false, message: 'Offer not found' })
  res.status(200).json({ success: true, message: 'Offer deleted' })
}

module.exports = { getOffers, getOffer, createOffer, updateOffer, deleteOffer }
