<template>
  <div class="rcmpUserSelectWrap">
    <div class="wrapL">
      <h-input v-model="filterText" placeholder="输入关键字进行过滤" />
      <h-tree
        :data="data"
        :multiple="multiple"
        :show-checkbox="showCheckbox"
        :checkStrictly="checkStrictly"
        :showIndeterminate="showIndeterminate"
        :load-data="loadData"
        :currentPageInfo="currentPageInfo"
        :isAlwaysSelect="isAlwaysSelect"
        :isBoxRight="isBoxRight"
        :selectToCheck="selectToCheck"
        ref="tree"
        :notDeepCopy="notDeepCopy"
        :onlyUpdateDown="onlyUpdateDown"
        :filter="filter"
        :filter-node-method="filterNodeMethod"
        :titleMaxWidth="titleMaxWidth"
        :title="title"
        :expand="expand"
        :disabled="disabled"
        :disableCheckbox="disableCheckbox"
        :selected="selected"
        :checked="checked"
        :loading="loading"
        :children="children"
        :leaf="leaf"
        :autoLoad="autoLoad"
        :hasPage="hasPage"
        @on-select-change="onselectchange"
        @on-check-change="oncheckchange"
        @on-toggle-expand="ontoggleexpand"
        @on-mouseover="onmouseover"
        @on-right-click="onrightclick"
        @on-double-click="ondoubleclick"
      />
    </div>
    <div class="wrapR">
      <h-transfer-table
        :lColumns = "lColumns"
        :rColumns = "rColumns"
        :lData="lData"
        :rData="rData"
        :lWidth="lWidth"
        :rWidth="rWidth"
        :height="height"
        :lTitle="lTitle"
        :rTitle="rTitle"
        :operations="operations"
        ref="transferTable"
        :notDataText="notDataText"
        :showTitle="showTitle"
        :stripe="stripe"
        :border="border"
        :rowSelect="rowSelect"
        :highlight-row="highlightrow"
        :showEditInput="showEditInput"
        :option="option"
        :filterable="filterable"
        :filter-placeholder="filterplaceholder"
        :filter-method="filtermethod"
        :noEdit="noEdit"
        :beforeMove="beforeMove"
        :hidelTable="hidelTable"
        :hiderTable="hiderTable"
        :hideOperations="hideOperations"
        :itemHeight="itemHeight"
        :type="type"
        :title="title"
        :width="width"
        :align="align"
        :rule="rule"
        @on-change="onChange"
      />
    </div>
  </div>
</template>

