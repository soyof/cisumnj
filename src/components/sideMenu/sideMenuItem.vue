<template>
  <template v-for="item in list">
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :key="item.path"
      :index="item.path"
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
        />
        <el-menu-item
          v-else
          :index="childItem.path"
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
      :key="item.path"
      :index="item.path"
      :route="item.path"
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
    }
  },
  data() {
    return {
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
.el-sub-menu {
  :deep(.el-sub-menu__title) {
    height: 36px !important;
  }
  :deep(.el-menu-item-group__title) {
    padding: 0;
  }
}

</style>
