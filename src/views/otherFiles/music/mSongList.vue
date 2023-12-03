<template>
  <div class="m-song-list">
    <SongList v-model:max-height="tableHeight" :list="songList" />
  </div>
</template>

<script lang="ts" setup>
import SongList from '@/components/music/songList.vue'
import { useAutoTable } from '@/hooks/useAutoTable'
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import services from '@/plugins/axios'
import { formatTime2HMS } from '@/utils/utils'
const $route = useRoute()
const { tableHeight } = useAutoTable()

const pages = reactive({
  pageIndex: 0,
  limit: 999,
  total: 0
})
const songList = ref([])

const getSongList = () => {
  const params = {
    id: $route.params.id,
    limit: pages.limit,
    offset: pages.pageIndex
  }
  services.get('/api/playlist/track/all', params).then((res: any) => {
    songList.value = (res.songs || []).map((item: any) => {
      const author = (item.ar || []).map((arItem: any) => {
        return arItem.name
      }).join('、')
      return {
        ...item,
        author,
        duration: formatTime2HMS(item.dt)
      }
    })
  }).finally(() => {
  })
}
getSongList()
</script>

<style lang="less" scoped>
.m-song-list {}
</style>
