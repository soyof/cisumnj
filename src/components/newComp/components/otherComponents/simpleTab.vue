<template>
  <div class="simple-tab">
    <div :class="['simple-tab-title', {'mb12': !expandContent}]">
      <div class="simple-tab-title-box">
        <slot :titleText="title" name="title">
          <slot name="titleBefore">
            <span v-if="titleLine" class="simple-tab-title-line"></span>
          </slot>
          <span class="simple-tab-title-text">{{ title }}</span>
        </slot>
      </div>
      <i
        :class="['iconfont', 'icon-unfold', 'oc-set-icon', {'expand': expandContent}]"
        @click="handleExpandItem(!expandContent)"
      ></i>
    </div>
    <SelfTransition>
      <div v-show="expandContent" class="simple-tab-content-wrap">
        <slot name="content"></slot>
      </div>
    </SelfTransition>
  </div>
</template>

<script>
import SelfTransition from '../../funcComps/selfTransition';
export default {
  name: 'SimpleTab',
  components: {
    SelfTransition
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '默认值'
    },
    expand: {
      type: Boolean,
      required: false,
      default: true
    },
    titleLine: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      expandContent: true
    };
  },
  mounted() {
    this.expandContent = this.expand;
  },
  methods: {
    handleExpandItem(flag) {
      this.expandContent = flag;
      if (this.expand) {
        this.$emit('expandChange', flag);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.simple-tab {
  width: 100%;
  /* height: 100%; */
  .simple-tab-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 12px;
    margin-bottom: 12px;
    border-radius: 5px;
    color: #333;
    background-color: #eff5ff;
    overflow: hidden;

    .simple-tab-title-box {
      display: flex;
      align-items: center;
      width: calc(100% - 30px);
      flex: 1;

      .simple-tab-title-line {
        display: inline-block;
        width: 4px;
        height: 14px;
        margin-right: 8px;
        background-color: #4686F2;
      }

      .simple-tab-title-text {
        display: inline-block;
        width: 100%;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .oc-set-icon {
      margin-left: 15px;
      font-size: 16px;
      font-style: normal;
      cursor: pointer;
      transition: transform 0.3s ease;
      -webkit-transition: transform 0.3s ease;
      -ms-transition: transform 0.3s ease;

      &.expand {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
      }
    }
  }

  .simple-tab-content-wrap {
  }
}

.mb12 {
  margin-bottom: 12px;
}

</style>
