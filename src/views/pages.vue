<template>
  <el-scrollbar>
    <div class="pages">
      <div class="cur-date-box">
        <CurrentDate />
      </div>
      <div class="pages-calendar">
        <el-calendar ref="calendar" v-model="curDate" class="pages-el-calendar">
          <template #header="{ date }">
            <div class="calendar-header-date">
              日期： <i class="calendar-header-date-txt mr10">{{ curDateInfo.date_cn || date }}</i>
              <template v-if="!isCurDay">
                <span v-if="curDateInfo.lunar_date_cn" class="fz16">
                  农历： <i class="calendar-header-date-txt">{{ curDateInfo.lunar_date_cn || '--' }}</i>
                </span>
                <span>
                  <span class="ml10">{{ curDateInfo.yearweek_cn }}</span>
                  <span v-if="curDateInfo.yearday" class="ml10">第{{ curDateInfo.yearday }}天</span>
                </span>
                <!-- 节日 -->
                <el-tag
                  v-if="isShowHolidayName(curDateInfo)"
                  size="small"
                  class="tag-item ml10"
                  effect="dark"
                  type=""
                >
                  {{ curDateInfo.holiday_or_cn }}
                </el-tag>
                <!-- 是否工作日 -->
                <el-tag
                  v-if="curDateInfo.workday_cn"
                  size="small"
                  class="tag-item"
                  :type="curDateInfo.workday === 1 ? 'danger' : ''"
                >
                  {{ curDateInfo.workday_cn || '工作日' }}
                </el-tag>
                <el-button
                  v-if="curDateInfo.holiday_recess && curDateInfo.holiday_recess !== 2"
                  class="holiday-content-btn ml10"
                  size="small"
                  type="primary"
                  circle
                >
                  假
                </el-button>
              </template>
            </div>
            <el-button-group>
              <el-button size="small" @click="selectDate('prev-year')">
                上年
              </el-button>
              <el-button size="small" @click="selectDate('prev-month')">
                上月
              </el-button>
              <el-button size="small" @click="selectDate('today')">
                今天
              </el-button>
              <el-button size="small" @click="selectDate('next-month')">
                下月
              </el-button>
              <el-button size="small" @click="selectDate('next-year')">
                下年
              </el-button>
            </el-button-group>
          </template>
          <template #dateCell="{ data }">
            <div :class="['calendar-content-box', { 'actives': data.isSelected, 'cur-day': false }]">
              <div v-if="!monthInfo || monthInfo.length === 0" class="day">
                {{ data.day.split('-')[2] }}
              </div>
              <div v-else class="calender-item-box">
                <div class="calender-item-date">
                  <span>{{ dateInfo(data.day).day }}</span>
                  <el-button
                    v-if="dateInfo(data.day).holiday_recess && dateInfo(data.day).holiday_recess !== 2"
                    class="holiday-content-btn"
                    size="small"
                    type="primary"
                    circle
                  >
                    假
                  </el-button>
                </div>
                <p class="ellipsis fs12 lunar">
                  {{ dateInfo(data.day).lunar_date_cn }}
                </p>
                <div v-if="dateInfo(data.day) && dateInfo(data.day).workday_cn" class="holiday-content-tag-box">
                  <el-tag class="holiday-content-tag" :type="dateInfo(data.day).workday === 1 ? 'danger' : ''">
                    {{ dateInfo(data.day).workday_cn || '工作日' }}
                  </el-tag>
                  <el-tag v-if="isShowHolidayName(dateInfo(data.day))" class="holiday-content-tag" effect="dark">
                    {{ dateInfo(data.day).holiday_or_cn || 'NON' }}
                  </el-tag>
                </div>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import CurrentDate from '@/components/currentDate.vue'

import http from '@/plugins/axios'
import { formatDate } from '@/utils/utils'

const nowDate = new Date()
const curDate = ref(nowDate)
const curDateInfo: any = ref({})
const monthInfo = ref([])

const calendar = ref()
const selectDate = (val: string) => {
  calendar.value.selectDate(val)
}

watch(curDate, (newVal, oldVal) => {
  const newYear = formatDate(newVal, 'yyyy')
  const oldYear = formatDate(oldVal, 'yyyy')
  const newMonth = formatDate(newVal, 'MM')
  const oldMonth = formatDate(oldVal, 'MM')
  const newYM = +formatDate(newVal, 'yyyyMM')
  const isExist = monthInfo.value.findIndex((item: any) => item.month === newYM) !== -1

  if ((newYear !== oldYear || newMonth !== oldMonth) && !isExist) {
    getCurMonthInfo()
  }
  getDateInfo()
})

