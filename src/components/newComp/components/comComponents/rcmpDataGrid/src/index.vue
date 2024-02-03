<template>
  <div class="h-datagrid">
    <div v-if="isShowTitle" ref="gridTitle" class="h-datagrid-title">
      <h4>
        <span>{{ title }}</span>
        <slot name="help-icon"></slot>
      </h4>
    </div>
    <div
      v-if="isShowToolBar"
      ref="gridToolbar"
      class="h-datagrid-toolbar"
      style="margin-top: 0"
    >
      <div class="h-datagrid-toolbar-left">
        <slot name="toolbar"></slot>
      </div>
      <div class="h-datagrid-toolbar-right">
        <div
          v-if="showListCkeckBox"
          :class="{ expandListBox: showMultiple }"
          ref="listCheckBox"
          class="pull-right"
        >
          <h-button
            type="ghost"
            class="h-btn-check"
            style="height: 28px"
            @click="handlemultiple"
          >
            <!-- icon="t-b-setting" -->
            <h-icon
              name="t-b-setting"
              size="16"
              style="margin-left: 0; margin-right: 4px; transform: none; transition: none"
            />
            <h-icon
              class="rcmp-data-grid-icon-unfold"
              name="unfold"
              size="16"
              style="margin-left: 0"
            />
          </h-button>
          <transition name="slide-up">
            <div v-show="showMultiple" class="h-table-checkBox-container" style="width: 120px">
              <h-checkbox-group
                v-model="checked"
                v-for="(item) in showCol"
                :key="`${item.key}`"
                class="h-table-checkBox-group"
                @on-change="checkAllGroupChange(item)"
              >
                <h-checkbox :label="item.key || item.type" :disabled="item.disabledCheck === true" class="h-table-checkBox">
                  <span class="h-table-checkBox-item">{{ item.title }}</span>
                </h-checkbox>
              </h-checkbox-group>
            </div>
          </transition>
        </div>
        <div
          v-if="showExportBtnByUrl"
          :data-rightcode="btnRightCode.exportRightCode"
          ref="exportBtnBox"
          class="pull-right"
          style="margin-right: 8px"
        >
          <h-dropdown trigger="click" placement="bottom-end" @on-visible-change="handleDropdownVisibleChange">
            <h-button type="ghost" class="h-btn-check" style="height: 28px">
              <i
                class="iconfont icon-t-b-download"
                style="font-size: 16px; margin-left: 0; margin-right: 4px; transform: none; transition: none"
              ></i>
              <h-icon
                :class="['rcmp-data-grid-icon-unfold', exportDropdownIconClass]"
                name="unfold"
                size="16"
                style="margin-left: 0"
              />
            </h-button>
            <h-dropdown-menu slot="list">
              <h-dropdown-item>
                <h-button type="text" style="padding: 0" @click="exportDataByUrl('all')">导出全部行</h-button>
              </h-dropdown-item>
              <h-dropdown-item>
                <h-button type="text" style="padding: 0" @click="exportDataByUrl('select')">导出选中行</h-button>
              </h-dropdown-item>
            </h-dropdown-menu>
          </h-dropdown>
        </div>
        <div
          v-if="showRefreshBtn"
          ref="refreshBtnBox"
          class="pull-right"
          style="margin-right: 8px"
        >
          <h-button
            class="h-btn-check"
            type="ghost"
            style="height: 28px"
            @click="formRefresh"
          >
            <h-icon name="refresh" size="16" style="margin-left: 0" />
          </h-button>
        </div>
      </div>

      <!-- <h-button type="ghost" icon="addition" @click="exportCsv()">{{$t('m.i.common.download')}}</h-button> -->
    </div>
    <!-- 树表格，适用于需要分页 -->
    <div v-if="tableType == 'table'">
      <div :ref="selfAdaptTable" class="h-table-box">
        <h-table
          :data="tData"
          :columns="columnsArray"
          :size="size"
          :border="border"
          :stripe="stripe"
          :show-header="showHeader"
          :width="width"
          :height="onlyTable ? 0 : fixedHeight"
          :canDrag="canDrag"
          :canMove="canMove"
          :clickToSelect="clickToSelect"
          :loading="!getHiddenColumnsFlag || loadingData"
          :disabled-hover="disabledHover"
          :highlight-row="highlightRow"
          :rowSelect="rowSelect"
          :rowSelectOnly="rowSelectOnly"
          :row-class-name="rowClassName"
          :no-data-text="onDataText"
          :patibleHeight="patibleHeight"
          :showTitle="tableShowTitle"
          :dataCheckedProp="dataCheckedProp"
          :noDataHeight="noDataHeight"
          ref="gridContent"
          @on-row-click="onRowClick"
          @on-row-dblclick="onRowDbClick"
          @on-current-change="onCurrentChange"
          @on-select="onSelect"
          @on-select-cancel="onSelectCancel"
          @on-select-all="onSelectAll"
          @on-selection-change="onSelectChange"
          @on-sort-change="onSortChange"
          @on-expand="onExpand"
          @on-scroll="onScroll"
          @on-move="onMove"
        >
          <div slot="nodata" class="table-no-data">
            <img v-if="isShowNoDataImg" :src="imgEmpty" style="width: 60px; height: 60px; display: block">
            <p style="line-height: 20px">{{ onDataText || "暂无数据" }}</p>
          </div>
        </h-table>
      </div>
      <div v-if="aggregateInfoAttrs.length" class="aggregateInfo">
        <div style="overflow: hidden; width: 100%">
          <span style="display: inline-block; padding: 0 8px; font-weight: bold">合计信息</span>
          <span v-for="attr in aggregateInfoAttrs" :key="attr.field" style="display: inline-block; padding: 0 10px">{{ attr.name }} : {{ aggregateInfos[attr.field] || "-" }}</span>
        </div>
      </div>
      <div class="h-table-pageView">
        <h-page
          v-if="isShowPagerBox"
          :current="pageInfo.page_num"
          :total="total"
          :page-size="pageInfo.page_size"
          :size="size"
          :placement="placement"
          :simple="simple"
          :show-total="showTotal"
          :show-elevator="showElevator"
          :show-sizer="showSizer"
          :pageSizeOpts="pageSizeOpts"
          :class-name="className"
          :styles="styles"
          ref="gridPage"
          @on-change="dataChange"
          @on-page-size-change="pageSizeChange"
        />
      </div>
    </div>
    <!-- 简单树表格，适用于不需要分页，大量数据 -->
    <div v-else>
      <div :ref="selfAdaptTable" class="h-table-box">
        <h-simple-table
          :data="tData"
          :columns="columnsArray"
          :size="size"
          :itemHeight="itemHeight"
          :border="border"
          :stripe="stripe"
          :show-header="showHeader"
          :width="width"
          :height="onlyTable ? 0 : fixedHeight"
          :canDrag="canDrag"
          :canMove="canMove"
          :clickToSelect="clickToSelect"
          :loading="!getHiddenColumnsFlag || loadingData"
          :disabled-hover="disabledHover"
          :highlight-row="highlightRow"
          :rowSelect="rowSelect"
          :rowSelectOnly="rowSelectOnly"
          :row-class-name="rowClassName"
          :no-data-text="onDataText"
          :dataCheckedProp="dataCheckedProp"
          :noDataHeight="noDataHeight"
          ref="simpleGridContent"
          @on-row-click="onRowClick"
          @on-row-dblclick="onRowDbClick"
          @on-current-change="onCurrentChange"
          @on-select="onSelect"
          @on-select-cancel="onSelectCancel"
          @on-select-all="onSelectAll"
          @on-selection-change="onSelectChange"
          @on-sort-change="onSortChange"
          @on-scroll="onScroll"
          @on-move="onMove"
        >
          <div slot="nodata" class="table-no-data">
            <img v-if="isShowNoDataImg" :src="imgEmpty" style="width: 60px; height: 60px; display: block">
            <p style="line-height: 20px">{{ onDataText || "暂无数据" }}</p>
          </div>
        </h-simple-table>
      </div>
      <div v-if="aggregateInfoAttrs.length" class="aggregateInfo">
        <div style="overflow: hidden; width: 100%">
          <span style="display: inline-block; padding: 0 8px; font-weight: bold">合计信息</span>
          <span v-for="attr in aggregateInfoAttrs" :key="attr.field" style="display: inline-block; padding: 0 10px">{{ attr.name }} : {{ aggregateInfos[attr.field] || "-" }}</span>
        </div>
      </div>
    </div>

    <h-msg-box
      v-model="exportLoadingMsgBoxShow"
      width="300px"
      title="导出提示"
      @on-close="closeExportMsgBox"
    >
      <div style="text-align: center">
        <h-icon
          name="load-c"
          size="18"
          color="#298dff"
          style="margin-right: 10px"
          class="demo-spin-icon-load"
        />正在导出请稍后
      </div>
      <div slot="footer">
        <h-button type="ghost" @click="cancelExportByUrl">取消导出</h-button>
        <h-button type="primary" @click="closeExportMsgBox">关闭</h-button>
      </div>
    </h-msg-box>
  </div>
