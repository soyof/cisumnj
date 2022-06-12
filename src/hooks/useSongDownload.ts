import services from '@/plugins/axios'
import { getSongPlayInfo } from '@/utils/commonApi'

export default () => {
  const downloadSong = (songId: string, fileName: string) => {
    if (!songId) return
    getSongPlayInfo(songId).then((res: any) => {
      if (res && res.length > 0) {
        res.forEach((item: any) => {
          services.getDownload(item.url, {}, fileName)
        })
      }
    })
  }
  return {
    downloadSong
  }
}
