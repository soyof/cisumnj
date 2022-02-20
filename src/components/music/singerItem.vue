<template>
  <div class="singer-item" @click="handleSingerDetail">
    <div class="singer-item-avatar">
      <el-image :src="info.img1v1Url" lazy>
        <template #placeholder>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <div class="singer-item-info">
      <div class="singer-name">
        {{ info.name || '--' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['detail'])

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})

const handleSingerDetail = () => {
  emit('detail', props.info)
}
</script>

<style lang="less" scoped>
.singer-item {
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;

  .singer-item-avatar {
    width: 130px;
    height: 130px;
    border-radius: 5px;
    overflow: hidden;

    .el-image {
      width: 100%;
      height: 100%;
      .center();

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

  .singer-item-info {
    padding-top: 10px;
    .center();

    .singer-name {
      color: #333;
      font-size: 16px;
      text-align: center;
      word-break: break-all;
    }
  }
}
</style>
