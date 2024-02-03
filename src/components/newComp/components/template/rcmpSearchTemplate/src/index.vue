<template>
  <div>
    <div class="rcmp-search-template-other">
      <slot name="otherContent"></slot>
    </div>
    <h-row name="flex">
      <!--右侧数据展示表格-->
      <h-col span="24">
        <div>
          <!--数据展示表格-->
          <h-row>
            <h-col span="24">
              <div v-if="!onlyTable" style="position: relative;">
                <h-form
                  :model="form"
                  :label-width="labelWidth"
                  :cols="formCols"
                  :id="searchFormId"
                  ref="form"
                  class="rcmp-st-search-form"
                >
                  <slot :form="form" name="baseCondition"></slot>
                  <template v-if="moreCondition">
                    <slot :form="form" name="moreCondition"></slot>
                  </template>
                  <h-form-item
                    v-if="baseSearch"
                    :align="moreCondition || postionRight ? 'right' : 'left'"
                    :class="[
                      'no-label',
                      'no-label-button-group',
                      moreCondition || postionRight ? 'absolute' : ''
                    ]"
                  >
                    <h-button
                      :data-rightcode="btnRightCode.searchRightCode"
                      v-if="!searchBtnHidden"
                      :disabled="searchBtnDisabled"
                      type="primary"
                      @click="formSearch()"
                    >
                      {{ textInfo.search }}
                    </h-button>
                    <h-button
                      v-if="!resetBtnHidden"
                      type="ghost"
                      @click="formSearchReset()"
                    >
                      {{ textInfo.reset }}
                    </h-button>
                    <h-button
                      :data-rightcode="btnRightCode.searchRightCode"
                      v-if="hasMoreConditions"
                      type="text"
                      class="h-btn-blue-line rcmp-moreSearchBtn"
                      style="color: #4686F2"
                      @click="searchAdvanced()"
                    >
                      {{ moreConditionText }}
                      <h-icon :class="moreCondition ? 'more-conditions-icon-180' : 'more-conditions-icon-0'" name="unfold" style="margin: -1px" />
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
                :height="height"
                :noDataHeight="noDataHeight"
                :canDrag="canDrag"
                :disabledHover="disabledHover"
                :highlightRow="highlightRow"
                :rowSelect="rowSelect"
                :rowSelectOnly="rowSelectOnly"
                :rowClassName="rowClassName"
                :onDataText="onDataText"
                :noFilteredDataText="noFilteredDataText"
                :onRowClick="handlelRowClick"
                :onRowDbClick="onRowDbClick"
                :onCurrentChange="onCurrentChange"
                :onSelect="handlelRowSelect"
                :onSelectCancel="handleSelectCancel"
                :onSelectAll="onSelectAll"
                :onSelectChange="handleSelectChange"
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
                :filters="filters"
                :dataAggregateUrl="dataAggregateUrl"
                :aggregateInfoAttrs="aggregateInfoAttrs"
                :routerParams="routerParams"
                :baseServer="baseServer"
                :showExportBtnByUrl="showExportBtnByUrl"
                :exportFileName="exportFileName"
                :exportUrl="exportUrl"
                :exportDataByUrlBeforeFn="exportDataByUrlBeforeFn"
                :btnRightCode="btnRightCode"
                :showRefreshBtn="showRefreshBtn"
                :labelArgs="labelArgs"
                :queryParamTrim="queryParamTrim"
                :labelMapFormat="labelMapFormat"
                :labelQueryFormat="labelQueryFormat"
                :queryMapFormat="queryMapFormat"
                :onlyTable="onlyTable"
                :exportInfoList="exportInfoList"
                :exportHiddenCols="exportHiddenCols"
                :isHiddenColsSaveServer="isHiddenColsSaveServer"
                :isShowNoDataImg="isShowNoDataImg"
                :otherSearchParams="otherSearchParams"
                :isShowPagerForMoreOnePage="isShowPagerForMoreOnePage"
                :isNotHandleExportUrl="isNotHandleExportUrl"
                :exportDataSelfPromiseFn="exportDataSelfPromiseFn"
                ref="datagrid"
                @on-page-change-url="handlePageChange"
                @change-list="handleChangeList"
              >
                <div slot="toolbar" class="pull-left">
                  <slot name="opreBtns"></slot>
                  <h-button
                    v-if="advancedSearch"
                    type="text"
                    style="float: right; margin-right: 8px"
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
      <div slot="footer" style="text-align: right">
        <h-button
          v-if="!searchBtnHidden"
          type="primary"
          @click="formSearchAdvanced()"
        >
          {{ textInfo.search }}
        </h-button>
        <h-button
          v-if="!resetBtnHidden"
          type="ghost"
          @click="formSearchAdvancedReset()"
        >
          {{ textInfo.reset }}
        </h-button>
      </div>
    </h-msg-box>
  </div>
