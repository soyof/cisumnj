<template>
  <div class="song-list">
    <el-table :data="songList" style="width: 100%" size="small">
      <el-table-column type="index" label="#" width="100" />
      <el-table-column prop="name" label="歌曲名" />
      <el-table-column v-if="isTop" prop="pubTimes" label="发布时间" />
      <el-table-column v-if="!isTop" prop="alName" label="专辑" />
    </el-table>
    <SimplePagination
      v-if="!isTop"
      :pages="pages"
      :loading="loading"
      @change="getSingerSongList"
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
  },
  isPagination: {
    type: Boolean,
    required: false,
    default: false
  }
})

const loading = ref(false)

const songList = ref([])

const pages = reactive({
  pageIndex: 0,
  limit: 50,
  isMore: true
})

const getSingerSongList = () => {
  loading.value = true
  let url = `${props.url}?id=${props.singerId}`

  if (!props.isTop) {
    url = `${url}&order=hot&limit=${pages.limit}&offset=${pages.pageIndex * pages.limit}`
  }
  service.get(url).then((res: any) => {
    pages.isMore = !!res.more
    const data = res.songs.map((item: any) => {
      if (item.publishTime) {
        return {
          ...item,
          pubTimes: formatDate(item.publishTime, 'yyyy-mm-dd')
        }
      }
      return {
        ...item,
        alName: item.al ? item.al.name : '--',
        pubTimes: '--'
      }
    })

    if (props.isPagination) {
      songList.value = songList.value.concat(data)
    } else {
      songList.value = data
    }
  }).finally(() => {
    loading.value = false
  })
}

onMounted(() => {
  getSingerSongList()
})
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

  .simple-pagination {
    margin-top: 15px;
  }
}
</style>
