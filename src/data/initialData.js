// ─────────────────────────────────────────────────────────────────────────────
// INITIAL DATA — single source of truth shared by the website AND admin panel
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIES = ['Cake', 'Pastry', 'Bread', 'Cookies', 'Cupcake', 'Seasonal']

export const initialProducts = [
  { id:'1', name:'Red Velvet Dream',   category:'Cake',    price:850,  description:'Layered red velvet with silky cream cheese frosting',      featured:true,  bestSeller:true,  image:'🎂', status:'active',   stock:12, bgColor:'#FFE5E8', tag:'Bestseller' },
  { id:'2', name:'Classic Croissant',  category:'Pastry',  price:120,  description:'Buttery, flaky layers baked fresh every morning',           featured:true,  bestSeller:true,  image:'🥐', status:'active',   stock:40, bgColor:'#FFF5E0', tag:'Daily Fresh' },
  { id:'3', name:'Macaron Tower',      category:'Cookies', price:560,  description:'Parisian-style macarons in 12 delicate seasonal flavors',   featured:false, bestSeller:false, image:'🍪', status:'active',   stock:8,  bgColor:'#F5E5FF', tag:'Premium' },
  { id:'4', name:'Sourdough Loaf',     category:'Bread',   price:280,  description:'72-hour cold-fermented artisan sourdough, crusty perfection',featured:true,  bestSeller:true,  image:'🍞', status:'active',   stock:15, bgColor:'#FFF0E0', tag:'Artisan' },
  { id:'5', name:'Strawberry Cupcake', category:'Cupcake', price:95,   description:'Fresh strawberry compote with Swiss meringue buttercream',  featured:false, bestSeller:true,  image:'🧁', status:'active',   stock:30, bgColor:'#FFE5EE', tag:'Fan Fave' },
  { id:'6', name:'Éclair Royale',      category:'Pastry',  price:195,  description:'Choux pastry filled with vanilla crème pâtissière',         featured:false, bestSeller:false, image:'🍫', status:'inactive', stock:0,  bgColor:'#E5F5FF', tag:'New' },
  { id:'7', name:'Mango Cheesecake',   category:'Cake',    price:720,  description:'Alphonso mango mousse on a buttery digestive biscuit base', featured:true,  bestSeller:false, image:'🍰', status:'active',   stock:6,  bgColor:'#FFF0D0', tag:'Seasonal' },
  { id:'8', name:'Cinnamon Roll',      category:'Bread',   price:165,  description:'Warm, pillowy rolls with cinnamon sugar and cream drizzle', featured:false, bestSeller:false, image:'🍥', status:'active',   stock:22, bgColor:'#FFF8E5', tag:'Morning' },
  { id:'9', name:'Almond Biscotti',    category:'Cookies', price:220,  description:'Twice-baked Italian-style biscotti with whole almonds',     featured:false, bestSeller:false, image:'🍩', status:'active',   stock:18, bgColor:'#F0EFE5', tag:'Import' },
]

export const initialOffers = [
  { id:'1', title:'Morning Special',  description:'All pastries and breads ordered before 10 AM',         discount:20, startDate:'2024-01-01', endDate:'2024-12-31', active:true,  badge:'20% OFF',      icon:'🌅' },
  { id:'2', title:'Weekend Bundle',   description:'Buy 2 selected cakes every Saturday & Sunday',         discount:33, startDate:'2024-01-06', endDate:'2024-12-29', active:true,  badge:'BUY 2 GET 1',  icon:'🎉' },
  { id:'3', title:'Birthday Treat',   description:'Complimentary cupcake on any birthday cake order',     discount:0,  startDate:'2024-01-01', endDate:'2024-12-31', active:true,  badge:'FREE CUPCAKE', icon:'🎂' },
  { id:'4', title:'Carnival Week',    description:'25% off entire order with code CARNIVAL25',            discount:25, startDate:'2024-06-01', endDate:'2024-06-07', active:false, badge:'CARNIVAL25',   icon:'🎪' },
]

export const initialGallery = [
  { id:'1', label:'Wedding Cake',     emoji:'💒', bg:'linear-gradient(135deg,#FF6B8A,#FF2D55)', order:1, visible:true, size:'tall'   },
  { id:'2', label:'Pastry Selection', emoji:'🥐', bg:'linear-gradient(135deg,#C9A84C,#E8192C)', order:2, visible:true, size:'normal' },
  { id:'3', label:'Artisan Breads',   emoji:'🍞', bg:'linear-gradient(135deg,#8B4513,#D2691E)', order:3, visible:true, size:'normal' },
  { id:'4', label:'Cupcake Tower',    emoji:'🧁', bg:'linear-gradient(135deg,#FF69B4,#FF1493)', order:4, visible:true, size:'tall'   },
  { id:'5', label:'Macaron Box',      emoji:'🍪', bg:'linear-gradient(135deg,#9B59B6,#E8192C)', order:5, visible:true, size:'normal' },
  { id:'6', label:'Birthday Cake',    emoji:'🎂', bg:'linear-gradient(135deg,#E8192C,#8B0000)', order:6, visible:true, size:'normal' },
  { id:'7', label:'Breakfast Spread', emoji:'☕', bg:'linear-gradient(135deg,#6F4E37,#A0522D)', order:7, visible:false, size:'normal' },
  { id:'8', label:'Soufflé',          emoji:'🍮', bg:'linear-gradient(135deg,#DAA520,#B8860B)', order:8, visible:true, size:'normal' },
]

