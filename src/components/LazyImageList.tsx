import React, { useEffect, useRef, useState } from 'react';
import LazyImage from './LazyImage';
import { LazyImageListProps } from '../dataTypes/interfaces';


const LazyImageList: React.FC<LazyImageListProps> = ({ images, batchSize }) => {
  const [visibleImages, setVisibleImages] = useState<string[]>([]);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (images.length > 0) {
      const loadNextBatch = () => {
        const start = visibleImages.length;
        const end = Math.min(start + batchSize, images.length);
        const nextImages = images.slice(start, end);

        setVisibleImages((prevImages) => [...prevImages, ...nextImages]);
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              loadNextBatch();
            }, 5000)
          }
        });
      });

      if (imageRef.current) {
        observer.observe(imageRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [images, batchSize, visibleImages]);

  return (
    <div ref={imageRef} className='images'>
      {visibleImages.map((imageSrc, index) => (
        <LazyImage
          key={index}
          src={imageSrc}
          alt={`Image ${index}`}
          className="lazy-image"
        />
      ))}
    </div>
  );
};

export default LazyImageList;
