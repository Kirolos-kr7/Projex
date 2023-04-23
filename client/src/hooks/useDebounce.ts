import { useEffect } from 'react'

interface UseDebounceOptions {
  delay?: number
}

function useDebounce(val: string, cb: () => void): void
function useDebounce(
  val: string,
  cb: () => void,
  opts?: UseDebounceOptions
): void

function useDebounce(
  val: string,
  cb: () => void,
  opts?: UseDebounceOptions
): void {
  let delay = 250
  if (opts && opts.delay) delay = opts.delay

  useEffect(() => {
    const handler = setTimeout(() => {
      cb()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [val, delay])
}

export default useDebounce
