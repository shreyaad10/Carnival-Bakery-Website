const express = require('express')
const router  = express.Router()
const {
  getOffers, getOffer, createOffer, updateOffer, deleteOffer,
} = require('../controllers/offerController')
const { protect }  = require('../middleware/auth')
const { validate } = require('../middleware/validate')

router.get('/',    getOffers)
router.get('/:id', getOffer)
router.post('/',   protect, validate(['title', 'description', 'badge']), createOffer)
router.put('/:id', protect, updateOffer)
router.delete('/:id', protect, deleteOffer)

module.exports = router
