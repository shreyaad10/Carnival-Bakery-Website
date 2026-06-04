import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'

import AdminSidebar   from '../components/admin/Sidebar'
import AdminNavbar    from '../components/admin/AdminNavbar'
import Toast          from '../components/admin/Toast'

import AdminDashboard    from './admin/AdminDashboard'
import AdminProducts     from './admin/AdminProducts'
import AdminBestSellers  from './admin/AdminBestSellers'
import AdminOffers       from './admin/AdminOffers'
import AdminGallery      from './admin/AdminGallery'
import AdminTestimonials from './admin/AdminTestimonials'
import AdminMessages     from './admin/AdminMessages'
import AdminBakeryInfo   from './admin/AdminBakeryInfo'
import AdminSettings     from './admin/AdminSettings'
import { useStore } from '../context/StoreContext'

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const { stats } = useStore()

  const sidebarW = collapsed ? 68 : 240

  return (
    <div className="admin-root min-h-screen flex" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        unreadCount={stats.unreadMessages}
      />

      {/* Main content */}
      <motion.div
        animate={{ marginLeft: sidebarW }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className="flex-1 flex flex-col min-h-screen min-w-0"
      >
        <AdminNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            key="admin-page"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            <Routes>
              <Route index                  element={<AdminDashboard />} />
              <Route path="products"        element={<AdminProducts />} />
              <Route path="bestsellers"     element={<AdminBestSellers />} />
              <Route path="offers"          element={<AdminOffers />} />
              <Route path="gallery"         element={<AdminGallery />} />
              <Route path="testimonials"    element={<AdminTestimonials />} />
              <Route path="messages"        element={<AdminMessages />} />
              <Route path="bakery-info"     element={<AdminBakeryInfo />} />
              <Route path="settings"        element={<AdminSettings />} />
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
                  <div className="text-7xl select-none">🎂</div>
                  <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
                  <p className="text-gray-500 text-sm">This admin page doesn't exist.</p>
                </div>
              } />
            </Routes>
          </motion.div>
        </main>

        <div className="px-6 py-3 border-t border-gray-100 bg-white flex items-center justify-between text-xs text-gray-400">
          <span>Carnival Bakery Admin Panel v2.0 — Unified</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            Website &amp; Admin in sync
          </span>
        </div>
      </motion.div>

      <Toast />
    </div>
  )
}
