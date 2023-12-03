<template>
  <div ref="videoPlayerWrap" class="video-player-wrap">
    <video ref="videoPlayer" controls class="video-player video-js"></video>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, reactive } from 'vue'
import videoJs from 'video.js'
import { vdZhCn } from '@/dic/videoLanguage'
import 'video.js/dist/video-js.css'
import service from '@/plugins/axios'
// require('video.js/dist/lang/zh-CN.js')
// eslint-disable-next-line no-undef
// defineEmits(['update:mvId'])
// eslint-disable-next-line no-undef
const props = defineProps({
  mvId: {
    type: String,
    required: true
  }
})

watch(props, (val, oldVal) => {
  console.log(val.mvId, oldVal.mvId)
  getMvPlayUrl().then(() => {
    player.value.src({ src: vdUrl.value })
  })
})

const videoPlayerWrap = ref()
const videoPlayer = ref()
const player = ref()
const vdUrl = ref('')
videoJs.addLanguage('zh-CN', vdZhCn)
// 'playToggle', 'volumePanel', 'currentTimeDisplay', 'timeDivider', 'durationDisplay', 'progressControl', 'liveDisplay', 'seekToLive', 'remainingTimeDisplay', 'customControlSpacer', 'playbackRateMenuButton', 'chaptersButton', 'descriptionsButton', 'subsCapsButton', 'audioTrackButton', 'fullscreenToggle'
const videoOptions = reactive({
  bigPlayButton: true,
  autoplay: true,
  controls: true,
  playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
  controlBar: {
    volumePanel: {
      inline: false
    }
  },
  error: '加载失败',
  notSupportedMessage: '此视频无法播放',
  defaultVolume: 0.3,
  seeking: true,
  language: 'zh-CN',
  sources: []
})

const getMvPlayUrl = () => {
  return service.get('/api/mv/url', {
    id: props.mvId,
    r: 1080
  }).then((res: any) => {
    if (res && res.data) {
      vdUrl.value = res.data.url
    }
  })
}

const handleInPictureInPicture = () => {
  // const picDom = videoPlayerWrap.value.querySelector('.vjs-picture-in-picture-control')
  // console.log(picDom)
  //
  // if (picDom && picDom.click && !document.pictureInPictureElement) {
  //   picDom.click()
  // }
}

const handleOutPictureInPicture = () => {
  // const picDom = videoPlayerWrap.value.querySelector('.vjs-picture-in-picture-control')
  // if (picDom && picDom.click && document.pictureInPictureElement) {
  //   picDom.click()
  // }
}

onMounted(() => {
  getMvPlayUrl().then(() => {
    videoOptions.sources = [{ src: vdUrl.value }]
    player.value = videoJs(videoPlayer.value, videoOptions, () => {})
  })
})
onUnmounted(() => {
  player.value.dispose()
})

// eslint-disable-next-line no-undef
defineExpose({
  inPictureInPicture: handleInPictureInPicture,
  outPictureInPicture: handleOutPictureInPicture
})
</script>

<style lang="less" scoped>
.video-player-wrap {
  width: 850px;
  min-width: 850px;
  height: 480px;
  //overflow: hidden;
  .video-player {
    position: relative;
    width: 100%;
    height: 100%;
    .vjs-tech {
      width: 100%;
      height: 100%;
    }
    :deep(.vjs-big-play-button) {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    :deep(.vjs-slider-vertical)  {
      .vjs-volume-level:before {
        left: -0.33em !important;
      }
    }
    :deep(.vjs-control-bar) {
      .vjs-progress-control {
        &:hover {
          .vjs-play-progress:before {
            top: -0.13em !important;
          }
        }
      }

    }
  }
}
</style>
