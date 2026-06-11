const express = require('express')
const router  = express.Router()
const {
  getProducts, getProduct, createProduct,
  updateProduct, deleteProduct, reorderProducts,
} = require('../controllers/productController')
const { protect }       = require('../middleware/auth')
const { uploadProduct } = require('../config/cloudinary')
const { validate }      = require('../middleware/validate')

// Public
router.get('/',    getProducts)
router.get('/:id', getProduct)

// Protected — reorder must come before /:id
router.patch('/reorder', protect, reorderProducts)

router.post(
  '/',
  protect,
  uploadProduct.single('image'),
  validate(['name', 'category', 'price', 'description']),
  createProduct
)

router.put('/:id', protect, uploadProduct.single('image'), updateProduct)
router.delete('/:id', protect, deleteProduct)

module.exports = router
