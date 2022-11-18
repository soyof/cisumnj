<template>
  <div :ref="`vdItem${config.id}`" :key="config.id" class="vd-item">
    <div
      class="vd-image-wrap"
      @mouseenter="handleVdMouseEnter"
      @mouseleave="handleVdMouseLeave"
      @click="handleTargetDtl"
    >
      <el-image
        :src="config.cover"
        lazy
        loading="lazy"
      >
        <template #error>
          <div class="image-slot">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
      <div v-show="playSrcInfo && stayTime" class="video-preview">
        <video
          v-if="playSrcInfo"
          autoplay="autoplay"
          muted
          :src="playSrcInfo"
        >
          <source :src="playSrcInfo" type="video/mp4">
          <source :src="playSrcInfo" type="video/webm">
          <track
            label="Chinese"
            kind="captions"
            srclang="zh"
            default
            src=""
          >
        </video>
      </div>
      <div v-show="!stayTime" class="vd-oth-info-top">
        <span class="vd-time">{{ toDateTime(config.duration) }}</span>
      </div>
    </div>
    <el-tooltip
      :showAfter="800"
      :hideAfter="0"
      :content="config?.name || '--'"
      placement="bottom"
    >
      <div class="vd-title" @click="handleTargetDtl">
        {{ config?.name || "--" }}
      </div>
    </el-tooltip>
    <div class="oth-info">
      <span class="author" @click="handleTargetSingerDtl(config)">{{ config.artistName }}</span>
      <span class="play-count" title="播放次数">{{ config.playCount }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Picture } from '@element-plus/icons-vue'
import { formatTime2HMS } from '@/utils/utils'
import service from '@/plugins/axios'

const $router = useRouter()
// eslint-disable-next-line no-undef
const props = defineProps({
  config: {
    type: Object,
    required: true,
    default() {
      return {}
    }
  }
})
let intervalTime: any = null
const stayTimeForReq = 1000
const startTime = ref(0)
const stayTime = ref(0)
const playSrcInfo = ref('')

watch(stayTime, (newVal, oldVal) => {
  const stopover = newVal - startTime.value
  if (stopover > stayTimeForReq && !playSrcInfo.value) {
    getPlayUrl()
  }
})

const toDateTime = computed(() => {
  return (time: number) => {
    return formatTime2HMS(time, false)
  }
})

const getPlayUrl = () => {
  service.get(`/api/mv/url?id=${props.config.id}`).then((res: any) => {
    playSrcInfo.value = res.data ? (res.data.url || '') : ''
  }).finally(() => {
  })
}

const startInterVal = () => {
  startTime.value = new Date().getTime()
  stayTime.value = new Date().getTime()
  if (!playSrcInfo.value) {
    intervalTime = setInterval(_ => {
      stayTime.value = new Date().getTime()
    }, 1000)
  }
}
const endInterVal = () => {
  stayTime.value = 0
  startTime.value = 0
  clearInterval(intervalTime)
  intervalTime = null
}

const handleTargetSingerDtl = (info: any) => {
  $router.push(`/epoch/singer/${info.artistId}`)
}

const handleTargetDtl = () => {
  $router.push(`/epoch/songMvDtl/${props.config.id}/${props.config.artistId}`)
}

const handleVdMouseEnter = () => {
  if (startTime.value && stayTime.value) return
  startInterVal()
}
const handleVdMouseLeave = () => {
  endInterVal()
}

</script>

<style lang="less" scoped>
.vd-item {
  width: 240px;
  min-width: 240px;
  padding-bottom: 8px;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 0 6px rgba(0, 0, 0, .12);
  .vd-image-wrap {
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 130px;
    :deep(.el-image) {
      width: 100%;
      height: 130px;
      border-radius: 6px;
      overflow: hidden;
      img {
        transition: transform .5s ease;
      }
      &:hover {
        img {
          transform: scale(1.3);
        }
      }
    }
    .video-preview {
      width: 100%;
      height: 130px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 999;
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .vd-oth-info-top {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0 5px 5px;
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 12px;
      color: #fff;
      box-sizing: border-box;
      background-image: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.8) 100%);
      .vd-time {
        width: 100%;
        text-align: right;
        font-size: 12px;
      }
    }
  }

  .vd-title {
    padding: 0 8px;
    width: 100%;
    height: 20px;
    margin-top: 8px;
    font-size: 14px;
    color: #333;
    line-height: 20px;
    font-weight: 500;
    box-sizing: border-box;
    cursor: pointer;
    .ellipsisMore(1);
  }
  .oth-info {
    padding: 0 8px;
    margin-top: 5px;
    height: 20px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .author, .play-count {
      margin-right: 8px;
      font-size: 12px;
      color: @text-gray-color;
      white-space: nowrap;
      &:last-child {
        margin-right: 0;
      }
    }
    .author {
      cursor: pointer;
      &:hover {
        color: @active-color;
      }
    }
  }
}
</style>
