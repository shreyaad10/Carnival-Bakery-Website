const jwt   = require('jsonwebtoken')
const Admin = require('../models/Admin')

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' })
  }

  // Explicitly select password (it is hidden by default)
  const admin = await Admin.findOne({ email }).select('+password')
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' })
  }

  const token = signToken(admin._id)

  res.status(200).json({
    success: true,
    token,
    admin: { id: admin._id, email: admin.email, name: admin.name },
  })
}

// GET /api/auth/me  (protected)
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: { id: req.admin._id, email: req.admin.email, name: req.admin.name },
  })
}

// PATCH /api/auth/change-password  (protected)
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body

  const admin = await Admin.findById(req.admin._id).select('+password')
  if (!(await admin.comparePassword(currentPassword))) {
    return res.status(401).json({ success: false, message: 'Current password is incorrect' })
  }
  if (!newPassword || newPassword.length < 8) {
    return res.status(422).json({ success: false, message: 'New password must be at least 8 characters' })
  }

  admin.password = newPassword
  await admin.save()

  res.status(200).json({ success: true, message: 'Password changed successfully' })
}

module.exports = { login, getMe, changePassword }
