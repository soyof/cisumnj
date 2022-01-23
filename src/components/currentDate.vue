<template>
  <div class="current-date">
    <div class="date-box">
      <div class="y-m-d mr15">
        {{ curDate }}
      </div>
      <div class="h-m-s">
        {{ curTime }}
      </div>
    </div>
    <div class="other-info">
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onBeforeUnmount } from 'vue'
import http from '@/plugins/axios'

import { formatDate } from '@/utils/utils'
export default defineComponent({
  setup(props, context) {
    const date = new Date()
    const curDate = ref(formatDate(date, 'yyyy%mm%dd'))
    const curTime = ref(formatDate(date, 'hh:mm:ss'))
    const curDateInfo = ref(null)

    const updateCurTimes = () => {
      if (curDate.value !== formatDate(new Date(), 'yyyy%mm%dd')) {
        curDate.value = formatDate(new Date(), 'yyyy%mm%dd')
      }
      curTime.value = formatDate(new Date(), 'hh:mm:ss')
    }
    updateCurTimes()

    const timer = setInterval(() => {
      updateCurTimes()
    }, 1000)
    onBeforeUnmount(() => {
      clearInterval(timer)
    })

    // 获取当前选中日期信息
    const getDateInfo = async() => {
      const result: any = await http.get('https://api.apihubs.cn/holiday/get', {
        cn: '1',
        size: '31',
        date: formatDate(date, 'yyyymmdd')
      })
      curDateInfo.value = result.data.list[0]
    }

    getDateInfo()

    return {
      curDate,
      curTime
    }
  },
  data() {
    return {
    }
  }
})
</script>

<style lang="less" scoped>
.current-date {
  user-select: none;
  .center();

  .date-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    .y-m-d, .h-m-s {
      line-height: 28px;
      font-size: 20px;
      font-weight: 600;
    }
    .h-m-s {
      padding-top: 5px;
    }
  }
}
</style>
