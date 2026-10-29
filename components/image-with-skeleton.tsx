'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type ImageWithSkeletonProps = {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  wrapperClassName?: string
  sizes?: string
  priority?: boolean
  quality?: number
  objectFit?: 'cover' | 'contain'
}

export function ImageWithSkeleton({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  wrapperClassName,
  sizes,
  priority = false,
  quality = 80,
  objectFit = 'cover',
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-muted/80',
        wrapperClassName,
        !loaded && 'skeleton-base skeleton-shimmer',
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        quality={quality}
        className={cn(
          objectFit === 'cover' ? 'object-cover' : 'object-contain',
          className,
          loaded ? 'opacity-100' : 'opacity-0',
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  )
}
