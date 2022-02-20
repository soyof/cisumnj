<template>
  <div :class="['header-line', { 'is-no-bgc': noBgc }]">
    <div class="header-line-title">
      <span v-if="isLine" class="header-line-title-line"></span>
      <span class="header-line-title-text">{{ title }}</span>
      <slot name="titleAfter"></slot>
    </div>
    <slot name="after"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
      default: '默认值'
    },
    noBgc: {
      type: Boolean,
      required: false,
      default: false
    },
    isLine: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
    }
  }
})
</script>

<style lang="less" scoped>
.header-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 28px;
  padding: 0 12px;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  font-weight: 700;
  background-color: #ecf5ff;
  user-select: none;
  box-sizing: border-box;
  -webkit-user-select: none;

  &.is-no-bgc {
    background-color: transparent;
  }

  &-title {
    display: flex;
    align-items: center;
    &-line {
      display: inline-block;
      width: 4px;
      height: 14px;
      margin-right: 8px;
      background-color: @theme-color;
    }

    &-text {
      display: flex;
      align-items: center;
    }
  }
}
</style>
