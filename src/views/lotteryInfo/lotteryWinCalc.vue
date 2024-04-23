<template>
  <div class="lottery-win-calc-wrap">
    <el-form
      labelPosition="right"
      labelWidth="auto"
      :model="formInfo"
    >
      <el-form-item label="彩票种类">
        <el-select
          v-model="formInfo.code"
          placeholder="彩票种类"
          @change="handleCodeChange"
        >
          <el-option
            v-for="item in lotteryTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="彩票期号">
        <el-input v-model="formInfo.expect" />
      </el-form-item>
      <el-form-item class="lottery-info-number" label="彩票号码">
        <el-input
          v-for="(item, ids) in formLotteryNum"
          :key="`${ids}-lottery-info-number`"
          v-model="formInfo[`lotteryNo${ids+1}`]"
          :inputStyle="lotteryNumStyle"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCalcWinInfo">
          查询
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>

import { reactive, ref, computed } from 'vue'
import { ROLL_TOOLS_APP_ID, ROLL_TOOLS_APP_SECRET } from '@/dic'
import services from '@/plugins/axios'

const formInfo: any = reactive({
  code: 'ssq',
  expect: '',
  lotteryNo1: '',
  lotteryNo2: '',
  lotteryNo3: '',
  lotteryNo4: '',
  lotteryNo5: '',
  lotteryNo6: '',
  lotteryNo7: '',
  lotteryNo8: ''
})
const loading = ref(false)
const lotteryTypes = [
  { value: 'ssq', label: '双色球' },
  { value: 'qlc', label: '七乐彩' },
  { value: 'fc3d', label: '福彩3D' },
  { value: 'cjdlt', label: '超级大乐透' },
  { value: 'qxc', label: '七星彩' },
  { value: 'pl3', label: '排列3' },
  { value: 'pl5', label: '排列(5)' }
]

const lotteryNumStyle = computed(() => {
  const typeInfo: any = {
    ssq: `${(1 / 7) * 100}%`,
    qlc: `${(1 / 8) * 100}%`,
    fc3d: `${(1 / 3) * 100}%`,
    cjdlt: `${(1 / 7) * 100}%`,
    qxc: `${(1 / 7) * 100}%`,
    pl3: `${(1 / 3) * 100}%`,
    pl5: `${(1 / 5) * 100}%`
  }
  return {
    width: typeInfo[formInfo.code]
  }
})

const formLotteryNum = computed(() => {
  const numInfo: any = {
    ssq: 7,
    qlc: 8,
    fc3d: 3,
    cjdlt: 7,
    qxc: 7,
    pl3: 3,
    pl5: 5
  }
  return new Array(numInfo[formInfo.code])
})

const handleCodeChange = () => {
  formInfo.lotteryNo1 = ''
  formInfo.lotteryNo2 = ''
  formInfo.lotteryNo3 = ''
  formInfo.lotteryNo4 = ''
  formInfo.lotteryNo5 = ''
  formInfo.lotteryNo6 = ''
  formInfo.lotteryNo7 = ''
  formInfo.lotteryNo8 = ''
}

const getLotteryNo = (type: any, info: any) => {
  switch (type) {
    case 'ssq':
      return `${formInfo.lotteryNo1},${formInfo.lotteryNo2},${formInfo.lotteryNo3},${formInfo.lotteryNo4},${formInfo.lotteryNo5},${formInfo.lotteryNo6}@${formInfo.lotteryNo7}`
    case 'qlc':
      return `${formInfo.lotteryNo1},${formInfo.lotteryNo2},${formInfo.lotteryNo3},${formInfo.lotteryNo4},${formInfo.lotteryNo5},${formInfo.lotteryNo6},${formInfo.lotteryNo7}@${formInfo.lotteryNo8}`
    case 'fc3d':
      return `${formInfo.lotteryNo1},${formInfo.lotteryNo2},${formInfo.lotteryNo3}`
    case 'cjdlt':
      return `${formInfo.lotteryNo1},${formInfo.lotteryNo2},${formInfo.lotteryNo3},${formInfo.lotteryNo4},${formInfo.lotteryNo5}@${formInfo.lotteryNo6},${formInfo.lotteryNo7}`
    case 'qxc':
      return `${formInfo.lotteryNo1},${formInfo.lotteryNo2},${formInfo.lotteryNo3},${formInfo.lotteryNo4},${formInfo.lotteryNo5},${formInfo.lotteryNo6},${formInfo.lotteryNo7}`
    case 'pl3':
      return `${formInfo.lotteryNo1},${formInfo.lotteryNo2},${formInfo.lotteryNo3}`
    case 'pl5':
      return `${formInfo.lotteryNo1},${formInfo.lotteryNo2},${formInfo.lotteryNo3},${formInfo.lotteryNo4},${formInfo.lotteryNo5}`
    default:
      return ''
  }
}

const handleCalcWinInfo = () => {
  console.log(formInfo)
  const lotteryNo = getLotteryNo(formInfo.code, formInfo)

  loading.value = true
  services.get('https://www.mxnzp.com/api/lottery/common/check', {
    app_id: ROLL_TOOLS_APP_ID,
    app_secret: ROLL_TOOLS_APP_SECRET,
    ...formInfo,
    lotteryNo
  }).then((res: any) => {
    console.log(res)
    // lotteryTypes.value = res.data || []
  }).finally(() => {
    loading.value = false
  })
}

</script>

<style lang="less" scoped>
.lottery-win-calc-wrap {
  padding: 16px;
  .el-form {
    .lottery-info-number {
      :deep(.el-form-item__content) {
        display: flex;
        .el-input {
          display: inline;
          .el-input__wrapper {
            width: calc(100% - 24px);
          }
        }
      }
    }
  }
}
</style>
