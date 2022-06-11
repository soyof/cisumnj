import { ref, onBeforeUnmount, computed } from 'vue'
import http from '@/plugins/axios'
import { formatDate } from '@/utils/utils'

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
    const result: any = await http.get('https://api.apihubs.cn/holiday/get', {
      cn: '1',
      size: '31',
      date: formatDate(new Date(), 'yyyymmdd')
    })
    curDateInfo.value = result.list[0]
  }

  getDateInfo()

  const isShowHolidayName = computed(() => {
    return (dateInfo: any) => {
      const { holiday_or, holiday, holiday_today } = dateInfo
      return holiday_or && holiday && holiday_today && (holiday_or !== 10 && holiday !== holiday_or) || holiday_today === 1
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
