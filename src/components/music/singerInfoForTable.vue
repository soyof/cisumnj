<template>
  <el-descriptions
    direction="horizontal"
    :column="1"
    size="small"
    border
    class="singer-info-description-wrap"
  >
    <el-descriptions-item label="头像" labelClassName="singer-el-descriptions">
      <div class="avatar-box">
        <el-image
          style="width: 30px; height: 30px"
          :src="artistInfo.avatarUrl"
          :previewSrcList="previewSrcList"
          :initialIndex="4"
          previewTeleported
          fit="cover"
        />
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="用户名" labelClassName="singer-el-descriptions">
      {{ artistInfo?.userName }}
    </el-descriptions-item>
    <el-descriptions-item label="姓名" labelClassName="singer-el-descriptions">
      {{ artistInfo?.artistName }}
    </el-descriptions-item>
    <el-descriptions-item label="昵称" labelClassName="singer-el-descriptions">
      {{ artistInfo?.name }}
    </el-descriptions-item>
    <el-descriptions-item label="网名" labelClassName="singer-el-descriptions">
      {{ artistInfo?.nickname }}
    </el-descriptions-item>
    <el-descriptions-item label="性别" labelClassName="singer-el-descriptions">
      {{ genderInfo[artistInfo?.gender] }}
    </el-descriptions-item>
    <el-descriptions-item label="出生日期" labelClassName="singer-el-descriptions">
      {{ artistInfo.birthday ? formatDate(artistInfo.birthday, 'yyyy-MM-dd') : '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="创建时间" labelClassName="singer-el-descriptions">
      {{ artistInfo.createTime ? formatDate(artistInfo.createTime, 'yyyy-MM-dd') : '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="个人简介" labelClassName="singer-el-descriptions">
      {{ artistInfo?.briefDesc }}
    </el-descriptions-item>
    <el-descriptions-item label="签名" labelClassName="singer-el-descriptions">
      {{ artistInfo?.signature }}
    </el-descriptions-item>
    <el-descriptions-item label="个人标签" labelClassName="singer-el-descriptions">
      <template v-if="tagListCpd(artistInfo.imageDesc).length > 0">
        <el-tag
          v-for="(tag, ids) in tagListCpd(artistInfo.imageDesc)"
          :key="`singer-tag-${ids}`"
          size="small"
        >
          {{ tag }}
        </el-tag>
      </template>
      <span v-else>--</span>
    </el-descriptions-item>
    <el-descriptions-item label="最后登录IP" labelClassName="singer-el-descriptions">
      {{ artistInfo.lastLoginIP || '--' }}
    </el-descriptions-item>
    <el-descriptions-item label="最后登录时间" labelClassName="singer-el-descriptions">
      {{ artistInfo.lastLoginTime ? formatDate(artistInfo.lastLoginTime, 'yyyy-MM-dd') : '--' }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { genderInfo } from '@/dic'
import { formatDate } from '@/utils/utils'
// eslint-disable-next-line no-undef
const props = defineProps({
  artistInfo: {
    type: Object,
    required: true
  }
})

const tagListCpd = computed(() => {
  return (tags: string) => {
    if (tags && tags.split) {
      return tags.split('、')
    }
    return []
  }
})

const previewSrcList = computed(() => {
  const list = []
  props.artistInfo?.avatarUrl && list.push(props.artistInfo.avatarUrl)
  props.artistInfo?.backgroundUrl && list.push(props.artistInfo.backgroundUrl)
  props.artistInfo?.cover && list.push(props.artistInfo.cover)
  return list
})
</script>

<style lang="less" scoped>
.singer-info-description-wrap {
  :deep(.singer-el-descriptions) {
    width: 120px !important;
    min-width: 120px !important;
    max-width: 120px !important;
    .el-tag {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
  .avatar-box {
    display: flex;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
  }
  .el-tag {
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
