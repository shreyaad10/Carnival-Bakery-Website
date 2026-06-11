/**
 * Seed Script
 * Run once to populate the database:  npm run seed
 * Add --destroy flag to wipe and re-seed:  npm run seed -- --destroy
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') })
const mongoose    = require('mongoose')
const connectDB   = require('../config/db')
const Product     = require('../models/Product')
const Offer       = require('../models/Offer')
const GalleryItem = require('../models/GalleryItem')
const Testimonial = require('../models/Testimonial')
const SiteContent = require('../models/SiteContent')
const Admin       = require('../models/Admin')

// ── Seed data (mirrors src/data/initialData.js in the frontend) ──────────────

const products = [
  { name:'Red Velvet Dream',   category:'Cake',    price:850,  description:'Layered red velvet with silky cream cheese frosting',      featured:true,  bestSeller:true,  image:'🎂', bgColor:'#FFE5E8', tag:'Bestseller', status:'active',   stock:12, order:0 },
  { name:'Classic Croissant',  category:'Pastry',  price:120,  description:'Buttery, flaky layers baked fresh every morning',           featured:true,  bestSeller:true,  image:'🥐', bgColor:'#FFF5E0', tag:'Daily Fresh', status:'active',   stock:40, order:1 },
  { name:'Macaron Tower',      category:'Cookies', price:560,  description:'Parisian-style macarons in 12 delicate seasonal flavors',   featured:false, bestSeller:false, image:'🍪', bgColor:'#F5E5FF', tag:'Premium',    status:'active',   stock:8,  order:2 },
  { name:'Sourdough Loaf',     category:'Bread',   price:280,  description:'72-hour cold-fermented artisan sourdough, crusty perfection',featured:true,  bestSeller:true,  image:'🍞', bgColor:'#FFF0E0', tag:'Artisan',    status:'active',   stock:15, order:3 },
  { name:'Strawberry Cupcake', category:'Cupcake', price:95,   description:'Fresh strawberry compote with Swiss meringue buttercream',  featured:false, bestSeller:true,  image:'🧁', bgColor:'#FFE5EE', tag:'Fan Fave',   status:'active',   stock:30, order:4 },
  { name:'Éclair Royale',      category:'Pastry',  price:195,  description:'Choux pastry filled with vanilla crème pâtissière',         featured:false, bestSeller:false, image:'🍫', bgColor:'#E5F5FF', tag:'New',        status:'inactive', stock:0,  order:5 },
  { name:'Mango Cheesecake',   category:'Cake',    price:720,  description:'Alphonso mango mousse on a buttery digestive biscuit base', featured:true,  bestSeller:false, image:'🍰', bgColor:'#FFF0D0', tag:'Seasonal',   status:'active',   stock:6,  order:6 },
  { name:'Cinnamon Roll',      category:'Bread',   price:165,  description:'Warm, pillowy rolls with cinnamon sugar and cream drizzle', featured:false, bestSeller:false, image:'🍥', bgColor:'#FFF8E5', tag:'Morning',    status:'active',   stock:22, order:7 },
  { name:'Almond Biscotti',    category:'Cookies', price:220,  description:'Twice-baked Italian-style biscotti with whole almonds',     featured:false, bestSeller:false, image:'🍩', bgColor:'#F0EFE5', tag:'Import',     status:'active',   stock:18, order:8 },
]

const offers = [
  { title:'Morning Special',  description:'All pastries and breads ordered before 10 AM',       discount:20, active:true,  badge:'20% OFF',      icon:'🌅' },
  { title:'Weekend Bundle',   description:'Buy 2 selected cakes every Saturday & Sunday',        discount:33, active:true,  badge:'BUY 2 GET 1',  icon:'🎉' },
  { title:'Birthday Treat',   description:'Complimentary cupcake on any birthday cake order',    discount:0,  active:true,  badge:'FREE CUPCAKE', icon:'🎂' },
  { title:'Carnival Week',    description:'25% off entire order with code CARNIVAL25',           discount:25, active:false, badge:'CARNIVAL25',   icon:'🎪' },
]

const gallery = [
  { label:'Wedding Cake',     emoji:'💒', bg:'linear-gradient(135deg,#FF6B8A,#FF2D55)', order:0, visible:true, size:'tall'   },
  { label:'Pastry Selection', emoji:'🥐', bg:'linear-gradient(135deg,#C9A84C,#E8192C)', order:1, visible:true, size:'normal' },
  { label:'Artisan Breads',   emoji:'🍞', bg:'linear-gradient(135deg,#8B4513,#D2691E)', order:2, visible:true, size:'normal' },
  { label:'Cupcake Tower',    emoji:'🧁', bg:'linear-gradient(135deg,#FF69B4,#FF1493)', order:3, visible:true, size:'tall'   },
  { label:'Macaron Box',      emoji:'🍪', bg:'linear-gradient(135deg,#9B59B6,#E8192C)', order:4, visible:true, size:'normal' },
  { label:'Birthday Cake',    emoji:'🎂', bg:'linear-gradient(135deg,#E8192C,#8B0000)', order:5, visible:true, size:'normal' },
]

const testimonials = [
  { name:'Priya Sharma',  role:'Food Blogger',    rating:5, text:"Carnival Bakery's red velvet cake is absolutely divine. My go-to bakery in Surat!",                                   approved:true,  avatarColor:'#E8192C' },
  { name:'Rahul Mehta',   role:'Regular Customer', rating:5, text:"The sourdough bread is phenomenal — crusty outside, chewy inside. You can taste the craftsmanship.",                approved:true,  avatarColor:'#CC0E20' },
  { name:'Ananya Patel',  role:'Event Planner',   rating:5, text:"I've ordered custom cakes for 20+ events. Stunning presentations and flavors that leave guests asking for more.",     approved:true,  avatarColor:'#8B0000' },
  { name:'Vikram Singh',  role:'Corporate Client', rating:5, text:"We get our office breakfast catered by Carnival. Professional, punctual, and absolutely delicious every time!",      approved:true,  avatarColor:'#A80A18' },
  { name:'Meera Joshi',   role:'Home Baker',      rating:4, text:"Great quality and always fresh. The macarons are a favourite for gifting.",                                           approved:false, avatarColor:'#6E060E' },
]

const siteContent = {
  bakeryInfo: {
    name:'Carnival Bakery', tagline:'Freshly Baked Happiness Every Day', established:'2008',
    about:"What started as a small family kitchen in Surat has grown into the city's most beloved bakery. We believe exceptional baked goods can transform ordinary moments into unforgettable memories.",
    address:'42 Ring Road, Adajan Patia, Surat, Gujarat 395009',
    phone:'+91 99799 44444', email:'hello@carnivalbakery.in', website:'www.carnivalbakery.in',
    hours:{ weekdays:'7:00 AM – 9:00 PM', sunday:'8:00 AM – 8:00 PM' },
    social:{ facebook:'#', instagram:'#', twitter:'#', youtube:'#' },
  },
  heroContent: {
    heading:'Freshly Baked Happiness Every Day',
    subheading:"Handcrafted cakes, artisan breads & exquisite pastries — made with love and the finest ingredients, because every bite deserves to be extraordinary.",
    ctaPrimary:'Explore Menu', ctaSecondary:'Order Now',
    badgeText:'🎪 Est. 2008 · Premium Artisan Bakery · Vapi',
  },
}

// ── Main seed function ────────────────────────────────────────────────────────

const seed = async () => {
  await connectDB()

  const destroy = process.argv.includes('--destroy')

  if (destroy) {
    console.log('🗑  Wiping existing data…')
    await Promise.all([
      Product.deleteMany({}),
      Offer.deleteMany({}),
      GalleryItem.deleteMany({}),
      Testimonial.deleteMany({}),
      SiteContent.deleteMany({}),
    ])
    console.log('✅  Collections cleared')
  }

  // Upsert admin account
  const adminEmail    = process.env.ADMIN_EMAIL    || 'owner@carnivalbakery.in'
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!'
  const existing      = await Admin.findOne({ email: adminEmail })
  if (!existing) {
    await Admin.create({ email: adminEmail, password: adminPassword, name: 'Bakery Owner' })
    console.log(`✅  Admin created: ${adminEmail}`)
  } else {
    console.log(`ℹ️   Admin already exists: ${adminEmail}`)
  }

  // Insert collections
  const [p, o, g, t] = await Promise.all([
    Product.insertMany(products),
    Offer.insertMany(offers),
    GalleryItem.insertMany(gallery),
    Testimonial.insertMany(testimonials),
  ])
  console.log(`✅  Seeded: ${p.length} products, ${o.length} offers, ${g.length} gallery items, ${t.length} testimonials`)

  // Create site content singleton
  const content = await SiteContent.getSingleton()
  Object.assign(content.bakeryInfo,  siteContent.bakeryInfo)
  Object.assign(content.heroContent, siteContent.heroContent)
  content.markModified('bakeryInfo')
  content.markModified('heroContent')
  await content.save()
  console.log('✅  Site content seeded')

  await mongoose.disconnect()
  console.log('\n🎉  Database seeded successfully!\n')
  process.exit(0)
}

seed().catch(err => {
  console.error('❌  Seed failed:', err)
  process.exit(1)
})
