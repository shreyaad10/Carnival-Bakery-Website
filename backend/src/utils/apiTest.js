/**
 * API Test Script
 * Run: node src/utils/apiTest.js
 * Requires the server to be running on PORT 5000
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') })

const BASE = `http://localhost:${process.env.PORT || 5000}/api`
let token = ''

const log  = (label, data) => console.log(`\n✅  ${label}:`, JSON.stringify(data, null, 2))
const fail = (label, err)  => console.error(`\n❌  ${label}:`, err.message)

async function req(method, path, body, auth = false) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth && token) headers['Authorization'] = `Bearer ${token}`

  const res  = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || `${res.status}`)
  return data
}

async function run() {
  console.log('🧪  Carnival Bakery API Tests\n', '─'.repeat(40))

  // 1. Health check
  try {
    const h = await fetch(`http://localhost:${process.env.PORT || 5000}/health`)
    const d = await h.json()
    log('Health', d)
  } catch (e) { fail('Health', e) }

  // 2. Login
  try {
    const data = await req('POST', '/auth/login', {
      email:    process.env.ADMIN_EMAIL    || 'owner@carnivalbakery.in',
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
    })
    token = data.token
    log('Login', { token: token.slice(0, 20) + '…', admin: data.admin })
  } catch (e) { fail('Login', e); return }

  // 3. Get products
  try {
    const data = await req('GET', '/products')
    log('GET /products', { count: data.count, first: data.data[0]?.name })
  } catch (e) { fail('GET /products', e) }

  // 4. Create product
  let productId
  try {
    const data = await req('POST', '/products', {
      name: 'Test Cake', category: 'Cake', price: 500,
      description: 'A test cake from API test script', status: 'active', stock: 5,
    }, true)
    productId = data.data._id
    log('POST /products', { id: productId, name: data.data.name })
  } catch (e) { fail('POST /products', e) }

  // 5. Update product
  if (productId) {
    try {
      const data = await req('PUT', `/products/${productId}`, { price: 600 }, true)
      log('PUT /products/:id', { price: data.data.price })
    } catch (e) { fail('PUT /products/:id', e) }
  }

  // 6. Get offers
  try {
    const data = await req('GET', '/offers')
    log('GET /offers', { count: data.count })
  } catch (e) { fail('GET /offers', e) }

  // 7. Create offer
  let offerId
  try {
    const data = await req('POST', '/offers', {
      title: 'Test Offer', description: 'Test desc', badge: 'TEST', discount: 10, active: true,
    }, true)
    offerId = data.data._id
    log('POST /offers', { id: offerId })
  } catch (e) { fail('POST /offers', e) }

  // 8. Submit contact message
  try {
    const data = await req('POST', '/messages', {
      name: 'Test User', email: 'test@example.com',
      phone: '+91 99999 00000', subject: 'Test', message: 'Hello from API test!',
    })
    log('POST /messages', { message: data.message })
  } catch (e) { fail('POST /messages', e) }

  // 9. Get messages (admin)
  try {
    const data = await req('GET', '/messages', null, true)
    log('GET /messages', { count: data.count })
  } catch (e) { fail('GET /messages', e) }

  // 10. Get site content
  try {
    const data = await req('GET', '/content')
    log('GET /content', { bakeryName: data.data.bakeryInfo?.name })
  } catch (e) { fail('GET /content', e) }

  // 11. Cleanup — delete test records
  if (productId) {
    try {
      await req('DELETE', `/products/${productId}`, null, true)
      log('DELETE /products/:id', 'cleaned up')
    } catch (e) { fail('DELETE /products/:id', e) }
  }
  if (offerId) {
    try {
      await req('DELETE', `/offers/${offerId}`, null, true)
      log('DELETE /offers/:id', 'cleaned up')
    } catch (e) { fail('DELETE /offers/:id', e) }
  }

  console.log('\n' + '─'.repeat(40))
  console.log('🎉  All tests complete!\n')
}

run().catch(console.error)
