/**
 * StoreContext.jsx — Unified shared state
 *
 * MODE SWITCH:
 *   Set VITE_API_URL in your .env to connect to the backend.
 *   Leave it empty to run in local-state-only mode (no backend needed).
 *
 * HOW IT WORKS:
 *   - All state lives here and is shared between the website and admin.
 *   - Every action dispatches locally first (instant UI update),
 *     then syncs to the API in the background (optimistic updates).
 *   - On first load, if VITE_API_URL is set, data is fetched from the API.
 */

import { createContext, useContext, useReducer, useCallback, useEffect, useState } from 'react'
import {
  initialProducts, initialOffers, initialGallery,
  initialTestimonials, initialMessages,
  initialBakeryInfo, initialHeroContent, initialSettings,
} from '../data/initialData'

// ─── Detect API mode ──────────────────────────────────────────────────────────
const API_URL   = import.meta.env.VITE_API_URL || ''
const API_MODE  = Boolean(API_URL)
const getToken  = () => localStorage.getItem('carnival_token')

// ─── API helper ───────────────────────────────────────────────────────────────
async function apiFetch(method, path, body = null, isFormData = false) {
  const headers = {}
  const token   = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (!isFormData && body) headers['Content-Type'] = 'application/json'

  const res  = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || `API error ${res.status}`)
  return data
}

