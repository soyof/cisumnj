import { ref, onBeforeUnmount, computed } from 'vue'
import http from '@/plugins/axios'
import { formatDate } from '@/utils/utils'
import { ROLL_TOOLS_APP_ID, ROLL_TOOLS_APP_SECRET } from '@/dic'

const getNowTimes = () => {
  const year = formatDate(new Date(), 'yyyy')
  const month = formatDate(new Date(), 'mm')
  const day = formatDate(new Date(), 'dd')
  const hour = formatDate(new Date(), 'hours')
  const minutes = formatDate(new Date(), 'minutes')
  const second = formatDate(new Date(), 'second')
  return {
    year,
    month,
    day,
    hour,
    minutes,
    second
  }
}

export const useNowDate = () => {
  const curYear = ref(formatDate(new Date(), 'yyyy'))
  const curMonth = ref(formatDate(new Date(), 'mm'))
  const curDay = ref(formatDate(new Date(), 'dd'))
  const curHour = ref(formatDate(new Date(), 'hours'))
  const curMinutes = ref(formatDate(new Date(), 'minutes'))
  const curSecond = ref(formatDate(new Date(), 'second'))
  const curDateInfo: any = ref({})

  const updateCurTimes = () => {
    const { year, month, day, hour, minutes } = getNowTimes()
    const isNewYear = curYear.value !== year
    const isNewMonth = curMonth.value !== month
    const isNewDay = curDay.value !== day
    const isNewHours = curHour.value !== hour
    const isNewMinutes = curMinutes.value !== minutes

    if (isNewYear || isNewMonth || isNewDay) {
      getDateInfo()
    }
    if (isNewYear) {
      curYear.value = year
    }
    if (isNewMonth) {
      curMonth.value = month
    }
    if (isNewDay) {
      curDay.value = day
    }
    if (isNewHours) {
      curHour.value = hour
    }
    if (isNewMinutes) {
      curMinutes.value = minutes
    }
    curSecond.value = formatDate(new Date(), 'second')
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
    const result: any = await http.get(`https://www.mxnzp.com/api/holiday/single/${formatDate(new Date(), 'yyyyMMdd')}`, {
      ignoreHoliday: false,
      app_id: ROLL_TOOLS_APP_ID,
      app_secret: ROLL_TOOLS_APP_SECRET
    })
    curDateInfo.value = result.data
  }

  getDateInfo()

  const isShowHolidayName = computed(() => {
    return (dateInfo: any) => {
      const { type } = dateInfo
      return type === 2
    }
  })

  const isDateInfoExist = computed(() => {
    const keyArr = Object.keys(curDateInfo.value) || []
    return keyArr && keyArr.length > 0
  })

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
}
