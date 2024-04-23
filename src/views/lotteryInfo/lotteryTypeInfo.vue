<template>
  <div class="lottery-info-wrap">
    <el-table :data="lotteryTypes" style="width: 100%">
      <el-table-column prop="typeName" label="彩票名称" width="120" />
      <el-table-column prop="openTime" label="开奖日期" width="180" />
      <el-table-column prop="startTime" label="发行时间" width="150" />
      <el-table-column prop="ruleDesc" label="其它信息" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ROLL_TOOLS_APP_ID, ROLL_TOOLS_APP_SECRET } from '@/dic'
import services from '@/plugins/axios'

const lotteryTypes: any = ref([])
const loading = ref(false)

const getLotteryTypeInfo = () => {
  loading.value = true
  services.get('https://www.mxnzp.com/api/lottery/common/types', {
    app_id: ROLL_TOOLS_APP_ID,
    app_secret: ROLL_TOOLS_APP_SECRET,
    code: 'ssq'
  }).then((res: any) => {
    lotteryTypes.value = res.data || []
  }).finally(() => {
    loading.value = false
  })
}
getLotteryTypeInfo()
</script>

<style lang="less" scoped>
.lottery-info-wrap {
  padding: 16px;
}
</style>