// ─── Initial state ────────────────────────────────────────────────────────────
const DEFAULT_STATE = {
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
    case 'SET_PRODUCTS':     return { ...state, products: action.payload }
    case 'ADD_PRODUCT':      return { ...state, products: [...state.products, action.payload] }
    case 'UPDATE_PRODUCT':   return { ...state, products: state.products.map(p => (p.id || p._id) === (action.payload.id || action.payload._id) ? { ...p, ...action.payload } : p) }
    case 'DELETE_PRODUCT':   return { ...state, products: state.products.filter(p => (p.id || p._id) !== action.payload) }

    // Offers
    case 'SET_OFFERS':       return { ...state, offers: action.payload }
    case 'ADD_OFFER':        return { ...state, offers: [...state.offers, action.payload] }
    case 'UPDATE_OFFER':     return { ...state, offers: state.offers.map(o => (o.id || o._id) === (action.payload.id || action.payload._id) ? { ...o, ...action.payload } : o) }
    case 'DELETE_OFFER':     return { ...state, offers: state.offers.filter(o => (o.id || o._id) !== action.payload) }

    // Gallery
    case 'SET_GALLERY':         return { ...state, gallery: action.payload }
    case 'ADD_GALLERY_ITEM':    return { ...state, gallery: [...state.gallery, action.payload] }
    case 'UPDATE_GALLERY_ITEM': return { ...state, gallery: state.gallery.map(g => (g.id || g._id) === (action.payload.id || action.payload._id) ? { ...g, ...action.payload } : g) }
    case 'DELETE_GALLERY_ITEM': return { ...state, gallery: state.gallery.filter(g => (g.id || g._id) !== action.payload) }
    case 'REORDER_GALLERY':     return { ...state, gallery: action.payload }

    // Testimonials
    case 'SET_TESTIMONIALS':   return { ...state, testimonials: action.payload }
    case 'ADD_TESTIMONIAL':    return { ...state, testimonials: [...state.testimonials, action.payload] }
    case 'UPDATE_TESTIMONIAL': return { ...state, testimonials: state.testimonials.map(t => (t.id || t._id) === (action.payload.id || action.payload._id) ? { ...t, ...action.payload } : t) }
    case 'DELETE_TESTIMONIAL': return { ...state, testimonials: state.testimonials.filter(t => (t.id || t._id) !== action.payload) }

    // Messages
    case 'SET_MESSAGES':      return { ...state, messages: action.payload }
    case 'ADD_MESSAGE':       return { ...state, messages: [action.payload, ...state.messages] }
    case 'MARK_MESSAGE_READ': return { ...state, messages: state.messages.map(m => (m.id || m._id) === action.payload ? { ...m, read: true } : m) }
    case 'DELETE_MESSAGE':    return { ...state, messages: state.messages.filter(m => (m.id || m._id) !== action.payload) }

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

// ─── Helper: normalise MongoDB _id → id ──────────────────────────────────────
const norm = (item) => item._id ? { ...item, id: item._id } : item
const normArr = (arr) => Array.isArray(arr) ? arr.map(norm) : arr

// ─── Context ──────────────────────────────────────────────────────────────────
const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)
  const [apiReady, setApiReady] = useState(!API_MODE)

  // ── Load all data from API on first mount ─────────────────────────────────
  useEffect(() => {
    if (!API_MODE) return

    const loadAll = async () => {
      try {
        const [products, offers, gallery, testimonials, messages, content] = await Promise.all([
          apiFetch('GET', '/products').then(r => normArr(r.data)),
          apiFetch('GET', '/offers').then(r => normArr(r.data)),
          apiFetch('GET', '/gallery').then(r => normArr(r.data)),
          apiFetch('GET', '/testimonials').then(r => normArr(r.data)),
          getToken() ? apiFetch('GET', '/messages').then(r => normArr(r.data)) : Promise.resolve(null),
          apiFetch('GET', '/content').then(r => r.data),
        ])

        dispatch({ type: 'SET_PRODUCTS',     payload: products })
        dispatch({ type: 'SET_OFFERS',       payload: offers })
        dispatch({ type: 'SET_GALLERY',      payload: gallery })
        dispatch({ type: 'SET_TESTIMONIALS', payload: testimonials })
        if (messages) dispatch({ type: 'SET_MESSAGES', payload: messages })
        if (content) {
          dispatch({ type: 'UPDATE_BAKERY_INFO', payload: content.bakeryInfo })
          dispatch({ type: 'UPDATE_HERO',        payload: content.heroContent })
          dispatch({ type: 'UPDATE_SETTINGS',    payload: content.settings })
        }
        setApiReady(true)
      } catch (err) {
        console.warn('API load failed, using local data:', err.message)
        setApiReady(true)
      }
    }

    loadAll()
  }, [])

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showToast = useCallback((message, type = 'success') => {
    dispatch({ type: 'SET_TOAST', payload: { message, type } })
    setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 3500)
  }, [])

  // ── API-aware dispatch ────────────────────────────────────────────────────
  // Dispatches locally immediately, then syncs to API silently
  const apiDispatch = useCallback(async (action) => {
    // Always update local state first for instant UI response
    dispatch(action)

    if (!API_MODE) return

    try {
      switch (action.type) {

        // ── Products ────────────────────────────────────────────────────────
        case 'ADD_PRODUCT': {
          const fd = new FormData()
          Object.entries(action.payload).forEach(([k, v]) => {
            if (v !== undefined && v !== null) fd.append(k, v)
          })
          const res = await apiFetch('POST', '/products', fd, true)
          // Replace temp item with real DB item
          dispatch({ type: 'UPDATE_PRODUCT', payload: norm(res.data) })
          break
        }
        case 'UPDATE_PRODUCT': {
          const id = action.payload.id || action.payload._id
          await apiFetch('PUT', `/products/${id}`, action.payload)
          break
        }
        case 'DELETE_PRODUCT': {
          await apiFetch('DELETE', `/products/${action.payload}`)
          break
        }

        // ── Offers ──────────────────────────────────────────────────────────
        case 'ADD_OFFER': {
          const res = await apiFetch('POST', '/offers', action.payload)
          dispatch({ type: 'UPDATE_OFFER', payload: norm(res.data) })
          break
        }
        case 'UPDATE_OFFER': {
          const id = action.payload.id || action.payload._id
          await apiFetch('PUT', `/offers/${id}`, action.payload)
          break
        }
        case 'DELETE_OFFER': {
          await apiFetch('DELETE', `/offers/${action.payload}`)
          break
        }

        // ── Gallery ─────────────────────────────────────────────────────────
        case 'UPDATE_GALLERY_ITEM': {
          const id = action.payload.id || action.payload._id
          await apiFetch('PATCH', `/gallery/${id}`, action.payload)
          break
        }
        case 'DELETE_GALLERY_ITEM': {
          await apiFetch('DELETE', `/gallery/${action.payload}`)
          break
        }
        case 'REORDER_GALLERY': {
          const ids = action.payload.map(g => g.id || g._id)
          await apiFetch('PATCH', '/gallery/reorder', { order: ids })
          break
        }

        // ── Testimonials ────────────────────────────────────────────────────
        case 'ADD_TESTIMONIAL': {
          const res = await apiFetch('POST', '/testimonials', action.payload)
          dispatch({ type: 'UPDATE_TESTIMONIAL', payload: norm(res.data) })
          break
        }
        case 'UPDATE_TESTIMONIAL': {
          const id = action.payload.id || action.payload._id
          await apiFetch('PUT', `/testimonials/${id}`, action.payload)
          break
        }
        case 'DELETE_TESTIMONIAL': {
          await apiFetch('DELETE', `/testimonials/${action.payload}`)
          break
        }

        // ── Messages ────────────────────────────────────────────────────────
        case 'ADD_MESSAGE': {
          // This comes from the contact form — POST to public endpoint
          const res = await apiFetch('POST', '/messages', action.payload)
          dispatch({ type: 'UPDATE_MESSAGE', payload: norm(res.data) })
          break
        }
        case 'MARK_MESSAGE_READ': {
          await apiFetch('PATCH', `/messages/${action.payload}/read`, {})
          break
        }
        case 'DELETE_MESSAGE': {
          await apiFetch('DELETE', `/messages/${action.payload}`)
          break
        }

        // ── Content ─────────────────────────────────────────────────────────
        case 'UPDATE_BAKERY_INFO': {
          await apiFetch('PUT', '/content/bakery-info', action.payload)
          break
        }
        case 'UPDATE_HERO': {
          await apiFetch('PUT', '/content/hero', action.payload)
          break
        }
        case 'UPDATE_SETTINGS': {
          await apiFetch('PUT', '/content/settings', action.payload)
          break
        }

        default:
          break
      }
    } catch (err) {
      console.error(`API sync failed for ${action.type}:`, err.message)
      showToast(`Saved locally. API sync failed: ${err.message}`, 'error')
    }
  }, [showToast])

  // ── Derived stats ─────────────────────────────────────────────────────────
  const stats = {
    totalProducts:        state.products.length,
    featuredProducts:     state.products.filter(p => p.featured).length,
    activeOffers:         state.offers.filter(o => o.active).length,
    totalTestimonials:    state.testimonials.length,
    approvedTestimonials: state.testimonials.filter(t => t.approved).length,
    unreadMessages:       state.messages.filter(m => !m.read).length,
    totalMessages:        state.messages.length,
    bestSellers:          state.products.filter(p => p.bestSeller).length,
    galleryItems:         state.gallery.filter(g => g.visible).length,
  }

  return (
    <StoreContext.Provider value={{
      state,
      dispatch: apiDispatch,    // use this everywhere — handles both local + API
      showToast,
      stats,
      apiMode: API_MODE,
      apiReady,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
