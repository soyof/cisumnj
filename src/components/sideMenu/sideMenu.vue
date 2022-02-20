<template>
  <el-menu
    router
    :defaultActive="defaultActive"
    @open="handleOpen"
    @close="handleClose"
  >
    <SideMenuItem
      :list="routers"
      :prefix="routePrefix"
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
  created() {
    this.defaultActive = this.$route.path
    this.routers = this.handleFilterHiddenMenu(routers)
  },
  mounted() {
  },
  methods: {
    handleOpen() {
    },
    handleClose() {},
    handleFilterHiddenMenu(routers: any) {
      const list = routers.filter((item: any) => {
        if (item.children && item.children.length > 0 && (!item.meta || !item.meta.hidden)) {
          return this.handleFilterHiddenMenu(item.children)
        }
        return !item.meta || !item.meta.hidden
      })
      return list
    }
  }
})
export default class SideMenu extends Vue {}
</script>
