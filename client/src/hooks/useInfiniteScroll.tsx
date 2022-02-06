import React, { useCallback, useEffect, useRef, useState } from 'react'

export const useInfiniteScroll = (
  targetElement: React.RefObject<HTMLDivElement>,
) => {
  const [intersecting, setIntersecting] = useState<boolean>(false)
  const observerRef = useRef<any>(null)

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) =>
        setIntersecting(entries.some((entry) => entry.isIntersecting)),
      )
    }
    return observerRef.current
  }, [observerRef.current])

  useEffect(() => {
    if (targetElement.current) getObserver().observe(targetElement.current)
    return () => getObserver().disconnect()
  }, [targetElement.current])

  return intersecting
}
