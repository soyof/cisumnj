import { ComponentOptions } from 'vue'
const tableMixins: ComponentOptions = {
  data() {
    return {
      tableHeight: 'calc(100vh - 160px)'
    }
  },
  mounted() {
    this.handleRegisterEvent()
  },
  beforeUnmount() {
    this.handleRemoveEvent()
  },
  methods: {
    handleRegisterEvent() {
      window.addEventListener('load', this.handleCalcTableHeight)
      window.addEventListener('resize', this.handleCalcTableHeight)
    },
    handleRemoveEvent() {
      window.removeEventListener('resize', this.handleCalcTableHeight)
    },
    handleCalcTableHeight() {
      let pageHeight = (document.documentElement && document.documentElement.clientHeight) || 0
      let headerHeight = 0
      let pagiHeight = 0
      if (document.documentElement && document.documentElement.clientHeight) {
        pageHeight = document.documentElement.clientHeight
      }
      if (this.$refs['pagesHeader'] && this.$refs['pagesHeader'].clientHeight) {
        headerHeight = this.$refs['pagesHeader'].clientHeight
      }
      if (this.$refs['pagination'] && this.$refs['pagination'].$el && this.$refs['pagination'].$el.clientHeight) {
        pagiHeight = this.$refs['pagination'].$el.clientHeight
      }

      if (pageHeight) {
        const height = Math.floor(pageHeight - headerHeight - pagiHeight - 50)
        this.tableHeight = height > 100 ? height : 100
      } else {
        this.tableHeight = 'calc(100vh - 160px)'
      }
    }
  }
}

export default tableMixins
