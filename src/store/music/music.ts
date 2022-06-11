import service from '@/plugins/axios'

const getSongPlayInfo = (musicId: string) => {
  return service.get('/api/song/url', { id: musicId })
}

const getSongDtl = (musicId: string) => {
  return service.get('/api/song/detail', { ids: musicId })
}

export default {
  namespaced: true,
  state: {
    curMusicInfo: {},
    mCurTime: 0,
    mTotalTime: 0,
    mIsPlay: false
  },
  mutations: {
    SET_CUR_MUSIC_INFO(state: any, value: string) {
      state.curMusicInfo = value
    },
    SET_M_TOTAL_TIME(state: any, value: string) {
      state.mTotalTime = value
    },
    SET_M_CUR_TIME(state: any, value: string) {
      state.mCurTime = value
    },
    SET_M_IS_PLAY(state: any, value: string) {
      state.mIsPlay = value
    }
  },
  actions: {
    getCurMusicUrl({ commit }: any, musicId: string) {
      return Promise.all([getSongPlayInfo(musicId), getSongDtl(musicId)]).then((data: any) => {
        const info1 = data[0] && data[0][0] ? data[0][0] : {}
        const info2 = data[1] ? data[1] : {}
        const newInfo = {
          ...info1,
          ...(info2.songs && info2.songs[0] ? info2.songs[0] : {})
        }
        commit('SET_CUR_MUSIC_INFO', newInfo || {})
        commit('SET_M_TOTAL_TIME', newInfo.dt || 0)
      })
    },
    clearPlayMusic({ commit }: any) {
      commit('SET_CUR_MUSIC_INFO', {})
    }
  }
}
