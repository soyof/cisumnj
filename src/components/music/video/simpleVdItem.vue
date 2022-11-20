<template>
  <div class="simple-vd-item" @click="handlePlayCurVd(config.id)">
    <div class="simple-vd-left">
      <el-image
        :src="config.cover || config.imgurl"
        lazy
        loading="lazy"
      >
        <template #error>
          <div class="image-slot">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <div class="simple-vd-right">
      <div class="simple-vd-name simple-vd-info-item">
        <el-tooltip
          effect="dark"
          :content="config.name"
          placement="bottom"
          :showAfter="1000"
          :hideAfter="100"
        >
          <span>
            {{ config.name }}
          </span>
        </el-tooltip>
      </div>
      <div class="simple-vd-info-item">
        {{ config.artistName }}
      </div>
      <div class="simple-vd-info-item simple-vd-oth">
        <span>
          <el-icon><Clock /></el-icon>
          {{ config.duration ? formatTime2HMS(config.duration) : '--' }}
        </span>
        <span>
          <el-icon><VideoPlay /></el-icon>
          {{ config.playCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Picture, Clock, VideoPlay } from '@element-plus/icons-vue'
import { formatTime2HMS } from '@/utils/utils'
// eslint-disable-next-line no-undef
defineProps({
  config: {
    type: Object,
    required: true
  }
})
// eslint-disable-next-line no-undef
const emit = defineEmits(['svClick'])
const handlePlayCurVd = (id: string) => {
  emit('svClick', id)
}
</script>

<style lang="less" scoped>
.simple-vd-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  padding: 10px;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  &:hover {
    background-color: #fef0f0;
  }
  &:last-child {
    margin-bottom: 0;
  }
  .simple-vd-left {
    width: 130px;
    height: 80px;
    .el-image {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
  }
  .simple-vd-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    padding-left: 8px;
    box-sizing: border-box;
    .simple-vd-info-item {
      line-height: 18px;
      margin-bottom: 6px;
      color: #7d7f8a;
      .ellipsisMore(1);
      &:last-child {
        margin-bottom: 0;
      }
      &.simple-vd-oth {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-icon {
          font-size: 14px;
          margin-right: 3px;
        }
        span {
          display: flex;
          align-items: center;
          line-height: 14px;
          font-size: 12px;
        }
      }
    }
    .simple-vd-name {
      color: #333;
      .ellipsisMore(2);
    }

  }
}
</style>
