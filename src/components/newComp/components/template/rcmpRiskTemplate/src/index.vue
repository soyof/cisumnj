<template>
  <div>
    <rcmpSearchTemplate
      :textInfo="textInfo"
      :labelWidth="labelWidth"
      :formCols="formCols"
      :formId="formId"
      :formArgs="formArgs"
      :advanceFormArgs="advanceFormArgs"
      :hasMoreConditions="hasMoreConditions"
      :baseSearch="baseSearch"
      :advancedSearch="advancedSearch"
      :msgBoxWidth="msgBoxWidth"
      :advancedSearchCols="advancedSearchCols"
      :dataCheckedProp="dataCheckedProp"
      :tableType="tableType"
      :itemHeight="itemHeight"
      :title="title"
      :showListCkeckBox="showListCkeckBox"
      :hasTitle="hasTitle"
      :hasToolBar="hasToolBar"
      :hasPage="hasPage"
      :tableShowTitle="tableShowTitle"
      :gridData="gridData"
      :columns="columns"
      :border="border"
      :size="size"
      :stripe="stripe"
      :showHeader="showHeader"
      :width="width"
      :height="height"
      :canDrag="canDrag"
      :disabledHover="disabledHover"
      :highlightRow="highlightRow"
      :rowSelect="rowSelect"
      :onDataText="onDataText"
      :noFilteredDataText="noFilteredDataText"
      :onRowClick="handlelRowClick"
      :onSelect="handlelRowSelect"
      :onSelectCancel="handleSelectCancel"
      :onSelectChange="handleSelectChange"
      :onRowDbClick="onRowDbClick"
      :onCurrentChange="onCurrentChange"
      :onSelectAll="onSelectAll"
      :onSortChange="onSortChange"
      :onExpand="onExpand"
      :onScroll="onScroll"
      :current="current"
      :pageSize="pageSize"
      :placement="placement"
      :pageSizeOpts="pageSizeOpts"
      :simple="simple"
      :showTotal="showTotal"
      :showElevator="showElevator"
      :showSizer="showSizer"
      :className="className"
      :styles="styles"
      :getDataFunc="getDataFunc"
      :url="url"
      :baseUrl="baseUrl"
      :autoLoad="autoLoad"
      :loading="loading"
      :selfAdaptTable="selfAdaptTable"
      :occupyHight="occupyHight"
      :msgBoxLabelWidth="msgBoxLabelWidth"
      :filters="filters"
      :checkBaseSearchForm="checkBaseSearchForm"
      :checkAdvancedSearchForm="checkAdvancedSearchForm"
      :dataAggregateUrl="dataAggregateUrl"
      :aggregateInfoAttrs="aggregateInfoAttrs"
      :searchCallBak="searchCallBak"
      :baseServer="baseServer"
      :showExportBtnByUrl="showExportBtnByUrl"
      :exportUrl="exportUrl"
      :exportDataByUrlBeforeFn="exportDataByUrlBeforeFn"
      :exportFileName="exportFileName"
      :btnRightCode="btnRightCode"
      :queryParamTrim="queryParamTrim"
      :labelArgs="labelArgs"
      :labelMapFormat="labelMapFormat"
      :onlyTable="onlyTable"
      :exportInfoList="exportInfoList"
      ref="mainPage"
      @change-list="handleChangeList"
    >
      <template slot="baseCondition" slot-scope="{ form }">
        <slot :form="form" name="baseCondition"></slot>
      </template>
      <template slot="moreCondition" slot-scope="{ form }">
        <slot :form="form" name="moreCondition"></slot>
      </template>
      <template slot="opreBtns">
        <slot name="opreBtns"></slot>
      </template>
      <template slot="advancedSearchCondition" slot-scope="{ advanceForm }">
        <slot :advanceForm="advanceForm" name="advancedSearchCondition"></slot>
      </template>
    </rcmpSearchTemplate>
    <rcmpDrawer
      :showDrawer.sync="showDrawer"
      :title="drawerTitle"
      :width="drawerWidth"
      :height="drawerHeight"
      :closable="drawerClosable"
      :maskClosable="drawerMaskClosable"
      :mask="drawerMask"
      :maskStyle="drawerMaskStyle"
      :styles="drawerStyles"
      :scrollable="drawerScrollable"
      :placement="drawerPlacement"
      :transfer="drawerTransfer"
      :className="drawerClassName"
      :inner="drawerInner"
      :fullScreen="drawerFullScreen"
      :pin="drawerPin"
      :handleClose="drawerHandleCloseFn"
      :onVisibleChange="drawerOnVisibleChange"
      ref="riskDrawer"
    >
      <rcmpFlowDetialTemplate
        :flowTextInfo="flowTextInfo"
        :activeTabName.sync="activeTabName"
        :activeTabNameList.sync="activeTabNameList"
        :showTrigger="showTrigger"
        :showRiskFlow="showRiskFlow"
        :pageSizeOpts="pageSizeOpts"
        :triggerColumns="triggerColumns"
        :riskFlowColumns="riskFlowColumns"
        :triggerDetialForm="triggerDetialForm"
        :riskFlowDetialForm="riskFlowDetialForm"
        :flowAutoLoad="flowAutoLoad"
        :triggerUrl="triggerUrl"
        :riskFlowUrl="riskFlowUrl"
        :triggerDetialArgs="triggerDetialArgs"
        :riskFlowDetialArgs="riskFlowDetialArgs"
        :riskFlowAdvanceFormArgs="riskFlowAdvanceFormArgs"
        :selectItem.sync="selectItem"
        :msgBoxWidth="msgBoxWidth"
        :msgBoxLabelWidth="msgBoxLabelWidth"
        :advancedSearchCols="advancedSearchCols"
        :pinDrawer="pinDrawer"
        :handleTabClickFun="handleTabClickFun"
        :triggerFilters="triggerFilters"
        :riskFlowFilters="riskFlowFilters"
        :triggerHasOperBtn="triggerHasOperBtn"
        :baseServer="baseServer"
        :riskFlowshowExportBtnByUrl="riskFlowshowExportBtnByUrl"
        :triggershowExportBtnByUrl="triggershowExportBtnByUrl"
        :riskFlowexportFileName="riskFlowexportFileName"
        :triggerexportFileName="triggerexportFileName"
        :showConditionTrigger="showConditionTrigger"
        :triggerDetialConditionForm="triggerDetialConditionForm"
        :triggerConditionUrl="triggerConditionUrl"
        slot="drawerBody"
        ref="flowTabs"
      >
        <template slot="flowTabs">
          <slot name="flowTabs"></slot>
        </template>
        <template
          slot="advancedSearchCondition"
          slot-scope="{ riskFlowAdvanceForm }"
        >
          <slot
            :riskFlowAdvanceForm="riskFlowAdvanceForm"
            name="riskFlowAdvancedSearchCondition"
          ></slot>
        </template>
      </rcmpFlowDetialTemplate>
    </rcmpDrawer>
  </div>
