<template>
  <div style="display: flex">
    <h-select
      :tabToSave="tabToSave"
      :filterMethod="filterMethod"
      :chooseToRemoteMethod="chooseToRemoteMethod"
      :multipleNumber="multipleNumber"
      :showLoadingIcon="showLoadingIcon"
      :disabled="disabled"
      :readonly="readonly"
      :editable="editable"
      :value="value"
      :label="label"
      :multiple="multiple"
      :clearable="clearable"
      :multClearable="multClearable"
      :placeholder="placeholder"
      :filterable="filterable"
      :accuFilter="accuFilter"
      :remote="remote"
      :remoteMethod="remoteMethod"
      :remoteIcon="remoteIcon"
      :loading="loading"
      :loadingText="loadingText"
      :size="size"
      :labelInValue="labelInValue"
      :notFoundText="notFoundText"
      :placement="placement"
      :width="width"
      :transfer="transfer"
      :autoComplete="autoComplete"
      :isString="isString"
      :isCheckall="isCheckall"
      :noMoreText="noMoreText"
      :isComputed="isComputed"
      :isArrow="isArrow"
      :algin="algin"
      :setDefSelect="setDefSelect"
      :dropWidth="dropWidth"
      :searchHolder="searchHolder"
      :showBottom="showBottom"
      :specialIndex="specialIndex"
      :checkToHead="checkToHead"
      :showTitle="showTitle"
      :hideMult="hideMult"
      :focusSelect="focusSelect"
      :remoteFocusNotShowList="remoteFocusNotShowList"
      :scrollFix="scrollFix"
      :isBackClear="isBackClear"
      :autoPlacement="autoPlacement"
      :zeroToNull="zeroToNull"
      :widthAdaption="widthAdaption"
      :maxDropWidth="maxDropWidth"
      :allowCreate="allowCreate"
      :collapseTags="collapseTags"
      :notAutoFocus="notAutoFocus"
      :isSelectFilter="isSelectFilter"
      :showValue="showValue"
      :tabindex="tabindex"
      :maxlength="maxlength"
      :buttonToTop="buttonToTop"
      :initValueTypeToString="initValueTypeToString"
      :queryNotEmpty="queryNotEmpty"
      :selectInPoptip="selectInPoptip"
      :customTransferClassName="customTransferClassName"
      :valueNotMatch="valueNotMatch"
      :targetNode="targetNode"
      ref="select"
      @on-change="onChange"
      @on-scroll="onScroll"
      @on-query-change="onQueryChange"
      @on-blur="onBlur"
      @on-focus="onFocus"
      @on-drop-change="onDropChange"
      @on-keyup="onKeyup"
      @on-keydown="onKeydown"
      @on-item-remove="onItemRemove"
    >
      <div v-if="defineHeader" slot="header">
        <slot name="header"></slot>
      </div>
      <div v-if="defineFooter" slot="footer">
        <slot name="footer"></slot>
      </div>
      <h-option
        v-for="item in listData"
        :value="item[valueField]"
        :key="item[valueField]"
        :disabled="item.disabled"
        :created="created"
        :showTitle="showOptionTitle"
      >{{ item[labelField] }}</h-option>
    </h-select>
  </div>
