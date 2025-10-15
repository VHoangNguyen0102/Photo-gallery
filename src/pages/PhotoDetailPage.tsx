import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPhotoById } from '../services/photoApi'
import type { Photo } from '../types/photo'
import LoadingSpinner from '../components/LoadingSpinner'

export default function PhotoDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let canceled = false
    async function load() {
      if (!id) return
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPhotoById(id)
        if (canceled) return
        if (!data) {
          setError('Photo not found.')
        } else {
          setPhoto(data)
        }
      } catch {
        setError('Failed to load photo.')
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => {
      canceled = true
    }
  }, [id])

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-8"><LoadingSpinner label="Loading photo..." /></div>
  if (error) return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 border border-red-200">{error}</div>
      <Link to="/photos" className="text-indigo-600 hover:underline">Back to Gallery</Link>
    </div>
  )
  if (!photo) return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <p className="mb-4 rounded-md bg-amber-50 p-3 text-amber-800 border border-amber-200">Photo not found</p>
      <Link to="/photos" className="text-indigo-600 hover:underline">Back to Gallery</Link>
    </div>
  )

  const title = `Beautiful Photo #${photo.id}`
  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet varius porttitor, arcu nisi convallis felis, eget cursus nisl lorem ac neque. Integer non tortor id nisl fermentum volutpat. Vivamus tristique in augue et facilisis. Etiam nec risus nec justo hendrerit facilisis.`

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/photos" className="inline-block mb-4 text-indigo-600 hover:underline">← Back to Gallery</Link>
      <div className="bg-white rounded-xl shadow p-4">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl bg-slate-900/80 rounded-xl p-2 sm:p-4">
            <img
              src={photo.download_url}
              alt={`Photo by ${photo.author}`}
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">{title}</h2>
          <p className="text-slate-600 mb-4">By {photo.author}</p>
          <p className="text-slate-700 leading-relaxed">{description}</p>
          <dl className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
            <div className="flex gap-2"><dt className="font-medium text-slate-600">Author:</dt><dd>{photo.author}</dd></div>
            <div className="flex gap-2"><dt className="font-medium text-slate-600">Dimensions:</dt><dd>{photo.width} × {photo.height}</dd></div>
            <div className="flex gap-2 sm:col-span-2 break-all"><dt className="font-medium text-slate-600">Original:</dt><dd><a href={photo.download_url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">{photo.download_url}</a></dd></div>
          </dl>
        </div>
      </div>
    </div>
  )
}
