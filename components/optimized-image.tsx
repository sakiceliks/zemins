'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  className?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality = 85,
  sizes,
  className = 'object-cover',
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [webpSrc, setWebpSrc] = useState<string | null>(null);

  useEffect(() => {
    // Check if WebP is supported
    const checkWebPSupport = async () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const dataURL = canvas.toDataURL('image/webp');
          const isSupported = dataURL.indexOf('data:image/webp') === 0;
          
          if (isSupported) {
            // Try to load WebP version
            const webpUrl = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            const img = new window.Image();
            img.onload = () => setWebpSrc(webpUrl);
            img.onerror = () => setWebpSrc(null);
            img.src = webpUrl;
          }
        }
      } catch (error) {
        console.warn('WebP support check failed:', error);
      }
    };

    checkWebPSupport();
  }, [src]);

  // Use WebP if available, otherwise fall back to original
  const finalSrc = webpSrc || imageSrc;

  const imageProps = {
    src: finalSrc,
    alt,
    priority,
    quality,
    sizes,
    className,
    placeholder,
    blurDataURL,
    ...(fill ? { fill } : { width, height }),
  };

  return (
    <Image
      {...imageProps}
      onError={() => {
        // Fallback to original image if WebP fails to load
        if (webpSrc && imageSrc !== src) {
          setImageSrc(src);
        }
      }}
    />
  );
}

// Utility function to get optimized image sources
export function getOptimizedImageSources(originalSrc: string) {
  const baseName = originalSrc.replace(/\.(png|jpg|jpeg)$/i, '');
  return {
    webp: `${baseName}.webp`,
    original: originalSrc,
  };
}

// Hook for checking WebP support
export function useWebPSupport() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const dataURL = canvas.toDataURL('image/webp');
          setIsSupported(dataURL.indexOf('data:image/webp') === 0);
        } else {
          setIsSupported(false);
        }
      } catch {
        setIsSupported(false);
      }
    };

    checkSupport();
  }, []);

  return isSupported;
}
