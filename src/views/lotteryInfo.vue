<template>
  <div class="lottery-info-wrap">
    <div class="lottery-info-header">
      456
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ROLL_TOOLS_APP_ID, ROLL_TOOLS_APP_SECRET } from '@/dic'
import services from '@/plugins/axios'

// const lotterInfoList: any = ref([])
const loading = ref(false)

const getLotteryInfo = () => {
  loading.value = true
  services.get('https://www.mxnzp.com/api/lottery/common/latest', {
    app_id: ROLL_TOOLS_APP_ID,
    app_secret: ROLL_TOOLS_APP_SECRET,
    code: 'ssq'
  }).then((res: any) => {
    console.log(res)
  }).finally(() => {
    loading.value = false
  })
}

getLotteryInfo()
</script>

<style lang="less" scoped>
.lottery-info-wrap {
  padding: 16px;
  :deep(.self-collapse)  {
    width: 100%;
  }
}
</style>
