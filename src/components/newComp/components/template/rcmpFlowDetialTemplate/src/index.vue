<template>
  <div>
    <h-tabs
      :animated="false"
      v-model="activeName"
      ref="detialFlowTabs"
      class="h-tabs-toolbar rcmpFlowDetialTemplateTab"
      @on-click="handleTabClick"
    >
      <h-tab-pane
        v-if="showTrigger||showConditionTrigger"
        :label="flowTextInfo.triggerName"
        key="triggerDetial"
        name="triggerDetial"
      >
        <template v-if="showTrigger">

          <div class="trigger_title">
            <span class="icon"></span>
            <span class="stro">发生条件</span>
          </div>
          <rcmpDataGrid
            :pageSizeOpts="pageSizeOpts"
            :columns="triggerColumns"
            :bindForm="triggerDetialForm"
            :autoLoad="flowAutoLoad"
            :onlyTable="true"
            :url="triggerUrl"
            :requestType="requestType"
            :filters="triggerFilters"
            :baseServer="baseServer"
            :showExportBtnByUrl="triggershowExportBtnByUrl"
            :exportUrl="exportUrl"
            :exportDataByUrlBeforeFn="exportDataByUrlBeforeFn"
            :exportFileName="triggerexportFileName"
            ref="triggerDetialGrid"
            class="dataGrid"
            highlight-row
          >
            <div v-if="triggerHasOperBtn" slot="toolbar">
              <slot name="toolbar"></slot>
            </div>
          </rcmpDataGrid>
        </template>
        <template v-if="showConditionTrigger">
          <div v-show="showTriggerTable" class="trigger_title" style="margin-top: 10px;">
            <span class="icon"></span>
            <span class="stro">后置条件</span>
          </div>
          <rcmpDataGrid
            v-show="showTriggerTable"
            :pageSizeOpts="pageSizeOpts"
            :columns="triggerConditionColumns"
            :bindForm="triggerDetialConditionForm"
            :autoLoad="false"
            :onlyTable="true"
            :url="triggerConditionUrl"
            :requestType="requestType"
            :baseServer="baseServer"
            :exportInfoList="exportInfoList"
            ref="triggerConditionDetialGrid"
            class="dataGrid"
            highlight-row
            @onTableData="getConditionTriggerTableData"
          />
        </template>
      </h-tab-pane>
      <h-tab-pane
        v-if="showRiskFlow"
        :label="flowTextInfo.riskFlowName"
        key="riskFlowDetial"
        name="riskFlowDetial"
      >
        <rcmpDataGrid
          :pageSizeOpts="pageSizeOpts"
          :columns="riskFlowColumns"
          :bindForm="riskFlowDetialFormNew"
          :autoLoad="flowAutoLoad"
          :onlyTable="true"
          :url="riskFlowUrl"
          :requestType="requestType"
          :filters="riskFlowFilters"
          :baseServer="baseServer"
          :showExportBtnByUrl="riskFlowshowExportBtnByUrl"
          :exportUrl="exportUrl"
          :exportDataByUrlBeforeFn="exportDataByUrlBeforeFn"
          :exportFileName="riskFlowexportFileName"
          :exportInfoList="exportInfoList"
          ref="riskFlowDetialGrid"
          class="dataGrid"
          hasPage
          highlight-row
          showListCkeckBox
        >
          <div slot="toolbar" class="pull-right">
            <slot name="toolbar"></slot>
            <h-button
              v-if="riskFlowAdvancedSearch"
              type="text"
              style="margin-right:8px;float:right;"
              @click="handleSearchBox()"
            >{{ flowTextInfo.advancedSearch }}</h-button>
          </div>
        </rcmpDataGrid>
      </h-tab-pane>
      <template>
        <slot name="flowTabs"></slot>
      </template>
    </h-tabs>
    <!--高级查询-->
    <h-msg-box
      v-model="searchMsgBoxModel"
      :width="msgBoxWidth"
      :mask-closable="false"
      class="riskFlowMsgBox"
      @on-close="onClose"
    >
      <p slot="header">
        <span>{{ flowTextInfo.advancedSearch }}</span>
      </p>
      <div>
        <h-form
          :model="riskFlowAdvanceForm"
          :label-width="msgBoxLabelWidth"
          :cols="advancedSearchCols"
          ref="riskFlowAdvanceForm"
        >
          <slot :riskFlowAdvanceForm="riskFlowAdvanceForm" name="advancedSearchCondition"></slot>
        </h-form>
      </div>
      <div slot="footer" style="text-align:center;">
        <h-button type="primary" @click="formSearchAdvanced()">{{ flowTextInfo.search }}</h-button>
        <h-button type="ghost" @click="formSearchAdvancedReset()">{{ flowTextInfo.reset }}</h-button>
      </div>
    </h-msg-box>
  </div>
