import { formatDate, formatTime2HMS } from '@/utils/utils'

export const useFormatDate = () => {
  const formatterDateFn = (row: any, column: any, cellValue: any, index: number) => {
    return cellValue ? formatDate(cellValue, 'yyyy-MM-dd') : '--'
  }

  const formatterDateTimeFn = (row: any, column: any, cellValue: any, index: number) => {
    return cellValue ? formatDate(cellValue, 'yyyy-MM-dd hh:MM:ss') : '--'
  }

  const formatTime2HMSFn = (row: any, column: any, cellValue: any, index: number) => {
    return cellValue ? formatTime2HMS(+cellValue) : '--'
  }

  const formatTagsFn = (row: any, column: any, cellValue: any, index: number) => {
    if (cellValue && cellValue.length > 0) {
      return cellValue.join('、')
    }
    return cellValue ? JSON.stringify(cellValue) : '--'
  }

  return {
    formatterDateFn,
    formatterDateTimeFn,
    formatTime2HMSFn,
    formatTagsFn
  }
}
