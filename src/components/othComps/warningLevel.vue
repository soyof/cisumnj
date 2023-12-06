<template>
  <div :title="isShowTitle ? level : ''" class="warning-level">
    <div :class="['bc-box', 'bc-box-wrap', isBorder ? `has-border bc-bd${sLevel}` : '']">
      <div
        v-for="(item, ids) in bcItemList"
        :key="`bc-item-${ids}-${unique}`"
        :class="['bc-item', `bc-bgc${sLevel}`, isCircle ? 'is-circle' : '']"
        :style="{
          width: `${size}px`,
          height: `${size}px`
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { getValueType } from '../../utils/utils';
export default {
  name: 'WarningLevel',
  props: {
    level: {
      type: Number | String,
      required: false,
      default: 0
    },
    unique: {
      type: Number | String,
      required: false,
      default: Math.random().toString(36).substr(2)
    },
    isCircle: {
      type: Boolean,
      required: false,
      default: true
    },
    isBorder: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: Number,
      required: false,
      default: 6
    },
    isShowTitle: {
      type: Boolean,
      required: false,
      default: true
    },
    allowValList: {
      type: Array,
      required: false,
      default: _ => [1, 2, 3, 4, 5]
    }
  },
  data() {
    return {
    };
  },
  computed: {
    sLevel() {
      let val = +this.level;
      const type = getValueType(this.level);
      if (type !== 'string' && type !== 'number') {
        val = 0;
      }
      const isExist = this.allowValList.includes(val);
      if (!isExist) {
        val = 0;
      }
      return val;
    },
    bcItemList() {
      return Array(this.sLevel);
    }
  }
};
</script>

<style scoped lang="scss">
$color0: #0170f3;
$color1: #39b173;
$color2: #9dba3c;
$color3: #fcc300;
$color4: #f18a1b;
$color5: #f24e43;
.warning-level {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .bc-box {
    min-width: 48px;
    min-height: 14px;
    display: flex;
    padding: 3px 4px;
    box-sizing: border-box;
    &.has-border {
      border: 1px solid $color0;
      border-radius: 2px;
    }
    &.bc-box-wrap {
      align-items: center;
    }

    &.bc-bd0 {
      border-color: rgba($color0, .3);
    }

    &.bc-bd1 {
      border-color: rgba($color1, .3);
    }

    &.bc-bd2 {
      border-color: rgba($color2, .3);
    }

    &.bc-bd3 {
      border-color: rgba($color3, .3);
    }

    &.bc-bd4 {
      border-color: rgba($color4, .3);
    }

    &.bc-bd5 {
      border-color: rgba($color5, .3);
    }

    .bc-item {
      width: 6px;
      height: 6px;
      margin-right: 2px;
      background-color: #0170f3;

      &.is-circle {
        border-radius: 50%;
      }

      &:last-child {
        margin-right: 0;
      }

      &.bc-bgc0 {
        background-color: $color0;
      }

      &.bc-bgc1 {
        background-color: $color1;
      }

      &.bc-bgc2 {
        background-color: $color2;
      }

      &.bc-bgc3 {
        background-color: $color3;
      }

      &.bc-bgc4 {
        background-color: $color4;
      }

      &.bc-bgc5 {
        background-color: $color5;
      }
    }
  }
}
</style>
