import { useEffect, useState } from 'react'

export default function useDetectTouch() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const handleTouch = () => {
      setIsTouch(true)
      removeListener()
    }

    const removeListener = () => {
      document.removeEventListener('touchstart', handleTouch, { passive: true })
    }

    document.addEventListener('touchstart', handleTouch, { passive: true })
    return removeListener
  }, [])

  return isTouch
}
