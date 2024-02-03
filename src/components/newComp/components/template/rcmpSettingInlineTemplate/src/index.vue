<template>
  <div>
    <h-row name="flex">
      <!--右侧数据展示表格-->
      <h-col span="24">
        <div>
          <!--数据展示表格-->
          <h-row>
            <h-col span="24">
              <div v-if="baseSearch" style="position:relative;">
                <h-form
                  :model="form"
                  :label-width="labelWidth"
                  :cols="formCols"
                  :id="formId"
                  ref="form"
                >
                  <slot :form="form" name="baseCondition"></slot>
                  <template v-if="moreCondition">
                    <slot :form="form" name="moreCondition"></slot>
                  </template>
                  <h-form-item
                    :align="moreCondition ? 'right' : 'left'"
                    :class="['no-label', moreCondition ? 'absolute' : '']"
                  >
                    <h-button
                      :data-rightcode="btnRightCode.searchRightCode"
                      type="primary"
                      @click="formSearch()"
                    >{{ textInfo.search }}</h-button>
                    <h-button type="ghost" @click="formSearchReset()">{{
                      textInfo.reset
                    }}</h-button>
                    <h-button
                      :data-rightcode="btnRightCode.searchRightCode"
                      v-if="hasMoreConditions"
                      type="text"
                      class="h-btn-blue-line rcmp-moreSearchBtn"
                      style="color: #4686F2;"
                      @click="searchAdvanced()"
                    >
                      {{ moreConditionText }}
                      <h-icon name="unfold" />
                    </h-button>
                  </h-form-item>
                </h-form>
              </div>
              <rcmpDataGrid
                :dataCheckedProp="dataCheckedProp"
                :tableType="tableType"
                :itemHeight="itemHeight"
                :showListCkeckBox="showListCkeckBox"
                :hasTitle="hasTitle"
                :hasToolBar="hasToolBar"
                :tableShowTitle="tableShowTitle"
                :hasPage="hasPage"
                :gridData="gridData"
                :columns="columns"
                :border="border"
                :size="size"
                :stripe="stripe"
                :showHeader="showHeader"
                :width="width"
                :heigth="height"
                :canDrag="canDrag"
                :disabledHover="disabledHover"
                :highlightRow="highlightRow"
                :rowSelect="rowSelect"
                :rowClassName="rowClassName"
                :onDataText="onDataText"
                :noFilteredDataText="noFilteredDataText"
                :onRowClick="handlelRowClick"
                :onRowDbClick="onRowDbClick"
                :onCurrentChange="onCurrentChange"
                :onSelect="handlelRowSelect"
                :onSelectCancel="handleSelectCancel"
                :onSelectAll="onSelectAll"
                :onSelectChange="handlePageChange"
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
                :getDataFunc="getDataFunc"
                :url="url"
                :bindForm="bindForm"
                :autoLoad="autoLoad"
                :loading="loading"
                :selfAdaptTable="selfAdaptTable"
                :occupyHight="occupyHight"
                :requestType="requestType"
                :dataAggregateUrl="dataAggregateUrl"
                :aggregateInfoAttrs="aggregateInfoAttrs"
                :baseServer="baseServer"
                :showExportBtnByUrl="showExportBtnByUrl"
                :exportFileName="exportFileName"
                :exportUrl="exportUrl"
                :exportDataByUrlBeforeFn="exportDataByUrlBeforeFn"
                :exportHiddenCols="exportHiddenCols"
                :btnRightCode="btnRightCode"
                :labelArgs="labelArgs"
                :labelMapFormat="labelMapFormat"
                :exportInfoList="exportInfoList"
                ref="datagrid"
                @on-page-change-url="handlePageChange"
                @change-list="handleChangeList"
              >
                <div slot="toolbar" class="pull-left">
                  <slot name="opreBtns"></slot>
                  <h-button
                    v-if="advancedSearch"
                    type="text"
                    style="float:right;margin-right:8px;"
                    @click="handleSearchBox()"
                  >{{ textInfo.advancedSearch }}</h-button>
                </div>
              </rcmpDataGrid>
            </h-col>
          </h-row>
        </div>
      </h-col>
    </h-row>
    <!--高级查询-->
    <h-msg-box
      v-model="searchMsgBoxModel"
      :width="msgBoxWidth"
      :mask-closable="false"
      @on-close="onClose"
    >
      <p slot="header">
        <span>{{ textInfo.advancedSearch }}</span>
      </p>
      <div>
        <h-form
          :model="advanceForm"
          :label-width="msgBoxLabelWidth"
          :cols="advancedSearchCols"
          ref="advanceForm"
        >
          <slot
            :advanceForm="advanceForm"
            name="advancedSearchCondition"
          ></slot>
        </h-form>
      </div>
      <div slot="footer" style="text-align:center;">
        <h-button type="primary" @click="formSearchAdvanced()">{{
          textInfo.search
        }}</h-button>
        <h-button type="ghost" @click="formSearchAdvancedReset()">{{
          textInfo.reset
        }}</h-button>
      </div>
    </h-msg-box>
  </div>
