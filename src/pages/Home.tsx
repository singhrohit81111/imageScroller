import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { imageData } from '../dataTypes/interfaces';
import '../styles/style.scss';
import LazyImageList from '../components/LazyImageList';

interface imageURL {
  image: string;
}
export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    axios.get("https://64e879b699cf45b15fdfa04d.mockapi.io/images").then(res => {
      const imageURls = res.data.map(((image: imageData) => {
        return image.image;
      }))
      setImages([...imageURls]);
    });


  }, [])
  console.log(images);
  return (
    <LazyImageList images={images} batchSize={20} />
  )
}
