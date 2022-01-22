<template>
  <!-- <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider> -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { ElConfigProvider } from 'element-plus'

// import zh_cn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  // components: {
  //   [ElConfigProvider.name]: ElConfigProvider
  // },
  data() {
    return {
      // locale: zh_cn
    }
  }
})
</script>
