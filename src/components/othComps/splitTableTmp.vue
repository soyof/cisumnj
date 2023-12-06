<template>
  <div class="split-table-tmp">
    <div
      :id="topBoxId"
      :class="['split-table-tmp-item', 'split-table-tmp-top', !isShow ? 'split-table-tmp-h100' : '']"
    >
      <slot :boxId="topBoxId" name="top"></slot>
    </div>
    <div :class="['split-table-tmp-item', 'split-table-tmp-bottom', isShow ? '' : 'split-table-tmp-h0']">
      <div v-if="isShowBTitle" class="split-table-tmp-bottom-title">
        <HeaderLine :title="bottomTitle || '详情'">
          <i slot="after" class="iconfont icon-arrow-r" @click="handleHiddenBottom(false)"></i>
        </HeaderLine>
      </div>
      <div :id="bottomBoxId" class="split-table-tmp-bottom-content">
        <slot :boxId="bottomBoxId" name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandom } from '../../utils/utils';

export default {
  name: 'SplitTableTmp',
  props: {
    isShowBTitle: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    bottomTitle: {
      type: String,
      required: false,
      default() {
        return '详情';
      }
    },
    changeTableHeightFn: {
      type: Function,
      required: false,
      default() {
        return _ => false;
      }
    }
  },
  data() {
    return {
      isShow: false,
      topBoxId: `splitTableTmpTop${getRandom(10)}`,
      bottomBoxId: `splitTableTmpBottom${getRandom(10)}`
    };
  },
  watch: {
    isShow() {
      this.$emit('change');
      setTimeout(_ => {
        this.changeTableHeightFn && this.changeTableHeightFn();
      }, 500);
    }
  },
  methods: {
    setBottomShowStatus(flag) {
      this.isShow = flag;
      this.$emit('changeBottom', this.isShow);
      return this.isShow;
    },
    handleHiddenBottom() {
      this.isShow = false;
      this.$emit('hiddenBottomFn', this.isShow);
    }
  }
};
</script>

<style scoped lang="scss">
.split-table-tmp {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .split-table-tmp-item {
    width: 100%;
    height: 50%;
    padding: 0 16px;
    overflow: hidden;
    transition: height .3s linear;
    &.split-table-tmp-h100 {
      height: 100%;
    }
    &.split-table-tmp-h0 {
      height: 100%;
    }
  }
  .split-table-tmp-top {
    padding-top: 16px;
    /deep/ *[class^="app-module_main-content"] {
      padding: 0;
    }
  }
  .split-table-tmp-bottom {
    padding-bottom: 16px;
    /deep/ *[class^="app-module_main-content"] {
      padding: 0;
    }

    .split-table-tmp-bottom-title {
      margin-bottom: 5px;
      .icon-arrow-r {
        font-size: 12px;
        color: #666;
        transform: rotate(90deg);
        cursor: pointer;
      }
    }
    .split-table-tmp-bottom-content {
      width: 100%;
      height: calc(100% - 10px);

      /deep/ .h-table {
        .h-table-tip {
          .h-table-tiptext {
            justify-content: center !important;
            align-items: center !important;
          }
        }
      }
    }
  }
}
</style>
