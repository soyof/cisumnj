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
      :searchCallBak="searchCallBak"
      :dataAggregateUrl="dataAggregateUrl"
      :aggregateInfoAttrs="aggregateInfoAttrs"
      :baseServer="baseServer"
      :showExportBtnByUrl="showExportBtnByUrl"
      :exportFileName="exportFileName"
      :exportUrl="exportUrl"
      :exportDataByUrlBeforeFn="exportDataByUrlBeforeFn"
      :btnRightCode="btnRightCode"
      :labelArgs="labelArgs"
      :queryParamTrim="queryParamTrim"
      :labelMapFormat="labelMapFormat"
      :exportInfoList="exportInfoList"
      :onlyTable="onlyTable"
      ref="mainPage"
      @change-list="handleChangeList"
    >
      <template slot="otherContent">
        <slot name="otherContent"></slot>
      </template>
      <template slot="baseCondition" slot-scope="{ form }">
        <slot :form="form" name="baseCondition"></slot>
      </template>
      <template slot="moreCondition" slot-scope="{ form }">
        <slot :form="form" name="moreCondition"></slot>
      </template>
      <template slot="opreBtns">
        <div class="opreBtns-box">
          <slot name="opreBtnsLeft"></slot>
          <h-button :data-rightcode="btnRightCode.insertRightCode" v-if="insertBtn" type="primary"
                    @click="insertItem"
          >{{ operBtn.insertBtn }}</h-button>
          <h-button :data-rightcode="btnRightCode.editRightCode" v-if="editBtn" :type="operEditBtnType"
                    @click="editItem"
          >{{ operBtn.editBtn }}</h-button>
          <h-button :data-rightcode="btnRightCode.deleteRightCode" v-if="deleteBtn" @click="deleteItem">{{ operBtn.deleteBtn }}</h-button>
          <h-button v-if="exportBtn" @click="exportItem">{{ operBtn.exportBtn }}</h-button>
          <slot name="opreBtnsRight"></slot>
        </div>
      </template>
      <template slot="advancedSearchCondition" slot-scope="{ advanceForm }">
        <slot :advanceForm="advanceForm" name="advancedSearchCondition"></slot>
      </template>
    </rcmpSearchTemplate>
    <!--新增、修改弹框-->
    <h-msg-box
      v-model="editMsgBoxModel"
      :width="editMsgBoxWidth"
      :mask-closable="false"
      @on-close="onClose"
    >
      <p slot="header">
        <span>{{ editBoxTitle }}</span>
      </p>
      <div style="padding:0 30px;">
        <h-form
          :model="editForm"
          :label-width="editBoxLabelWidth"
          :cols="editBoxCols"
          :rules="rules"
          ref="editForm"
        >
          <slot :editForm="editForm" name="editForm"></slot>
        </h-form>
      </div>
      <div slot="footer">
        <h-button type="ghost" @click="reset()">{{ editBox.resetBtn }}</h-button>
        <DebounceButton
          :debounceType="2"
          :loading="saveLoading"
          type="primary"
          @click="save()"
        >{{ editBox.saveBtn }}</DebounceButton>
      </div>
    </h-msg-box>
  </div>
