<template>
  <div class="m-progress">
    <div
      :ref="(el) => barOut = el"
      class="progress-bar-out"
      @click="handleOutClick"
    >
      <div class="progress-bar-in" :style="{ width: curTimeWidth }">
        <div
          class="circle"
          @mousedown="handleCircleMousedown"
        ></div>
      </div>
    </div>
    <div class="progress-oth">
      <span>{{ mCurTime }}</span>
      <span class="split">/</span>
      <span>{{ totalTime }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineEmits, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { formatTime2HMS } from '@/utils/utils'

const emit = defineEmits(['change'])

const store = useStore()

const barOut = ref()
const barInWidth = ref(0)

// onMounted(() => {
//   document.addEventListener('mouseup', docMouseUp)
// })
onUnmounted(() => {
  document.removeEventListener('mouseup', docMouseUp)
})

const totalTime = computed(() => {
  const dt = store.state.music.mTotalTime || 0
  return formatTime2HMS(dt)
})

const mCurTime = computed(() => {
  const dt = store.state.music.mCurTime || 0
  return formatTime2HMS(dt)
})
const curTimeWidth = computed(() => {
  const curTime = store.state.music.mCurTime || 0
  const totalTime = store.state.music.mTotalTime || 0
  if (barInWidth.value > 0) {
    return `${barInWidth.value}%`
  }
  return `${(curTime / totalTime) * 100}%`
})

const calcCurTime = (val: number) => {
  const totalTime = +(store.state.music.mTotalTime || 0)
  if (val > 1) {
    val = 1
  }
  if (val < 0) {
    val = 0
  }
  return Math.floor(totalTime * val)
}

const handleOutClick = (el: any) => {
  const offsetX = el.offsetX
  const width = barOut.value.clientWidth
  const curTime = calcCurTime(offsetX / width)
  emit('change', curTime)
}

const handleCircleMousedown = (el: any) => {
  if (!store.state.music.curMusicInfo.url) return
  document.addEventListener('mousemove', docMousemove)
  document.addEventListener('mouseup', docMouseUp)
}

const docMouseUp = () => {
  if (barInWidth.value && barInWidth.value > 0) {
    const curTime = calcCurTime(barInWidth.value / 100)
    emit('change', curTime)
  }
  barInWidth.value = 0
  document.removeEventListener('mousemove', docMousemove)
  document.onmousemove = null
}

const docMousemove = (outEl: any) => {
  let offsetX = outEl.offsetX
  const width = barOut.value.clientWidth
  if (offsetX > width) {
    offsetX = width
  }
  if (offsetX < 0) {
    offsetX = 0
  }
  barInWidth.value = (offsetX / width) * 100
}
</script>

<style lang="less" scoped>
.m-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 16px;
  .progress-bar-out {
    width: 100%;
    height: 6px;
    margin-right: 8px;
    border-radius: 3px;
    background-color: #ebeef5;
    .progress-bar-in {
      position: relative;
      width: 0;
      height: 6px;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      background-color: #409eff;
      .circle {
        position: absolute;
        right: 0;
        top: 50%;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        transform: translateY(-50%);
        background-color: #fff;
        cursor: pointer;

        &::after {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          content: '';
          background-color: #409eff;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .progress-oth {
    font-size: 12px;
    .split {
      margin: 0 3px;
    }
  }
}
</style>
