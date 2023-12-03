<template>
  <div class="song-sheet-dtl">
    <div class="dtl-wrap">
      <div v-if="info.avatarUrl" class="dtl-item">
        <div class="dtl-item-label">
          头像
        </div>
        <div class="dtl-item-value-avatar">
          <el-avatar :size="30" :src="info.avatarUrl" />
        </div>
      </div>
      <div class="dtl-item">
        <div class="dtl-item-label">
          昵称
        </div>
        <div class="dtl-item-value-value">
          <span class="dtl-item-value-txt">{{ info.nickname || '--' }}</span>
        </div>
      </div>
      <div class="dtl-item">
        <div class="dtl-item-label">
          生日
        </div>
        <div class="dtl-item-value-value">
          <span class="dtl-item-value-txt">{{ formatDate(info.birthday, 'yyyy-MM-dd') || '--' }}</span>
        </div>
      </div>
      <div class="dtl-item">
        <div class="dtl-item-label">
          性别
        </div>
        <div class="dtl-item-value-value">
          <span class="dtl-item-value-txt">{{ genderInfo[info.gender] || '--' }}</span>
        </div>
      </div>
      <div class="dtl-item">
        <div class="dtl-item-label">
          签名
        </div>
        <div class="dtl-item-value-value">
          <span class="dtl-item-value-txt">{{ info.signature || '--' }}</span>
        </div>
      </div>
      <div v-if="info.backgroundUrl" class="dtl-item">
        <div class="dtl-item-label">
          相关图片
        </div>
        <div class="dtl-item-value-value">
          <el-image
            :src="info.backgroundUrl"
            :previewSrcList="[info.backgroundUrl]"
            :initialIndex="4"
            previewTeleported
            fit="cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue'
import { formatDate } from '@/utils/utils'
import { genderInfo } from '@/dic'

defineProps({
  info: {
    type: Object,
    required: true
  }
})

</script>

<style lang="less" scoped>
.song-sheet-dtl {
  .dtl-wrap {
    padding: 12px;

    .dtl-item {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .dtl-item-label {
        align-self: flex-start;
        width: 80px;
        min-width: 80px;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        margin-right: 15px;
        font-size: 12px;
        text-align: right;
        background-color: #f5f5f5;
      }

      .dtl-item-value {
        line-height: 22px;
        font-size: 12px;

        .dtl-item-value-txt {
          font-size: 12px;
        }

        .el-tag {
          margin-right: 5px;
          margin-bottom: 5px;
          font-size: 12px;

          :deep(.el-tag__content) {
            font-size: 12px;
          }
        }
      }
    }

  }
}
</style>
