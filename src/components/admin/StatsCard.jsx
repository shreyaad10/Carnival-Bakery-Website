import { motion } from 'framer-motion'

export default function StatsCard({ title, value, icon, delta, deltaLabel, color='#E8192C', onClick, index=0 }) {
  return (
    <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ delay:index*.07, duration:.45 }}
      whileHover={{ y:-3, boxShadow:'0 8px 28px rgba(0,0,0,0.1)' }}
      onClick={onClick} className={`card p-5 flex flex-col gap-4 ${onClick?'cursor-pointer':''}`}>
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background:color+'18' }}>
          <span style={{ color }}>{icon}</span>
        </div>
        {delta !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${delta>=0?'bg-emerald-50 text-emerald-700':'bg-red-50 text-red-600'}`}>
            {delta>=0?'↑':'↓'} {Math.abs(delta)}%
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-extrabold text-gray-900 leading-none">{value}</div>
        <div className="text-xs text-gray-500 font-medium mt-1.5">{title}</div>
        {deltaLabel && <div className="text-[11px] text-gray-400 mt-0.5">{deltaLabel}</div>}
      </div>
      <div className="h-0.5 rounded-full mt-1" style={{ background:color+'30' }}>
        <motion.div initial={{ width:0 }} animate={{ width:'100%' }} transition={{ delay:index*.07+.3, duration:.6 }}
          className="h-full rounded-full" style={{ background:color }} />
      </div>
    </motion.div>
  )
}
