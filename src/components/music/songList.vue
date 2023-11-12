<template>
  <div class="song-list">
    <el-table :max-height="maxHeight" :data="list" :rowClassName="tableRowClassName">
      <el-table-column type="index" label="#" width="60" />
      <el-table-column prop="name" label="歌曲名" showOverflowTooltip>
        <template #default="scope">
          <div style="display: flex; align-items: center" @click="playSong(scope.row)">
            <span class="song-name ellipsis">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" showOverflowTooltip />
      <el-table-column prop="duration" label="时长" showOverflowTooltip />
      <el-table-column prop="publishTime" label="发布时间" showOverflowTooltip>
        <template #default="scope">
          <span class="ellipsis">{{ handlePublishTimes(scope.row.publishTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        prop="alName"
        label="操作"
      >
        <template #default="scope">
          <el-tooltip
            effect="dark"
            content="下载"
            placement="top"
            :showAfter="1000"
            :enterable="false"
          >
            <el-icon @click="handleDownloadSong(scope.row)">
              <Download />
            </el-icon>
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="音乐百科"
            placement="top"
            :showAfter="1000"
            :enterable="false"
          >
            <el-icon class="music-encyclopedia-icon" @click="handleTargetEncyclopedia(scope.row)">
              <Box />
            </el-icon>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { Download, Box } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { defineProps, defineEmits } from 'vue'
import { downloadSong } from '@/utils/commonApi'
import { formatDate } from '@/utils/utils'

const store = useStore()
const $router = useRouter()

defineEmits('update:maxHeight')
defineProps({
  list: {
    type: Array,
    required: true,
    default() {
      return []
    }
  },
  maxHeight: {
    type: [String, Number],
    required: false,
    default: 'calc(100vh - 160px)'
  }
})

// const tableMaxHeight = computed(() => {
//   return props.maxHeight
// })

const tableRowClassName = ({ row, rowIndex }: { row: any, rowIndex: number }) => {
  if (rowIndex % 2 === 0) {
    return 'warning-row'
  }
  return 'success-row'
}

const playSong = (info: any) => {
  const songId = info.id
  store.dispatch('music/getCurMusicUrl', songId).then((res: any) => {
    store.commit('music/SET_M_IS_PLAY', false)
    store.commit('music/SET_M_CUR_TIME', 0)
    setTimeout(() => {
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
}

const handlePublishTimes = (times: number) => {
  return times ? formatDate(times, 'yyyy-MM-dd') : '--'
}

const handleTargetEncyclopedia = (info: any) => {
  $router.push(`/epoch/musicEncyclopedia/${info.id}`)
}

</script>

<style lang="less" scoped>
.song-list {
  :deep(.el-table) {
    .warning-row {
      background-color: rgba(#fef0f0, .3);
    }
    .success-row {
      background-color: rgba(#f0f9eb, .3);
    }
    .el-table__cell {
      padding: 5px 0;

      .song-name {
        color: @active-color;
        cursor: pointer;
      }
      .el-icon {
        color: @active-color;
        cursor: pointer;
      }
      .music-encyclopedia-icon {
        margin-left: 16px;
      }
    }
  }

  .simple-pagination {
    margin-top: 15px;
  }
}
</style>
