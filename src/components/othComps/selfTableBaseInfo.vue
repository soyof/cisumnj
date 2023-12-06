<template>
  <table class="self-table-base-info">
    <tr
      v-for="(itemChild, ids) in newColumns"
      :key="`${ids}-tr`"
      class="self-table-base-info-tr"
    >
      <template v-for="cItem in itemChild">
        <td
          :key="`${cItem.key}-label`"
          :class="['self-table-base-info-td-label', tdLabelClass]"
          :style="tdLabelStyle"
        >{{ cItem.title }}</td>
        <td
          :key="`${cItem.key}-value`"
          :colspan="cItem.cols ? (cItem.cols * 2) - 1 : null"
          :class="['self-table-base-info-td-value', tdValueClass(cItem.align), valueTdShowTooltip ? 'self-table-base-info-td-value-ellipsis' : 'self-table-base-info-td-value-normal']"
          :ref="`selfTableTdValue${cItem.key}`"
        >
          <template v-if="!valueTdShowTooltip">
            <div :title="tdValueText(info[cItem.key])" class="td-value-normal-text">
              <slot :name="cItem.key" :params="info">
                <template v-if="!isRenderFn(cItem.render)">
                  {{ tdValueText(info[cItem.key]) }}
                </template>
                <template v-else>
                  {{ renderToHtml(cItem, info) }}
                </template>
              </slot>
            </div>
          </template>
          <SelfTooltip
            v-else
            :content="tdValueText(info[cItem.key])"
            :delay="1000"
          >
            <div class="self-table-base-info-td-value-text">
              <slot :name="cItem.key" :params="info">
                <template v-if="!isRenderFn(cItem.render)"">
                  {{ tdValueText(info[cItem.key]) }}
                </template>
                <template v-else>
                  {{ renderToHtml(cItem, info) }}
                </template>
              </slot>
            </div>
          </SelfTooltip>
        </td>
      </template>
    </tr>
  </table>
</template>

<script>
import SelfTooltip from './selfTooltip';
import { getValueType } from '../../utils/utils';

