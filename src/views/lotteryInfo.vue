<template>
  <div class="lottery-info-wrap">
    <div class="lottery-info-header">
      <el-select
        v-model="formInfo.region"
        placeholder="彩票种类"
        clearable
      >
        <el-option
          v-for="item in lotteryTypes"
          :key="item.typeCode"
          :label="item.typeName"
          :value="item.typeCode"
        />
      </el-select>
    </div>
    <HeaderLine title="相关信息" />
    <el-table :data="lotteryTypes" style="width: 100%">
      <el-table-column prop="typeName" label="彩票名称" width="180" />
      <el-table-column prop="openTime" label="开奖日期" />
      <el-table-column prop="startTime" label="发行时间" width="180" />
      <el-table-column prop="ruleDesc" label="其它信息" width="180" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import HeaderLine from '@/components/global/headerLine.vue'
import { ref, reactive } from 'vue'
import { ROLL_TOOLS_APP_ID, ROLL_TOOLS_APP_SECRET } from '@/dic'
import services from '@/plugins/axios'

// const lotterInfoList: any = ref([])
const formInfo: any = reactive({
  code: ''
})
const lotteryTypes: any = ref([])
const loading = ref(false)

const getLotteryTypeInfo = () => {
  loading.value = true
  services.get('https://www.mxnzp.com/api/lottery/common/types', {
    app_id: ROLL_TOOLS_APP_ID,
    app_secret: ROLL_TOOLS_APP_SECRET,
    code: 'ssq'
  }).then((res: any) => {
    console.log(res)
    lotteryTypes.value = res.data || []
  }).finally(() => {
    loading.value = false
  })
}

const getLotteryInfo = () => {
  // loading.value = true
  // services.get('https://www.mxnzp.com/api/lottery/common/latest', {
  //   app_id: ROLL_TOOLS_APP_ID,
  //   app_secret: ROLL_TOOLS_APP_SECRET,
  //   code: 'ssq'
  // }).then((res: any) => {
  //   console.log(res)
  // }).finally(() => {
  //   loading.value = false
  // })
}
getLotteryTypeInfo()
getLotteryInfo()
</script>

<style lang="less" scoped>
.lottery-info-wrap {
  padding: 16px;
  .lottery-info-header {
    margin-bottom: 12px;
  }
  :deep(.self-collapse)  {
    width: 100%;
  }
}
</style>
