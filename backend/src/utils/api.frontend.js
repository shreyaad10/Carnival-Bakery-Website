/**
 * API Service — Carnival Bakery Frontend
 *
 * Drop this file into: carnival-unified/src/services/api.js
 *
 * Set VITE_API_URL in your .env:
 *   VITE_API_URL=http://localhost:5000/api
 *
 * Usage:
 *   import api from './services/api'
 *   const products = await api.products.getAll()
 */

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ── Token helpers ─────────────────────────────────────────────────────────────
const getToken  = ()    => localStorage.getItem('carnival_token')
const setToken  = (tok) => localStorage.setItem('carnival_token', tok)
const clearToken = ()   => localStorage.removeItem('carnival_token')

// ── Core fetch wrapper ────────────────────────────────────────────────────────
async function request(method, path, body = null, isFormData = false) {
  const headers = {}
  const token   = getToken()

  if (token) headers['Authorization'] = `Bearer ${token}`
  if (!isFormData) headers['Content-Type'] = 'application/json'

  const config = {
    method,
    headers,
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
  }

  const res  = await fetch(`${BASE}${path}`, config)
  const data = await res.json()

  if (!res.ok) throw new Error(data.message || `API error ${res.status}`)
  return data
}

const get    = (path)         => request('GET',    path)
const post   = (path, body, fd) => request('POST',   path, body, fd)
const put    = (path, body)   => request('PUT',    path, body)
const patch  = (path, body)   => request('PATCH',  path, body)
const del    = (path)         => request('DELETE', path)

// ── API surface ───────────────────────────────────────────────────────────────
const api = {

  // Auth
  auth: {
    login:          (creds) => post('/auth/login', creds),
    me:             ()      => get('/auth/me'),
    changePassword: (body)  => patch('/auth/change-password', body),
    setToken,
    clearToken,
    getToken,
  },

  // Products
  products: {
    getAll:   (params = '') => get(`/products${params}`),
    getOne:   (id)          => get(`/products/${id}`),
    create:   (fd)          => post('/products', fd, true),        // FormData
    update:   (id, fd)      => request('PUT', `/products/${id}`, fd, fd instanceof FormData),
    remove:   (id)          => del(`/products/${id}`),
    reorder:  (order)       => patch('/products/reorder', { order }),
  },

  // Offers
  offers: {
    getAll:  (params = '') => get(`/offers${params}`),
    create:  (body)        => post('/offers', body),
    update:  (id, body)    => put(`/offers/${id}`, body),
    remove:  (id)          => del(`/offers/${id}`),
  },

  // Gallery
  gallery: {
    getAll:   (params = '') => get(`/gallery${params}`),
    upload:   (fd)          => post('/gallery', fd, true),         // FormData
    update:   (id, body)    => patch(`/gallery/${id}`, body),
    remove:   (id)          => del(`/gallery/${id}`),
    reorder:  (order)       => patch('/gallery/reorder', { order }),
  },

  // Testimonials
  testimonials: {
    getAll:  (params = '') => get(`/testimonials${params}`),
    create:  (body)        => post('/testimonials', body),
    update:  (id, body)    => put(`/testimonials/${id}`, body),
    remove:  (id)          => del(`/testimonials/${id}`),
  },

  // Messages (contact form)
  messages: {
    send:     (body)       => post('/messages', body),             // public
    getAll:   (params = '') => get(`/messages${params}`),          // admin
    getOne:   (id)          => get(`/messages/${id}`),
    markRead: (id)          => patch(`/messages/${id}/read`, {}),
    remove:   (id)          => del(`/messages/${id}`),
  },

  // Site content (bakery info, hero, settings)
  content: {
    get:            ()      => get('/content'),
    updateBakery:   (body)  => put('/content/bakery-info', body),
    updateHero:     (body)  => put('/content/hero', body),
    updateSettings: (body)  => put('/content/settings', body),
    uploadLogo:     (fd)    => post('/content/logo', fd, true),    // FormData
  },
}

export default api
