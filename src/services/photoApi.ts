import axios from 'axios'
import type { Photo, PagedPhotosParams } from '../types/photo'

const BASE_URL = 'https://picsum.photos/v2'

export async function fetchPhotos({ page = 1, limit = 20 }: PagedPhotosParams = {}): Promise<Photo[]> {
  const { data } = await axios.get<Photo[]>(`${BASE_URL}/list`, {
    params: { page, limit },
  })
  return data
}

// Use the direct info endpoint which returns a single photo in the same shape
export async function fetchPhotoById(id: string): Promise<Photo | null> {
  try {
    const { data } = await axios.get<Photo>(`https://picsum.photos/id/${id}/info`)
    return data
  } catch {
    return null
  }
}

export function getThumbUrl(id: string, w = 300, h = 200) {
  return `https://picsum.photos/id/${id}/${w}/${h}`
}

export function getFullUrl(id: string, w = 800, h = 600) {
  return `https://picsum.photos/id/${id}/${w}/${h}`
}