</template>
<script>
import rcmpSearchTemplate from '../../rcmpSearchTemplate';
import { handlePanelChange, on, off } from '../../../../utils/api/commonUtil';
export default {
  name: 'rcmpSettingInlineTemplate',
  components: {
    rcmpSearchTemplate
  },
  props: {
    textInfo: {
      type: Object,
      default: () => ({
        search: '查询',
        reset: '重置',
        advancedSearch: '高级查询',
        simple: '简单',
        more: '更多'
      })
    },
    operBtn: {
      type: Object,
      default: () => ({
        insertBtn: '新增',
        editBtn: '修改',
        deleteBtn: '删除',
        exportBtn: '导出'
      })
    },
    editBox: {
      type: Object,
      default: () => ({
        title: '新增',
        save: '保存',
        deleteBtn: '重置'
      })
    },
    // 查询条件label宽度
    labelWidth: {
      type: Number,
      default: 80
    },
    // 一行展示几个查询条件
    formCols: {
      type: Number,
      default: 4
    },
    formId: {
      type: String,
      default: 'mainSearch'
    },
    // 查询表单参数配置
    formArgs: {
      type: Object,
      default: () => ({})
    },
    advanceFormArgs: {
      type: Object,
      default: () => ({})
    },
    // 是否有更多的查询条件
    hasMoreConditions: {
      type: Boolean,
      default: false
    },
    // 是否有基础查询
    baseSearch: {
      type: Boolean,
      default: false
    },
    // 是否有高级查询
    advancedSearch: {
      type: Boolean,
      default: false
    },
    msgBoxWidth: {
      type: Number,
      default: 400
    },
    advancedSearchCols: {
      type: Number,
      default: 1
    },
    msgBoxLabelWidth: {
      type: Number,
      default: 80
    },
    dataCheckedProp: {
      // data中默认添加_checked属性记录当前选中状态
      type: Boolean,
      default: true
    },
    tableType: {
      type: String,
      default: 'table'
    },
    itemHeight: {
      type: Number,
      default: 30
    },
    title: String, // 表格列表头部信息,
    showListCkeckBox: {
      // 是否显示自定义表格选项框
      type: Boolean,
      default: false
    },
    hasTitle: {
      // 是否有title
      type: Boolean,
      default: false
    },
    hasToolBar: {
      // 是否有toolbar
      type: Boolean,
      default: true
    },
    hasPage: {
      // 是否显示分页
      type: Boolean,
      default: false
    },
    tableShowTitle: {
      type: Boolean,
      default: true
    },
    gridData: Object, // 数据信息，包含表格信息rows及分页信息total[可以通过property自定义rows字段]
    columns: Array,
    border: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'small'
    },
    stripe: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    width: [Number, String],
    height: [Number, String],
    canDrag: {
      type: Boolean,
      default: true
    },
    disabledHover: {
      type: Boolean,
      default: false
    },
    highlightRow: {
      type: Boolean
    },
    rowSelect: {
      type: Boolean
    },
    rowClassName: Function,
    onDataText: String,
    noFilteredDataText: String,
    onRowClick: {
      type: Function,
      default() {
        return '';
      }
    },
    onRowDbClick: {
      type: Function,
      default() {
        return '';
      }
    },
    onCurrentChange: {
      type: Function,
      default() {
        return '';
      }
    },
    onSelect: {
      type: Function,
      default() {
        return '';
      }
    },
    onSelectCancel: {
      type: Function,
      default() {
        return '';
      }
    },
    onSelectAll: {
      type: Function,
      default() {
        return '';
      }
    },
    onSelectChange: {
      type: Function,
      default() {
        return '';
      }
    },
    onSortChange: {
      type: Function,
      default() {
        return '';
      }
    },
    onExpand: {
      type: Function,
      default() {
        return '';
      }
    },
    onScroll: {
      type: Function,
      default() {
        return '';
      }
    },
    current: Number,
    pageSize: Number,
    placement: {
      type: String,
      default: 'top'
    },
    pageSizeOpts: Array,
    simple: Boolean,
    showTotal: {
      type: Boolean,
      default: true
    },
    showElevator: {
      type: Boolean,
      default: true
    },
    showSizer: {
      type: Boolean,
      default: true
    },
    className: String,
    styles: Object,
    // hasPage:{ //是否显示分页
    //   type: Boolean,
    //   default: false
    // },
    getDataFunc: {
      // 分页获取data函数，该参数必须配gridData || 无分页情况,直接返回rows,同时配置get-data事件
      type: Boolean,
      default: false
    },
    // getData: Function, //分页获取data函数，该参数必须配gridData || 无分页情况,直接返回rows
    url: String, // 参考2.0 通过url请求数据
    baseUrl: String, // 参考2.0 通过url请求数据
    autoLoad: {
      // 设置URL时是否自动加载数据，默认true
      type: Boolean,
      default: true
    },
    loading: {
      // 非url时使用
      type: Boolean,
      default: false
    },
    selfAdaptTable: String, // 暴露给用户ref属性,设置此属性后，表格根据页面高度自适应，不设置此属性按照给定的高度值给表格设定高度
    occupyHight: {
      type: Number,
      default: 0
    },
    requestType: {
      type: String,
      default: 'post'
    },
    searchCallBak: {
      type: Function,
      default() {}
    },
    insertBtn: {
      // 非url时使用
      type: Boolean,
      default: true
    },
    editBtn: {
      // 非url时使用
      type: Boolean,
      default: true
    },
    deleteBtn: {
      // 非url时使用
      type: Boolean,
      default: true
    },
    exportBtn: {
      // 非url时使用
      type: Boolean,
      default: true
    },
    baseServer: {
      type: String,
      default: ''
    },
    // url导出按钮
    showExportBtnByUrl: {
      type: Boolean,
      default: false
    },
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
    // 按钮权限
    btnRightCode: {
      type: Object,
      default: () => {
        return {};
      }
    },
    exportInfoList: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    exportHiddenCols: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      moreCondition: false,
      moreConditionText: this.textInfo.more,
      form: {},
      advanceForm: {},
      searchMsgBoxModel: false,
      currentSelectRow: [],
      currentSelectList: [],
      currentSelectRowInx: []
    };
  },
  computed: {
    bindForm: {
      get: function() {
        return Object.assign(this.form, this.advanceForm);
      },
      set: function(newVal) {}
    }
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.formArgs));
    this.advanceForm = JSON.parse(JSON.stringify(this.advanceFormArgs));
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
    },
    // 基本条件查询
    formSearch() {
      this.$refs.datagrid.dataChange(1);
      this.searchCallBak();
    },
    // 基本条件查询
    formSearchReset() {
      this.form = JSON.parse(JSON.stringify(this.formArgs));
      this.$refs.form.resetFields();
    },
    // 高级条件查询
    formSearchAdvanced() {
      this.searchMsgBoxModel = false;
      this.$refs.datagrid.dataChange(1);
      this.searchCallBak();
    },
    // 高级条件重置
    formSearchAdvancedReset() {
      this.advanceForm = JSON.parse(JSON.stringify(this.advanceFormArgs));
      this.$refs.advanceForm.resetFields();
    },
    handleSelectCancel(selections, row) {
      if (selections.length > 0) {
        this.currentSelectRow = selections[0];
      } else {
        this.currentSelectRow = [];
      }
      this.onSelectCancel(selections, row);
    },
    handleSelectChange(arr, selectInx) {
      this.currentSelectList = arr;
      this.currentSelectRowInx = selectInx;
      this.onSelectChange(arr, selectInx);
    },
    handlelRowSelect(selections, arr) {
      this.currentSelectRow = arr;
      this.onSelect(selections, arr);
    },
    handlelRowClick(arr) {
      if (arr.length === 2) {
        return;
      }
      this.onRowClick(arr);
    },
    /** 动态监听form查询表单高度变化来自适应表格高度 */
    searchAdvanced() {
      this.moreCondition = !this.moreCondition;
      this.moreConditionText = this.moreCondition
        ? this.textInfo.simple
        : this.textInfo.more;
      const ref = this.$refs.datagrid;
      handlePanelChange(this.formId, ref, this.formId, this.formCols);
    },
    // 点击分页，恢复按钮初始状态
    handlePageChange(pageNo, pageSize) {
      this.currentSelectRow = [];
      this.currentSelectList = [];
      this.currentSelectRowInx = [];
    },
    handleResizeTemp() {
      this.$nextTick(() => {
        this.$refs.datagrid.selfAdaption(this.formId, this.formCols, [
          'tabsObj'
        ]);
      });
    },
    insertItem() {},
    editItem() {},
    deleteItem() {},
    exportItem() {},
    save() {},
    reset() {},
    handleChangeList() {
      this.$emit('change-list');
    }
  }
};
</script>
<style scoped>
.h-form-row .h-form-item {
  padding: 0 8px 8px 0;
  display: block;
  float: left;
  zoom: 1;
  margin-bottom: 0;
}
.h-form-row .h-form-item.no-label {
  padding-right: 0;
  margin-bottom: 0 0 8px 0;
}
.h-form-row .h-form-item.no-label .h-form-item-content {
  margin-left: 0 !important;
}
.h-form-row .h-form-item.no-label.absolute {
  position: absolute;
  right: 0;
  bottom: 0;
}
.h-form-row .h-form-item.no-label .h-form-item-content .h-btn-blue-line i {
  display: inline-block;
  transform: rotate(0);
  -webkit-transform: rotate(0);
}
.h-form-row
  .h-form-item.no-label.absolute
  .h-form-item-content
  .h-btn-blue-line
  i {
  display: inline-block;
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
</style>
