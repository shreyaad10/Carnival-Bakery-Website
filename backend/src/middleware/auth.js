const jwt   = require('jsonwebtoken')
const Admin = require('../models/Admin')

// Protect admin routes — attach admin to req.admin
const protect = async (req, res, next) => {
  let token

  // Support both Bearer header and cookie
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies?.token) {
    token = req.cookies.token
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorised — no token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = await Admin.findById(decoded.id)
    if (!req.admin) {
      return res.status(401).json({ success: false, message: 'Admin account not found' })
    }
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' })
  }
}

module.exports = { protect }
