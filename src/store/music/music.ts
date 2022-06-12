import { getSongPlayInfo, getSongDtl } from '@/utils/commonApi'

let mTimer: any = null

const handleClearInterVal = () => {
  clearInterval(mTimer)
  mTimer = null
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
        commit('SET_M_IS_PLAY', false)
      })
    },
    mPlay({ state, commit }: any) {
      if (!state.curMusicInfo || !state.curMusicInfo.url) {
        commit('SET_M_IS_PLAY', false)
        return
      }
      if (mTimer) {
        handleClearInterVal()
      }
      mTimer = setInterval(_ => {
        let curTime = state.mCurTime || 0
        const totalTime = state.mTotalTime || 0
        if (curTime + 1000 >= totalTime) {
          curTime = totalTime
          handleClearInterVal()
          commit('SET_M_IS_PLAY', false)
        } else {
          curTime = curTime + 1000
        }
        commit('SET_M_CUR_TIME', curTime)
      }, 1000)
    },
    mPause({ state, commit }: any) {
      handleClearInterVal()
    },
    clearPlayMusic({ commit }: any) {
      commit('SET_CUR_MUSIC_INFO', {})
    }
  }
}
