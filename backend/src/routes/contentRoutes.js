const express = require('express')
const router  = express.Router()
const {
  getContent, updateBakeryInfo, updateHero, updateSettings, uploadLogo,
} = require('../controllers/contentController')
const { protect }    = require('../middleware/auth')
const { uploadLogo: logoUpload } = require('../config/cloudinary')

// Public
router.get('/', getContent)

// Protected
router.put('/bakery-info', protect, updateBakeryInfo)
router.put('/hero',        protect, updateHero)
router.put('/settings',    protect, updateSettings)
router.post('/logo',       protect, logoUpload.single('logo'), uploadLogo)

module.exports = router
