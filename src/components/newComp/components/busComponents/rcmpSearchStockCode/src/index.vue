<script>
import rcmpSearchBox from '../../../comComponents/rcmpSearchBox';
export default {
  name: 'rcmpSearchStockCode',
  extends: rcmpSearchBox,
  props: {
    data: {
      type: Array,
      default: () => []
    },
    // 表格的列
    columns: {
      type: Array,
      default: () => [
        {
          title: '证券代码',
          key: 'stock_code',
          width: 80
        },
        {
          title: '证券名称',
          key: 'stock_name'
        }
      ]
    },
    matchCol: {
      type: Array,
      default: () => ['stock_code', 'stock_name']
    },
    format: {
      type: Array,
      default: () => ['stock_code', ' ']
    },
    // 自定义v-model的值,数组格式与format一样
    formatValue: {
      type: [Array, String],
      default: 'stock_code'
    },
    searchField: {
      type: String,
      default: 'stock_code'
    },

    remote: {
      type: Boolean,
      default: true
    },
    // 用于多选，展示全选按钮
    isCheckall: {
      type: Boolean,
      default: false
    },
    isPage: {
      type: Boolean,
      default: true
    },
    busUrl: {
      type: String,
      default: '/getStockList'
    },
    // 筛选框在下面
    showBottom: {
      type: Boolean,
      default: true
    },
    params: {
      type: [Object, Function],
      default: () => {
        return (pageNo, pageSize, query) => {
          return { page_num: pageNo, page_size: pageSize, stock_code: query };
        };
      }
    }
  },
  data() {
    return {};
  }
};
</script>