<script>
// import httpFetch from '../../../../utils/api/api.js'
export default {
  name: 'rcmpUserSelect',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    showIndeterminate: {
      type: Boolean,
      default: false
    },
    loadData: {
      type: Function,
      default: () => ({})
    },
    // render: {
    //   type: [Object, Function],
    //   default: () => ({})
    // },
    currentPageInfo: {
      type: Object,
      default: () => ({})
    },
    isAlwaysSelect: {
      type: Boolean,
      default: false
    },
    isBoxRight: {
      type: Boolean,
      default: false
    },
    selectToCheck: {
      type: Boolean,
      default: false
    },
    notDeepCopy: {
      type: Boolean,
      default: false
    },
    onlyUpdateDown: {
      type: Boolean,
      default: false
    },
    // filterNodeMethod: {
    //   type: Function,
    //   default: (val,data,node) => ({})
    // },
    titleMaxWidth: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    expand: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disableCheckbox: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    children: {
      type: Array,
      default: () => []
    },
    leaf: {
      type: Boolean,
      default: false
    },
    autoLoad: {
      type: Boolean,
      default: false
    },
    hasPage: {
      type: Boolean,
      default: false
    },
    // / /TransferTable 穿梭表格
    lColumns: {
      type: Array,
      default: () => []
    },
    rColumns: {
      type: Array,
      default: () => []
    },
    lData: {
      type: Array,
      default: () => []
    },
    // rData: {
    //   type: Array,
    //   default: () => []
    // },
    lWidth: {
      type: Number,
      default: 500
    },
    rWidth: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 200
    },
    lTitle: {
      type: String,
      default: ''
    },
    rTitle: {
      type: String,
      default: ''
    },
    operations: {
      type: Array,
      default: () => []
    },
    notDataText: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    rowSelect: {
      type: Boolean,
      default: false
    },
    highlightrow: {
      type: Boolean,
      default: false
    },
    showEditInput: {
      type: Boolean,
      default: false
    },
    option: {
      type: Array,
      default: () => []
    },
    filterable: { // 是否显示搜索框
      type: Boolean,
      default: false
    },
    filterplaceholder: {
      type: String,
      default: '请输入搜索内容'
    },
    noEdit: {
      type: Boolean,
      default: false
    },
    beforeMove: {
      type: Function,
      default: () => ({})
    },
    hidelTable: {
      type: Boolean,
      default: false
    },
    hiderTable: {
      type: Boolean,
      default: false
    },
    hideOperations: {
      type: Boolean,
      default: false
    },
    itemHeight: {
      type: Number,
      default: 40
    },
    type: {
      type: String
      // default: ''
    },
    width: {
      type: Number
    },
    align: {
      type: String,
      default: 'center'
    },
    rule: {
      type: Object
    }
  },
  data() {
    return {
      filterText: '',
      rData: [
        {
          name: '王小明11',
          age: 18,
          address: '北京市朝阳区芍药居',
          money: '120.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating: '2018-03-07',
          timing: '16:00:00.00',
          tree1: 'leaf1'
          // _highlight: true//默认选择当前项
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          money: '130.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating: '2018-03-07',
          timing: '16:00:00.00',
          tree1: 'leaf1'
        }
      ]
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {

  },
  methods: {
    filterNodeMethod(val, data, node) {
      if (!val) return true;
      return node.title.indexOf(val) !== -1;
    },
    getCheckedNodes() {
      this.$refs.select.$refs.select.getCheckedNodes();
    },
    getSelectedNodes() {
      this.$refs.select.$refs.select.getSelectedNodes();
    },
    nodeSelect(key, value, status) {
      this.$refs.select.$refs.select.nodeSelect(key, value, status);
    },
    filterHighlight(val) {
      this.$refs.select.$refs.select.filterHighlight(val);
    },
    nodeCheck(key, value, status) {
      this.$refs.select.$refs.select.nodeCheck(key, value, status);
    },
    filter(val, childShow) {
      this.$refs.select.$refs.select.filter(val, childShow);
    },
    expandTree(status) {
      this.$refs.select.$refs.select.expandTree(status);
    },

    onselectchange(currentArr, currentObj) {
      this.rData = [
        {
          name: 'zzz',
          age: 18,
          address: '北京市朝阳区芍药居',
          money: '120.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating: '2018-03-07',
          timing: '16:00:00.00',
          tree1: 'leaf1'
          // _highlight: true//默认选择当前项
        }
      ];
      // this.$emit("onselectchange", currentArr,currentObj);
    },
    oncheckchange(currentArr, currentObj) {
      this.$emit('oncheckchange', currentArr, currentObj);
    },
    ontoggleexpand(arr, status) {
      this.$emit('ontoggleexpand', arr, status);
    },
    onmouseover(currentObj) {
      this.$emit('onmouseover', currentObj);
    },
    onrightclick(currentObj, event) {
      this.$emit('onrightclick', currentObj, event);
    },
    ondoubleclick(currentObj) {
      this.$emit('ondoubleclick', currentObj);
    },
    // / //TransferTable 穿梭表格
    onChange(value) {
      this.$emit('input', value);
      this.$emit('onChange', value);
    },
    clearSearch() {
      // this.$refs.transferTable.clearSearch('left')  // 表示左侧或者右侧搜索框清除
    },
    filtermethod(data, query) {
      return data.name.indexOf(query) > -1;
    }
  }
};
</script>
<style scoped>
.rcmpUserSelectWrap {
  width: 100%;
}
.rcmpUserSelectWrap .wrapL,
.rcmpUserSelectWrap .wrapR {
  float: left;
  width: 50%;
}
.rcmpUserSelectWrap .wrapL  /deep/ .h-input {
  width: 60%;
}
.rcmpUserSelectWrap .wrapR /deep/ .h-transfer-table-list-with-title {
  width: 100% !important;
}
.rcmpUserSelectWrap .wrapR /deep/ .h-transfer-table-operation {
  margin-top: 13px;
}
.rcmpUserSelectWrap .wrapR /deep/ .h-editgird-tip {
  display: none;
}
.rcmpUserSelectWrap .wrapR /deep/ .h-editgird table {
  width: 100% !important;
}
.rcmpUserSelectWrap .wrapR /deep/ .h-transfer-table-operation button.h-btn {
  margin: 0px 15px;
  margin-bottom: 12px;
  display: inline;
}
.rcmpUserSelectWrap .wrapR /deep/ .h-transfer-table-operation button.h-btn span {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  display: inline-block;
}
</style>
