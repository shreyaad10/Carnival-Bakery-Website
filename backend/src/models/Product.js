const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: [true, 'Product name is required'], trim: true, maxlength: 120 },
    category:    { type: String, required: true, enum: ['Cake','Pastry','Bread','Cookies','Cupcake','Seasonal'] },
    price:       { type: Number, required: [true, 'Price is required'], min: 0 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    image:       { type: String, default: '🎂' },           // emoji fallback
    imageUrl:    { type: String, default: '' },              // Cloudinary URL
    imagePublicId:{ type: String, default: '' },             // Cloudinary public_id for deletion
    bgColor:     { type: String, default: '#FFE5E8' },
    tag:         { type: String, default: 'New', maxlength: 30 },
    featured:    { type: Boolean, default: false },
    bestSeller:  { type: Boolean, default: false },
    status:      { type: String, enum: ['active','inactive','draft'], default: 'active' },
    stock:       { type: Number, default: 0, min: 0 },
    order:       { type: Number, default: 0 },              // for manual sorting
  },
  {
    timestamps: true,   // adds createdAt and updatedAt automatically
    toJSON: { virtuals: true },
  }
)

// Virtual: formatted price
productSchema.virtual('formattedPrice').get(function () {
  return `₹${this.price.toLocaleString('en-IN')}`
})

// Index for fast filtered queries
productSchema.index({ category: 1, status: 1 })
productSchema.index({ featured: 1 })
productSchema.index({ bestSeller: 1 })

module.exports = mongoose.model('Product', productSchema)
