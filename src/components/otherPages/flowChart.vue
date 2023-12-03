<template>
  <div class="flow-chart">
    <div class="flow-chart-box">
      <div class="flow-chart-item">
        <div class="flow-chart-start flow-chart-rect">
          业务数据
        </div>
        <div class="line line-w50"></div>
      </div>
      <div class="flow-chart-drag-area">
        <div class="flow-chart-drag-area-box">
          <div class="flow-chart-drag-area-item">
            <div class="flow-chart-item flow-chart-drag-area-item-row">
              <div class="line line-w50"></div>
              <div class="arrow"></div>
              <div class="flow-chart-rect placeholder-box">
                拖入指标
              </div>
              <div class="line line-w50"></div>
            </div>
            <div class="flow-chart-item flow-chart-drag-area-item-row">
              <div class="line line-w50"></div>
              <div class="arrow"></div>
              <div class="flow-chart-rect placeholder-box">
                拖入指标
              </div>
              <div class="line line-w50"></div>
            </div>
            <div class="flow-chart-item flow-chart-drag-area-item-row">
              <div class="line line-w50"></div>
              <div class="arrow"></div>
              <div class="flow-chart-rect">
                自营账户单证券持仓数量
              </div>
              <div class="line line-w50"></div>
            </div>
          </div>
          <div class="flow-chart-drag-area-item">
            <div class="flow-chart-item flow-chart-drag-area-item-row">
              <div class="line line-w50"></div>
              <div class="arrow"></div>
              <div class="flow-chart-rect placeholder-box">
                拖入指标
              </div>
              <div class="line line-w50"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="line line-w50"></div>
      <div class="flow-chart-drag-area">
        <div class="flow-chart-drag-area-box">
          <div class="flow-chart-drag-area-item">
            <div class="flow-chart-item flow-chart-drag-area-item-row">
              <div class="line line-w50"></div>
              <div class="arrow"></div>
              <div class="flow-chart-rect placeholder-box">
                拖入指标
              </div>
              <div class="line line-w50"></div>
            </div>
            <div class="flow-chart-item flow-chart-drag-area-item-row">
              <div class="line line-w50"></div>
              <div class="arrow"></div>
              <div class="flow-chart-rect placeholder-box">
                拖入指标
              </div>
              <div class="line line-w50"></div>
            </div>
            <div class="flow-chart-item flow-chart-drag-area-item-row">
              <div class="line line-w50"></div>
              <div class="arrow"></div>
              <div class="flow-chart-rect">
                自营账户单证券持仓数量
              </div>
              <div class="line line-w50"></div>
            </div>
          </div>
          <div class="flow-chart-drag-area-item">
            <div class="flow-chart-item flow-chart-drag-area-item-row">
              <div class="line line-w50"></div>
              <div class="arrow"></div>
              <div class="flow-chart-rect placeholder-box">
                拖入指标
              </div>
              <div class="line line-w50"></div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="flow-chart-item">
        <div class="line line-w50"></div>
        <div class="arrow"></div>
        <div class="flow-chart-end flow-chart-rect">
          提示预警
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
.flow-chart {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;

  .flow-chart-box {
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    overflow: auto;

    .line {
      min-width: 80px;
      width: 100%;
      height: 1px;
      background-color: #E2E6ED;

      &.line-w30 {
        min-width: 30px !important;
      }

      &.line-w50 {
        min-width: 50px !important;
      }
    }

    .arrow{
      position: relative;
      width: 0;
      height: 0;
      margin-right: -6px;
      border: 6px solid;
      border-color: transparent transparent transparent #285FEA;

      &::before{
        content: '';
        position: absolute;
        top: -3px;
        left: 3px;
        border: 3px solid;
        border-color: #fff transparent transparent transparent;
      }

      &::after{
        content: '';
        position: absolute;
        top: -6px;
        left: -6px;
        border: 6px solid;
        border-color: #fff transparent transparent transparent;
      }
    }

    .flow-chart-item {
      display: flex;
      align-items: center;
      justify-content: center;

      .flow-chart-rect {
        position: relative;
        display: inline-block;
        text-align: center;
        width: auto;
        line-height: 18px;
        padding: 5px 8px;
        background-color: #F4F6F8;
        white-space: nowrap;

        &.placeholder-box {
          min-width: 150px;
          width: 150px;
          border: 1px dashed #d9d9d9;
          color: #666;
          background-color: transparent;
          user-select: none;
        }
      }

      .flow-chart-start {
        min-width: 80px;
        width: 80px;
        color: #fff;
        background-color: #285FEA;
      }

      .flow-chart-end {
        min-width: 80px;
        width: 80px;
        color: #333;
        background-color: #FFE097;
      }
    }

    .flow-chart-drag-area {
      position: relative;

      &.more-drag-area {
        margin-right: 50px;

        &::after {
          content: '';
          min-width: 50px;
          height: 1px;
          position: absolute;
          right: -50px;
          top: 50%;
          background-color: #E2E6ED;
        }
      }

      .flow-chart-drag-area-box {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        &::before {
          content: '';
          width: 1px;
          height: calc(100% - 70px);
          position: absolute;
          left: 0;
          top: 35px;
          background-color: #E2E6ED;
        }

        &::after {
          content: '';
          width: 1px;
          height: calc(100% - 70px);
          position: absolute;
          right: 0;
          top: 35px;
          background-color: #E2E6ED;
        }

        .flow-chart-drag-area-item {
          display: flex;
          width: 100%;
          margin-top: 20px;
          margin-bottom: 20px;

          .flow-chart-drag-area-item-row {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