</template>
<script>
import httpFetch from '../../../../utils/api/api.js';
import { oneOf } from '../../../../utils/tools.js';
export default {
  name: 'rcmpSelect',
  props: {
    defineHeader: {
      type: Boolean,
      default: false
    },
    defineFooter: {
      type: Boolean,
      default: false
    },
    tabToSave: {
      // tab键保存新建条目
      type: Boolean,
      default: false
    },
    filterMethod: {
      type: Function
    },
    chooseToRemoteMethod: {
      type: Boolean,
      default: false
    },
    multipleNumber: {
      type: [Number, String],
      default: null
    },
    // 当组件在异步查询，模糊搜索时，是否显示 loading的动画图标
    showLoadingIcon: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number, Array],
      default: ''
    },
    // 使用时，也得设置 value 才行
    label: {
      type: [String, Number, Array],
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multClearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    filterable: {
      type: Boolean,
      default: false
    },
    accuFilter: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    remoteMethod: {
      type: Function
    },
    remoteIcon: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      }
    },
    labelInValue: {
      type: Boolean,
      default: false
    },
    notFoundText: {
      type: String
    },
    placement: {
      validator(value) {
        return oneOf(value, [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ]);
      },
      default: 'bottom'
    },
    width: {
      type: [String, Number]
    },
    transfer: {
      type: Boolean,
      default: false
    },
    autoComplete: {
      type: Boolean,
      default: false
    },
    isString: {
      // 多选时支持string类型，选项并以','隔开
      type: Boolean,
      default: false
    },
    isCheckall: {
      // 多选 是否显示全选
      type: Boolean,
      default: false
    },
    noMoreText: {
      // 下拉加载完成数据提示
      type: String
    },
    isComputed: {
      // 是否显示加载完成数据提示
      type: Boolean,
      default: false
    },
    isArrow: {
      // typefield时有需求不显示箭头
      type: Boolean,
      default: true
    },
    algin: {
      type: String,
      default: 'left'
    },
    setDefSelect: {
      // 如果选择为空
      type: Boolean,
      default: false
    },
    dropWidth: {
      // 下拉框的宽度
      type: [String, Number]
    },
    searchHolder: {
      type: String
    },
    showBottom: {
      type: Boolean,
      default: false
    },
    specialIndex: {
      type: Boolean,
      default: false
    },
    checkToHead: {
      // 只在多选且筛选框下有效
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    hideMult: {
      type: Boolean,
      default: false
    },
    focusSelect: {
      type: Boolean,
      default: true
    },
    // o45证券代码--远程搜索时，点击输入框后不显示下拉列表，值改变时才显示，搜索值清空后隐藏
    remoteFocusNotShowList: {
      type: Boolean,
      default: false
    },
    // 滚动时先固定滚动条，只有滚动至当屏最上方或者最下方时进行滚动条滚动，否则滚动条不动，只改变focusIndex值
    scrollFix: {
      type: Boolean,
      default: false
    },
    isBackClear: {
      type: Boolean,
      default: false
    },
    autoPlacement: {
      type: Boolean,
      default: false
    },
    zeroToNull: {
      type: Boolean,
      default: false
    },
    // 宽度自适应
    widthAdaption: {
      type: Boolean,
      default: false
    },
    maxDropWidth: {
      type: [String, Number],
      default: 500
    },
    /* 条目不存在时允许增加新条目 */
    allowCreate: {
      type: Boolean,
      default: false
    },
    /* 多选时是否将选项压缩展示个数 */
    collapseTags: {
      type: Boolean,
      default: false
    },
    /* 搜索时是否不将焦点放在第一搜索项 */
    notAutoFocus: {
      type: Boolean,
      default: false
    },
    /* 全选和取消全选是否根据检索后展示选项 */
    isSelectFilter: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: [String, Number],
      default: 0,
      validator(value) {
        const num = parseInt(value);
        return num <= 32767 && num >= -1;
      }
    },
    maxlength: {
      type: Number,
      default: Infinity
    },
    // o45全选按钮在顶部
    buttonToTop: {
      type: Boolean,
      default: false
    },
    // 改变初始化vlaue值的类型，考虑到初始化取值时，value和对应的option值类型不同（e.g: Number 1 和 Strign 1）
    // 该属性表示初始化value值是转化成String类型
    initValueTypeToString: {
      type: Boolean,
      default: false
    },
    // 当 multiple remote-method时，设置此属性 query在控件不失去焦点的情况下，query保留之前的搜索值
    // 当 dropdown隐藏时，控件失去焦点，query = ‘’， 触发remoteMethod()
    queryNotEmpty: {
      type: Boolean,
      default: false
    },
    // 场外select放在poptip中渲染，弹出框dropdown与poptip的z-index相同导致选项被遮挡
    selectInPoptip: {
      type: Boolean,
      default: false
    },
    customTransferClassName: {
      type: String
    },
    // v-model的值跟option下拉框的值不匹配（即脏数据），需要进行的操作判断
    // true 表示如果value值跟下拉选择不匹配（脏数据）会把v-model的清空，默认为false不清空,保留原值
    // 不支持远程搜索 不支持allowCreate
    valueNotMatch: {
      type: Boolean,
      default: false
    },
    optionList: {
      type: Array,
      default: () => []
    },
    busUrl: {
      type: String,
      default: ''
    },
    labelField: {
      type: String,
      default: 'label'
    },
    valueField: {
      type: String,
      default: 'value'
    },
    methodType: {
      type: String,
      default: 'get'
    },
    params: {
      type: Object,
      default: () => ({})
    },
    /**
		 * 是否是内部新建条目
		 */
    created: {
      type: Boolean,
      default: false
    },
    showOptionTitle: {
      type: Boolean,
      default: false
    },
    selectChange: {
      type: Function,
      default: () => {}
    },
    queryChange: {
      type: Function,
      default: () => {}
    },
    dropChange: {
      type: Function,
      default: () => {}
    },
    focusFun: {
      type: Function,
      default: () => {}
    },
    blurFun: {
      type: Function,
      default: () => {}
    },
    keyupFun: {
      type: Function,
      default: () => {}
    },
    keydownFun: {
      type: Function,
      default: () => {}
    },
    itemRemoveFun: {
      type: Function,
      default: () => {}
    },
    filterOptions: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    targetNode: { // h_ui 1.52.0版本及以上支持
      type: String,
      required: false,
      default: _ => undefined
    }
  },
  data() {
    return {
      listData: [],
      inputFlag: true
    };
  },
  created() {
    // 如果有请求，根据配置的请求获取数据
    const optionsList = this.optionList ? JSON.parse(JSON.stringify(this.optionList)) : [];
    this.listData = this.getOptionsListByFilterOp(optionsList);
    this.urlPath = this.busUrl;
  },
  mounted() {
    // 如果有请求，根据配置的请求获取数据
    this.requestData();
  },
  methods: {
    getOptionsListByFilterOp(list) {
      if (this.filterOptions && this.filterOptions.length > 0) {
        return list.filter(item => !this.filterOptions.includes(item.value));
      }
      return list;
    },
    requestData() {
      if (this.urlPath && this.optionList.length === 0) {
        let httpGetFlag = true; // 发请求去获取数据
        if (this.dictEntr && this.isSessionGet) {
          httpGetFlag = false;
          try {
            let dictList = sessionStorage.getItem('dictEntr' + (this.dictEntr || this.urlPath));
            if (dictList) {
              dictList = JSON.parse(dictList);
              if (dictList instanceof Array) {
                this.listData = this.getOptionsListByFilterOp(dictList);
                this.$emit('optionsListEmits', dictList);
              } else {
                httpGetFlag = true;
              }
            } else {
              httpGetFlag = true;
            }
          } catch (e) {
            httpGetFlag = true;
          }
        }
        if (!httpGetFlag) {
          return;
        }
        httpFetch({
          url: this.urlPath,
          method: this.methodType,
          data: this.params,
          noFormat: true,
          responseType: 'text'
        }).then((result) => {
          if (result.data.error_code) {
            this.$hMessage.error(result.data.error_message || '获取数据失败！');
            return;
          }
          const response = result.data.result.item ? result.data.result.item : result.data.result;
          if (response && response.length > 0) {
            this.listData = this.getOptionsListByFilterOp(response);
            this.$emit('optionsListEmits', this.listData);
            if (this.isSessionGet && this.dictEntr) {
              sessionStorage.setItem('dictEntr' + (this.dictEntr || this.urlPath), JSON.stringify(response));
            }
          }
        });
      }
    },
    setQuery(query) {
      this.$refs.select.$refs.select.setQuery(query);
    },
    clearSingleSelect() {
      this.$refs.select.$refs.select.clearSingleSelect();
    },
    focus() {
      this.$refs.select.$refs.select.focus();
    },
    blur() {
      this.$refs.select.$refs.select.blur();
    },
    toggleSelect(status) {
      this.$refs.select.$refs.select.toggleSelect(status);
    },
    onChange(val) {
      if (this.multiple && this.isString) {
        if (this.labelInValue) {
          this.$emit(
            'input',
            val.reduce((acc, cuur) => {
              return (acc += acc == '' ? cuur.value : ',' + cuur.value);
            }, '')
          );
        } else {
          this.$emit('input', val.join(','));
        }
      } else {
        this.$emit('input', this.labelInValue ? val.value : val);
      }
      this.$emit('onChange', val);
      this.selectChange(val);
    },
    onScroll() {
      this.$emit('onScroll');
    },
    onQueryChange(query) {
      this.$emit('onQueryChange', query);
      this.queryChange(query);
    },
    onBlur() {
      this.$emit('onBlur');
      this.blurFun();
    },
    onFocus() {
      this.$emit('onFocus');
      this.focusFun();
    },
    onDropChange(status) {
      this.$emit('onDropChange', status);
      this.dropChange(status);
    },
    onKeyup(e) {
      this.$emit('onKeyup', e);
      this.keyupFun(e);
    },
    onKeydown(e) {
      this.$emit('onKeydown', e);
      this.keydownFun(e);
    },
    onItemRemove(current, index) {
      this.$emit('onItemRemove', current, index);
    }
  }
};
</script>
