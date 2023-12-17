<template>
  <div class="history-today-wrap">
    <SelfCollapse
      v-for="(item, ids) in historyTodayList"
      :key="`${ids}-history-today`"
      :title="item.title"
    >
      <template #headerBefore>
        <div class="history-today-times">
          {{ item.year }}-{{ item.month }}-{{ item.day }}
        </div>
      </template>
      <template #content>
        <div class="history-today-dtl">
          {{ item.details }}
        </div>
      </template>
    </SelfCollapse>
  </div>
</template>

<script lang="ts" setup>
import SelfCollapse from '@/components/global/selfCollapse.vue'
import { ref } from 'vue'
import { ROLL_TOOLS_APP_ID, ROLL_TOOLS_APP_SECRET } from '@/dic'
import services from '@/plugins/axios'

const historyTodayList: any = ref([])
const loading = ref(false)

const getHistoryTodayInfo = () => {
  loading.value = true
  services.get('https://www.mxnzp.com/api/history/today', {
    app_id: ROLL_TOOLS_APP_ID,
    app_secret: ROLL_TOOLS_APP_SECRET,
    type: 1
  }).then((res: any) => {
    historyTodayList.value = res.data || []
  }).finally(() => {
    loading.value = false
  })
}

getHistoryTodayInfo()
</script>

<style lang="less" scoped>
.history-today-wrap {
  padding: 16px;
  /deep/ .self-collapse {
    width: 100%;
    .self-collapse-header {
      .self-collapse-header-title-text {
        font-weight: 700;
      }
    }
  }
  .history-today-times {
    margin-right: 12px;
    color: #409eff;
  }
  .history-today-dtl {
    color: #333;
    line-height: 24px;
    word-break: break-all;
    white-space: pre-line;
  }
}
</style>
