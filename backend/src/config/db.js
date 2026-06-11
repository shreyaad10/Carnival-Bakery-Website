const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Modern Mongoose doesn't need these flags but keeping explicit for clarity
    })
    console.log(`✅  MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`❌  MongoDB connection error: ${err.message}`)
    process.exit(1)
  }
}

// Log mongoose events in development
if (process.env.NODE_ENV === 'development') {
  mongoose.connection.on('disconnected', () => console.warn('⚠️  MongoDB disconnected'))
  mongoose.connection.on('reconnected',  () => console.log('✅  MongoDB reconnected'))
}

module.exports = connectDB
