import type { Photo } from '../types/photo'
import PhotoCard from './PhotoCard'

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      role="list"
    >
      {photos.map((p) => (
        <PhotoCard key={p.id} photo={p} />
      ))}
    </div>
  )
}
