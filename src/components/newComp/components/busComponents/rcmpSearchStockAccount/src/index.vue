<script>
import rcmpSearchBox from '../../../comComponents/rcmpSearchBox';
export default {
  name: 'rcmpSearchStockAccount',
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
          title: '证券账号',
          key: 'stock_account'
        },
        {
          title: '姓名',
          key: 'stock_account_name'
        }
      ]
    },
    matchCol: {
      type: Array,
      default: () => ['stock_account', 'stock_account_name']
    },
    format: {
      type: Array,
      default: () => ['stock_account', ' ']
    },
    // 自定义v-model的值,数组格式与format一样
    formatValue: {
      type: [Array, String],
      default: 'stock_account'
    },
    searchField: {
      type: String,
      default: 'stock_account'
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
      default: '/getStockAccountList'
    },
    // 筛选框在下面
    showBottom: {
      type: Boolean,
      default: true
    },
    params: {
      type: [Object, Function],
      default: () => {
        return function(pageNo, pageSize, query) {
          return {
            page_num: pageNo,
            page_size: pageSize,
            stock_account: query
          };
        };
      }
    }
  },
  data() {
    return {};
  }
};
</script>
