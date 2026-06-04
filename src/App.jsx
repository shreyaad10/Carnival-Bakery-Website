import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'
import WebsitePage from './pages/WebsitePage'
import AdminLayout from './pages/AdminLayout'

/**
 * ARCHITECTURE — How live sync works:
 *
 *  StoreProvider (single React context)
 *  ├── Route "/"        → WebsitePage   (reads from store)
 *  └── Route "/admin/*" → AdminLayout   (writes to store)
 *
 *  Because both subtrees share ONE StoreProvider, any dispatch()
 *  in the admin immediately re-renders the website — zero extra
 *  infrastructure required.
 *
 *  To persist changes across page refreshes, swap useReducer in
 *  StoreContext with a localStorage-backed solution or connect to
 *  a real API (see BACKEND INTEGRATION comments in StoreContext.jsx).
 */
export default function App() {
  return (
    <StoreProvider>
      <Routes>
        {/* ── Public website ───────────────────────── */}
        <Route path="/" element={<WebsitePage />} />

        {/* ── Admin panel ──────────────────────────── */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </StoreProvider>
  )
}
