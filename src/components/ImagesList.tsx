import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import '../styles/style.scss';
import VisibleImage from './VisibleImage';
import loader from '../assets/loader.gif';
import BlankImages from './BlankImages';

export default function ImagesList() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [visibleImages, setVisibleImages] = useState<string[]>([]);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const [initalCount, setInitialCount] = useState<number>(0);

    console.log(imageRef);

    // laodMore();
    useEffect(() => {
        const laodMore = () => {
            axios.get(`https://api.slingacademy.com/v1/sample-data/photos?offset=${initalCount}&limit=20`).then(res => {
                const nextImages = res.data.photos.map((photo: any) => {
                    return photo.url;

                })
                if (nextImages.length === 0) {
                    setIsLoading(false);
                    return;
                }
                console.log(nextImages);
                setVisibleImages(prevImages => { return [...prevImages, ...nextImages] });
                setInitialCount(initalCount + 20);
            })
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log(entry);
                    laodMore()
                }
            });
        }, { threshold: 0.25 });

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [initalCount])
    return (
        <div className='images'>
            {visibleImages.map(visibleImage => {
                return <VisibleImage src={visibleImage} alt='No OImage' />

            })}
            <div ref={imageRef} />
            
            <div>
               <BlankImages isLoading={isLoading}/>
            </div>
        </div>
    )
}
