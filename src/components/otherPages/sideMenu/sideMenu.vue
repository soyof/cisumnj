<template>
  <el-menu
    router
    :defaultActive="defaultActive"
    @open="handleOpen"
    @close="handleClose"
  >
    <SideMenuItem
      :list="routers"
    />
  </el-menu>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SideMenuItem from './sideMenuItem.vue'
import routers from '@/router/music'

@Options({
  components: {
    SideMenuItem
  },
  data() {
    return {
      routers: [],
      routePrefix: '/epoch',
      defaultActive: ''
    }
  },
  watch: {
    '$route'(val) {
      this.defaultActive = this.getDefaultActive(this.routers)
    }
  },
  created() {
    const routersList = this.handleFilterHiddenMenu(routers)
    this.routers = this.handleRouterPath(routersList, this.routePrefix)
  },
  mounted() {
    this.defaultActive = this.getDefaultActive(this.routers)
  },
  methods: {
    handleOpen() {
    },
    handleClose() {},
    handleRouterPath(list: any, routePrefix: string) {
      return list.map((item: any) => {
        const newItem = {
          ...item,
          path: `${routePrefix}/${item.path}`
        }
        if (item.children) {
          newItem.children = this.handleRouterPath(item.children, newItem.path)
        }
        return newItem
      })
    },
    handleFilterHiddenMenu(routers: any) {
      return routers.filter((item: any) => {
        if (item.children && item.children.length > 0 && (!item.meta || !item.meta.hidden)) {
          return this.handleFilterHiddenMenu(item.children)
        }
        return !item.meta || !item.meta.hidden
      })
    },
    getDefaultActive(list: any) {
      const curRoute = this.$route.path
      let activeRoute = curRoute
      for (const element of list) {
        const item = element
        const isExist = curRoute.includes(item.path)
        if (isExist) {
          activeRoute = item.path
          break
        } else {
          if (item.children && item.children.length > 0) {
            activeRoute = this.getDefaultActive(item.children)
          } else {
            activeRoute = ''
          }
        }
      }
      return activeRoute
    }
  }
})
export default class SideMenu extends Vue {}
</script>
