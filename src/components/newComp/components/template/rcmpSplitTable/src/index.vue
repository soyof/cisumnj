<template>
  <div class="rcmp-split-table">
    <h-split
      v-model="splitVal"
      max="20px"
      mode="vertical"
      @on-moving="handleDragMoving"
      @on-move-end="handleDragMovingEnd"
    >
      <div :id="topBoxId" slot="top" class="rcmp-split-table-split-top">
        <slot :boxId="topBoxId" ref="splitTopCom" name="splitTop"></slot>
      </div>
      <div :id="bottomBoxId" slot="bottom" class="rcmp-split-table-split-bottom">
        <slot :boxId="bottomBoxId" ref="splitBottomCom" name="splitBottom"></slot>
      </div>
    </h-split>
  </div>
</template>

<script>
export default {
  name: 'rcmpSplitTable',
  data() {
    return {
      splitVal: 0.55,
      topBoxId: `rcmpSplitTableSplitTop${new Date().getTime()}`,
      bottomBoxId: `rcmpSplitTableSplitBottom${new Date().getTime()}`
    };
  },
  methods: {
    handleDragMoving() {
      this.$emit('split-moving');
    },
    handleDragMovingEnd() {
      this.$emit('split-moving-end');
    }
  }
};
</script>

<style lang="scss" scoped>
.rcmp-split-table {
  width: 100%;
  height: 100%;
  /deep/ .h-split-wrapper {
    .h-split-vertical {
      .top-pane {
        z-index: 8;
      }
      .bottom-pane {
        z-index: 9;
      }
      .top-pane,
      .bottom-pane {
        overflow: hidden;
      }
    }
    .rcmp-split-table-split-top {
      width: 100%;
      height: 100%;
    }
    .rcmp-split-table-split-bottom {
      width: 100%;
      height: 100%;
      .h-tabs {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        .h-tabs-bar {
          margin-bottom: 0;
        }
        .h-tabs-content-wrap {
          flex: 1;
          .h-tabs-content {
            width: 100%;
            height: 100%;
            .h-tabs-tabpane {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
