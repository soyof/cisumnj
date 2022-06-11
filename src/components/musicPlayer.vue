<template>
  <div v-drag="'.music-drag'" class="music-player">
    <div class="music-player-wrap">
      <div class="music-pre music-player-item">
        <i class="iconfont icon-shangyigeshangyiqu"></i>
      </div>
      <div class="play-or-suspend music-player-item" @click="handlePlayMusic">
        <i v-if="mIsPlay" class="iconfont icon-zanting1"></i>
        <i v-else class="iconfont icon-bofang"></i>
      </div>
      <div class="m-next music-player-item">
        <i class="iconfont icon-xiayigexiayiqu"></i>
      </div>
      <div class="m-stop music-player-item">
        <i class="iconfont icon-stopo"></i>
      </div>
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
            <MProgress />
          </div>
        </div>
      </div>
      <div class="m-download music-player-item">
        <i class="iconfont icon-xiazai"></i>
      </div>
      <div class="music-drag music-player-item">
        <i class="iconfont icon-drag"></i>
      </div>
    </div>
    <p :ref="p"></p>
  </div>
  <audio
    v-if="songPlayUrl"
    id="mpAudioDom"
    :ref="el => mpAudioDom = el"
    :src="songPlayUrl"
    class="mp-audio"
  ></audio>
</template>

<script lang="ts" setup>
import MProgress from '@/components/music/mProgress'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

const infoUrl = require('@/assets/images/logo6.png')
const store = useStore()
const mpAudioDom = ref()
const p = ref(null)

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
  if (val) {
    mpAudioDom.value.play()
  } else {
    mpAudioDom.value.pause()
  }
})

const handlePlayMusic = () => {
  store.commit('music/SET_M_IS_PLAY', !mIsPlay.value)
}

</script>

<style lang="less" scoped>
.music-player {
  position: fixed;
  left: 25%;
  top: 50px;
  width: 800px;
  height: 50px;
  background-color: #f5f5f5;
  border-radius: 25px;
  z-index: 999;
  overflow: hidden;

  .music-player-wrap {
    width: calc(100% - 50px);
    height: 100%;
    margin: 0 25px;
    display: flex;
    align-items: center;

    .music-player-item {
      .iconfont {
        margin-right: 5px;
        font-size: 28px;
        cursor: pointer;
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
        cursor: move;
      }
    }
  }
}
.mp-audio {
  display: none;
}
</style>
