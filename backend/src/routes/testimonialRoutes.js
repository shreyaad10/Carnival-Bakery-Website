const express = require('express')
const router  = express.Router()
const {
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
} = require('../controllers/testimonialController')
const { protect }  = require('../middleware/auth')
const { validate } = require('../middleware/validate')

router.get('/', getTestimonials)
router.post('/',   protect, validate(['name', 'text']), createTestimonial)
router.put('/:id', protect, updateTestimonial)
router.delete('/:id', protect, deleteTestimonial)

module.exports = router
