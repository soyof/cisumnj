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
    path: 'songSheet',
    title: '歌单',
    name: 'songSheet',
    component: () => import(/* webpackChunkName: "SongSheet" */ '@/views/music/songSheet.vue')
  }
]
