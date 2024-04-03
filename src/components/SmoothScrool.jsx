"use client"
import { ReactLenis } from '@studio-freight/react-lenis'

function SmoothScroller({children}) {
  return (
    <ReactLenis root lerp={0.00001}>
        {children}
    </ReactLenis>
  )
}

export default SmoothScroller;
