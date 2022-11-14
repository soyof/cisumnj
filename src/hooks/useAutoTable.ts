import { onMounted, onUnmounted, ref, nextTick } from 'vue'

export const useAutoTable = () => {
  const headerDom: any = ref(null)
  const paginationDom: any = ref(null)
  const tableHeight: any = ref('calc(100vh - 160px)')
  const handleRegisterEvent = () => {
    window.addEventListener('load', handleCalcTableHeight)
    window.addEventListener('resize', handleCalcTableHeight)
  }
  const handleRemoveEvent = () => {
    window.addEventListener('unload', handleCalcTableHeight)
    window.removeEventListener('resize', handleCalcTableHeight)
  }
  const handleCalcTableHeight = () => {
    let pageHeight = (document.documentElement && document.documentElement.clientHeight) || 0
    let headerHeight = 0
    let paginationHeight = 0
    if (document.documentElement && document.documentElement.clientHeight) {
      pageHeight = document.documentElement.clientHeight
    }
    if (headerDom.value && headerDom.value.clientHeight) {
      headerHeight = headerDom.value.clientHeight
    }
    if (paginationDom.value && paginationDom.value.$el && paginationDom.value.$el.clientHeight) {
      paginationHeight = paginationDom.value.$el.clientHeight
    }

    if (pageHeight) {
      const height = Math.floor(pageHeight - headerHeight - paginationHeight - 50 - 28)
      tableHeight.value = height > 100 ? height : 100
    } else {
      tableHeight.value = 'calc(100vh - 160px)'
    }
  }
  onMounted(() => {
    nextTick().then(r => {
      handleCalcTableHeight()
      handleRegisterEvent()
    })
  })
  onUnmounted(() => {
    handleRemoveEvent()
  })
  return {
    tableHeight,
    headerDom,
    paginationDom,
    handleCalcTableHeight
  }
}
