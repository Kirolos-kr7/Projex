import { useEffect, useRef, useState } from 'react'

const Progress = () => {
  const [counter, setCounter] = useState(0)
  const percentage = 55
  const water = useRef<any>()

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        animate(prev)
        if (prev == 101) return 0
        if (prev == percentage) clearInterval(interval)
        else return prev + 1

        return prev
      })
    }, 50)
  }, [])

  const animate = (val: number) => {
    if (!water.current) return
    const elem = water.current as HTMLElement
    elem.style.transform = `translate(0, ${100 - val}%)`
  }

  return (
    <div className="flex flex-nowrap justify-between gap-3 overflow-hidden">
      <div className="flex flex-col justify-between">
        <h2 className="text-xl font-semibold">Progress</h2>
        <span className="text-5xl font-black">{counter}%</span>
      </div>

      <svg x="0px" y="0px" className="hidden">
        <symbol id="wave">
          <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
          <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
          <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
          <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
        </symbol>
      </svg>

      <div className="relative aspect-square h-[120px] shrink-0 self-center overflow-hidden rounded-full bg-pink-900">
        <div
          ref={water}
          id="water"
          className="water absolute left-0 top-0 z-[2] h-full w-full translate-y-[100%] bg-blue-500 transition-all"
        >
          <svg
            viewBox="0 0 560 20"
            className="water_wave_back absolute right-0 bottom-full w-[200%] fill-gray-200"
          >
            <use xlinkHref="#wave"></use>
          </svg>
          <svg
            viewBox="0 0 560 20"
            className="water_wave_front absolute left-0 bottom-full -mb-px w-[200%] fill-blue-500"
          >
            <use xlinkHref="#wave"></use>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Progress
