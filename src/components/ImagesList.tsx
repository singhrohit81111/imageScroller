import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import '../styles/style.scss';
import VisibleImage from './VisibleImage';
import BlankImages from './BlankImages';

export default function ImagesList() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [visibleImages, setVisibleImages] = useState<string[]>([]);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const [initalCount, setInitialCount] = useState<number>(0);
    const [error,setError]=useState<boolean>(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    console.log(imageRef);

    const laodMore = () => {
            
        axios.get(`https://api.slingacademy.com/v1/sample-data/photos?offset=${initalCount}&limit=20`).then(res => {
            console.log(res.status);
            console.log(window.navigator.onLine);
                const nextImages = res.data.photos.map((photo: any) => {
                    return photo.url;

                })
                if (nextImages.length === 0) {
                    setIsLoading(false);
                    observerRef.current!.disconnect();
                    return;
                }
                console.log(nextImages);
                setVisibleImages(prevImages => { return [...prevImages, ...nextImages] });
                setInitialCount(initalCount + 20);
            
        })
    }

    useEffect(() => {
        
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log(entry);
                     if(!navigator.onLine){
                        console.log("hfghjfhhtftyg",navigator.onLine);
                        window.alert("adadwqewaas");
                        
                    }
                    laodMore();
                    console.log(navigator.onLine);
                   
                }
            });
        }, { threshold: 0.25 });

        if (imageRef.current) {
            observerRef.current.observe(imageRef.current);
        }

        return () => {
            observerRef.current?.disconnect?.();
        };
    }, [initalCount,window.navigator.onLine])
    return (
        <div className='images'>
            {visibleImages.map(visibleImage => {
                return <VisibleImage src={visibleImage} alt='No OImage' />

            })}
            <div ref={imageRef} />
            {isLoading && <BlankImages />}
        </div>
    )
}
