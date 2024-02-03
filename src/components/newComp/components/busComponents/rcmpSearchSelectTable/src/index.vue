<script>
import rcmpSearchBox from '../../../comComponents/rcmpSearchBox';
export default {
  name: 'rcmpSearchSelectTable',
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
          title: '编号',
          key: 'id'
        },
        {
          title: '名称',
          key: 'name'
        }
      ]
    },
    matchCol: {
      type: Array,
      default() {
        return [];
      }
    },
    format: {
      type: Array,
      default: () => ['id', ' ']
    },
    // 自定义v-model的值,数组格式与format一样
    formatValue: {
      type: [Array, String],
      default: 'id'
    },
    searchField: {
      type: String,
      default: 'id'
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
      default: ''
    },
    // 筛选框在下面
    showBottom: {
      type: Boolean,
      default: true
    },
    params: {
      type: [Object, Function],
      default: () => {
        return (pageNo, pageSize, query, searchField) => {
          return {
            page_num: pageNo,
            page_size: pageSize,
            [searchField]: query
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
