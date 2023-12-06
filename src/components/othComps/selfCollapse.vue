<template>
  <div class="self-collapse">
    <div
      :class="['self-collapse-header', isClickHeader ? 'cursor-pointer' : '']"
      @click="handleTriggerStatusHeader"
    >
      <i
        :class="['iconfont', 'icon-ios-arrow-forward', isShow ? 'is-open' : '']"
        @click="handleTriggerStatus"
      ></i>
      <div class="self-collapse-header-title">
        <slot name="headerBefore"></slot>
        <slot name="header">
          <div class="self-collapse-header-title-text">
            {{ title }}
          </div>
        </slot>
        <slot name="headerAfter"></slot>
      </div>
      <div class="self-collapse-header-after">
        <slot name="after"></slot>
      </div>
    </div>
    <SelfTransition>
      <div v-show="isShow" ref="selfCollapse" class="self-collapse-content">
        <div class="self-collapse-content-wrap">
          <slot name="content"></slot>
        </div>
      </div>
    </SelfTransition>
  </div>
</template>

<script>
import SelfTransition from '../../funcComps/selfTransition';
export default {
  name: 'SelfCollapse',
  components: {
    SelfTransition
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '默认标题'
    },
    isClickHeader: {
      type: Boolean,
      required: false,
      default: true
    },
    show: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    this.isShow = this.show;
  },
  methods: {
    triggerCollapseStatus() {
      this.isShow = !this.isShow;
      this.$emit('change', this.isShow);
    },
    handleTriggerStatus() {
      if (!this.isClickHeader) {
        this.triggerCollapseStatus();
      }
    },
    handleTriggerStatusHeader() {
      if (this.isClickHeader) {
        this.triggerCollapseStatus();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.self-collapse {
  width: 100%;
  background-color: #fff;
  margin-bottom: 5px;
  .self-collapse-header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 35px;
    padding: 0 8px;
    background-color: #f5f5f5;
    border-radius: 5px;
    overflow: hidden;
    .icon-ios-arrow-forward {
      width: 12px;
      min-width: 12px;
      margin-right: 6px;
      font-size: 16px;
      color: #333;
      cursor: pointer;
      transition: transform .3s ease;
      &.is-open {
        transform: rotate(90deg);
      }
    }
    .self-collapse-header-title {
      width: calc(100% - 20px);
      height: 100%;
      display: flex;
      align-items: center;

      .self-collapse-header-title-text {
        line-height: 18px;
      }
    }
  }
  .self-collapse-content {
    width: 100%;
    background-color: #fff;
    overflow: hidden;
    .self-collapse-content-wrap {
      width: 100%;
      padding: 12px 16px;
    }
  }
  .cursor-pointer {
    cursor: pointer;
  }
}
</style>
