import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi'

export default function DataTable({ columns, data=[], pageSize=8, searchable=true, searchKeys=[], emptyMessage='No records found.', actions }) {
  const [page,  setPage]  = useState(1)
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? data.filter(r => searchKeys.some(k => String(r[k]??'').toLowerCase().includes(query.toLowerCase())))
    : data
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safeP  = Math.min(page, totalPages)
  const slice  = filtered.slice((safeP-1)*pageSize, safeP*pageSize)

  return (
    <div className="flex flex-col gap-3">
      {(searchable || actions) && (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {searchable && (
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-64">
              <FiSearch size={14} className="text-gray-400 flex-shrink-0" />
              <input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Search…"
                className="text-sm bg-transparent border-0 outline-none text-gray-700 placeholder:text-gray-400 w-full" />
            </div>
          )}
          {actions && <div className="flex items-center gap-2 ml-auto">{actions}</div>}
        </div>
      )}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr>{columns.map(c=><th key={c.key} style={{ width:c.width }}>{c.label}</th>)}</tr></thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {slice.length===0
                  ? <tr key="empty"><td colSpan={columns.length} className="text-center py-12 text-gray-400 text-sm">{emptyMessage}</td></tr>
                  : slice.map((row,i)=>(
                    <motion.tr key={row.id??i} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }} transition={{ delay:i*.04 }}>
                      {columns.map(c=><td key={c.key}>{c.render ? c.render(row[c.key],row) : row[c.key]}</td>)}
                    </motion.tr>
                  ))
                }
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filtered.length > pageSize && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">{(safeP-1)*pageSize+1}–{Math.min(safeP*pageSize,filtered.length)} of {filtered.length}</span>
            <div className="flex items-center gap-1">
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={safeP===1} className="btn-icon btn-adm-ghost disabled:opacity-40"><FiChevronLeft size={15}/></button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
                <button key={n} onClick={()=>setPage(n)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold border-0 cursor-pointer transition-all ${n===safeP?'bg-crimson-500 text-white':'text-gray-500 hover:bg-gray-100 bg-transparent'}`}>{n}</button>
              ))}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={safeP===totalPages} className="btn-icon btn-adm-ghost disabled:opacity-40"><FiChevronRight size={15}/></button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