const dateInfo = computed(() => {
  return (date: any) => {
    const fmDate = date.replace(/-/g, '')
    const day = date.split('-')[2]

    const info: any = monthInfo.value.find((item: any) => item.date === +fmDate) || {}
    return { ...info, day: day } || { day }
  }
})

const isShowHolidayName = computed(() => {
  return (dateInfo: any) => {
    const { holiday_or, holiday, holiday_today } = dateInfo
    return holiday_or && holiday && holiday_today && (holiday_or !== 10 && holiday !== holiday_or) || holiday_today === 1
  }
})

const isCurDay = computed(() => {
  const curDay = formatDate(nowDate, 'dd')
  const curChooseDay = formatDate(curDate.value, 'dd')
  return curDay === curChooseDay
})

// 获取当前月份相关信息
const getCurMonthInfo = async() => {
  const result: any = await http.get('https://api.apihubs.cn/holiday/get', {
    cn: '1',
    size: '31',
    order_by: 1,
    year: formatDate(curDate.value, 'yyyy'),
    month: formatDate(curDate.value, 'yyyyMM')
  })
  if (result && result.data && result.data.list) {
    monthInfo.value = [
      ...monthInfo.value,
      ...result.data.list
    ]
  }
}
// 获取当前选中日期信息
const getDateInfo = async() => {
  const newYM = +formatDate(curDate.value, 'yyyyMMdd')
  const curItemIds: number = monthInfo.value.findIndex((item: any) => item.date === newYM)
  const curItem: any = monthInfo.value.find((item: any) => item.date === newYM)
  if (curItemIds >= 0) {
    curDateInfo.value = {
      ...curItem
    }
  } else {
    const result: any = await http.get('https://api.apihubs.cn/holiday/get', {
      cn: '1',
      size: '31',
      date: formatDate(curDate.value, 'yyyyMMdd')
    })
    if (result && result.data) {
      curDateInfo.value = {
        ...result.data.list[0]
      }
    }
  }
}
getDateInfo()
getCurMonthInfo()

</script>

<style lang="less" scoped>
.pages {
  min-width: 800px;
  height: @layout-pages-height;
  .pages-calendar {
    .pages-el-calendar {

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

      :deep(.el-calendar__header) {
        display: flex;
        flex-direction: column;

        .calendar-header-date {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          line-height: 30px;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 20px;

          &-txt {
            margin-left: 5px;
            font-size: 16px;
            color: @theme-color;
            font-style: normal;
          }

          .tag-item {
            margin-left: 5px;
            font-size: 14px;
            font-weight: 400;
          }
        }

        :deep(.el-calendar-day) {
          padding: 0;
          .calendar-content-box {
            width: 100%;
            height: 100%;
            padding: 8px;
            background-color: #fff;

            &.actives {
              color: #fff;
              background-color: #0050b3;
            }

            &.cur-day {
              color: #fff;
              background-color: #10239e;
            }
          }
        }

      }

      :deep(.el-calendar-table__row) {
        .current, .prev, .next {
          &.is-today,
          &.is-today .el-calendar-day:hover {
            color: #fff;
            background-color: #13c2c2 !important;
          }

          &.is-selected {
            color: #fff;
            background-color: #40a9ff !important;
          }
        }

        .calendar-content-box {
          overflow: hidden;
          width: 100%;
          height: 100%;
          .calender-item-box {
            p {
              line-height: 18px;
              padding: 3px 0;
              white-space: nowrap;

              &.lunar {
                color: #061178;
              }
            }

            .calender-item-date {
              display: flex;
              justify-content: space-between;
            }

            .holiday-content-tag-box {
              display: flex;
              justify-content: space-between;
              .holiday-content-tag {
                height: 22px;
                line-height: 18px;
                padding: 2px 5px;
                margin-right: 5px;
                .ellipsis();

                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }

          .fs12 {
            font-size: 12px;
          }

          .next, .prev {
            p.lunar {
              color: #c0c4cc;
            }
          }
        }

        .prev, .next {
          .calender-item-box {
            p {
              &.lunar {
                color: #c0c4cc !important;
              }
            }

            .holiday-content-tag {
              color: #fff;
              border-color: #c0c4cc !important;
              background-color: #c0c4cc !important;
            }

            .calender-item-date {
              .holiday-content-btn {
                border-color: #c0c4cc !important;
                background-color: #c0c4cc !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
