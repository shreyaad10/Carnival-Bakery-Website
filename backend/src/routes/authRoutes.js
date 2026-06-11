const express = require('express')
const router  = express.Router()
const { login, getMe, changePassword } = require('../controllers/authController')
const { protect } = require('../middleware/auth')

// POST /api/auth/login
router.post('/login', login)

// GET  /api/auth/me  (protected)
router.get('/me', protect, getMe)

// PATCH /api/auth/change-password  (protected)
router.patch('/change-password', protect, changePassword)

module.exports = router