</template>
<script>
import rcmpDataGrid from '../../../comComponents/rcmpDataGrid';
import flowDetialTemplateMixin from '../../../../mixins/flowDetialTemplateMixin.js';
import { on, off } from '../../../../utils/api/commonUtil';
export default {
  name: 'rcmpFlowDetialTemplate',
  components: {
    rcmpDataGrid
  },
  mixins: [flowDetialTemplateMixin],
  props: {
    exportUrl: {
      type: String,
      default: ''
    },
    exportDataByUrlBeforeFn: {
      type: Function,
      default(rcmpDataGrid) {
        return true;
      }
    },
    riskFlowAdvancedSearch: {
      type: Boolean,
      default: false
    },
    triggerDetialForm: {
      type: Object,
      default: () => ({})
    },
    riskFlowDetialForm: {
      type: Object,
      default: () => ({})
    },
    triggerDetialConditionForm: {
      type: Object,
      default: () => ({})
    },
    msgBoxWidth: {
      type: Number,
      default: 400
    },
    msgBoxLabelWidth: {
      type: Number,
      default: 80
    },
    advancedSearchCols: {
      type: Number,
      default: 1
    },
    pinDrawer: {
      type: Function,
      default: () => {}
    },
    handleTabClickFun: {
      type: Function,
      default: name => {}
    },
    adaptionHeightFun: {
      type: Function,
      default: name => {}
    },
    requestType: {
      type: String,
      default: 'post'
    },
    triggerFilters: {
      type: Object,
      default: () => ({})
    },
    riskFlowFilters: {
      type: Object,
      default: () => ({})
    },
    activeTabNameList: {
      type: Array,
      default: () => { return []; }
    },
    baseServer: {
      type: String,
      default: ''
    },
    riskFlowshowExportBtnByUrl: {
      type: Boolean,
      default: false
    },
    triggershowExportBtnByUrl: {
      type: Boolean,
      default: false
    },
    riskFlowexportFileName: {
      type: String,
      default: ''
    },
    triggerexportFileName: {
      type: String,
      default: ''
    },
    exportInfoList: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      searchMsgBoxModel: false,
      activeName: '',
      showTriggerTable: true
    };
  },
  computed: {
    riskFlowDetialFormNew: {
      get: function() {
        return Object.assign(this.riskFlowDetialForm, this.riskFlowAdvanceForm);
      },
      set: function(newVal) {
      }
    }
  },
  watch: {
    activeName(val) {
      this.$emit('update:activeTabName', val);
    },
    activeTabName(val) {
      this.activeName = val;
    }
  },
  created() {
    this.riskFlowAdvanceForm = JSON.parse(
      JSON.stringify(this.riskFlowAdvanceFormArgs)
    );
    this.activeName = this.activeTabName;
  },
  mounted() {
    this.handleResizeTemp();
    on(window, 'resize', this.handleResizeTemp);
  },
  activated() {
    this.handleResizeTemp();
    on(window, 'resize', this.handleResizeTemp);
  },
  deactivated() {
    off(window, 'resize', this.handleResizeTemp);
  },
  destroyed() {},
  beforeDestroy() {
    off(window, 'resize', this.handleResizeTemp);
  },
  methods: {
    onClose() {
      this.searchMsgBoxModel = false;
    },
    handleSearchBox() {
      this.searchMsgBoxModel = true;
      this.pinDrawer();
    },
    // 高级条件查询
    formSearchAdvanced() {
      this.searchMsgBoxModel = false;
      this.$refs.riskFlowDetialGrid.dataChange(1);
    },
    // 高级条件重置
    formSearchAdvancedReset() {
      if (this.showRiskFlow) {
        this.riskFlowAdvanceForm = JSON.parse(
          JSON.stringify(this.riskFlowAdvanceFormArgs)
        );
        this.$refs.riskFlowAdvanceForm.resetFields();
      }
    },
    handleTabClick(name) {
      if (name === 'triggerDetial' || name === 'riskFlowDetial') {
        let changed = false;
        this[name + 'Args'].forEach(attr => {
          changed =
            changed || this[name + 'Form'][attr] !== this.selectItem[attr];
        });
        if (!changed && this.activeTabNameList.indexOf(name) > -1) {
          return;
        }
        if (this.activeTabNameList.indexOf(name) === -1) {
          this.activeTabNameList.push(name);
        }
        this.formSearchAdvancedReset();
        this[name + 'Args'].forEach(attr => {
          this[name + 'Form'][attr] = this.selectItem[attr];
        });
        const grid = this.$refs[name + 'Grid'];
        grid.dataChange(1);
        setTimeout(() => {
          this.adaptionHeight();
        }, 0);
      }
      this.handleTabClickFun(name);
    },
    handleResizeTemp() {
      this.$nextTick(() => {
        this.adaptionHeight();
      });
    },
    adaptionHeight() {
      const drawer = this.$parent.$el.getElementsByClassName('h-drawer-body');
      const drawerH =
        (drawer.length > 0
          ? drawer[0].clientHeight
          : document.documentElement.clientHeight) -
        this.$refs.detialFlowTabs.$el.getElementsByClassName(
          'h-tabs-nav-wrap'
        )[0].clientHeight -
        32;
      const detialFlowHeight = drawerH - 88;
      const detialFlowHeightT = drawerH;
      if (this.showTrigger) {
        this.$refs.triggerDetialGrid.selfHeight = detialFlowHeightT;
        this.$refs.triggerDetialGrid.fixedHeight = detialFlowHeightT;
        this.$refs.triggerDetialGrid.height = detialFlowHeightT;
      }
      if (this.showRiskFlow) {
        this.$refs.riskFlowDetialGrid.selfHeight = detialFlowHeight;
        this.$refs.riskFlowDetialGrid.fixedHeight = detialFlowHeight;
        this.$refs.riskFlowDetialGrid.height = detialFlowHeight;
      }
      if (this.showConditionTrigger) {
        this.$refs.triggerConditionDetialGrid.selfHeight = detialFlowHeight;
        this.$refs.triggerConditionDetialGrid.fixedHeight = detialFlowHeight;
        this.$refs.triggerConditionDetialGrid.height = detialFlowHeight;
      }
      this.adaptionHeightFun();
    },
    getConditionTriggerTableData(data) {
      this.showTriggerTable = data.length > 0;
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .rcmpFlowDetialTemplateTab {
  .h-tabs-tabpane {
    padding: 5px 0;
  }
}

</style>
<style lang="scss">
.riskFlowMsgBox .h-modal-mask {
  z-index: 1001 !important;
}
.riskFlowMsgBox .h-modal-wrap {
  z-index: 1001 !important;
}
.rcmpFlowDetialTemplateTab  .h-tabs-nav-wrap {
  padding: 0 16px;
}
.lightblue .trigger_title {
  height: 28px;
  line-height: 28px;
  background-color: #f7f7f7;
  padding-left: 16px;
  margin-bottom: 12px;
  border-radius: 3px;
  .icon {
    width: 4px;
    height: 14px;
    background-color: #4686f2;
    display: inline-block;
    vertical-align: sub;
  }
  .stro {
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #666;
    line-height: 12px;
    font-weight: bold;
  }

}
.black .trigger_title {
  height: 28px;
  line-height: 28px;
  background-color: #19212b;
  padding-left: 16px;
  margin-bottom: 12px;
  border-radius: 3px;
  .icon {
    width: 4px;
    height: 14px;
    background-color: #4686f2;
    display: inline-block;
    vertical-align: sub;
  }
  .stro {
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #fff;
    line-height: 12px;
    font-weight: bold;
  }

}
</style>
