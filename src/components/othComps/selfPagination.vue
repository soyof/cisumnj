<template>
  <h-page
    :current.sync="pager[props.page]"
    :page-size-opts="pageSizes"
    :page-size.sync="pager[props.size]"
    :total="pager[props.total]"
    :show-elevator="showElevator"
    :show-sizer="showSizer"
    :show-total="true"
    :size="size"
    placement="top"
    class="self-pagination"
    @on-page-size-change="sizeChange"
    @on-change="currentChange"
  />
</template>

<script>
export default {
  name: 'SelfPagination',
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
    showSizer: {
      type: Boolean,
      required: false,
      default: true
    },
    showElevator: {
      type: Boolean,
      required: false,
      default: true
    },
    size: {
      type: String,
      required: false
    }
  },
  computed: {
    total() {
      return this.pager[this.props.total] || 0;
    }
  },
  watch: {
    total() {
      const _isEmpty = !((this.pager[this.props.total] / this.pager[this.props.size]) % 1);
      if (this.pager[this.props.page] > 1 && _isEmpty) {
        this.$emit(
          'setPager',
          Object.assign(this.pager, {
            [this.props.page]: this.pager[this.props.page] - 1
          })
        );
        this.$emit('change');
      }
    }
  },
  mounted() {
    if (this.props.size in this.pager && this.pageSizes.length > 1) {
      if (!this.pageSizes.includes(this.pager.limit)) {
        this.pager.limit = this.pageSizes[0];
      }
    }
  },
  methods: {
    sizeChange(pageSize) {
      const pageIndex = this.pager[this.props.page];
      const temp = {
        [this.props.size]: pageSize,
        [this.props.page]:
          pageSize <= this.total ? 1 : this.pager[this.props.page]
      };
      this.$emit('setPager', Object.assign(this.pager, temp));
      if (pageIndex == 1) {
        const timer = setTimeout(_ => {
          this.$emit('change');
          clearTimeout(timer);
        });
      }
    },
    currentChange(page) {
      const temp = {
        [this.props.page]: page
      };
      this.$emit('setPager', Object.assign(this.pager, temp));
      this.$emit('change');
    }
  }
};
</script>

<style lang="scss" scoped>
.self-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
