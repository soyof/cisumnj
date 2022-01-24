<template>
  <div class="current-date">
    <div class="times-box">
      <div class="h-m-s">
        <div class="hours mr10">
          {{ curHour }}
        </div>
        <div class="colon mr10">
          :
        </div>
        <div class="minutes mr10">
          {{ curMinutes }}
        </div>
        <div class="second">
          {{ curSecond }}
        </div>
      </div>
    </div>
    <div class="other-info">
      <div class="week-box other-info-item">
        {{ curDateInfo?.week_cn }}
      </div>
      <div class="date-box other-info-item">
        {{ `${curYear}年${curMonth}月${curDay}日` }}
      </div>
      <div class="lunar-calendar-box other-info-item">
        {{ curDateInfo?.lunar_date_cn }}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useNowDate } from '@/hooks/useNowDate'

export default defineComponent({
  setup(props, context) {
    const { curDateInfo, curYear, curMonth, curDay, curHour, curMinutes, curSecond } = useNowDate()

    return {
      curDateInfo,
      curYear,
      curMonth,
      curDay,
      curHour,
      curMinutes,
      curSecond
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
  display: flex;
  align-items: center;
  user-select: none;
  width: 80%;
  height: 120px;
  padding: 0 30px;
  margin: 0 auto;
  border-radius: 30px;
  background-image: linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%);

  .times-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    .h-m-s {
      display: flex;
      justify-content: center;
      align-items: center;

      .hours, .minutes, .colon {
        font-size: 55px;
        color: #fff;
      }

      .colon {
        position: relative;
        top: -5px;
      }

      .second {
        font-size: 28px;
        align-self: flex-end;
        color: #fff;
      }
    }
    .h-m-s {
      padding-top: 5px;
    }
  }

  .other-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 30px;

    .other-info-item {
      padding: 3px 0;
      color: #fff;
    }

    .week-box {
      font-size: 20px;
    }

    .date-box {}

    .lunar-calendar {}
  }

}
</style>
