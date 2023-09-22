import React from 'react'
import loader from '../assets/loader.gif';

interface isLoading {
    isLoading: boolean;
}

const BlankImages: React.FC<isLoading> = ({ isLoading }) => {
    return (
        <div>
            {isLoading && <div style={{ width: "84vw" }}>
                <img src={loader} height={`167px`} width={`220px`} />
                <img src={loader} height={`167px`} width={`220px`} />
                <img src={loader} height={`167px`} width={`220px`} />
                <img src={loader} height={`167px`} width={`220px`} />
                <img src={loader} height={`167px`} width={`220px`} />
            </div>
            }
        </div>
    )
}
export default BlankImages;