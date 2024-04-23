<template>
  <div v-loading="loading" class="lottery-win-info-wrap">
    <div ref="headerDom" class="lottery-win-info-header">
      <el-select
        v-model="formInfo.code"
        placeholder="彩票种类"
        clearable
        @change="handleCodeChange"
      >
        <el-option
          v-for="item in lotteryTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-table :max-height="tableHeight" :data="lotteryInfoList" style="width: 100%">
      <el-table-column prop="expect" label="彩票期号" />
      <el-table-column prop="openCode" label="中奖号码" />
      <el-table-column prop="time" label="开奖时间" />
      <el-table-column prop="name" label="类型" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { useAutoTable } from '@/hooks/useAutoTable'
// import HeaderLine from '@/components/global/headerLine.vue'
import { ref, reactive } from 'vue'
import { ROLL_TOOLS_APP_ID, ROLL_TOOLS_APP_SECRET } from '@/dic'
import services from '@/plugins/axios'
const { tableHeight, headerDom } = useAutoTable(32)
const formInfo: any = reactive({
  code: 'ssq'
})
const lotteryTypes = [
  { value: 'ssq', label: '双色球' },
  { value: 'qlc', label: '七乐彩' },
  { value: 'fc3d', label: '福彩3D' },
  { value: 'cjdlt', label: '超级大乐透' },
  { value: 'qxc', label: '七星彩' },
  { value: 'pl3', label: '排列3' },
  { value: 'pl5', label: '排列(5)' }
]
const lotteryInfoList: any = ref([])
const loading = ref(false)

const handleCodeChange = () => {
  getLotteryInfo()
}

const getLotteryInfo = () => {
  loading.value = true
  services.get('https://www.mxnzp.com/api/lottery/common/history', {
    app_id: ROLL_TOOLS_APP_ID,
    app_secret: ROLL_TOOLS_APP_SECRET,
    ...formInfo,
    size: 50
  }).then((res: any) => {
    lotteryInfoList.value = res.data
  }).finally(() => {
    loading.value = false
  })
}
getLotteryInfo()

</script>

<style lang="less" scoped>
.lottery-win-info-wrap {
  padding: 16px;
  .lottery-win-info-header {
    padding-bottom: 12px;
  }
  .header-line {
    margin-bottom: 16px;
  }
}
</style>
