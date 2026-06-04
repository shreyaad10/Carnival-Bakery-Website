import { createContext, useContext, useReducer, useCallback } from 'react'
import {
  initialProducts, initialOffers, initialGallery,
  initialTestimonials, initialMessages,
  initialBakeryInfo, initialHeroContent, initialSettings,
} from '../data/initialData'

// ─── State ────────────────────────────────────────────────────────────────────
const INITIAL = {
  products:     initialProducts,
  offers:       initialOffers,
  gallery:      initialGallery,
  testimonials: initialTestimonials,
  messages:     initialMessages,
  bakeryInfo:   initialBakeryInfo,
  heroContent:  initialHeroContent,
  settings:     initialSettings,
  toast:        null,
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    // Products
    case 'ADD_PRODUCT':      return { ...state, products: [...state.products, action.payload] }
    case 'UPDATE_PRODUCT':   return { ...state, products: state.products.map(p => p.id === action.payload.id ? action.payload : p) }
    case 'DELETE_PRODUCT':   return { ...state, products: state.products.filter(p => p.id !== action.payload) }
    // Offers
    case 'ADD_OFFER':        return { ...state, offers: [...state.offers, action.payload] }
    case 'UPDATE_OFFER':     return { ...state, offers: state.offers.map(o => o.id === action.payload.id ? action.payload : o) }
    case 'DELETE_OFFER':     return { ...state, offers: state.offers.filter(o => o.id !== action.payload) }
    // Gallery
    case 'ADD_GALLERY_ITEM':    return { ...state, gallery: [...state.gallery, action.payload] }
    case 'UPDATE_GALLERY_ITEM': return { ...state, gallery: state.gallery.map(g => g.id === action.payload.id ? action.payload : g) }
    case 'DELETE_GALLERY_ITEM': return { ...state, gallery: state.gallery.filter(g => g.id !== action.payload) }
    case 'REORDER_GALLERY':     return { ...state, gallery: action.payload }
    // Testimonials
    case 'ADD_TESTIMONIAL':    return { ...state, testimonials: [...state.testimonials, action.payload] }
    case 'UPDATE_TESTIMONIAL': return { ...state, testimonials: state.testimonials.map(t => t.id === action.payload.id ? action.payload : t) }
    case 'DELETE_TESTIMONIAL': return { ...state, testimonials: state.testimonials.filter(t => t.id !== action.payload) }
    // Messages
    case 'ADD_MESSAGE':         return { ...state, messages: [...state.messages, action.payload] }
    case 'MARK_MESSAGE_READ':   return { ...state, messages: state.messages.map(m => m.id === action.payload ? { ...m, read: true } : m) }
    case 'DELETE_MESSAGE':      return { ...state, messages: state.messages.filter(m => m.id !== action.payload) }
    // Content
    case 'UPDATE_BAKERY_INFO': return { ...state, bakeryInfo:  { ...state.bakeryInfo,  ...action.payload } }
    case 'UPDATE_HERO':        return { ...state, heroContent: { ...state.heroContent, ...action.payload } }
    case 'UPDATE_SETTINGS':    return { ...state, settings:    { ...state.settings,    ...action.payload } }
    // Toast
    case 'SET_TOAST':   return { ...state, toast: action.payload }
    case 'CLEAR_TOAST': return { ...state, toast: null }
    default: return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL)

  const showToast = useCallback((message, type = 'success') => {
    dispatch({ type: 'SET_TOAST', payload: { message, type } })
    setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 3500)
  }, [])

  // Derived stats (used by admin dashboard)
  const stats = {
    totalProducts:     state.products.length,
    featuredProducts:  state.products.filter(p => p.featured).length,
    activeOffers:      state.offers.filter(o => o.active).length,
    totalTestimonials: state.testimonials.length,
    approvedTestimonials: state.testimonials.filter(t => t.approved).length,
    unreadMessages:    state.messages.filter(m => !m.read).length,
    totalMessages:     state.messages.length,
    bestSellers:       state.products.filter(p => p.bestSeller).length,
    galleryItems:      state.gallery.filter(g => g.visible).length,
  }

  return (
    <StoreContext.Provider value={{ state, dispatch, showToast, stats }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
