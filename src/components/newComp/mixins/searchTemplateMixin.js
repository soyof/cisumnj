import { getRandom } from '../utils/utils';

export default {
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
    // 查询条件label宽度
    labelWidth: {
      type: Number,
      default: 80
      // 110
    },
    // 一行展示几个查询条件
    formCols: {
      type: Number,
      default: 4
    },
    formId: {
      type: String,
      default() {
        return `mainSearch_${getRandom(16)}`;
      }
    },
    // 查询表单参数配置
    formArgs: {
      type: Object,
      default() {
        return {};
      }
    },
    advanceFormArgs: {
      type: Object,
      default() {
        return {};
      }
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
    requestType: {
      type: String,
      default: 'post'
    },
    searchCallBak: {
      type: Function,
      default() { }
    },
    checkBaseSearchForm: {
      type: Function,
      default(form) {
        return true;
      }
    },
    checkAdvancedSearchForm: {
      type: Function,
      default(form) {
        return true;
      }
    },
    linkParamsDealFun: {// 跳转参数自定义处理方法
      type: Function,
      default: null
    },
    searchBtnHidden: {
      type: Boolean,
      default: false
    },
    resetBtnHidden: {
      type: Boolean,
      default: false
    },
    baseServer: {
      type: String,
      default: ''
    },
    // 按钮权限
    // {
    //   searchRightCode: "",
    //   insertRightCode: "",
    //   editRightCode: "",
    //   deleteRightCode: "",
    //   exportRightCode:""
    // }
    btnRightCode: {
      type: Object,
      default: () => { return {}; }
    },
    isAutoHeight: {
      type: Boolean,
      default: true
    }
  }
};
