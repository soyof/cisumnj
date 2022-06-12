import service from '@/plugins/axios'
import services from '@/plugins/axios'

export const getSongPlayInfo = (musicId: string) => {
  return service.get('/api/song/url', { id: musicId })
}

export const getSongDtl = (musicId: string) => {
  return service.get('/api/song/detail', { ids: musicId })
}

export const downloadSong = (songId: string, fileName: string) => {
  if (!songId) return
  getSongPlayInfo(songId).then((res: any) => {
    if (res && res.length > 0) {
      res.forEach((item: any) => {
        services.getDownload(item.url, {}, fileName)
      })
    }
  })
}
