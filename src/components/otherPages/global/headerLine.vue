<template>
  <div class="header-line-wrap">
    <div :class="['header-line', { 'is-no-bgc': noBgc }, { 'mb8': isShowExpand }]">
      <div class="header-line-title">
        <span v-if="isLine" class="header-line-title-line"></span>
        <span class="header-line-title-text">{{ title }}</span>
        <slot name="titleAfter"></slot>
      </div>
      <slot name="after">
        <el-icon
          v-if="isShowExpand"
          :class="['arrow-down', { 'is-expand': isExpand }]"
          @click="handleExpand"
        >
          <ArrowDown />
        </el-icon>
      </slot>
    </div>
    <el-collapse-transition v-if="isShowExpand">
      <div v-show="isExpand" class="header-line-content">
        <slot name="content"></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    ArrowDown
  },
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
    },
    isShowExpand: {
      type: Boolean,
      required: false,
      default: false
    },
    defaultExpand: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['expand'],
  data() {
    return {
      isExpand: false
    }
  },
  mounted() {
    this.isExpand = this.defaultExpand
  },
  methods: {
    handleExpand() {
      this.isExpand = !this.isExpand
      this.$emit('expand', this.isExpand)
    }
  }
})
</script>

<style lang="less" scoped>
.header-line-wrap {
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

    .arrow-down {
      font-weight: 400;
      cursor: pointer;
      transition: transform 0.3s;

      &.is-expand {
        transform: rotate(180deg);
      }
    }
  }
  .mb8 {
      margin-bottom: 8px;
    }
}

</style>
