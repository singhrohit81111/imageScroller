import React from 'react'
import { VisibleImageProps } from '@/dataTypes/interfaces'

const VisibleImage: React.FC<VisibleImageProps>=({src,alt})=>{
    console.log(src,alt);
    
  return (
      <img src={src} alt={alt} height={`167px`}/>
  )
}
export default VisibleImage;