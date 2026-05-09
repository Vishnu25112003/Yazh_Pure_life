import { useState } from 'react'
import PhotoAlbum from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import type { GalleryImage } from '@/types'

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(-1)
  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={images}
        spacing={18}
        columns={(containerWidth) => {
          if (containerWidth < 640) return 1
          if (containerWidth < 1024) return 2
          return 4
        }}
        onClick={({ index: current }) => setIndex(current)}
        componentsProps={{
          button: { className: 'overflow-hidden rounded-2xl shadow-card transition hover:shadow-card-hover' },
          image: { className: 'transition duration-500 hover:scale-105' },
        }}
      />
      <Lightbox open={index >= 0} close={() => setIndex(-1)} index={index} slides={images} />
    </>
  )
}
