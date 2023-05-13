import { useCallback, useEffect, useState } from 'react'

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T | null, (value: T) => void] => {
  const initialize = (key: string): T => {
    try {
      const item = localStorage.getItem(key)
      if (item && item !== 'undefined') {
        return JSON.parse(item)
      }

      localStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    } catch {
      return initialValue
    }
  }

  const [state, setState] = useState<T | null>(null)

  useEffect(() => {
    setState(initialize(key))
  }, [])

  const setValue = useCallback(
    (value: T) => {
      try {
        setState(value)
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        setState(initialValue)
        console.log(error)
      }
    },
    [key, setState]
  )

  return [state, setValue]
}

export default useLocalStorage
