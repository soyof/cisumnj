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
      routers,
      routePrefix: '/epoch',
      defaultActive: ''
    }
  },
  created() {
    this.defaultActive = this.$route.path
  },
  mounted() {
  },
  methods: {
    handleOpen() {
    },
    handleClose() {}
  }
})
export default class SideMenu extends Vue {}
</script>
