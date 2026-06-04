export const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
export const formatCurrency = (n) => new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(n)
export const formatDate = (s) => s ? new Date(s).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'
export const truncate = (s, n = 60) => s && s.length > n ? s.slice(0, n) + '…' : s
