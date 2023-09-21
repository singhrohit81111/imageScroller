export interface imageData{
    image:string,
    id:string
    
}

export interface LazyImageListProps {
    images: string[]; 
    batchSize: number; 
  }
  

  export interface LazyImageProps {
    src: string; 
    alt: string; 
    className?: string; 
  }