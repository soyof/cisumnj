<template>
  <div class="multi-tab-tmp-wrap">
    <h-tabs
      v-model="curTab"
      @on-click="handleTabClick"
    >
      <h-tab-pane
        v-for="(item, ids) in tabList"
        :label="item.label"
        :key="`tab-pane-${item.name}_${ids}`"
        :name="item.name"
        :disabled="!!item.disabled"
      >
        <template v-if="item.component && tabListLoadStatus[item.name] && isShowTabForLazy(item.name)">
          <component :ref="item.name" :is="item.component" v-bind="{...item}" />
        </template>
        <slot v-else :name="item.name" :tabInfo="item"></slot>
      </h-tab-pane>
    </h-tabs>
  </div>
</template>

<script>
import { getRandom } from '../../utils/utils';
export default{
  name: 'MultiTabTmp',
  props: {
    tabList: {
      type: Array,
      required: true,
      default() {
        console.error('使用MultiTabTmp组件，tabList为必传项');
        return [
          { label: '标签1', name: 'tab1', component: null },
          { label: '标签2', name: 'tab2', component: null }
        ];
      }
    },
    defaultShowTab: {
      type: [String, Number],
      required: false,
      default() {
        return '';
      }
    },
    isLazy: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    },
    isTabChangeResetLoad: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      curTab: '',
      tabListLoadStatus: {}
    };
  },
  computed: {
    isShowTabForLazy() {
      return tab => {
        if (!this.isTabChangeResetLoad) {
          return true;
        }
        return tab === this.curTab;
      };
    }
  },
  created() {
    this.tabList.forEach((item, ids) => {
      item.name = item.name ? item.name : `tab-pane-${ids}_${getRandom(10)}`;
      this.tabListLoadStatus[item.name] = !this.isLazy;
    });
    const newTabNames = Array.from(new Set(this.tabList.map(item => item.name)));
    const isExistComName = (this.tabList && this.tabList.length > 1) && newTabNames.length !== this.tabList.length;
    if (isExistComName) {
      console.error('props属性中tabList每项name必须为唯一值或不传，禁止设置name为同一值');
    }
    this.curTab = this.defaultShowTab ? this.defaultShowTab : this.tabList[0].name;
    this.tabListLoadStatus[this.curTab] = true;
  },
  methods: {
    handleTabClick(name) {
      this.$emit('tabClick', name);
      !this.tabListLoadStatus[name] && (this.tabListLoadStatus[name] = true);
    }
  }
};
</script>

<style scoped lang="scss">
.multi-tab-tmp-wrap {
  width: 100%;
  height: 100%;
  .h-tabs {
    width: 100%;
    height: 100%;
    /deep/ .h-tabs-bar {
      .h-tabs-nav-container {
        height: 40px;
        line-height: 40px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
        &:hover {
          &::-webkit-scrollbar {
            width: 0;
            height: 3px;
          }
        }
      }
    }
    /deep/ .h-tabs-content-wrap {
      width: 100%;
      height: calc(100% - 56px);
      .h-tabs-content {
        height: 100%;
        .h-tabs-tabpane {
          *[class^="app-module_main-content"] {
            padding: 0 16px;
          }
        }
      }
    }
  }
}
</style>
