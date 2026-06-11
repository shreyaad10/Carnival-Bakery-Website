// Lightweight field presence validator
// Usage: validate(['name','price','category'])(req, res, next)
const validate = (requiredFields) => (req, res, next) => {
  const missing = requiredFields.filter(f => {
    const val = req.body[f]
    return val === undefined || val === null || String(val).trim() === ''
  })

  if (missing.length > 0) {
    return res.status(422).json({
      success: false,
      message: `Missing required fields: ${missing.join(', ')}`,
    })
  }
  next()
}

module.exports = { validate }
