const mongoose = require('mongoose')

// Single-document model — there is always exactly ONE record (singleton pattern)
const siteContentSchema = new mongoose.Schema(
  {
    bakeryInfo: {
      name:        { type: String, default: 'Carnival Bakery' },
      tagline:     { type: String, default: 'Freshly Baked Happiness Every Day' },
      established: { type: String, default: '2008' },
      about:       { type: String, default: '' },
      address:     { type: String, default: '' },
      phone:       { type: String, default: '' },
      email:       { type: String, default: '' },
      website:     { type: String, default: '' },
      hours: {
        weekdays: { type: String, default: '7:00 AM – 9:00 PM' },
        sunday:   { type: String, default: '8:00 AM – 8:00 PM' },
      },
      social: {
        facebook:  { type: String, default: '#' },
        instagram: { type: String, default: '#' },
        twitter:   { type: String, default: '#' },
        youtube:   { type: String, default: '#' },
      },
    },

    heroContent: {
      heading:      { type: String, default: 'Freshly Baked Happiness Every Day' },
      subheading:   { type: String, default: '' },
      ctaPrimary:   { type: String, default: 'Explore Menu' },
      ctaSecondary: { type: String, default: 'Order Now' },
      badgeText:    { type: String, default: '🎪 Est. 2008 · Premium Artisan Bakery · Surat' },
    },

    settings: {
      theme: {
        primaryColor: { type: String, default: '#E8192C' },
        accentColor:  { type: String, default: '#C9A84C' },
        fontHeading:  { type: String, default: 'Playfair Display' },
        fontBody:     { type: String, default: 'Lato' },
      },
      footer: {
        copyright:      { type: String, default: `© ${new Date().getFullYear()} Carnival Bakery. All rights reserved.` },
        tagline:        { type: String, default: 'Made with ❤️ in Surat, Gujarat.' },
        showNewsletter: { type: Boolean, default: true },
        showMap:        { type: Boolean, default: true },
      },
      seo: {
        metaTitle:       { type: String, default: 'Carnival Bakery – Freshly Baked Happiness Every Day' },
        metaDescription: { type: String, default: 'Premium handcrafted cakes, pastries, artisan breads & more.' },
        keywords:        { type: String, default: 'bakery, cakes, Surat' },
      },
      logoUrl:       { type: String, default: '' },
      logoPublicId:  { type: String, default: '' },
    },
  },
  { timestamps: true }
)

// Static helper: always return the single content document
siteContentSchema.statics.getSingleton = async function () {
  let doc = await this.findOne()
  if (!doc) doc = await this.create({})
  return doc
}

module.exports = mongoose.model('SiteContent', siteContentSchema)
