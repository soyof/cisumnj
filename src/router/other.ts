export default [
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
  },
  {
    name: 'lotteryWinCalc',
    path: 'lotteryWinCalc',
    title: '彩票中奖结果计算',
    meta: {
      hidden: false
    },
    component: () => import(/* webpackChunkName: "lotteryInfo" */ '@/views/lotteryInfo/lotteryWinCalc.vue')
  }
]
