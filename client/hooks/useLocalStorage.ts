import { useState, useEffect, Dispatch } from 'react'

const PREFIX = 'PRESALANO-'

const useLocalStorage = <T>(
  key: string,
  initialValue: string | number | Function
): [T, Dispatch<T>] => {
  const prefixedKey = PREFIX + key

  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      if (typeof initialValue === 'function') {
        return initialValue()
      } else {
        return initialValue
      }
    }

    const jsonValue = localStorage.getItem(prefixedKey)

    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}

export default useLocalStorage
