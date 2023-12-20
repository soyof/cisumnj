<template>
  <div :class="['current-date', { 'no-date-info': !isDateInfoExist }]">
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
    <template v-if="isDateInfoExist">
      <div class="date-info">
        <div class="week-box other-info-item mr15">
          {{ curDateInfo.week_cn }}
        </div>
        <div class="date-box other-info-item mr15">
          {{ `${curYear}年${curMonth}月${curDay}日` }}
        </div>
        <div class="lunar-calendar-box other-info-item">
          {{ curDateInfo.lunarCalendar }}
        </div>
      </div>
      <div class="week-day-info">
        <div class="week-for-year mb10">
          第{{ curDateInfo.weekOfYear }}周
        </div>
        <div class="day-for-year">
          第{{ curDateInfo.dayOfYear }}天
        </div>
      </div>
      <div class="other-info">
        <!-- 节日 -->
        <el-tag
          v-if="isShowHolidayName(curDateInfo)"
          size="small"
          class="mb10 ellipsis"
          effect="dark"
        >
          {{ curDateInfo.typeDes }}
        </el-tag>
        <!-- 是否工作日 -->
        <el-tag
          v-if="curDateInfo.type === 0"
          size="small"
          class="mb10 ellipsis"
          :type="curDateInfo.type === 0 ? 'danger' : ''"
        >
          {{ curDateInfo.typeDes || '工作日' }}
        </el-tag>
        <el-button
          v-if="curDateInfo.type && curDateInfo.type === 2"
          class="holiday-content-btn"
          size="small"
          type="primary"
          circle
        >
          假
        </el-button>
      </div>
    </template>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useNowDate } from '@/hooks/useNowDate'

export default defineComponent({
  setup(props, context) {
    const {
      curDateInfo,
      curYear,
      curMonth,
      curDay,
      curHour,
      curMinutes,
      curSecond,
      isShowHolidayName,
      isDateInfoExist
    } = useNowDate()

    return {
      curDateInfo,
      curYear,
      curMonth,
      curDay,
      curHour,
      curMinutes,
      curSecond,
      isShowHolidayName,
      isDateInfoExist
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
  justify-content: space-between;
  user-select: none;
  width: 660px;
  height: 120px;
  padding: 0 30px;
  margin: 0 auto;
  border-radius: 30px;
  background-image: linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%);
  overflow: hidden;
  animation: bgcLg 30s linear infinite forwards;

  &.no-date-info {
    width: 300px;
    justify-content: center;
  }

  .times-box {
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    white-space: nowrap;

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

  .date-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    padding: 0 30px;

    .other-info-item {
      padding: 3px 0;
      color: #fff;
    }

    .week-box {
      font-size: 15px;
    }

    .date-box {
      padding: 10px 0;
    }

    .lunar-calendar {}
  }

  .week-day-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;
    white-space: nowrap;

    .week-for-year, .day-for-year {
      font-size: 16px;
      color: #fff;
    }

    .tag-item {
      text-align: center;
    }
  }

  .other-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: 150px;
    padding-left: 10px;
    overflow: hidden;

    .el-tag {
      max-width: 150px;
    }

    .holiday-content-btn {
      width: 22px;
      min-height: 22px;
      max-height: 22px;
      height: 22px;
      line-height: 22px;
      padding: 0;
      font-size: 12px;
      border-color: @theme-color;
      background-color: @theme-color;
      .ellipsis();
    }
  }

}
</style>
