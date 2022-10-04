<template>
  <div class="pic-title-item" @click="handleSingerDetail">
    <div class="pic-title-item-avatar">
      <el-image :src="picUrl" lazy>
        <template #placeholder>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <div class="pic-title-item-info">
      <div class="pic-title-name">
        {{ title || '--' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['detail'])

defineProps({
  picUrl: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: false,
    default: '暂无'
  }
})

const handleSingerDetail = () => {
  emit('detail')
}
</script>

<style lang="less" scoped>
.pic-title-item {
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;

  .pic-title-item-avatar {
    width: 130px;
    height: 130px;
    border-radius: 5px;
    overflow: hidden;

    .el-image {
      width: 100%;
      height: 100%;

      .image-slot {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        .center();

        .el-icon {
          color: #ccc;
          font-size: 26px;
        }

      }

      img {
        width: 100%;
        height: 100%;
      }
    }

  }

  .pic-title-item-info {
    padding-top: 10px;
    .center();
    flex-wrap: wrap;

    .pic-title-name {
      color: #333;
      font-size: 16px;
      text-align: center;
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
}
</style>
