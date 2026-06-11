// Central error handler — always last middleware in Express
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message    = err.message    || 'Internal Server Error'

  // Mongoose: bad ObjectId
  if (err.name === 'CastError') {
    statusCode = 400
    message    = `Invalid ${err.path}: ${err.value}`
  }

  // Mongoose: duplicate key
  if (err.code === 11000) {
    statusCode = 409
    const field = Object.keys(err.keyValue)[0]
    message    = `${field} already exists`
  }

  // Mongoose: validation error
  if (err.name === 'ValidationError') {
    statusCode = 422
    message    = Object.values(err.errors).map(e => e.message).join(', ')
  }

  // JWT: invalid token
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message    = 'Invalid token. Please log in again.'
  }

  // JWT: expired token
  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message    = 'Your session has expired. Please log in again.'
  }

  // Multer: file too large
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 413
    message    = 'File too large. Maximum size is 5MB.'
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('🔴', err)
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

module.exports = errorHandler
