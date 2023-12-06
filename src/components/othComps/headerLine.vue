<template>
  <div :class="['header-line', isShowDashedLine ? 'bgc-fff' : '']">
    <div class="header-line-title">
      <slot name="titleBefore"></slot>
      <span v-if="isShowLine" :class="['header-line-line', headerTitleLineClassName]"></span>
      <span class="header-line-text">{{ title }}</span>
      <slot name="titleAfter"></slot>
    </div>
    <span v-if="isShowDashedLine" class="header-line-dashed"></span>
    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  name: 'HeaderLine',
  props: {
    title: {
      type: String,
      required: false,
      default: '默认值'
    },
    isShowLine: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowDashedLine: {
      type: Boolean,
      required: false,
      default: false
    },
    tipsIconShape: {
      type: String,
      required: false,
      default: _ => 'line'
    }
  },
  data() {
    return {
    };
  },
  computed: {
    headerTitleLineClassName() {
      switch (this.tipsIconShape) {
        case 'circle':
          return 'is-circle';
        case 'block':
          return 'is-block';
        default:
          return '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 28px;
  padding: 0 12px;
  color: #333;
  background-color: #f7f7f7;
  user-select: none;
  -webkit-user-select: none;

  &.bgc-fff {
    background-color: #fff;
  }

  .header-line-title {
    display: flex;
    align-items: center;
    .header-line-line {
      display: inline-block;
      width: 4px;
      min-width: 4px;
      height: 14px;
      margin-right: 8px;
      background-color: #4686F2;
      &.is-circle {
        display: inline-block;
        width: 6px;
        min-width: 6px;
        height: 6px;
        margin-right: 8px;
        border-radius: 50%;
        background-color: #4686F2;
      }
      &.is-block {
        display: inline-block;
        width: 6px;
        min-width: 6px;
        height: 6px;
        margin-right: 8px;
        background-color: #4686F2;
      }
    }

    .header-line-text {
      display: flex;
      align-items: center;
    }
  }

  .header-line-dashed {
    flex: 1;
    height: 1px;
    margin-left: 12px;
    border-top: 1px dashed #ddd;
  }
}
</style>
