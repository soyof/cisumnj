<template>
  <div class="music-encyclopedia">
    12456
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import service from '@/plugins/axios'

const $route = useRoute()

const musicId = $route.params.musicId

const getMusicEncyclopedia = () => {
  service.get(`/api/song/wiki/summary?id=${musicId}`).then((res :any) => {
    console.log(res)
  })
}

getMusicEncyclopedia()
</script>

<style scoped lang="less">

</style>
