import { useEffect, useRef, useState } from 'react'

const Tooltip = () => {
  const tt = useRef(null)
  const [val, setVal] = useState('')

  useEffect(() => {
    document.addEventListener('mouseover', handleMouseOver)

    return () => document.removeEventListener('mouseover', handleMouseOver)
  })

  const handleMouseOver = (e: MouseEvent) => {
    const els = e.composedPath()
    const el = els.find(
      (el) => (el as HTMLElement).dataset?.tooltip
    ) as HTMLElement

    if (el && el.dataset?.tooltip && tt.current) {
      const tooltipELement = tt.current as HTMLElement

      setVal(el.dataset?.tooltip)

      const cords = el.getBoundingClientRect()

      tooltipELement.style.left = cords.left + 'px'
      tooltipELement.style.top = cords.bottom + 5 + 'px'

      // tooltipELement.animate(
      //   [
      //     { transform: 'translateY(-10px)', opacity: 0 },
      //     { transform: 'translateY(0px)', opacity: 1 }
      //   ],
      //   {
      //     duration: 100
      //   }
      // )
    } else setVal('')
  }

  return (
    <>
      <div
        ref={tt}
        className={`pointer-events-none fixed left-0 top-0 z-50 inline-block rounded-sm border border-gray-700 bg-gray-800 py-0.5 px-1.5 text-sm text-white transition-opacity ${
          !val ? '!border-0 !p-0 opacity-0' : ''
        }`}
      >
        {val}
      </div>
    </>
  )
}

export default Tooltip
