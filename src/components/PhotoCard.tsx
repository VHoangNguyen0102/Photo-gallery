import { Link } from 'react-router-dom'
import type { Photo } from '../types/photo'
import { getThumbUrl } from '../services/photoApi'

interface Props {
  photo: Photo
}

export default function PhotoCard({ photo }: Props) {
  return (
    <Link
      to={`/photo/${photo.id}`}
      className="block group overflow-hidden rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow"
    >
      <div className="aspect-[3/2] overflow-hidden">
        <img
          src={getThumbUrl(photo.id, 600, 400)}
          alt={`Photo by ${photo.author}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <p className="text-sm text-slate-600">{photo.author}</p>
      </div>
    </Link>
  )
}
