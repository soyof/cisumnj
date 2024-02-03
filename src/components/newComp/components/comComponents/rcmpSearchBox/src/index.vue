<template>
  <div class="rcmpSearchBox" style="display: flex">
    <h-select-table
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :remote="remote"
      :remote-method="remoteMethod"
      :clearable="clearable"
      :matchable="matchable"
      :filterable="filterable"
      :matchCol="matchCol"
      :showBottom="showBottom"
      :placement="placement"
      :width="width"
      :dropWidth="dropWidth"
      :transfer="transfer"
      :multiple="multiple"
      :isCheckall="isCheckall"
      :noMoreText="noMoreText"
      :isComputed="isComputed"
      :format="format"
      :formatValue="formatValue"
      :matchWay="matchWay"
      :searchHolder="searchHolder"
      :checkToHead="checkToHead"
      :autoPlacement="autoPlacement"
      ref="selectTable"
      @on-change="onChange"
      @on-scroll="onScroll"
      @on-focus="onFocus"
      @on-blur="onBlur"
    >
      <h-table-option
        :border="true"
        :rowSelect="rowSelect"
        :showHeader="showHeader"
        :columns="columns"
        :data="tableData"
        :disabledHover="disabledHover"
        :loading="loading"
        :noDataText="noDataText"
        :highlightRow="highlightRow"
      />
      <h-page
        v-if="isPage"
        :current="pageNo"
        :total="total"
        :page-size="pageSize"
        ref="selectPage"
        slot="footer"
        size="small"
        class-name="h-select-page"
        show-total
        show-elevator
        @on-change="pageChange"
      />
    </h-select-table>
  </div>
