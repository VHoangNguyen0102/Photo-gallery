export interface Photo {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export interface PagedPhotosParams {
  page?: number
  limit?: number
}
