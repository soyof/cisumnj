<template>
  <el-tag
    v-if="pages.isMore"
    class="simple-pagination"
    @click="getMore"
  >
    {{ loading ? '加载中...' : props.title }}
  </el-tag>
</template>

<script lang='ts' setup>
import * as _ from 'lodash'
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['update:change', 'change'])

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: '查看更多'
  },
  pages: {
    type: Object,
    required: false,
    default() {
      return {
        pageIndex: 0,
        limit: 30,
        isMore: true
      }
    }
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  wait: {
    type: Number,
    required: false,
    default: 500
  }
})

const handleMoreFn = () => {
  if (props.loading) return
  const { pages } = props
  pages.pageIndex++
  if (pages.isMore) {
    emit('update:change', true)
    emit('change', true)
  }
}

const getMoreDebounce = _.debounce(handleMoreFn, props.wait || 500, { leading: true })

const getMore = () => {
  getMoreDebounce()
}

</script>

<style lang="less" scoped>
.simple-pagination {
  width: 100%;
  height: 32px;
  cursor: pointer;
  .center();
}
</style>
