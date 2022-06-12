<template>
  <div v-if="!isSmall" v-drag="'.music-drag'" :class="['music-player', { 'small': isSmall }]">
    <div class="music-player-wrap">
      <div class="music-pre music-player-item">
        <i class="iconfont icon-shangyigeshangyiqu disabled"></i>
      </div>
      <div class="play-or-suspend music-player-item" @click="handlePlayMusic">
        <i
          v-if="mIsPlay"
          :class="['iconfont', 'icon-zanting1', {'disabled': !songPlayUrl}]"
        ></i>
        <i
          v-else
          :class="['iconfont', 'icon-bofang', {'disabled': !songPlayUrl}]"
        ></i>
      </div>
      <div class="m-next music-player-item">
        <i class="iconfont icon-xiayigexiayiqu disabled"></i>
      </div>
      <!--      <div class="m-stop music-player-item">-->
      <!--        <i class="iconfont icon-stopo"></i>-->
      <!--      </div>-->
      <div class="m-info music-player-item">
        <div class="m-avatar">
          <img v-if="songImgUrl" :src="songImgUrl" alt="">
          <img v-else :src="infoUrl" class="default">
        </div>
        <div class="m-other">
          <div class="m-name">
            {{ songName }}
          </div>
          <div class="m-process">
            <MProgress
              @change="handleProgressChange"
            />
          </div>
        </div>
      </div>
      <div class="m-download music-player-item" @click="handleDownloadMusic">
        <i :class="['iconfont', 'icon-xiazai', {'disabled': !songPlayUrl}]"></i>
      </div>
      <div class="music-drag music-player-item">
        <i class="iconfont icon-drag"></i>
      </div>
      <div class="music-small" @click="handleSmall(true)">
        <el-icon>
          <Minus />
        </el-icon>
      </div>
    </div>
  </div>
  <div v-else v-drag class="small-player">
    <div :class="['m-info', { 'animate-play': mIsPlay }]">
      <img v-if="songImgUrl" :src="songImgUrl" alt="">
      <img v-else :src="infoUrl" class="default">
    </div>
    <div class="small-player-opera" @dblclick="handleSmall(false)">
      <i
        v-if="mIsPlay"
        :class="['iconfont', 'icon-zanting1', {'disabled': !songPlayUrl}]"
        @click="handlePlayMusic"
      ></i>
      <i
        v-else
        :class="['iconfont', 'icon-bofang', {'disabled': !songPlayUrl}]"
        @click="handlePlayMusic"
      ></i>
    </div>
  </div>
  <audio
    v-if="songPlayUrl"
    id="mpAudioDom"
    :ref="el => mpAudioDom = el"
    :src="songPlayUrl"
    preload
    class="mp-audio"
  ></audio>
</template>

<script lang="ts" setup>
import { Minus } from '@element-plus/icons-vue'
import MProgress from '@/components/music/mProgress'
import services from '@/plugins/axios'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

const infoUrl = require('@/assets/images/logo6.png')
const store = useStore()
const mpAudioDom = ref()
const isSmall = ref(true)

const mInfo = computed(() => {
  return store.state?.music?.curMusicInfo
})
const songImgUrl = computed(() => {
  return mInfo.value?.al?.picUrl
})
const songPlayUrl = computed(() => {
  return mInfo.value?.url
})
const mIsPlay = computed(() => {
  return store.state.music.mIsPlay
})
const songName = computed(() => {
  const authorList = mInfo.value?.ar || []
  let ar = authorList.map((item: any) => item.name).join(' ') || ''
  ar = ar ? ` - ${ar}` : ''
  return mInfo.value?.name ? `${mInfo.value?.name}${ar}` : '暂无'
})

watch(mIsPlay, (val) => {
  if (!songPlayUrl.value) return
  const duration = Math.ceil((mpAudioDom.value.duration || 0) * 1000)
  store.commit('music/SET_M_TOTAL_TIME', duration)
  if (val) {
    handlePlay()
  } else {
    handlePauseMusic()
    mpAudioDom.value.pause()
  }
})

const handlePlay = () => {
  if (!mpAudioDom.value) {
    store.commit('music/SET_M_IS_PLAY', false)
    return
  }
  store.dispatch('music/mPlay')
  mpAudioDom.value.play()
}

const handlePlayMusic = () => {
  if (!songPlayUrl.value) return
  store.commit('music/SET_M_IS_PLAY', !mIsPlay.value)
}

const handlePauseMusic = () => {
  store.dispatch('music/mPause')
}

const handleProgressChange = (val: number) => {
  if (songPlayUrl.value) {
    store.commit('music/SET_M_CUR_TIME', val)
    mpAudioDom.value.currentTime = val / 1000
  }
}

const handleDownloadMusic = () => {
  if (!songPlayUrl.value) return
  services.getDownload(songPlayUrl.value, {}, songName.value)
}
const handleSmall = (flag) => {
  isSmall.value = flag
}
</script>

<style lang="less" scoped>
.music-player {
  position: fixed;
  left: 25%;
  top: 90%;
  width: 800px;
  height: 50px;
  border-radius: 25px;
  z-index: 999;
  overflow: hidden;
  background-image: linear-gradient(-225deg, #E3FDF5 0%, #f1f2f8 48%, #FFE6FA 100%);
  animation: playerBgc  3s linear infinite forwards !important;
  transition: width .3s;

  &.small {
    width: 50px;
  }

  .music-player-wrap {
    position: relative;
    width: calc(100% - 50px);
    height: 100%;
    margin: 0 25px;
    display: flex;
    align-items: center;

    .music-player-item {
      .iconfont {
        margin-right: 5px;
        font-size: 28px;
        color: @active-color;
        cursor: pointer;

        &.disabled {
          color: #ccc;
          cursor: not-allowed;
        }
      }
    }

    .m-info {
      flex: 1;
      display: flex;
      .m-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .m-other {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 5px 12px;
        .m-name {
          font-size: 12px;
        }
        .m-process {
          width: 100%;
        }
      }
    }

    .m-download {
      margin-left: auto;
    }

    .music-drag {
      .icon-drag {
        font-size: 24px;
        cursor: move;
      }
    }

    .music-small {
      position: absolute;
      right: -25px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 50px;
      cursor: pointer;
      .el-icon {
        font-size: 20px;
        color: #79bbff;
      }
    }
  }
}
.small-player {
  position: fixed;
  left: 95%;
  top: 90%;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  z-index: 999;
  overflow: hidden;
  background-image: linear-gradient(-225deg, #E3FDF5 0%, #f1f2f8 48%, #FFE6FA 100%);
  animation: playerBgc  3s linear infinite forwards !important;
  transition: width .3s;

  .small-player-opera {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, .5);
    .center();
    display: none;
    .iconfont {
      font-size: 28px;
      color: #fff;
      cursor: pointer;

      &.disabled {
        cursor: not-allowed;
      }
    }
  }

  &:hover {
    .small-player-opera {
      display: flex;
    }
  }
  .m-info {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }

    &.animate-play {
      animation: rotateAnimate 8s linear infinite;
    }
  }
}
.mp-audio {
  display: none;
}
</style>
