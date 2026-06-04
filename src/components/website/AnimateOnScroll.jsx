import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const DIR = { up:{y:40,x:0}, down:{y:-40,x:0}, left:{y:0,x:40}, right:{y:0,x:-40}, scale:{y:0,x:0}, fade:{y:0,x:0} }

export default function AnimateOnScroll({ children, direction='up', delay=0, duration=0.7, className='' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  const { y, x } = DIR[direction] ?? DIR.up

  return (
    <motion.div ref={ref} className={className}
      variants={{ hidden:{ opacity:0,y,x, scale:direction==='scale'?.85:1 }, visible:{ opacity:1,y:0,x:0,scale:1 } }}
      initial="hidden" animate={inView?'visible':'hidden'}
      transition={{ duration, delay, ease:[0.215,0.61,0.355,1] }}>
      {children}
    </motion.div>
  )
}