</template>
<script>
import fetch from '../../../../utils/api/api.js';
import { deepClone } from '../../../../utils/api/commonUtil.js';
import dataGridMixin from '../../../../mixins/dataGridMixin.js';
import sha256 from '../../../../utils/sha256';
import { getValueType } from '../../../../utils/utils';
export default {
  name: 'rcmpDatagrid',
  mixins: [dataGridMixin],
  props: {
    routerParams: {
      type: Object,
      required: false,
      default: () => {}
    },
    bindForm: {
      type: Object,
      required: false,
      default: () => {}
    },
    gridKey: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      imgEmpty: require('./empty.svg'),
      exportDropdownIconClass: '',
      patibleHeight: true,
      selfHeight: 0,
      fixedHeight: this.height,
      tData: [],
      total: 0,
      dataInfo: {},
      pageInfo: {
        page_num: this.current || 1,
        page_size: this.page_size || 10
      },
      isShowTitle: this.hasTitle,
      isShowToolBar: this.hasToolBar,
      isShowPage: this.hasPage,
      loadingData: false, // 仅在url中生效，非URL在外部配置,
      showMultiple: false,
      checked: [],
      showCol: [],
      urlStr: '',
      columnsCodes: [], // 需要隐藏的列
      initColumns: [], // 初始化列数据
      aggregateInfos: {},
      sentReady: false,
      pageId: '',
      hiddenColumns: [], // 通过表格id获取表格需要隐藏的列
      getHiddenColumnsFlag: true, // 还在请求完毕的标识
      searchQueryArgs: {}, // 导出需要的参数
      exportLoading: false,
      exportLoadingMsgBoxShow: false,
      // 是否缓存列
      isStorageColumns: true,
      // 控制排序列
      sortCols: []
    };
  },
  computed: {
    // 表格展示列columns
    columnsArray() {
      if (!this.getHiddenColumnsFlag) {
        return [];
      }
      let newColumns = deepClone(this.columns).filter(item => !item.delCol);
      newColumns.forEach(item => {
        const key = this.getColumnKey(item);
        item.hiddenCol = this.columnsCodes.includes(key);
        item.disabledCheck = false;
      });
      if (this.isStorageColumns) {
        // 排序
        if (this.sortCols && this.sortCols.length > 0) {
          const map = {};
          this.sortCols.forEach((element, index) => {
            map[element] = index;
          });
          newColumns = newColumns.sort((a, b) => {
            return map[this.getColumnKey(a)] - map[this.getColumnKey(b)];
          });
        }
      }
      return newColumns;
    },
    // 导出url
    exportBusinessUrl() {
      if (this.exportUrl && !this.isNotHandleExportUrl) {
        const checkUrlArr = this.exportUrl.split('/');
        // 导出接口前加微服务，用于业务导出
        const microService = this.exportUrl.split('-')[1];
        checkUrlArr.splice(checkUrlArr.length - 1, 0, microService);
        return checkUrlArr.join('/');
      }
      return this.exportUrl ? this.exportUrl : '';
    },
    // 是否为反洗钱系统导出
    isAML() {
      const menuId = this.$route.meta.id;
      const amlApps = ['amlwl', 'amlcom', 'amlps', 'amlcrs', 'amlcp', 'amlci', 'amlls', 'amlra', 'amlrc'];
      const prefix = menuId.split('_')[0].toLowerCase();
      return amlApps.includes(prefix);
    },
    isShowPagerBox() {
      if (this.isShowPage) {
        if (this.isShowPagerForMoreOnePage) {
          return this.total > this.pageSize;
        }
        return true;
      }
      return false;
    }
  },
  watch: {
    columns: {
      handler() {
        this.getCurrentColumns();
      }
    },
    columnsArray: {
      deep: true,
      immediate: true,
      handler() {
        this.showCol = [];
        this.checked = [];
        this.columnsArray.forEach((value) => {
          const tempItem = JSON.parse(JSON.stringify(value));
          if (['selection', 'radio', 'expand'].indexOf(tempItem.type) > -1) {
            const label = {
              selection: '多选框',
              radio: '单选框',
              expand: '扩展菜单'
            };
            tempItem.title = label[tempItem.type];
            tempItem.key = tempItem.type;
          }
          if (!tempItem.delCol) {
            this.showCol.push(tempItem);
            if (!this.columnsCodes.includes(tempItem.key)) {
              this.checked.push(tempItem.key);
            }
          }
        });
      }
    },
    sortCols: {
      handler() {
        if (this.isStorageColumns) {
          this.saveColumnInfoStorage({
            sortCols: this.sortCols
          });
        }
      }
    },
    columnsCodes() {
      if (this.isStorageColumns) {
        this.saveColumnInfoStorage({
          hiddenCols: this.columnsCodes
        });
      }
    },
    selfHeight(val) {
      this.selfHeight = val;
    },
    current(val) {
      this.pageInfo.page_num = val;
    },
    pageSize(val) {
      this.pageInfo.page_size = val;
    },
    gridData: {
      handler(newValue, oldValue) {
        if (newValue && newValue[this.property.rows] && newValue[this.property.rows].length > 0) {
          this.tData = newValue[this.property.rows];
        } else {
          this.tData = [];
        }
        if (this.hasPage) {
          if (newValue && newValue[this.property.total]) {
            this.total = newValue[this.property.total];
          } else {
            this.total = 0;
          }
        }
      },
      deep: true
    },
    loading(val) {
      this.loadingData = val;
    }
  },
  created() {
    this.pageId = (this.$route.meta && this.$route.meta.tempMenuTplId) ? this.$route.meta.tempMenuTplId : (this.$route.meta.id || '');
    this.isStorageColumns = window.FRAME_CONFIG.IS_STORAGE_COLUMNS !== false;
    this.getCurrentColumns();
  },
  mounted() {
    if (this.autoLoad) {
      this.getDataList(1, 10, undefined, true);
    } else {
      if (this.gridData) {
        this.setGridData();
      }
    }
    if (!this.$slots.toolbar) {
      this.isShowToolBar = false;
    } else {
      // 显示操作列时，执行按钮权限代码
      this.hideDomByRightCode();
    }
    // this.$nextTick(() => this.selfAdaption())
  },
  beforeDestroy() {
    // 在组件生命周期结束的时候销毁。
    document.body.removeEventListener('click', this.bodyClick, false);
  },
  methods: {
    getHashKeyByColumns() {
      let keys = '';
      if (this.gridKey) {
        keys = this.pageId + '_columns_' + this.gridKey;
      } else {
        keys = this.pageId + '_columns_' + this.getColumnsMap().sort().join(',');
      }
      return sha256(keys);
    },
    getHiddenKey() {
      return this.columns.filter(item => item.hiddenCol).map(item => this.getColumnKey(item));
    },
    getColumnKey(column) {
      if (column.title === '操作') {
        return 'action';
      }
      return column.key || column.type;
    },
    getColumnsMap() {
      return this.columns.map(item => this.getColumnKey(item));
    },
    saveColumnInfoStorage(info) {
      info = {
        ...this.getColumnInfoStorage(),
        ...info
      };
      localStorage.setItem(this.girdColumnsKey, JSON.stringify(info));
    },
    getColumnInfoStorage() {
      return JSON.parse(localStorage.getItem(this.girdColumnsKey) || '{}');
    },
    handleDropdownVisibleChange(val) {
      this.exportDropdownIconClass = val ? 'rcmp-datagrid-unfold-icon' : '';
    },
    onMove(prev, index) {
      if (!this.isStorageColumns) { return; }
      const showColumns = this.columnsArray.filter(item => !item.hiddenCol);
      const first = this.columnsArray.findIndex(item => this.getColumnKey(item) === this.getColumnKey(showColumns[prev]));
      const second = this.columnsArray.findIndex(item => this.getColumnKey(item) === this.getColumnKey(showColumns[index]));
      this.sortCols.splice(second, 0, this.sortCols.splice(first, 1)[0]);
    },
    getCurrentColumns() {
      if (!this.columns || this.columns.length === 0) return;
      if (this.isStorageColumns) {
        this.girdColumnsKey = this.getHashKeyByColumns();
        // 将来改成调用接口
        const { sortCols, hiddenCols } = this.getColumnInfoStorage();
        // 如果缓存中没值，需要设置默认的缓存
        this.sortCols = sortCols || [];
        this.columnsCodes = hiddenCols || [];

        // 如果sortCols没有值，需要计算
        if (this.sortCols.length === 0) {
          this.sortCols = this.getColumnsMap();
          this.columnsCodes = this.getHiddenKey();
        }
      } else {
        this.sortCols = this.getColumnsMap();
        this.columnsCodes = this.getHiddenKey();
      }
    },
    dealKey(columnName) {
      let result = '';
      let upcaseFlag = false;
      if (!columnName || columnName === '') return columnName;
      for (let i = 0; i < columnName.length; i++) {
        const ch = columnName[i];
        if (ch === '_') {
          upcaseFlag = true;
          continue;
        } else if (upcaseFlag) {
          result += ('' + ch).toUpperCase();
          upcaseFlag = false;
        } else {
          result += ch;
          upcaseFlag = false;
        }
      }
      return result;
    },
    hideDomByRightCode() {
      let pageCode = (this.$route.meta && this.$route.meta.tempMenuTplId) ? this.$route.meta.tempMenuTplId : (this.$route.meta.id || '');

      const rightcodeObj = window.FRAME_CONFIG.rightcodeObj || window.LOCAL_CONFIG.rightcodeObj || {};
      if (!rightcodeObj || Object.keys(rightcodeObj).length === 0) {
        return;
      }

      // 下划线转驼峰
      if (window.LOCAL_CONFIG.isUnderscore + '' === 'true') {
        pageCode = this.dealKey(pageCode);
      }
      const rightCodeList = rightcodeObj[pageCode] || [];
      const AllDom = this.$el.querySelectorAll('*[data-rightcode]');
      const AllDomLength = AllDom.length;
      for (let i = 0; i < AllDomLength; i++) {
        const dom = AllDom[i];
        let rightcode = dom.dataset.rightcode || '';

        // // 一个按钮绑定多个编号，以$隔开
        if (rightcode) {
          rightcode = rightcode.split('$');
          if (rightcode.length > 0) {
            for (let j = 0; j < rightcode.length; j++) {
              const code = rightcode[j];
              if (rightCodeList.indexOf(code) === -1) {
                dom.style.display = 'none';
                break;
              }
            }
          }
        }
      }
    },
    getDataListByUrl(isRemains) {
      // 是否有分页存在
      this.loadingData = true;
      this.urlStr = this.url + '?time=' + new Date().getTime();
      if (this.hasPage) {
        const query = JSON.parse(JSON.stringify(this.pageInfo));

        Object.assign(query, this.bindForm);
        let newParams = JSON.parse(JSON.stringify(query));
        this.sentReady ? '' : Object.assign(newParams, this.routerParams); // 跳转带参数，第一次请求夹带跳转参数
        newParams.formatter = this.filters;
        // 点击查询时，添加日志留痕参数
        if (isRemains && Object.keys(this.labelArgs).length > 0) {
          const queryList = this.labelArgs.column_list.filter((one) => {
            const key = Object.keys(one)[0];
            if (Array.isArray(this.bindForm[key])) {
              return this.bindForm[key].length > 0;
            }
            return this.bindForm[key] && this.bindForm[key] != '';
          });
          // 参数有不为空时，传参
          if (queryList.length) {
            newParams.op_log_content = this.labelArgs;
          }
        }
        // 反洗钱日志留痕
        const queryFormInfo = this.getQueryMapFormat();
        if (queryFormInfo.length > 0) {
          newParams.query_form_info = queryFormInfo;
        }
        const querySearchInfo = this.getQuerylist();
        if (Object.keys(querySearchInfo).length > 0) {
          newParams.op_log_content = querySearchInfo;
        }
        for (const attr in newParams) {
          if (newParams[attr] instanceof Array && newParams[attr].length === 0) {
            delete newParams[attr];
          }
        }
        // 如果配置左右去空格属性，对于字符串类型的查询条件去左右空格
        if (this.queryParamTrim) {
          for (const attr in newParams) {
            if (typeof newParams[attr] === 'string') {
              newParams[attr] = newParams[attr].trim();
            }
          }
        }
        const that = this;
        newParams.form_id = this.pageId || '';
        newParams.menu_code = this.pageId || ''; // 用于记录日志
        newParams = {
          ...newParams,
          ...(this.otherSearchParams || {})
        };
        this.searchQueryArgs = newParams;
        fetch[this.requestType](this.urlStr, newParams)
          .then((res) => {
            this.sentReady = true;
            if (res) {
              // token过期判定
              // this.loadingData = false;
              if (res.data.error_code) {
                this.$hMessage.error(res.data.error_message || '获取数据失败！');
                this.tData = [];
                this.total = 0;
                this.loadingData = false;
                return;
              }
              if (
                res[this.property.responseType][this.property.responseInfo][this.property.total] &&
								res[this.property.responseType][this.property.responseInfo][this.property.total] > 0 &&
								res[this.property.responseType][this.property.responseInfo][this.property.rows]
              ) {
                this.tData = res[this.property.responseType][this.property.responseInfo][this.property.rows];
                this.total = res[this.property.responseType][this.property.responseInfo][this.property.total];
                this.loadingData = false;
                this.$emit('onTableData', this.tData);
                // setTimeout(() => {
                //   this.hideDomByRightCode();
                // });
              } else {
                if (res.data.error_code) {
                  this.$hMessage.error(res.data.error_message || '获取数据失败！');
                }
                this.tData = [];
                this.total = 0;
                this.loadingData = false;
              }
              that.$nextTick(() => {
                that.dispatch('curpage', 'successDatagridLoad', this.tData, this.total);
              });
            } else {
              this.loadingData = false;
              this.tData = [];
            }
          })
          .catch(() => {
            this.loadingData = false;
          });
        this.loadAggregateInfo(newParams);
      } else {
        const query = JSON.parse(JSON.stringify(this.bindForm));
        const newParams = JSON.parse(JSON.stringify(query));
        this.sentReady ? '' : Object.assign(newParams, this.routerParams); // 跳转带参数，第一次请求夹带跳转参数
        newParams.formatter = this.filters;

        // 点击查询时，添加日志留痕参数
        if (isRemains && Object.keys(this.labelArgs).length > 0) {
          const queryList = this.labelArgs.column_list.filter((one) => {
            const key = Object.keys(one)[0];
            if (Array.isArray(this.bindForm[key])) {
              return this.bindForm[key].length > 0;
            }
            return this.bindForm[key] && this.bindForm[key] != '';
          });
          // 参数有不为空时，传参
          if (queryList.length) {
            newParams.op_log_content = this.labelArgs;
          }
        }
        for (const attr in newParams) {
          if (newParams[attr] instanceof Array && newParams[attr].length === 0) {
            delete newParams[attr];
          }
        }
        // 反洗钱日志留痕
        const queryFormInfo = this.getQueryMapFormat();
        if (queryFormInfo.length > 0) {
          newParams.query_form_info = queryFormInfo;
        }
        const that = this;
        newParams.form_id = this.pageId || '';
        newParams.menu_code = this.pageId || ''; // 用于记录日志
        this.searchQueryArgs = newParams;
        fetch[this.requestType](this.urlStr, newParams)
          .then((res) => {
            this.loadingData = false;
            if (res.data.error_code) {
              this.$hMessage.error(res.data.error_message || '获取数据失败！');
            }
            this.sentReady = true;
            if (res && res[this.property.responseType] && res[this.property.responseType][this.property.responseInfo]) {
              this.loadingData = false;
              if (
                res[this.property.responseType][this.property.responseInfo] &&
								res[this.property.responseType][this.property.responseInfo].length > 0
              ) {
                this.tData = res[this.property.responseType][this.property.responseInfo];
              } else {
                this.tData = [];
              }
              that.$nextTick(() => {
                that.dispatch('curpage', 'successDatagridLoad');
              });
              this.$emit('onTableData', this.tData);
              // setTimeout(() => {
              //   this.hideDomByRightCode();
              // });
            } else {
              this.loadingData = false;
              this.tData = [];
            }
          })
          .finally(() => {
            this.loadingData = false;
          });
        this.loadAggregateInfo(newParams);
      }
    },
    // 加载合计信息
    loadAggregateInfo(params) {
      if (this.dataAggregateUrl) {
        fetch['post'](this.dataAggregateUrl, params).then((res) => {
          if (res.data.error_code) {
            this.$hMessage.error(res.data.error_message || '获取数据失败！');
          }
          const response = res.result || {};
          this.aggregateInfoAttrs.forEach((attr) => {
            this.aggregateInfos[attr.field] = response[attr.field] || '-';
          });
        });
      }
    },
    // 赋值
    setGridData() {
      if (this.gridData[this.property.rows]) {
        this.loadingData = this.loading;
        this.tData = this.gridData[this.property.rows];
      }
      if (this.hasPage) {
        if (this.gridData[this.property.total]) {
          this.loadingData = this.loading;
          this.total = this.gridData[this.property.total];
        }
      }
    },
    getDataList(pageNo, pageSize, type, isRemains) {
      pageNo = pageNo || this.pageInfo.page_num;
      pageSize = pageSize || this.pageInfo.page_size;
      if (this.url) {
        this.getDataListByUrl(isRemains);
        this.$emit('on-page-change-url', pageNo, pageSize); // 点击分页时，传递事件
      } else if (this.getDataFunc) {
        if (this.hasPage) {
          this.getDataFunc();
          this.$emit('on-page-change', pageNo, pageSize, type);
        } else {
          this.$emit('get-data');
        }
      } else {
        this.$emit('on-page-change', pageNo, pageSize);
        // this.setGridData()
      }
    },
    // 点击上一页
    dataChange(i, isRemains, type) {
      // isRemains 用于查询是否日志留痕
      this.pageInfo.page_num = i || this.pageInfo.page_num;
      this.getDataList(i, this.pageInfo.page_size, type || 'pageChg', isRemains);
      this.$emit('change-list');
    },
    // 页码改变
    pageSizeChange(i) {
      this.pageInfo.page_size = i;
      if (this.pageInfo.page_num == 1) {
        this.dataChange(1, false, 'sizeChg');
      }
    },
    formRefresh() {
      this.getDataList(this.pageInfo.page_num, this.pageInfo.page_size);
    },
    // 反选某行的选中状态，仅多选
    toggleTableSelect(index) {
      if (this.$refs.gridContent.selectType) {
        this.$refs.gridContent.toggleSelect(index);
      } else {
        this.$hMessage.info({
          content: '仅支持表格多选',
          duration: 3,
          closable: true
        });
      }
    },
    // 表格导出功能
    exportCsv(params) {
      this.$refs.gridContent.exportCsv(params);
    },
    bodyClick(event) {
      // 实现点击页面空白地方使自定义列表项div消失
      const _this = this;
      if (!!_this.$refs.listCheckBox && !!_this.$refs.listCheckBox.contains(event.target)) {
        return;
      }
      _this.showMultiple = false;
    },
    // 显示多选框
    handlemultiple() {
      this.showMultiple = !this.showMultiple;
      document.body.addEventListener('click', this.bodyClick, false);
    },
    // 通过url导出
    async exportDataByUrl(type) {
      if (this.isAML) {
        try {
          await this.rcmpCommonFun.checkLogin();
        } catch (err) {
          return;
        }
      }
      const isPromiseForExportDataFn = this.exportDataSelfPromiseFn && getValueType(this.exportDataSelfPromiseFn) === 'function';
      if (isPromiseForExportDataFn) {
        const curSelectData = (this.$refs.gridContent && this.$refs.gridContent.getSelection()) || (this.$refs.simpleGridContent && this.$refs.simpleGridContent.getSelection()) || [];
        if (type === 'select' && !curSelectData.length) {
          this.$hMessage.warning('请选择需要导出的数据！');
          return;
        }
        try {
          this.exportLoadingMsgBoxShow = true;
          this.exportDataSelfPromiseFn(type, curSelectData).finally(_ => {
            this.exportLoadingMsgBoxShow = false;
          });
        } catch (e) {
          this.exportLoadingMsgBoxShow = false;
          // eslint-disable-next-line no-console
          console.log('%c 自定义导出函数必须为Promise类型', 'color: #fff; border-radius: 3px; padding: 3px 7px;background: linear-gradient(315deg, #fc5c7d 0%, #6a82fb 74%)');
          // eslint-disable-next-line no-console
          console.log(`%c ${e}`, 'color: #fff; border-radius: 3px; padding: 3px 7px;background: #ff0000');
        }
        return;
      }
      // 反洗钱导出特殊处理
      if (type == 'all' && this.isAML) {
        const dataNumber = await this.exportNumber();
        if (dataNumber === null) {
          this.$hMessage.warning('当前导出数据有问题，请稍后重试！');
          return;
        } else if (dataNumber === 0) {
          this.$hMessage.warning('导出数据0条，请选择后再导出！');
          return;
        } else if (dataNumber > 100000) {
          this.$hMessage.warning('当前导出数据量超过十万条，数据量过大，请筛选数据后重试！');
          return;
        }
      }
      // type:all select
      if (!this.exportDataByUrlBeforeFn(this, type)) {
        return;
      }
      if (!this.exportUrl) {
        this.$hMessage.warning('导出接口未配置！');
        return;
      }
      let selectData = [];
      if (this.$refs.gridContent) {
        selectData = this.$refs.gridContent.getSelection();
      } else if (this.$refs.simpleGridContent) {
        selectData = this.$refs.simpleGridContent.getSelection();
      }
      if (type === 'select' && !selectData.length) {
        this.$hMessage.warning('请选择需要导出的数据！');
        return;
      }
      // 页面未默认查询时,导出时把参数带入
      if (!this.autoLoad && !this.sentReady) {
        let query;
        if (this.hasPage) {
          query = JSON.parse(JSON.stringify(this.pageInfo));
          Object.assign(query, this.bindForm);
        } else {
          query = JSON.parse(JSON.stringify(this.bindForm));
        }
        const newParams = JSON.parse(JSON.stringify(query));
        Object.assign(newParams, this.routerParams); // 跳转带参数，第一次请求夹带跳转参数
        newParams.formatter = this.filters;
        for (const attr in newParams) {
          if (newParams[attr] instanceof Array && newParams[attr].length === 0) {
            delete newParams[attr];
          }
        }
        newParams.form_id = this.pageId || '';
        newParams.menu_code = this.pageId || ''; // 用于记录日志
        // 如果配置左右去空格属性，对于字符串类型的查询条件去左右空格
        if (this.queryParamTrim) {
          for (const attr in newParams) {
            if (typeof newParams[attr] === 'string') {
              newParams[attr] = newParams[attr].trim();
            }
          }
        }
        this.searchQueryArgs = newParams;
      }
      this.searchQueryArgs.export_code = this.btnRightCode.exportRightCode;
      const obj = {
        exportDataList: type === 'select' ? selectData : [],
        queryArgs: this.searchQueryArgs,
        resourceUrl: this.url,
        columns: [],
        title: this.exportFileName || (this.$route.name && this.$route.name.trim()) || '导出数据',
        columnMap: this.labelMapFormat // 查询条件翻译成中文
      };
      if (this.exportInfoList && this.exportInfoList.length > 0) { // 多个tab合并导出参数组合
        obj['exportInfoList'] = this.exportInfoList;
      }
      // 导出的列中不能有复选框和单选框、序号（index）,操作列
      obj.columns = this.columnsArray.filter((column) => {
        const isExist = column && column.key && column.title;
        const flag1 = column.key !== 'action' && column.title !== '操作';
        const flag2 = ['index', 'radio', 'selection'].indexOf(column.type) === -1 && !column.hiddenCol;
        const flag3 = this.exportHiddenCols && !this.exportHiddenCols.includes(column.key);
        return (isExist && flag1 && flag2 && flag3);
      });
      this.exportLoadingMsgBoxShow = true;
      // 发起导出请求
      this.getDownByUrl(obj);
    },
    // 反洗钱日志留痕参数
    getQueryMapFormat() {
      const columnsMap = [];
      if (Object.keys(this.labelMapFormat).length > 0) {
        const keyArr = Object.keys(this.queryMapFormat);
        this.labelMapFormat.forEach((item) => {
          const key = Object.keys(item)[0];
          if (keyArr.indexOf(key) > -1) {
            columnsMap.push({ key: key, name: item[key], value: this.queryMapFormat[key] });
          } else {
            let value = '';
            if (Array.isArray(this.bindForm[key]) && this.bindForm[key].length === 0) {
            } else {
              value = this.bindForm[key];
            }
            columnsMap.push({ key: key, name: item[key], value: value });
          }
        });
      }
      return columnsMap;
    },
    // 反洗钱查询操作日志留痕
    getQuerylist() {
      return this.labelQueryFormat;
    },
    // 轮询验证文件是否生成
    intervalDownByUrl(filename, waitSeconds) {
      fetch({
        url: this.exportBusinessUrl + '/canDownload',
        method: 'get',
        params: {
          file_name: filename
        },
        noFormat: true,
        responseType: 'json'
      })
        .then((result) => {
          if (result.data.error_code || result.data.errorCode) {
            this.exportLoadingMsgBoxShow = false;
            this.$hMessage.error(result.data.error_message || result.data.errorMessage || '导出失败！');
            return;
          }
          if (result.data.result.exportResult == 'wait' || result.data.result.export_result == 'wait') {
            // 文件生成未结束，定时请求验证文件是否生成好
            if (this.exportLoading) {
              setTimeout(() => {
                const _waitSeonds = waitSeconds ? (waitSeconds < 12000 ? waitSeconds + 1000 : 12000) : 1000;
                this.intervalDownByUrl(filename, _waitSeonds);
              }, waitSeconds || 1000);
            }
          } else {
            this.exportLoadingMsgBoxShow = false;
            const anchor = document.createElement('a');
            anchor.href = this.exportBusinessUrl + '/download?file_name=' + filename;
            anchor.setAttribute('download', '');
            anchor.click();
          }
        }).finally(_ => {
          this.exportLoadingMsgBoxShow = false;
        });
    },
    // 发起导出请求
    getDownByUrl(obj) {
      fetch({
        url: this.exportBusinessUrl,
        method: 'post',
        data: obj,
        noFormat: true,
        responseType: 'json'
      }).then((result) => {
        if (result.data.error_code || result.data.errorCode) {
          this.exportLoadingMsgBoxShow = false;
          this.$hMessage.error(result.data.error_message || result.data.errorMessage || '不能导出！');
          return;
        }
        // 轮询验证文件是否生成
        this.exportLoading = true;
        this.intervalDownByUrl(result.data.result.filename);
      }).finally(_ => {
        this.exportLoadingMsgBoxShow = false;
      });
    },
    dataURLtoBlob(base64Str) {
      const bstr = atob(base64Str);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: 'application/vnd.ms-excel' });
    },
    // 反洗钱5.0系统导出数量大于10万时，禁止导出
    exportNumber() {
      let query;
      if (this.hasPage) {
        query = JSON.parse(JSON.stringify(this.pageInfo));
        query.page_num = 1;
        query.page_size = 10;
        Object.assign(query, this.routerParams, this.bindForm);
      } else {
        query = Object.assign({}, this.routerParams, this.bindForm);
      }
      const newParams = JSON.parse(JSON.stringify(query));
      newParams.formatter = this.filters;
      for (const attr in newParams) {
        if (newParams[attr] instanceof Array && newParams[attr].length === 0) {
          delete newParams[attr];
        }
      }
      newParams.form_id = this.pageId || '';
      newParams.menu_code = this.pageId || ''; // 用于记录日志
      // 如果配置左右去空格属性，对于字符串类型的查询条件去左右空格
      if (this.queryParamTrim) {
        for (const attr in newParams) {
          if (typeof newParams[attr] === 'string') {
            newParams[attr] = newParams[attr].trim();
          }
        }
      }
      return new Promise((resolve) => {
        fetch[this.requestType](this.urlStr, newParams)
          .then((res) => {
            this.sentReady = true;
            if (res) {
              // token过期判定
              // this.loadingData = false;
              if (res.data.error_code) {
                resolve(null);
                return;
              }
              if (
                res[this.property.responseType][this.property.responseInfo][this.property.total] &&
								res[this.property.responseType][this.property.responseInfo][this.property.total] > 0
              ) {
                resolve(res[this.property.responseType][this.property.responseInfo][this.property.total]);
              } else {
                resolve(0);
              }
            } else {
              resolve(null);
            }
          })
          .catch(() => {
            resolve(null);
          });
      });
    },
    // 取消导出
    cancelExportByUrl() {
      this.exportLoading = false;
      this.exportLoadingMsgBoxShow = false;
    },
    // 关闭弹框
    closeExportMsgBox() {
      this.exportLoadingMsgBoxShow = false;
      this.$hMessage.info('导出任务仍继续在后台执行');
    },
    // 控制列显示隐藏
    checkAllGroupChange(item) {
      // 直接修改隐藏的数组即可
      const key = this.getColumnKey(item);
      if (this.columnsCodes.includes(key)) {
        this.columnsCodes = this.columnsCodes.filter(v => v !== key);
      } else {
        this.columnsCodes.push(key);
      }
    },
    getTableDomInfo(formId, curBoxId) {
      const curBoxIdDom = curBoxId ? document.getElementById(curBoxId) : '';

      const searchF = curBoxIdDom ? typeof curBoxIdDom.querySelector(`#${formId}`) : typeof window.document.getElementById(formId);
      const hasTabs = curBoxIdDom ? typeof curBoxIdDom.getElementsByClassName('h-tabs-bar')[0] : typeof window.document.getElementsByClassName('h-tabs-toolbar')[0];
      const hasTableTopTabs = curBoxIdDom ? typeof curBoxIdDom.getElementsByClassName('h-tabs-bar')[0] : typeof window.document.getElementsByClassName('h-tabs-bar')[0];
      const otherCon = curBoxIdDom ? typeof curBoxIdDom.getElementsByClassName('rcmp-search-template-other')[0] : typeof window.document.getElementsByClassName('rcmp-search-template-other')[0];
      const mulitiTabs = curBoxIdDom ? typeof curBoxIdDom.getElementsByClassName('mulitiTab')[0] : typeof window.document.getElementsByClassName('mulitiTab')[0];
      const hasPanel = curBoxIdDom ? typeof curBoxIdDom.getElementsByClassName('h-panel')[0] : typeof window.document.getElementsByClassName('h-panel')[0];

      let objects = {
        searchForm: searchF === 'undefined' ? 'undefined' : window.document.getElementById(formId),
        panelObj: hasPanel === 'undefined' ? 'undefined' : window.document.getElementsByClassName('h-panel')[0],
        tabsObj: hasTabs === 'undefined' ? 'undefined' : window.document.getElementsByClassName('h-tabs-toolbar')[0],
        tableTopObj: hasTableTopTabs === 'undefined' ? 'undefined' : window.document.getElementsByClassName('h-tabs-bar')[0],
        otherCon: otherCon === 'undefined' ? 'undefined' : window.document.getElementsByClassName('rcmp-search-template-other')[0],
        mulitiTabs: mulitiTabs === 'undefined' ? 'undefined' : window.document.getElementsByClassName('mulitiTab')[0],
        titleObj: this.isShowTitle ? window.document.getElementsByClassName('h-datagrid-title')[0] : 'undefined',
        toolbarObj: this.isShowToolBar ? window.document.getElementsByClassName('h-datagrid-toolbar')[0] : 'undefined',
        pageObj: this.isShowPage ? window.document.getElementsByClassName('h-table-pageView')[0] : 'undefined',
        aggregateInfoObj: this.aggregateInfoAttrs.length > 0 ? window.document.getElementsByClassName('aggregateInfo')[0] : 'undefined'
      };
      if (curBoxIdDom) {
        objects = {
          searchForm: searchF === 'undefined' ? 'undefined' : curBoxIdDom.querySelector(`#${formId}`),
          panelObj: hasPanel === 'undefined' ? 'undefined' : window.document.getElementsByClassName('h-panel')[0],
          tabsObj: hasTabs === 'undefined' ? 'undefined' : curBoxIdDom.getElementsByClassName('h-tabs-toolbar')[0],
          tableTopObj: hasTableTopTabs === 'undefined' ? 'undefined' : curBoxIdDom.getElementsByClassName('h-tabs-bar')[0],
          otherCon: otherCon === 'undefined' ? 'undefined' : curBoxIdDom.getElementsByClassName('rcmp-search-template-other')[0],
          mulitiTabs: mulitiTabs === 'undefined' ? 'undefined' : curBoxIdDom.getElementsByClassName('mulitiTab')[0],
          titleObj: this.isShowTitle ? curBoxIdDom.getElementsByClassName('h-datagrid-title')[0] : 'undefined',
          toolbarObj: this.isShowToolBar ? curBoxIdDom.getElementsByClassName('h-datagrid-toolbar')[0] : 'undefined',
          pageObj: this.isShowPage ? curBoxIdDom.getElementsByClassName('h-table-pageView')[0] : 'undefined',
          aggregateInfoObj: this.aggregateInfoAttrs.length > 0 ? curBoxIdDom.getElementsByClassName('aggregateInfo')[0] : 'undefined'
        };
      }
      return objects;
    },
    // 计算表格高度
    calculateHeight(formId, ignoreList, curBoxId) {
      const appObj = document.getElementsByClassName('h-layout-content');
      const noticeObj = document.getElementsByClassName('h-notice-bar');
      const noticeClientHeight = noticeObj.length === 0 ? 0 : noticeObj[0].clientHeight;
      const appOffsetTop = appObj.length === 0 ? 0 : appObj[0].offsetTop + 8;
      // 动态计算各项高度
      const objects = this.getTableDomInfo(formId, curBoxId);

      let extralHeight = 0;
      Object.keys(objects).forEach(function(key, index) {
        if (objects[key] && objects[key] !== 'undefined' && (!ignoreList || !ignoreList.includes(key))) {
          extralHeight += objects[key].clientHeight;
          if (key === 'mulitiTabs') {
            extralHeight -= 16;
          }
          if (key === 'tableTopObj') {
            extralHeight += 5;
          }
        }
      });
      window.sessionStorage.removeItem('hFormitemLength');
      let themeDiffHeight = 36;
      if (document.getElementsByTagName('html')[0].className === 'uf3') {
        themeDiffHeight = 20;
      }
      let boxHeight = window.innerHeight;
      if (curBoxId) {
        const curTableBoxDom = window.document.getElementById(curBoxId);
        boxHeight = curTableBoxDom ? curTableBoxDom.offsetHeight : 0;
        return this.onlyTable ? 300 : boxHeight - extralHeight - themeDiffHeight - 15 + this.occupyHight;
      }
      return this.onlyTable ? 300 : window.innerHeight - extralHeight - appOffsetTop - noticeClientHeight - themeDiffHeight - 15 + this.occupyHight;
    },
    // 表格自适应
    selfAdaption(formId, colsNum, ignoreList, curBoxId) {
      formId = formId || 'mainSearch';
      if (document.getElementById(formId)) {
        const num = colsNum || 4;
        const obj = document.getElementById(formId);
        const children = obj.getElementsByClassName('h-form-item');
        let counts = 0;
        if (children.length % num === 0) {
          counts = children.length / num;
        } else {
          counts = Math.ceil(children.length / num);
        }
        // lsq-1080
        obj.style.height = counts * 36 + 'px';
      }
      if (this.$refs[this.selfAdaptTable] && !this.onlyTable) {
        this.$nextTick(_ => {
          this.selfHeight = this.calculateHeight(formId, ignoreList, curBoxId);
          this.fixedHeight = this.selfHeight;
          if (this.selfHeight > 50) {
            this.$refs[this.selfAdaptTable].style.height = this.selfHeight.toString() + 'px';
          }
        });
      }
    },
    // 表格自适应
    selfAdaption1(formId, colsNum, curBoxId) {
      formId = formId || 'mainSearch';
      if (document.getElementById(formId)) {
        const num = colsNum || 4;
        const obj = document.getElementById(formId);
        const children = obj.getElementsByClassName('h-form-item');
        let counts = 0;
        if (children.length % num === 0) {
          counts = children.length / num;
        } else {
          counts = Math.ceil(children.length / num);
        }
        obj.style.height = counts * 36 + 'px';
      }
      if (this.$refs[this.selfAdaptTable] && !this.onlyTable) {
        this.selfHeight = this.calculateHeight(formId, [], curBoxId);
        this.fixedHeight = this.selfHeight;
        if (this.selfHeight > 50) {
          this.$refs[this.selfAdaptTable].style.height = this.selfHeight.toString() + 'px';
        } else {
        }
        // this.$refs[this.selfAdaptTable].style.height = this.selfHeight.toString()+'px'
      }
    }
  }
};
</script>
<style scoped>
>>> .h-table .h-table-body .h-table-row .h-table-cell {
  line-height: 20px;
}
</style>
<style>
.table-no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.h-datagrid .h-datagrid-toolbar {
	padding: 0 0 8px 0;
	min-height: 36px;
	border-width: 1px 1px 0;
}
.h-datagrid .h-table-checkBox-container {
	position: absolute;
	padding: 5px 0px;
	right: 0px;
	border-radius: 5px;
	max-height: 200px;
	width: 130px;
	overflow: auto;
	z-index: 9999;
}

