import { createStore } from 'vuex'

import musicStore from './music/music'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    music: musicStore
  }
})
