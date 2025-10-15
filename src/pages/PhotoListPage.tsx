import { useEffect, useRef, useState } from 'react'
import { fetchPhotos } from '../services/photoApi'
import type { Photo } from '../types/photo'
import PhotoGrid from '../components/PhotoGrid'
import LoadingSpinner from '../components/LoadingSpinner'

export default function PhotoListPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let canceled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPhotos({ page, limit: 20 })
        if (canceled) return
        setPhotos((prev) => [...prev, ...data])
        setHasMore(data.length > 0)
      } catch {
        setError('Failed to load photos. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => {
      canceled = true
    }
  }, [page])

  useEffect(() => {
    if (!hasMore) return
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && !loading) {
          setPage((p) => p + 1)
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loading, hasMore])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4 text-slate-800">Photo Gallery</h1>
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 border border-red-200">{error}</div>
      )}
      <PhotoGrid photos={photos} />
      <div ref={sentinelRef} />
      {loading && <LoadingSpinner label="Loading more photos..." />}
      {!hasMore && (
        <p className="text-center text-slate-500 py-6">No more photos</p>
      )}
    </div>
  )
}
