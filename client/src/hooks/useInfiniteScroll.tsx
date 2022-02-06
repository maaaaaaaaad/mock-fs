import React, { useEffect, useState } from 'react'

export const useInfiniteScroll = (
  targetElement: React.RefObject<HTMLDivElement>,
) => {
  const [intersecting, setIntersecting] = useState<boolean>(false)
  const observer = new IntersectionObserver((entries) =>
    setIntersecting(entries.some((entry) => entry.isIntersecting)),
  )

  useEffect(() => {
    if (targetElement.current) observer.observe(targetElement.current)
    return () => observer.disconnect()
  }, [targetElement.current])

  return intersecting
}