</template>
<script>
import rcmpDrawer from '../../../comComponents/rcmpDrawer';
import rcmpFlowDetialTemplate from '../../../template/rcmpFlowDetialTemplate';
import rcmpSearchTemplate from '../../../template/rcmpSearchTemplate';
// import { oneOf } from '../../../../utils/tools.js'
import { on, off } from '../../../../utils/api/commonUtil.js';
import dataGridMixin from '../../../../mixins/dataGridMixin.js';
import searchTemplateMixin from '../../../../mixins/searchTemplateMixin.js';
import drawerMixin from '../../../../mixins/drawerMixin.js';
import flowDetialTemplateMixin from '../../../../mixins/flowDetialTemplateMixin.js';
export default {
  name: 'rcmpRiskTemplate',
  components: { rcmpDrawer, rcmpFlowDetialTemplate, rcmpSearchTemplate },
  mixins: [
    dataGridMixin,
    searchTemplateMixin,
    drawerMixin,
    flowDetialTemplateMixin
  ],
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
    exportFileName: {
      type: String,
      default: ''
    },
    baseService: {
      type: String,
      default: ''
    },
    emptyFlowDetialTabFun: {
      type: Function,
      default() {
        return '';
      }
    },
    loadFlowDetialTabFun: {
      type: Function,
      default() {
        return '';
      }
    },
    triggerForm: {
      type: Object,
      default: () => ({})
    },
    riskFlowForm: {
      type: Object,
      default: () => ({})
    },
    triggerConditionForm: {
      type: Object,
      default: () => ({})
    },
    handleTabClickFun: {
      type: Function,
      default: () => {}
    },
    triggerFilters: {
      type: Object,
      default: () => ({})
    },
    riskFlowFilters: {
      type: Object,
      default: () => ({})
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
    }
  },
  data() {
    return {
      triggerDetialForm: {},
      riskFlowDetialForm: {},
      triggerDetialConditionForm: {},
      activeTabNameList: []
    };
  },
  computed: {},
  watch: {
    activeTabName(val) {
      this.activeName = val;
    }
  },
  created() {
    this.triggerDetialForm = JSON.parse(JSON.stringify(this.triggerForm));
    this.riskFlowDetialForm = JSON.parse(JSON.stringify(this.riskFlowForm));
    this.triggerDetialConditionForm = JSON.parse(JSON.stringify(this.triggerConditionForm));
    this.activeName = this.activeTabName;
  },
  mounted() {
    on(
      this.$refs.mainPage.$refs.datagrid.$el.getElementsByClassName(
        'h-table-tbody'
      )[0],
      'click',
      () => {
        this.delDrawerEvent();
      }
    );
  },
  activated() {
    off(
      this.$refs.mainPage.$refs.datagrid.$el.getElementsByClassName(
        'h-table-tbody'
      )[0],
      'click',
      () => {
        this.delDrawerEvent();
      }
    );
  },
  deactivated() {
    off(
      this.$refs.mainPage.$refs.datagrid.$el.getElementsByClassName(
        'h-table-tbody'
      )[0],
      'click',
      () => {
        this.delDrawerEvent();
      }
    );
  },
  destroyed() {},
  beforeDestroy() {
    off(
      this.$refs.mainPage.$refs.datagrid.$el.getElementsByClassName(
        'h-table-tbody'
      )[0],
      'click',
      () => {
        this.delDrawerEvent();
      }
    );
  },
  methods: {
    handleSelectCancel(selections, row) {
      if (selections.length > 0) {
        this.$refs.mainPage.currentSelectRow = selections[0];
        this.selectItem = this.$refs.mainPage.currentSelectRow;
        this.loadFlowDetial();
      } else {
        this.emptyFlowDetial();
      }
      this.onSelectCancel(selections, row);
    },
    emptyFlowDetial() {
      this.showDrawer = false;
      this.drawerHandleCloseFn();
      if (this.showTrigger) {
        this.$refs.flowTabs.$refs.triggerDetialGrid.tData = [];
        this.$refs.flowTabs.$refs.triggerDetialGrid.total = 0;
        this.triggerDetialArgs.forEach((attr) => {
          this.triggerForm[attr] = '';
        });
      }
      if (this.showRiskFlow) {
        this.$refs.flowTabs.$refs.riskFlowDetialGrid.tData = [];
        this.$refs.flowTabs.$refs.riskFlowDetialGrid.total = 0;
        this.riskFlowDetialArgs.forEach((attr) => {
          this.riskFlowForm[attr] = '';
        });
      }
      this.emptyFlowDetialTabFun();
    },
    handleSelectChange(arr, selectInx) {
      this.onSelectChange(arr, selectInx);
    },
    handlelRowSelect(selections, arr) {
      this.loadFlowDetial();
      this.onSelect(selections, arr);
    },
    loadFlowDetial() {
      this.showDrawer = true;
      this.activeName = this.activeName || 'triggerDetial';
      this.activeTabNameList = [this.activeName];
      const riskDrawerDom = this.$refs.flowTabs.$refs.detialFlowTabs.$el;
      setTimeout(() => {
        riskDrawerDom.getElementsByClassName('h-tabs-ink-bar')[0].style.width = riskDrawerDom.getElementsByClassName('h-tabs-tab')[0].offsetWidth + 'px';
      }, 0);
      if (this.activeName === 'triggerDetial' || this.activeName === 'riskFlowDetial') {
        const grid = this.$refs.flowTabs.$refs[this.activeName + 'Grid'];
        // let changed = false;
        // this[this.activeName + 'Args'].forEach((attr) => {
        //   changed = changed || this[this.activeName + 'Form'][attr] !== this.$refs.mainPage.currentSelectRow[attr];
        // });
        // if (!changed) {
        //   return;
        // }
        // 条件修改后，清空表格，重置高级查询
        this.emptyFlowDetial();
        this.showDrawer = true;
        this.$refs.flowTabs.formSearchAdvancedReset();
        this.triggerDetialArgs.forEach((attr) => {
          this.triggerForm[attr] = '';
        });
        this.riskFlowDetialArgs.forEach((attr) => {
          this.riskFlowForm[attr] = '';
        });
        this[this.activeName + 'Args'].forEach((attr) => {
          this[this.activeName + 'Form'][
            attr
          ] = this.$refs.mainPage.currentSelectRow[attr];
        });
        grid.dataChange(1);
        if (this.activeName === 'triggerDetial' && this.showConditionTrigger) {
          const grid1 = this.$refs.flowTabs.$refs['triggerConditionDetialGrid'];
          this.triggerDetialConditionForm['monitor_id'] = this.$refs.mainPage.currentSelectRow['monitor_id'];
          grid1.dataChange(1);
        }
      }
      this.loadFlowDetialTabFun();
      setTimeout(() => {
        this.$refs.flowTabs.adaptionHeight();
      }, 0);
    },
    handlelRowClick(arr) {
      this.$refs.riskDrawer.delDrawerEvent();
      if (this.$refs.mainPage.currentSelectRow instanceof Array) {
        this.selectItem = {};
        this.emptyFlowDetial();
      } else {
        this.selectItem = this.$refs.mainPage.currentSelectRow;
        this.loadFlowDetial();
      }
      this.onRowClick();
      this.$refs.riskDrawer.addDrawerEvent();
    },
    pinDrawer() {
      this.$refs.riskDrawer.changePin();
    },
    delDrawerEvent() {
      this.$refs.riskDrawer.delDrawerEvent();
    },
    addDrawerEvent() {
      this.$refs.riskDrawer.addDrawerEvent();
    },
    drawerHandleCloseFn() {
      if (this.drawerHandleClose) {
        this.drawerHandleClose();
      } else {
        if (
          this[this.activeName + 'Args'] &&
          this[this.activeName + 'Args'] instanceof Array
        ) {
          this[this.activeName + 'Args'].forEach((attr) => {
            this[this.activeName + 'Form'][attr] = '';
          });
        }
      }
    },
    handleChangeList() {
      this.$emit('change-list');
    }
  }
};
</script>
