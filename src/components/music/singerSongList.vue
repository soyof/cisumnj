<template>
  <div class="singer-song-list">
    <el-table :data="songList" style="width: 100%" size="small">
      <el-table-column type="index" label="#" width="60" />
      <el-table-column prop="name" label="歌曲名">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span class="song-name" @click="playSong(scope.row)">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="isTop" prop="pubTimes" label="发布时间" />
      <el-table-column v-if="!isTop" prop="alName" label="专辑" />
      <el-table-column
        align="center"
        width="100"
        prop="alName"
        label="操作"
      >
        <template #default="scope">
          <el-icon @click="handleDownloadSong(scope.row)">
            <Download />
          </el-icon>
        </template>
      </el-table-column>
    </el-table>
    <SimplePagination
      v-if="!isTop"
      :pages="pages"
      :loading="loading"
      @change="getSingerSongList"
    />
    <audio v-if="songUrl" :src="songUrl" autoplay></audio>
  </div>
</template>

<script lang='ts' setup>
import { Download } from '@element-plus/icons-vue'
import { defineProps, reactive, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import service from '@/plugins/axios'
import { formatDate } from '@/utils/utils'
import { downloadSong } from '@/utils/commonApi'

const store = useStore()

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

const songUrl = ref('')

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

const playSong = (info: any) => {
  const songId = info.id
  store.dispatch('music/getCurMusicUrl', songId).then((res: any) => {
    store.commit('music/SET_M_IS_PLAY', false)
    store.commit('music/SET_M_CUR_TIME', 0)
    setTimeout(_ => {
      store.commit('music/SET_M_IS_PLAY', true)
    }, 200)
  })
}

const handleDownloadSong = (info: any) => {
  let songName = info.name
  if (info.ar) {
    songName = `${songName} - ${info.ar.map((item: any) => item.name).join(' ')}`
  }

  downloadSong(info.id, songName)
  console.log(songName)
}
</script>

<style lang="less" scoped>
.singer-song-list {
  width: 100%;

  .song-list-top-header {
    margin: 15px 0;
  }

  .el-table {
    :deep(.el-table__cell) {
      padding: 5px 0;

      .song-name {
        color: @active-color;
        cursor: pointer;
      }
      .el-icon {
        color: @active-color;
        cursor: pointer;
      }
    }
  }

  .simple-pagination {
    margin-top: 15px;
  }
}
</style>
