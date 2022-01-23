<template>
  <template v-for="item in list">
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :key="routePath(item.path)"
      :index="routePath(item.path)"
    >
      <template #title>
        <el-tooltip
          class="ellipsis"
          :content="item.title"
          effect="customized"
          placement="right"
          :showAfter="1000"
        >
          <span>{{ item.title }}</span>
        </el-tooltip>
      </template>
      <el-menu-item-group
        v-for="childItem in item.children"
        :key="childItem.path"
      >
        <SideMenuItem
          v-if="childItem.children && childItem.children.length > 0"
          :list="childItem.children"
          :prefix="routePath(childItem.path)"
        />
        <el-menu-item
          v-else
          :index="routePath(childItem.path)"
        >
          <el-tooltip
            class="ellipsis"
            :content="item.title"
            effect="customized"
            placement="right"
            :showAfter="1000"
          >
            <span>{{ item.title }}</span>
          </el-tooltip>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item
      v-else
      :key="routePath(item.path)"
      :index="routePath(item.path)"
      :route="routePath(item.path)"
    >
      <el-tooltip
        class="ellipsis"
        :content="item.title"
        effect="customized"
        placement="right"
        :showAfter="1000"
      >
        <span>{{ item.title }}</span>
      </el-tooltip>
    </el-menu-item>
  </template>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
@Options({
  props: {
    list: {
      type: Array,
      required: true
    },
    prefix: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    routePath() {
      return (path) => `${this.prefix}/${path}`
    }
  },
  mounted() {
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  }
})
export default class SideMenuItem extends Vue {}
</script>

<style lang="less" scoped>
</style>