</template>
<script>
import httpFetch from '../../../../utils/api/api.js';
import { oneOf } from '../../../../utils/tools.js';
export default {
  name: 'rcmpSearchBox',
  props: {
    value: {
      type: [Array, String],
      default: ''
    },
    // 表格的数据
    data: {
      type: Array,
      default: () => []
    },
    // 表格的列
    columns: {
      type: Array,
      default: () => []
    },
    // 表格是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 点击行选中，适用于多选
    rowSelect: {
      type: Boolean,
      default: true
    },
    // 禁止表格悬浮
    disabledHover: {
      type: Boolean,
      default: false
    },
    // 行高亮
    highlightRow: {
      type: Boolean,
      default: true
    },
    // 无数据显示的文字
    noDataText: {
      type: String,
      default: '暂无数据'
    },

    // 输入框禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 支持模糊搜索
    filterable: {
      type: Boolean,
      default: true
    },
    // 自定义显示内容第一项为列关键字,多列用逗号分开，第二项为分隔符（必填）如：["name", " "]或者["name,source_no", " "]
    format: {
      type: Array,
      default: () => ['', ' ']
    },
    // 自定义v-model的值,数组格式与format一样
    formatValue: {
      type: [Array, String],
      default: ''
    },

    remote: {
      type: Boolean,
      default: false
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 用于多选，展示全选按钮
    isCheckall: {
      type: Boolean,
      default: true
    },
    // 用于单选，清空
    clearable: {
      type: Boolean,
      default: true
    },
    // 输入框提示语
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 支持匹配
    matchable: {
      type: Boolean,
      default: true
    },
    // 匹配的列
    matchCol: {
      type: Array,
      default: () => []
    },
    // 搜索匹配方式
    matchWay: {
      validator(value) {
        return oneOf(value, ['blurry', 'left', 'all']);
      },
      default: 'blurry'
    },
    // 筛选框在下面
    showBottom: {
      type: Boolean,
      default: false
    },
    // 表格所在位置
    placement: {
      // validator (value) {
      //   return oneOf(value, ['bottom', 'bottom-start', 'top'])
      // },
      default: 'bottom'
    },
    // 输入框宽度
    width: {
      type: [String, Number],
      default: null
    },
    // 下拉框的宽度
    dropWidth: {
      type: [String, Number],
      default: null
    },
    transfer: {
      type: Boolean,
      default: false
    },
    isComputed: {
      type: Boolean,
      default: false
    },
    noMoreText: {
      type: String,
      default: '没有更多数据'
    },
    checkToHead: {
      type: Boolean,
      default: false
    },
    // 搜索框中内置字段
    searchHolder: {
      type: String,
      required: false,
      default: ''
    },
    // 搜索框中内置字段
    searchField: {
      type: String,
      default: 'id'
    },
    // 远程请求
    methodType: {
      type: String,
      default: 'post'
    },
    // 参数 方法的话接受3个参数function(pageNo,pageSize,query){}
    // 接口返回的数据格式必须是{items:[],count:1},如果不分页，count字段可省略
    params: {
      type: [Object, Function],
      default: () => ({})
    },
    // body参数
    bodyParams: {
      type: [Object, Function],
      default: () => ({})
    },
    busUrl: {
      type: String,
      default: ''
    },
    isPage: {
      type: Boolean,
      default: false
    },
    baseServer: {
      type: String,
      default: ''
    },
    // 增加传参，用于针对分页查询获取选项
    serialNo: {
      type: String,
      default: ''
    },
    autoPlacement: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      total: 0,
      pageSize: 10,
      pageNo: 1,
      urlPath: '',
      tableData: [],
      httpFetchParams: {},
      currentGetDataFlag: 0
    };
  },
  created() {
    this.urlPath = this.baseServer + this.busUrl;
    this.tableData = JSON.parse(JSON.stringify(this.data));
    if (typeof this.params !== 'function') {
      this.httpFetchParams = JSON.parse(JSON.stringify(this.params));
    }
    this.httpFetchParams.page_size = this.pageSize;
    // 掉接口获取第1次数据
    if (this.urlPath && this.tableData.length === 0) {
      const myGetDataFlag = ++this.currentGetDataFlag;
      this.getData(myGetDataFlag);
    }
  },
  methods: {
    remoteMethod(query) {
      this.pageNo = 1;
      this.httpFetchParams.page_no = this.pageNo;
      this.httpFetchParams[this.searchField] = query;
      const myGetDataFlag = ++this.currentGetDataFlag;
      this.getData(myGetDataFlag);
    },
    pageChange(pageNo) {
      this.pageNo = pageNo;
      this.httpFetchParams.page_no = this.pageNo;
      const myGetDataFlag = ++this.currentGetDataFlag;
      this.getData(myGetDataFlag);
    },
    getData(myGetDataFlag) {
      this.loading = true;
      this.tableData = [];
      // this.total = 0;
      let params = {};
      let bodyParams = {};
      if (typeof this.params !== 'function') {
        params = this.httpFetchParams;
      } else {
        params = this.params(
          this.pageNo,
          this.pageSize,
          this.httpFetchParams[this.searchField],
          this.searchField
        );
      }
      if (typeof this.bodyParams !== 'function') {
        bodyParams = this.bodyParams;
      } else {
        bodyParams = this.bodyParams(
          this.pageNo,
          this.pageSize,
          this.httpFetchParams[this.searchField],
          this.searchField
        );
      }
      if (this.serialNo) {
        params.record_seqno = this.serialNo;
      }
      if (this.methodType === 'post') {
        Object.assign(bodyParams, params);
      }
      httpFetch({
        url: this.urlPath + '?time=' + new Date().getTime(),
        method: this.methodType,
        params: params,
        data: bodyParams,
        noFormat: true,
        responseType: 'text'
      })
        .then(result => {
          if (result.data.error_code) {
            this.$hMessage.error(result.data.error_message || '获取数据失败！');
            return;
          }
          // 防止前面的请求慢于后面的请求导致展示数据不对
          if (
            myGetDataFlag === this.currentGetDataFlag &&
            result &&
            result.data
          ) {
            const items = result.data.result.list;
            const count = result.data.result.total;
            if (items && items.length > 0) {
              this.tableData = items;
              this.total = count;
            }
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onChange(value) {
      this.$emit('input', value);
      this.$emit('onChange', value);
    },
    onScroll() {
      this.$emit('onScroll');
    },
    onFocus() {
      this.$emit('onFocus');
    },
    onBlur() {
      this.$emit('onBlur');
    }
  }
};
</script>
<style>
.rcmpSearchBox .h-table th,
.rcmpSearchBox .h-table td {
  border-bottom: 1px solid #dce1e7 !important;
  border-left: 1px solid #dce1e7 !important;
}
.black .rcmpSearchBox .h-table th,
.black .rcmpSearchBox .h-table td {
  border-bottom: 1px solid #1b2533 !important;
  border-left: 1px solid #1b2533 !important;
}
.rcmpSearchBox .h-table th:first-child,
.rcmpSearchBox .h-table td:first-child {
  border-left: 0 !important;
}
.rcmpSearchBox .h-selectTable-input {
  width: 100%;
}
.black
  .rcmpSearchBox
  .h-selectTable-dropdown-noline-content
  .h-selectTable-search {
  background: #1b2533;
}
.black
  .rcmpSearchBox
  .h-selectTable-dropdown-noline-content
  .h-selectTable-search
  input {
  border-bottom: 1px solid #303c4c;
}
.black .rcmpSearchBox .h-select-checkall {
  border-top: 1px solid #303c4c;
}
.black
  .rcmpSearchBox
  .h-selectTable-dropdown-noline-content
  .h-selectTable-dropdown-list {
  border-bottom: 1px solid #303c4c;
}
.black
  .rcmpSearchBox
  .h-selectTable-dropdown-noline-content
  .h-selectTable-dropdown-list
  .h-table-wrapper
  .h-table:before {
  background-color: #303c4c;
}

.black .rcmpSearchBox .h-spin-fix {
  background-color: #1f2834;
}
</style>
