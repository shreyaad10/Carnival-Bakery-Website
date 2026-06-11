const express = require('express')
const router  = express.Router()
const {
  createMessage, getMessages, getMessage, markRead, deleteMessage,
} = require('../controllers/messageController')
const { protect } = require('../middleware/auth')

// Public — contact form
router.post('/', createMessage)

// Protected — admin inbox
router.get('/',           protect, getMessages)
router.get('/:id',        protect, getMessage)
router.patch('/:id/read', protect, markRead)
router.delete('/:id',     protect, deleteMessage)

module.exports = router