export default {
  name: 'SelfTableBaseInfo',
  components: {
    SelfTooltip
  },
  props: {
    info: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    columns: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    labelWidth: {
      type: Number,
      required: false,
      default: 70
    },
    cols: {
      type: Number,
      required: false,
      default: 4
    },
    isShowTooltip: {
      type: Boolean,
      required: false,
      default: false
    },
    labelPosition: {
      type: String,
      required: false,
      default: _ => 'right'
    }
  },
  data() {
    return {
      valueTdShowTooltip: false,
      newColumns: []
    };
  },
  computed: {
    dealValue() {
      return (val) => {
        if (val && val.trim) {
          return val.trim();
        }
        return val;
      };
    },
    labelPositionVal() {
      const valList = ['left', 'right', 'top'];
      return valList.includes(this.labelPosition) ? this.labelPosition : 'right';
    },
    formItemTextClassName() {
      return this.isFormItemEllipsis ? 'form-item-text ellipsis' : 'form-item-text';
    },
    tdLabelClass() {
      const alignList = ['center', 'left', 'right'];
      return alignList.includes(this.labelPosition) ? `self-table-td-label-${this.labelPosition}` : 'self-table-td-label-right';
    },
    tdValueClass() {
      return pos => {
        const alignList = ['center', 'left', 'right'];
        return alignList.includes(pos) ? `self-table-td-value-${this.labelPosition}` : 'self-table-td-value-left';
      };
    },
    tdLabelStyle() {
      return {
        width: `${this.labelWidth}px`,
        maxWidth: `${this.labelWidth}px`,
        minWidth: `${this.labelWidth}px`
      };
    },
    tdValueText() {
      return text => {
        text = text ? text + '' : '';
        return text && text.trim() ? text.trim() : '--';
      };
    },
    isRenderFn() {
      return renderFn => {
        return renderFn && getValueType(renderFn) === 'function';
      };
    }
  },
  watch: {
    cols: {
      immediate: true,
      handler() {
        this.handleColumnsForNewColumns();
        this.handleTdValueWidth();
      }
    }
  },
  methods: {
    renderToHtml(cItem, info) {
      if (cItem.render && getValueType(cItem.render) === 'function') {
        try {
          this.$slots[cItem.key] = [cItem.render(this.$createElement, info)];
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(`%c 【${cItem.title}[${cItem.key}]】render函数渲染异常，请检查`, 'color: #fff; border-radius: 3px; padding: 3px 7px;background: #f00;');
          // eslint-disable-next-line no-console
          console.error(`%c ${e}`, 'color: #fff; border-radius: 3px; padding: 3px 7px;background: #f00;');
        }
      }
    },
    handleColumnsForNewColumns() {
      const columnsCols = this.columns.map(item => {
        return item.cols > this.cols ? this.cols : (item.cols || 1);
      }); // 处理cols
      // 通过columnsCols获取对columns截取的开始与结束坐标
      let sums = 0;
      const colItem = {
        startIds: 0,
        endIds: this.cols
      };
      const sliceArrInfos = [];
      const colsLength = columnsCols.length;

      for (let i = 0; i < colsLength; i++) {
        const item = columnsCols[i];
        sums += item;
        if (sums > this.cols) { // 当前计算总和大于cols,将当前下标左移一位,并记录开始结束下标
          colItem.endIds = i; // 设置结束坐标
          sliceArrInfos.push({ ...colItem }); // 更新sliceArrInfos
          sums = 0; // 重置总和
          colItem.startIds = i; // 重置开始坐标,下标左移一位
          i = i - 1;
          continue;
        }
        if (sums === this.cols) { // 当前计算总和等于cols,记录开始结束下标,并重置sums
          colItem.endIds = i + 1; // 当前cols总和与传入的cols相同时，设置结束坐标
          sliceArrInfos.push({ ...colItem }); // 更新sliceArrInfos函数
          sums = 0; // 重置总和
          colItem.startIds = i + 1; // 重置开始坐标
        }
        if (sums < this.cols && i === (colsLength - 1)) { // 当前计算总和小于cols,且当前下标为最后一个时,记录开始结束下标即可,循环终止
          colItem.endIds = i + 1; // 设置结束坐标
          sliceArrInfos.push({ ...colItem }); // 更新sliceArrInfos函数
        }
      }
      // 为newColumns赋值
      sliceArrInfos.forEach(item => {
        this.newColumns.push(this.columns.slice(item.startIds, item.endIds));
      });
    },
    handleTdValueWidth() {
      this.$nextTick(_ => {
        this.newColumns = this.newColumns.map(item => {
          item = item.map(cItem => {
            const offsetWidth = this.$refs[`selfTableTdValue${cItem.key}`][0].offsetWidth;
            cItem.width = offsetWidth + 'px';
            return cItem;
          });
          return item;
        });
        this.valueTdShowTooltip = this.isShowTooltip;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.self-table-base-info {
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  overflow: hidden;
  .self-table-base-info-tr {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    overflow: hidden;
    td {
      height: 32px;
      line-height: 18px;
      padding: 6px 12px;
      font-size: 12px;
      color: #333;
      border: 1px solid #d9d9d9;
      box-sizing: border-box;
    }
    .self-table-base-info-td-label {
      background-color: #f7f7f7;
      &.self-table-td-label-left {
        text-align: left;
      }
      &.self-table-td-label-center {
        text-align: center;
      }
      &.self-table-td-label-right {
        text-align: right;
      }
    }
    .self-table-base-info-td-value {
      &.self-table-td-value-left {
        text-align: left;
      }
      &.self-table-td-value-center {
        text-align: center;
      }
      &.self-table-td-value-right {
        text-align: right;
      }

      &.self-table-base-info-td-value-ellipsis {
        overflow: hidden;
        /deep/ .h-tooltip {
          max-width: 100%;
          height: 100%;
          .h-tooltip-rel {
            max-width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            .self-table-base-info-td-value-text {
              max-width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
      &.self-table-base-info-td-value-normal {
        .td-value-normal-text {
          white-space: pre-wrap;
          word-break: break-all;
          word-wrap: break-word;
        }
      }
    }
  }
}
</style>
