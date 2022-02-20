<template>
  <div class="song-list">
    <!-- <HeaderLine class="song-list-top-header" title="热门50首" /> -->
    <el-table :data="songList" style="width: 100%" size="small">
      <el-table-column type="index" label="#" width="100" />
      <el-table-column prop="name" label="歌曲名" />
      <el-table-column v-if="isTop" prop="pubTimes" label="发布时间" />
    </el-table>
    <!-- <HeaderLine class="song-list-header" title="全部歌曲" /> -->
    <SimplePagination
      v-if="!isTop"
      :pages="pages"
    />
  </div>
</template>

<script lang='ts' setup>
import { defineProps, reactive, ref, onMounted } from 'vue'
import Api from '@/plugins/axios'
import { formatDate } from '@/utils/utils'
const service = Api.service

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  singerId: {
    type: String || Number,
    required: true
  },
  isTop: {
    type: Boolean,
    required: false,
    default: true
  }
})

const songList = ref([])

const pages = reactive({
  pageIndex: 0,
  limit: 50
})

const getSingerSongList = () => {
  let url = `${props.url}?id=${props.singerId}`

  if (!props.isTop) {
    url = `${url}&order=hot&limit=${pages.limit}&offset=${pages.pageIndex * pages.limit}`
  }
  service.get(url).then((res: any) => {
    songList.value = res.songs.map((item: any) => {
      if (item.publishTime) {
        return {
          ...item,
          pubTimes: formatDate(item.publishTime, 'yyyy-mm-dd')
        }
      }
      return {
        ...item,
        pubTimes: '--'
      }
    })
  })
}

onMounted(() => {
  getSingerSongList()
})

console.log(props, pages)
</script>

<style lang="less" scoped>
.song-list {
  width: 100%;

  .song-list-top-header {
    margin: 15px 0;
  }

  .el-table {
    :deep(.el-table__cell) {
      padding: 5px 0;
    }
  }
}
</style>
