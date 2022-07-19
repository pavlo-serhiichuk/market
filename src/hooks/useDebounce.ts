import {useCallback, useRef} from 'react'

const useDebounce = (callback: any, delay: any) => {
  const timer: any = useRef()

  const debouncedCallback = useCallback((...args: any) => {
    if(timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      callback(...args)
    } , delay)

  }, [callback, delay])

  return debouncedCallback
}

export default useDebounce