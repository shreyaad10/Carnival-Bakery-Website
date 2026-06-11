const express = require('express')
const router  = express.Router()
const {
  getGallery, addGalleryItem, updateGalleryItem,
  deleteGalleryItem, reorderGallery,
} = require('../controllers/galleryController')
const { protect }       = require('../middleware/auth')
const { uploadGallery } = require('../config/cloudinary')

router.get('/', getGallery)
router.patch('/reorder', protect, reorderGallery)
router.post('/',     protect, uploadGallery.single('image'), addGalleryItem)
router.patch('/:id', protect, updateGalleryItem)
router.delete('/:id', protect, deleteGalleryItem)

module.exports = router