export const initialTestimonials = [
  { id:'1', name:'Priya Sharma',  role:'Food Blogger',    rating:5, text:"Carnival Bakery's red velvet cake is absolutely divine. The layers are perfectly moist and the cream cheese frosting is heavenly. My go-to bakery in Surat!", approved:true,  date:'2024-03-15', avatar:'P', avatarColor:'#E8192C' },
  { id:'2', name:'Rahul Mehta',   role:'Regular Customer', rating:5, text:"I order from Carnival every week. The sourdough bread is phenomenal — crusty outside, chewy inside. You can taste the craftsmanship in every bite.", approved:true,  date:'2024-03-10', avatar:'R', avatarColor:'#CC0E20' },
  { id:'3', name:'Ananya Patel',  role:'Event Planner',   rating:5, text:"I've ordered custom cakes for 20+ events. Carnival Bakery never disappoints — stunning presentations and flavors that leave guests asking for more.", approved:true,  date:'2024-02-28', avatar:'A', avatarColor:'#8B0000' },
  { id:'4', name:'Vikram Singh',  role:'Corporate Client', rating:5, text:"We get our office breakfast catered by Carnival. Professional, punctual, and absolutely delicious every single time!", approved:true,  date:'2024-02-20', avatar:'V', avatarColor:'#A80A18' },
  { id:'5', name:'Meera Joshi',   role:'Home Baker',      rating:4, text:"Great quality and always fresh. The macarons are a favourite for gifting.",  approved:false, date:'2024-04-01', avatar:'M', avatarColor:'#6E060E' },
]

export const initialMessages = [
  { id:'1', name:'Sunita Agarwal', email:'sunita@gmail.com',    phone:'+91 98765 43210', subject:'Custom Cake Order',   message:'Hi, I would like to order a custom 3-tier wedding cake for June 15th. Please let me know pricing and design options.',          date:'2024-04-10 09:45', read:false },
  { id:'2', name:'Karan Desai',    email:'karan.d@yahoo.com',   phone:'+91 87654 32109', subject:'Bulk Corporate Order', message:'We need 50 pastry boxes for our company event on April 20th. Can you accommodate this order?',                                date:'2024-04-09 14:22', read:false },
  { id:'3', name:'Pooja Nair',     email:'pooja.n@outlook.com', phone:'+91 76543 21098', subject:'Feedback',            message:'Just wanted to say the sourdough bread I picked up yesterday was absolutely fantastic. Keep up the great work!',             date:'2024-04-08 11:05', read:true  },
  { id:'4', name:'Amit Kulkarni',  email:'amit.k@gmail.com',    phone:'+91 65432 10987', subject:'Catering Enquiry',    message:'Interested in weekly breakfast catering for our office of 30 people. What packages do you offer?',                            date:'2024-04-07 16:38', read:true  },
]

export const initialBakeryInfo = {
  name:        'Carnival Bakery',
  tagline:     'Freshly Baked Happiness Every Day',
  established: '2008',
  about:       "What started as a small family kitchen in Surat has grown into the city's most beloved bakery. Carnival Bakery was born from a simple belief — that exceptional baked goods can transform ordinary moments into unforgettable memories. Our master bakers wake before dawn to craft each item entirely by hand.",
  address:     '42 Ring Road, Adajan Patia, Surat, Gujarat 395009',
  phone:       '+91 99799 44444',
  email:       'hello@carnivalbakery.in',
  website:     'www.carnivalbakery.in',
  hours:       { weekdays:'7:00 AM – 9:00 PM', sunday:'8:00 AM – 8:00 PM' },
  social:      { facebook:'#', instagram:'#', twitter:'#', youtube:'#' },
}

export const initialHeroContent = {
  heading:      'Freshly Baked Happiness Every Day',
  subheading:   'Handcrafted cakes, artisan breads & exquisite pastries — made with love and the finest ingredients, because every bite deserves to be extraordinary.',
  ctaPrimary:   'Explore Menu',
  ctaSecondary: 'Order Now',
  badgeText:    '🎪 Est. 2008 · Premium Artisan Bakery · Surat',
}

export const initialSettings = {
  theme:  { primaryColor:'#E8192C', accentColor:'#C9A84C', fontHeading:'Playfair Display', fontBody:'Lato' },
  footer: { copyright:`© ${new Date().getFullYear()} Carnival Bakery. All rights reserved.`, tagline:'Made with ❤️ in Surat, Gujarat.', showNewsletter:true, showMap:true },
  seo:    { metaTitle:'Carnival Bakery – Freshly Baked Happiness Every Day', metaDescription:'Premium handcrafted cakes, pastries, artisan breads & more.', keywords:'bakery, cakes, Surat' },
}

export const FEATURES = [
  { id:1, icon:'🌾', title:'Fresh Ingredients',   description:'We source premium, locally-grown ingredients daily — no preservatives, no shortcuts, ever.' },
  { id:2, icon:'👨‍🍳', title:'Handcrafted Recipes',  description:'Every product is shaped by hand using time-honored recipes passed down through generations.' },
  { id:3, icon:'⏰', title:'Same-Day Baking',     description:'Our bakers begin at 4am so everything on your plate was baked fresh that very morning.' },
  { id:4, icon:'❤️', title:'Customer Satisfaction',description:'Thousands of happy customers trust Carnival for celebrations, daily treats, and gifting.' },
]
