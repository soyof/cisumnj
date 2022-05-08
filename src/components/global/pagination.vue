<template>
  <el-pagination
    v-model:currentPage="pager[props.page]"
    :pageSizes="pageSizes"
    :pageSize="pager[props.size]"
    :total="pager[props.total]"
    :background="background"
    class="pagination"
    :layout="layout"
    @size-change="sizeChange"
    @current-change="currentChange"
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  model: {
    prop: 'pager',
    event: 'setPager'
  },
  props: {
    pager: {
      type: Object,
      required: true
    },
    pageSizes: {
      type: Array,
      required: false,
      default: () => [10, 20, 50]
    },
    props: {
      type: Object,
      required: false,
      default: () => ({
        page: 'pageIndex', // current page home
        size: 'limit', // count per page
        total: 'total' // total count
      })
    },
    background: {
      type: Boolean,
      required: false,
      default: true
    },
    layout: {
      type: String,
      required: false,
      default: 'total, ->, prev, pager, next, jumper, sizes'
    }
  },
  computed: {
    total() {
      return this.pager[this.props.total] || 0
    }
  },
  watch: {
    total() {
      const _isEmpty = !((this.pager[this.props.total] / this.pager[this.props.size]) % 1)
      if (this.pager[this.props.page] > 1 && _isEmpty) {
        this.$emit(
          'setPager',
          Object.assign(this.pager, {
            [this.props.page]: this.pager[this.props.page] - 1
          })
        )
        this.$emit('change')
      }
    }
  },
  mounted() {
    if (this.props.size in this.pager && this.pageSizes.length > 1) {
      if (!this.pageSizes.includes(this.pager.limit)) {
        this.pager.limit = this.pageSizes[0]
      }
    }
  },
  methods: {
    sizeChange(pageSize: number) {
      // const pageIndex = this.pager[this.props.page]
      const temp = {
        [this.props.size]: pageSize,
        [this.props.page]:
          pageSize <= this.total ? 1 : this.pager[this.props.page]
      }
      this.$emit('setPager', Object.assign(this.pager, temp))
      const timer = setTimeout(() => {
        this.$emit('change')
        clearTimeout(timer)
      })
    },
    currentChange(page: any) {
      const temp = {
        [this.props.page]: page
      }
      this.$emit('setPager', Object.assign(this.pager, temp))
      this.$emit('change')
    }
  }
})
export default class Pagination extends Vue {}
</script>

<style lang="less" scoped>
.self-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