</template>
<script>
import DebounceButton from '../../../otherComponents/debounceButton';
import rcmpSearchTemplate from '../../rcmpSearchTemplate';
import fetch from '../../../../utils/api/api.js';
import dataGridMixin from '../../../../mixins/dataGridMixin.js';
import searchTemplateMixin from '../../../../mixins/searchTemplateMixin.js';
// import { handlePanelChange, on, off } from '../../../../utils/api/commonUtil'
export default {
  name: 'rcmpSettingDialogTemplate',
  components: {
    rcmpSearchTemplate,
    DebounceButton
  },
  mixins: [dataGridMixin, searchTemplateMixin],
  props: {
    operBtn: {
      type: Object,
      default: () => ({
        insertBtn: '新增',
        editBtn: '修改',
        deleteBtn: '删除',
        exportBtn: '导出'
      })
    },
    operEditBtnType: {
      type: String,
      default: 'ghost'
    },
    editBox: {
      type: Object,
      default: () => ({
        insert: '新增',
        edit: '修改',
        saveBtn: '保存',
        resetBtn: '重置'
      })
    },
    insertBtn: {
      // 非url时使用
      type: Boolean,
      default: true
    },
    editBtn: {
      type: Boolean,
      default: true
    },
    deleteBtn: {
      type: Boolean,
      default: true
    },
    exportBtn: {
      type: Boolean,
      default: false
    },
    editMsgBoxWidth: {
      type: Number,
      default: 500
    },
    editBoxCols: {
      type: Number,
      default: 1
    },
    editBoxLabelWidth: {
      type: Number,
      default: 80
    },
    insertUrl: {
      type: String,
      default: ''
    },
    editUrl: {
      type: String,
      default: ''
    },
    deleteUrl: {
      type: String,
      default: ''
    },
    // 检查是否可编辑
    checkEditItem: {
      type: Function,
      default(item) {
        return true;
      }
    },
    // 检查是否可删除
    checkDeleteItems: {
      type: Function,
      default(items) {
        return true;
      }
    },
    // 保存回调事件
    editCallBack: {
      type: Function,
      default() {}
    },
    // 删除回调事件
    deleteCallBack: {
      type: Function,
      default() {}
    },
    // 自定义保存事件
    saveFun: {
      type: Function
    },
    // 自定义删除事件
    deleteFun: {
      type: Function
    },
    // 新增修改设置参数组装自定义方法
    setDataDeal: {
      type: Function
    },
    // 重置时候是否也走一次初始的自定义方法
    resetDoDeal: {
      type: Boolean,
      default: false
    },
    // 删除参数组装自定义方法
    deleteDataDeal: {
      type: Function
    },
    // 保存参数组装自定义方法
    saveDataDeal: {
      type: Function
    },
    // 自定义表单校验事件
    validateFun: {
      type: Function,
      default(formVal) {
        return true;
      }
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    saveFilterKeys: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      editForm: {},
      editMsgBoxModel: false,
      saveLoading: false,
      operFlag: '',
      editBoxTitle: '',
      editItemInfo: {}
    };
  },
  computed: {},
  created() {},
  mounted() {},
  activated() {},
  deactivated() {},
  destroyed() {},
  beforeDestroy() {},
  methods: {
    handleSelectCancel(selections, row) {
      this.onSelectCancel(selections, row);
    },
    handleSelectChange(arr, selectInx) {
      this.onSelectChange(arr, selectInx);
    },
    handlelRowSelect(selections, arr) {
      this.onSelect(selections, arr);
    },
    handlelRowClick(arr) {
      this.onRowClick(arr);
    },
    onClose() {
      this.operFlag = '';
      this.editMsgBoxModel = false;
      this.editForm = {};
      this.$refs.editForm.resetFields();
    },
    insertItem() {
      this.editBoxTitle = this.editBox.insert;
      this.operFlag = 'insert';
      if (this.setDataDeal) {
        this.editForm = this.setDataDeal(this.editForm);
      }
      this.editMsgBoxModel = true;
    },
    editItem() {
      const list = this.$refs.mainPage.currentSelectList;
      if (list.length === 0 || list.length > 1) {
        this.$hMessage.warning('请选择一条数据进行编辑！');
        return;
      }
      const item = this.$refs.mainPage.currentSelectRow;
      // 开放方法校验数据是否可编辑
      if (!this.checkEditItem(item)) {
        return;
      }
      this.editItemInfo = JSON.parse(JSON.stringify(item));
      this.operFlag = 'edit';
      this.editBoxTitle = this.editBox.edit;
      this.editForm = JSON.parse(JSON.stringify(this.editItemInfo));
      if (this.setDataDeal) {
        this.editForm = this.setDataDeal(this.editForm, item);
      }
      this.$refs.editForm.resetFields();
      this.editMsgBoxModel = true;
      this.$emit('editItem', this);
    },
    deleteItem() {
      let list = this.$refs.mainPage.currentSelectList;
      if (list.length === 0) {
        this.$hMessage.warning('请选择数据进行删除！');
        return;
      }
      // 开放方法校验数据是否可删除
      if (!this.checkDeleteItems(list)) {
        return;
      }
      this.$hMsgBox.confirm({
        title: '删除确认',
        className: 'vertical-center-modal',
        content: '确定要删除所选数据？',
        onOk: res => {
          // 发送请求删除数据
          // 开放自定义删除方法
          // 开放自定义删除后的回调
          if (this.deleteFun) {
            this.deleteFun(res);
          } else {
            if (this.deleteDataDeal && !this.deleteDataDeal(list)) {
              return;
            }
            if (this.deleteDataDeal) {
              list = this.deleteDataDeal(list);
            }
            fetch.post(this.deleteUrl, list).then(res => {
              if (res.data.error_code) {
                this.$hMessage.error(res.data.error_message || '操作失败！');
                return;
              }
              this.$hMessage.success(res.data.result ? res.data.result : '操作成功');
              this.$refs.mainPage.currentSelectList = [];
              this.$refs.mainPage.$refs.datagrid.getDataListByUrl();
              this.deleteCallBack();
            });
          }
        },
        onCancel: () => {}
      });
    },
    exportItem() {
      // 选中行导出
      // 全部导出
    },
    save() {
      // 数据校验，默认表格校验或自定义校验
      this.$refs.editForm.validate(valid => {
        if (valid && this.validateFun()) {
          // 发送请求
          // 默认保存 +自定义回调 或自定义保存
          if (this.saveFun) {
            this.saveFun(this.editForm);
          } else {
            let saveData = JSON.parse(JSON.stringify(this.editForm));
            if (this.saveDataDeal) {
              saveData = this.saveDataDeal(saveData);
            }
            if (this.saveFilterKeys && this.saveFilterKeys.length > 0) {
              this.saveFilterKeys.forEach(key => {
                delete saveData[key];
              });
            }
            this.saveLoading = true;
            fetch.post(
              this.operFlag === 'insert' ? this.insertUrl : this.editUrl,
              saveData
            ).then(res => {
              if (res.data.error_code) {
                this.$hMessage.error(res.data.error_message || '操作失败！');
                return;
              }
              this.$hMessage.success(res.data.result ? res.data.result : '操作成功');
              this.$refs.mainPage.currentSelectList = [];
              this.$refs.mainPage.$refs.datagrid.getDataListByUrl();
              this.saveCallBack ? this.saveCallBack() : '';
              this.onClose();
            }).finally(_ => {
              this.saveLoading = false;
            });
          }
        } else {
          this.$Message.error('请正确填写表单信息!');
        }
      });
    },
    reset() {
      if (this.operFlag === 'insert') {
        this.editForm = {};
      } else {
        this.editForm = JSON.parse(JSON.stringify(this.editItemInfo));
      }
      if (this.resetDoDeal) {
        this.editForm = this.setDataDeal(this.editForm);
      }
      this.$refs.editForm.resetFields();
    },
    handleResizeTemp() {
      this.$nextTick(() => {
        this.$refs['mainPage'].selfAdaption(this.formId, this.formCols, ['tabsObj'], this.tableBoxId);
      });
    },
    handleChangeList() {
      this.$emit('change-list');
    }
  }
};
</script>
<style scoped>
.opreBtns-box{
  font-size:0px;
}
.opreBtns-box button{
  margin-right: 8px;
}
.opreBtns-box button:lase-child{
  margin-right: 0px;
}
</style>