</template>
<script>
import rcmpDataGrid from '../../../comComponents/rcmpDataGrid';
import dataGridMixin from '../../../../mixins/dataGridMixin.js';
import searchTemplateMixin from '../../../../mixins/searchTemplateMixin.js';
import { getValueType, formatDate, getRandom } from '../../../../utils/utils';
import { handlePanelChange, on, off } from '../../../../utils/api/commonUtil';
export default {
  name: 'rcmpSearchTemplate',
  components: {
    rcmpDataGrid
  },
  mixins: [dataGridMixin, searchTemplateMixin],
  data() {
    return {
      moreCondition: false,
      moreConditionText: this.textInfo.more,
      form: {},
      advanceForm: {},
      searchMsgBoxModel: false,
      currentSelectRow: [],
      currentSelectList: [],
      currentSelectRowInx: [],
      postionRight: false,
      routerParams: {},
      searchBtnDisabled: false
    };
  },
  computed: {
    bindForm: {
      get() {
        return Object.assign(this.form, this.advanceForm);
      },
      set(newVal) {}
    },
    searchFormId() {
      return this.formId || `searchForm_${getRandom(16)}`;
    }
  },
  created() {
    // 获取路由传参
    this.routerParams = this.$route ? this.$route.query || {} : {};
    this.form = JSON.parse(JSON.stringify(this.formArgs));
    this.advanceForm = JSON.parse(JSON.stringify(this.advanceFormArgs));
    // 处理传参方式，考虑重置后跳转传参删除
    this.linkParamsDeal();
  },
  mounted() {
    if (this.isAutoHeight) {
      // console.log(1)
      this.handleResizeTemp();
      on(window, 'resize', this.handleResizeTemp);
    }
    const self = this;
    this.$nextTick(() => {
      const isFlag = self.$refs.form && self.$refs.form.$slots && self.$refs.form.$slots.default;
      self.postionRight = isFlag ? (self.$refs.form.$slots.default.length - 1) / 2 - 1 >= this.formCols : false;
    });
    // 查询未结束，查询按钮禁用
    this.$watch(() => {
      return this.$refs.datagrid.loadingData;
    }, (newVal, oldVal) => {
      this.searchBtnDisabled = newVal;
    }
    );
  },
  activated() {
    if (this.isAutoHeight) {
      this.handleResizeTemp();
      on(window, 'resize', this.handleResizeTemp);
    }
  },
  deactivated() {
    off(window, 'resize', this.handleResizeTemp);
  },
  beforeUpdate() {
    if (this.isAutoHeight) {
      this.handleResizeTemp();
    }
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
    formSearch(pageNum) {
      // 校验查询条件
      if (!this.checkBaseSearchForm(this.form)) {
        return;
      }
      this.currentSelectRow = [];
      this.currentSelectList = [];
      this.currentSelectRowInx = [];
      // 第二个参数用于当前查询是否日志留痕
      this.$refs.datagrid.dataChange(pageNum, true);
    },
    // 基本条件查询
    formSearchReset() {
      this.form = JSON.parse(JSON.stringify(this.formArgs));
      this.dealQueryParams();
      this.$refs.form.resetFields();
    },
    // 高级条件查询
    formSearchAdvanced() {
      // 校验查询条件
      if (!this.checkAdvancedSearchForm(this.advanceForm)) {
        return;
      }
      this.searchMsgBoxModel = false;
      this.currentSelectRow = [];
      this.currentSelectList = [];
      this.currentSelectRowInx = [];
      this.$refs.datagrid.dataChange(1, true);
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
      this.currentSelectList = selections;
      this.onSelect(selections, arr);
    },
    handlelRowClick(arr) {
      if (arr.length === 3) {
        // 行选中特殊赋值当前选中行，多选框选中已在handlelRowSelect中
        if (arr[2]) {
          this.currentSelectRow = arr[0];
        } else {
          if (this.currentSelectList.length > 0) {
            this.currentSelectRow = this.currentSelectList[0];
          } else {
            this.currentSelectRow = [];
          }
        }
      } else if (arr.length === 2) {
        // 兼容单选时候，仅仅点击前面的单选框不触发
        let falg = false;
        this.columns.forEach(one => {
          if (one.type === 'radio') {
            falg = true;
          }
        });
        if (falg) {
          this.currentSelectRow = arr[0];
        }
      }
      this.onRowClick(arr);
    },
    /** 动态监听form查询表单高度变化来自适应表格高度 */
    searchAdvanced() {
      this.moreCondition = !this.moreCondition;
      this.moreConditionText = this.moreCondition ? this.textInfo.simple : this.textInfo.more;
      const ref = this.$refs.datagrid;
      handlePanelChange(this.searchFormId, ref, this.searchFormId, this.formCols);
    },
    // 点击分页，恢复按钮初始状态
    handlePageChange(pageNo, pageSize) {
      this.resetSelectInfo();
      this.$emit('on-page-change')
    },
    resetSelectInfo() {
      this.currentSelectRow = [];
      this.currentSelectList = [];
      this.currentSelectRowInx = [];
      this.onSelectChange([]);
      this.searchCallBak();
    },
    handleResizeTemp() {
      this.$nextTick(() => {
        this.$refs.datagrid && this.$refs.datagrid.selfAdaption(this.searchFormId, this.formCols, ['tabsObj'], this.tableBoxId);
      });
    },
    // 默认处理页面跳转参数，特殊处理日期区间
    linkParamsDeal() {
      if (this.linkParamsDealFun) {
        // 若存在自定义的参数处理方式，直接用自定义的
        this.linkParamsDealFun();
      } else {
        this.dealQueryParams();
      }
    },
    // url的参数回显到搜索条件
    dealQueryParams() {
      if (!this.form.dateRange) {
        this.form.dateRange = ['', ''];
      }
      for (const attr in this.routerParams) {
        if (attr === 'begin_date') {
          this.form.dateRange[0] = formatDate(this.routerParams[attr], 'yyyy-MM-dd');
          this.form.begin_date = this.routerParams[attr];
        }
        if (attr === 'end_date') {
          this.form.dateRange[1] = formatDate(this.routerParams[attr], 'yyyy-MM-dd');
          this.form.end_date = this.routerParams[attr];
        }
        if (getValueType(this.form[attr]) === 'array') {
          this.routerParams[attr] = this.routerParams[attr] && this.routerParams[attr].split ? this.routerParams[attr].split(',') : [this.routerParams[attr]];
        }
      }
    },
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
/* lsq-1080 /deep/*/
.h-form-row .h-form-item.no-label /deep/ .h-form-item-content {
  margin-left: 0 !important;
}
.h-form-row
  .h-form-item.no-label.no-label-button-group
  /deep/
  .h-form-item-content {
  /* margin-left: 8px !important; */
  font-size: 0px;
}
.h-form-row
  .h-form-item.no-label.no-label-button-group
  /deep/
  .h-form-item-content
  button {
  vertical-align: top;
  margin-left: 8px;
}
.h-form-row
  .h-form-item.no-label.no-label-button-group
  /deep/ .h-form-item-content
  button:first-child {
  margin-left: 0px;
}
.h-form-row .h-form-item.no-label.absolute {
  /* lsq-1080 */
  /* position: absolute; */
  float: right;

  right: 0;
  bottom: 0;
}
.h-form-row .h-form-item.no-label .h-form-item-content .h-btn-blue-line i {
  display: inline-block;
  transform: rotate(0);
  -webkit-transform: rotate(0);

}
.h-form-row .h-form-item.no-label.absolute .h-form-item-content .h-btn-blue-line i {
  display: inline-block;
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
.h-form-row .h-form-item .h-form-item-content .h-btn-blue-line .more-conditions-icon-180 {
  display: inline-block;
  transform: rotate(180deg) !important;
  -webkit-transform: rotate(180deg) !important;
}
.h-form-row .h-form-item .h-form-item-content .h-btn-blue-line .more-conditions-icon-0 {
  display: inline-block;
  transform: rotate(0deg) !important;
  -webkit-transform: rotate(0deg) !important;
}
.rcmp-st-search-form {
  padding-bottom: 4px !important;
}
.rcmp-st-search-form /deep/ .h-form-item {
  padding-left: 8px !important;
}
.rcmp-st-search-form /deep/ .h-form-item .h-form-item-label {
  background-color: transparent !important;
}
</style>
