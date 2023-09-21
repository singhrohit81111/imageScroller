import React, { useRef, useEffect, useState } from 'react';
import { LazyImageProps } from '../dataTypes/interfaces';

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoaded) {
          if (imageRef.current) {
            imageRef.current.src = src;
            imageRef.current.addEventListener('load', handleImageLoad);
          }
        }
      });
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', handleImageLoad);
        observer.unobserve(imageRef.current);
      }
    };
  }, [src, isLoaded]);

  return (
    <img
      ref={imageRef}
      src={isLoaded ? src : ''}
      alt={alt}
      className={className} height={`167px`}
    />
  );
};

export default LazyImage;
