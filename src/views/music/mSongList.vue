<template>
  <div class="m-song-list">
    <div class="header-search">
      <el-input v-model="keywords" />
    </div>
    <div class="song-list-wrap">
      <SongList :list="sList" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SongList from '@/components/music/songList'
import services from '@/plugins/axios'

const keywords = ref('')
const sList = ref([])

const getSongList = () => {
  services.get('/api/search', {
    keywords
  }).then((res: any) => {
    sList.value = res.songs || []
    console.log(res.songs)
  })
}
getSongList()
</script>

<style lang="less" scoped>
.m-song-list {}
</style>
