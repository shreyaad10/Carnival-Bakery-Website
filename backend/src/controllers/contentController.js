const SiteContent    = require('../models/SiteContent')
const { cloudinary, uploadLogoImage } = require('../config/cloudinary')

// GET /api/content  — public
const getContent = async (req, res) => {
  const content = await SiteContent.getSingleton()
  res.status(200).json({ success: true, data: content })
}

// PUT /api/content/bakery-info  (protected)
const updateBakeryInfo = async (req, res) => {
  const content = await SiteContent.getSingleton()
  Object.assign(content.bakeryInfo, req.body)
  content.markModified('bakeryInfo')
  await content.save()
  res.status(200).json({ success: true, data: content.bakeryInfo })
}

// PUT /api/content/hero  (protected)
const updateHero = async (req, res) => {
  const content = await SiteContent.getSingleton()
  Object.assign(content.heroContent, req.body)
  content.markModified('heroContent')
  await content.save()
  res.status(200).json({ success: true, data: content.heroContent })
}

// PUT /api/content/settings  (protected)
const updateSettings = async (req, res) => {
  const content = await SiteContent.getSingleton()
  if (req.body.theme)  Object.assign(content.settings.theme,  req.body.theme)
  if (req.body.footer) Object.assign(content.settings.footer, req.body.footer)
  if (req.body.seo)    Object.assign(content.settings.seo,    req.body.seo)
  content.markModified('settings')
  await content.save()
  res.status(200).json({ success: true, data: content.settings })
}

// POST /api/content/logo  (protected + file upload)
const uploadLogo = async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Logo image is required' })

  const content = await SiteContent.getSingleton()

  // Delete old logo if it exists
  if (content.settings.logoPublicId) {
    await cloudinary.uploader.destroy(content.settings.logoPublicId).catch(() => {})
  }

  const result = await uploadLogoImage(req.file.buffer)

  content.settings.logoUrl      = result.secure_url
  content.settings.logoPublicId = result.public_id
  content.markModified('settings')
  await content.save()

  res.status(200).json({ success: true, logoUrl: result.secure_url })
}

module.exports = { getContent, updateBakeryInfo, updateHero, updateSettings, uploadLogo }
