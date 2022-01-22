export default [
  {
    path: 'pages',
    title: '首页',
    name: 'pages',
    component: () => import(/* webpackChunkName: "Pages" */ '@/views/Pages.vue')
  },
  {
    path: 'singer',
    title: '歌手',
    name: 'singerList',
    component: () => import(/* webpackChunkName: "SingerList" */ '@/views/music/SingerList.vue')
  },
  {
    path: 'songSheet',
    title: '歌单',
    name: 'songSheet',
    component: () => import(/* webpackChunkName: "SongSheet" */ '@/views/music/SongSheet.vue')
  }
]
