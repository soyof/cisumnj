import { formatDate, formatTime2HMS } from '@/utils/utils'

export const useFormatDate = () => {
  const formatterDateFn = (row: any, column: any, cellValue: any, index: number) => {
    return cellValue ? formatDate(cellValue, 'yyyy-MM-dd') : '--'
  }

  const formatTime2HMSFn = (row: any, column: any, cellValue: any, index: number) => {
    return cellValue ? formatTime2HMS(+cellValue) : '--'
  }

  return {
    formatterDateFn,
    formatTime2HMSFn
  }
}
