<template>
  <el-tag
    v-if="isMore"
    class="simple-pagination"
    @click="getMore"
  >
    {{ props.title }}
  </el-tag>
</template>

<script lang='ts' setup>
// import * as _ from 'lodash'
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: '查看更多'
  },
  isMore: {
    type: Boolean,
    required: false,
    default: true
  },
  pages: {
    type: Object,
    required: false,
    default() {
      return {
        pageIndex: 0,
        limit: 30
      }
    }
  }
})

// const getListForMore = () => {
//   console.log(props)
//   console.log(ref)3

//   console.log(_)
// }

// const getMoreThrottle = _.throttle(getListForMore, 2000)

</script>

<style lang="less" scoped>
.simple-pagination {
  width: 100%;
  cursor: pointer;
  .center();
}
</style>
