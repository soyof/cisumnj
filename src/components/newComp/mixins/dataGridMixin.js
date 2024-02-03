export default {
  props: {
    tableBoxId: { // 当前table的外层父元素的id  用于上下布局时,动态计算高度问题
      type: String,
      default: ''
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
    title: {
      type: String,
      default: ''
    }, // 表格列表头部信息,
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
    gridData: {
      type: Object,
      default() {
        return {};
      }
    }, // 数据信息，包含表格信息rows及分页信息total[可以通过property自定义rows字段]
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
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
    width: {
      type: [Number, String],
      default: ''
    },
    height: {
      type: [Number, String],
      default: ''
    },
    canDrag: {
      type: Boolean,
      default: true
    },
    canMove: {
      type: Boolean,
      default: true
    },
    clickToSelect: {
      type: Boolean,
      default: false
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
    rowSelectOnly: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default() {
        return '';
      }
    },
    onDataText: {
      type: String,
      default: ''
    },
    noFilteredDataText: {
      type: String,
      default: ''
    },
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
    current: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    placement: {
      type: String,
      default: 'top'
    },
    pageSizeOpts: {
      type: Array,
      default() {
        return [5, 10, 15, 20];
      }
    },
    simple: {
      type: Boolean,
      default: false
    },
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
    className: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      default() {
        return {};
      }
    },
    // hasPage:{ //是否显示分页
    //   type: Boolean,
    //   default: false
    // },
    getDataFunc: {
      // 分页获取data函数，该参数必须配gridData || 无分页情况,直接返回rows,同时配置get-data事件
      type: Function,
      default() { }
    },
    // getData: Function, //分页获取data函数，该参数必须配gridData || 无分页情况,直接返回rows
    url: {
      type: String,
      default: ''
    }, // 参考2.0 通过url请求数据
    baseUrl: {
      type: String,
      default: ''
    }, // 参考2.0 通过url请求数据
    // bindForm: Object,
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
    requestType: {
      type: String,
      default: 'post'
    },
    selfAdaptTable: {
      type: String,
      default: ''
    }, // 暴露给用户ref属性,设置此属性后，表格根据页面高度自适应，不设置此属性按照给定的高度值给表格设定高度
    property: {
      type: Object,
      default() {
        // 自定义返回字段
        return {
          total: 'total',
          rows: 'list',
          pageNo: 'pageNo',
          pageSize: 'pageSize',
          responseType: 'data',
          responseInfo: 'result'
        };
      }
    },
    occupyHight: {
      // 非url时使用
      type: Number,
      default: 0
    },
    filters: {
      type: Object,
      default() {
        return {};
      }
    },
    labelArgs: { // 查询条件的中文
      type: Object,
      default() {
        return {};
      }
    },
    dataAggregateUrl: {
      type: String,
      default: ''
    },
    aggregateInfoAttrs: {
      type: Array,
      default() {
        return [];
      }
    },
    baseServer: {
      type: String,
      default: ''
    },
    // 导出按钮
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
      default: () => { return {}; }
    },
    // 刷新按钮
    showRefreshBtn: {
      type: Boolean,
      default: false
    },
    // 查询条件是否左右去空格
    queryParamTrim: {
      type: Boolean,
      default: false
    },
    // 反洗钱专用--用于导出时做日志留痕
    labelMapFormat: {
      type: Array,
      default: () => { return []; }
    },
    // 名单操作日志
    labelQueryFormat: {
      type: Object,
      default: () => { return {}; }
    },
    // 反洗钱查询条件的中文
    queryMapFormat: {
      type: Object,
      default: () => { return {}; }
    },
    onlyTable: {
      type: Boolean,
      default: false
    },
    exportInfoList: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    noDataHeight: {
      type: Number,
      required: false,
      default: 130
    },
    exportHiddenCols: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    isHiddenColsSaveServer: {
      type: Boolean,
      required: false,
      default: false
    },
    isShowNoDataImg: {
      type: Boolean,
      required: false,
      default: true
    },
    otherSearchParams: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    isShowPagerForMoreOnePage: {
      type: Boolean,
      required: false,
      default: _ => false
    },
    isNotHandleExportUrl: { // 对传入的导出接口不进行相关处理
      type: Boolean,
      required: false,
      default: _ => false
    },
    exportDataSelfPromiseFn: {
      type: Function,
      required: false,
      default: undefined // 代码中进行了判断,如设置为_ => undefined形式,判断会失效,导致所有导出将执行此默认方法
    }
  }
};
