<template>
  <h-form
    :labelWidth="labelWidth"
    :cols="cols"
    :labelPosition="labelPositionVal"
    :class="['self-base-info', isTable ? 'form-border' : '']"
  >
    <template v-for="(item, ids) in columns">
      <h-form-item
        v-if="!item.isHidden"
        :key="`${item.key}-${ids}-client-info`"
        :label="item.title"
        :cols="item.cols || 1"
        :labelTitle="item.title"
        :labelWidth="item.labelWidth"
        :class="[`form-item-wrap-${item.key}`, formItemClassName(item)]"
      >
        <slot v-if="item.key" :name="item.key">
          <SelfTooltip v-if="isShowTooltip && dealValue(info[item.key])" :content="dealValue(info[item.key]) || ''">
            <div class="form-item-text ellipsis">{{ dealValue(info[item.key]) || '--' }}</div>
          </SelfTooltip>
          <div v-else :class="formItemTextClassName(item)">
            <span :title="dealValue(info[item.key]) || ''">{{ dealValue(info[item.key]) || '--' }}</span>
          </div>
        </slot>
        <template v-else>
          <SelfTooltip v-if="isShowTooltip && dealValue(info[item.key])" :content="dealValue(info[item.key]) || ''">
            <div class="form-item-text ellipsis">{{ dealValue(info[item.key]) || '--' }}</div>
          </SelfTooltip>
          <div v-else :class="formItemTextClassName(item)">
            <span :title="dealValue(info[item.key]) || ''">{{ dealValue(info[item.key]) || '--' }}</span>
          </div>
        </template>
      </h-form-item>
    </template>
  </h-form>
</template>

<script>
import SelfTooltip from './selfTooltip';
export default {
  name: 'SelfBaseInfo',
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
    },
    isTable: {
      type: Boolean,
      required: false,
      default: _ => false
    },
    isFormItemEllipsis: {
      type: Boolean,
      required: false,
      default: _ => false
    }
  },
  data() {
    return {
      baseInfo: {}
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
      return item => {
        return {
          'form-item-text': true,
          'ellipsis': this.isFormItemEllipsis || item.ellipsis || this.isShowTooltip
        };
      };
    },
    formItemClassName() {
      return item => {
        return {
          'form-item-no-ellipsis': !(this.isFormItemEllipsis || item.ellipsis || this.isShowTooltip)
        };
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.self-base-info {
  width: 100%;
  padding: 16px 0;
  overflow: hidden;
  /deep/ .h-form-item {
    height: 28px;
    .h-form-item-label {
      /* background-color: transparent !important; */
      /* font-weight: 700; */
    }
    .h-form-item-content {
      height: 28px;
      padding-left: 10px;
    }
    .h-tooltip {
      max-width: 100%;
      height: 28px;
      overflow: hidden;
      .h-tooltip-rel {
        max-width: 100%;
        overflow: hidden;
      }
    }
    &.form-item-no-ellipsis {
      height: auto;
      .h-form-item-content {
        height: auto;
      }
    }
  }
  .form-item-text {
    width: 100%;
    padding-right: 8px;
    &.ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &.form-border {
    /deep/ .h-form-item {
      margin-bottom: 5px;
      .h-form-item-label {
        height: 30px;
        padding: 0 8px;
        background-color: #f7f7f7 !important;
        box-sizing: border-box;
      }
      .h-form-item-content {
        height: 30px;
        padding-left: 0;
      }
      .h-form-item-content {
        padding: 0 8px;
      }
    }
  }
}

</style>
