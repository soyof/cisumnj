<template>
  <div class="m-progress">
    <div class="progress-bar-out">
      <div class="progress-bar-in">
        <div class="circle"></div>
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
import { computed } from 'vue'
import { useStore } from 'vuex'
import { formatTime2HMS } from '@/utils/utils'

const store = useStore()

const totalTime = computed(() => {
  const dt = store.state.music.mTotalTime || 0
  return formatTime2HMS(dt)
})

const mCurTime = computed(() => {
  const dt = store.state.music.mCurTime || 0
  return formatTime2HMS(dt)
})
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
