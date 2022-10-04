<template>
  <!-- <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider> -->
  <router-view />
  <MusicPlayer />
</template>

<script lang="ts">
import MusicPlayer from '@/components/musicPlayer.vue'
import { defineComponent } from 'vue'
// import { ElConfigProvider } from 'element-plus'

// import zh_cn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  components: {
    // [ElConfigProvider.name]: ElConfigProvider
    MusicPlayer
  },
  data() {
    return {
      // locale: zh_cn
    }
  }
})
</script>
