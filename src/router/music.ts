export default [
  {
    path: 'pages',
    title: '首页',
    name: 'pages',
    component: () => import(/* webpackChunkName: "Pages" */ '@/views/pages.vue')
  },
  {
    path: 'singer',
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
    path: 'mSongList',
    title: '搜索',
    name: 'mSongList',
    component: () => import(/* webpackChunkName: "songList" */ '@/views/music/mSongList.vue')
  }
]
