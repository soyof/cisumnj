export default [
  {
    path: 'pages',
    title: '首页',
    name: 'pages',
    component: () => import(/* webpackChunkName: "Pages" */ '@/views/pages.vue')
  },
  {
    path: 'singerList',
    title: '歌手',
    name: 'singerList',
    component: () => import(/* webpackChunkName: "SingerList" */ '@/views/music/singerList.vue')
  },
  {
    path: 'singer/:singerId',
    title: '歌手详情',
    meta: {
      hidden: true
    },
    name: 'singerDetail',
    component: () => import(/* webpackChunkName: "SingerList" */ '@/views/music/singerDetail.vue')
  },
  {
    path: 'songSheet',
    title: '歌单',
    name: 'songSheet',
    component: () => import(/* webpackChunkName: "SongSheet" */ '@/views/music/songSheet.vue')
  },
  {
    path: 'mSearchInfo',
    title: '搜索',
    name: 'mSearchInfo',
    component: () => import(/* webpackChunkName: "mSearchInfo" */ '@/views/music/mSearchInfo.vue')
  },
  {
    path: 'mSongList/:id',
    title: '歌曲',
    meta: {
      hidden: true
    },
    name: 'mSongList',
    component: () => import(/* webpackChunkName: "songList" */ '@/views/music/mSongList.vue')
  },
  {
    path: 'songMvList',
    title: 'MV',
    meta: {
      hidden: false
    },
    name: 'songMvList',
    component: () => import(/* webpackChunkName: "songMvList" */ '@/views/music/songMvList.vue')
  },
  {
    path: 'songMvDtl/:mvId/:arId',
    title: 'MV详情页',
    meta: {
      hidden: true
    },
    name: 'songMvDtl',
    component: () => import(/* webpackChunkName: "songMvList" */ '@/views/music/songMvDtl.vue')
  },
  {
    path: 'musicScore/:musicId',
    title: '乐谱信息',
    meta: {
      hidden: true
    },
    name: 'musicEncyclopedia',
    component: () => import(/* webpackChunkName: "musicEncyclopedia" */ '@/views/music/musicScore.vue')
  },
  {
    path: 'historyToday',
    title: '历史上的今天',
    meta: {
      hidden: false
    },
    name: 'historyToday',
    component: () => import(/* webpackChunkName: "historyToday" */ '@/views/historyToday.vue')
  },
  {
    path: 'funnyJoke',
    title: '搞笑段子',
    meta: {
      hidden: false
    },
    name: 'funnyJoke',
    component: () => import(/* webpackChunkName: "funnyJoke" */ '@/views/funnyJoke.vue')
  },
  {
    path: 'imgList',
    title: '图片列表',
    meta: {
      hidden: false
    },
    name: 'imgList',
    component: () => import(/* webpackChunkName: "imgList" */ '@/views/imgList.vue')
  },
  {
    name: 'lotteryTypeInfo',
    path: 'lotteryTypeInfo',
    title: '彩票类型',
    meta: {
      hidden: false
    },
    component: () => import(/* webpackChunkName: "lotteryInfo" */ '@/views/lotteryInfo/lotteryTypeInfo.vue')
  },
  {
    name: 'lotteryWinInfo',
    path: 'lotteryWinInfo',
    title: '彩票中奖信息',
    meta: {
      hidden: false
    },
    component: () => import(/* webpackChunkName: "lotteryInfo" */ '@/views/lotteryInfo/lotteryWinInfo.vue')
  }
]