.h-datagrid .h-table-checkBox-container .h-table-checkBox-group {
	width: 120px;
	padding: 5px 10px 5px 10px;
	white-space: nowrap;
}
.h-datagrid .h-table-checkBox-container .h-table-checkBox-group .h-table-checkBox .h-table-checkBox-item {
	display: inline-block;
}

.h-datagrid .h-table-pageView {
	float: right;
	color: #333;
}
.h-datagrid .h-page {
	padding: 8px 0 0 0;
}
.lightblue .h-datagrid .h-table-checkBox-container {
	background: #fff;
	box-shadow: 0 0 8px #ccc;
}
.lightblue .h-datagrid .h-table-checkBox-container .h-table-checkBox-group:hover {
	background: #f3f9ff;
}
.black .h-datagrid .h-table-checkBox-container {
	background: #232d3b;
	box-shadow: 0 1px 6px rgba(41, 45, 53, 0.2);
	color: #fff;
}
.black .h-datagrid .h-table-checkBox-container .h-table-checkBox-group:hover {
	background: #2f5488;
}
.h-datagrid .h-datagrid-toolbar .pull-right .h-btn-check {
	padding: 4px 6px;
}
.h-datagrid .h-datagrid-toolbar .pull-right .h-btn-check .h-icon {
	margin-left: 5px;
	display: inline-block;
	transform: rotate(0);
	-webkit-transform: rotate(0);
	-webkit-transition: -webkit-transform 0.2s ease-in-out;
	transition: -webkit-transform 0.2s ease-in-out;
	transition: transform 0.2s ease-in-out;
	transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
	transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
}
.h-datagrid .h-datagrid-toolbar .expandListBox .h-btn-check span .h-icon {
	display: inline-block;
	transform: rotate(180deg);
	-webkit-transform: rotate(180deg);
}

.rcmp-datagrid-unfold-icon {
  display: inline-block !important;
	transform: rotate(180deg) !important;
	-webkit-transform: rotate(180deg) !important;
}

.h-datagrid .aggregateInfo {
	width: 100%;
	min-height: 30px;
	line-height: 30px;
	border: 1px solid #d7dde4;
	border-top: 0;
}
.black .h-datagrid .aggregateInfo {
	border: 1px solid #1b2533;
	color: #fff;
}
.black .h-datagrid .h-table {
	color: #fff;
	background-color: #1f2834;
}
.black .h-datagrid .h-spin-fix {
	background-color: #1f2834;
}
.demo-spin-icon-load {
	animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
	from {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(180deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>

<style lang="scss" scoped>
.h-datagrid-toolbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .h-datagrid-toolbar-right {
    display: flex;
  }
}
/deep/ .h-table {
  .h-table-tip {
    overflow: hidden !important;
    overflow-x: auto !important;
  }
}

</style>
