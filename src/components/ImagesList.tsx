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
    const observerRef = useRef<IntersectionObserver | null>(null);

    const apiCheck = async () => {
            try {
                const res = await axios.get("https://64e879b699cf45b15fdfa04d.mockapi.io/phones");
                return true;
            } catch (error) {
                return false;
            }
       

    }
    const laodMore = async () => {
        try {
            const res = await axios.get(`https://api.slingacademy.com/v1/sample-data/photos?offset=${initalCount}&limit=20`);

            if (res.status === 200) {
                const nextImages = res.data.photos.map((photo: any) => {
                    return photo.url;

                })

                if (nextImages.length === 0) {
                    setIsLoading(false);
                    observerRef.current!.disconnect();
                    return;
                }
                setVisibleImages(prevImages => { return [...prevImages, ...nextImages] });
                setInitialCount(initalCount + 20);
            }
        } catch (err: unknown) {
            const interval = setInterval(() => {
                apiCheck().then(bool =>{
                     bool && clearInterval(interval);
                     if(bool)laodMore();
                } );
            }, 3000)

            alert("No more data to show")
        }
    }    

    useEffect(() => {

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    laodMore();
                }
            });
        }, { threshold: 0.25 });

        if (imageRef.current) {
            observerRef.current.observe(imageRef.current);
        }

        return () => {
            observerRef.current?.disconnect?.();
        };
    }, [initalCount])
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
