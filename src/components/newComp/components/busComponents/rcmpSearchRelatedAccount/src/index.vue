<script>
import rcmpSearchBox from '../../../comComponents/rcmpSearchBox';
export default {
  name: 'rcmpSearchRelatedAccount',
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
          title: '关联组账号',
          key: 'value',
          width: 80
        },
        {
          title: '关联组名称',
          key: 'label'
        }
      ]
    },
    matchCol: {
      type: Array,
      default: () => ['value', 'label']
    },
    format: {
      type: Array,
      default: () => ['value', ' ']
    },
    // 自定义v-model的值,数组格式与format一样
    formatValue: {
      type: [Array, String],
      default: 'value'
    },
    searchField: {
      type: String,
      default: 'value'
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
      default: '/getRelationGroupOptionList'
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
          return { page_num: pageNo, page_size: pageSize, relation_group_name: query };
        };
      }
    }
  },
  data() {
    return {};
  }
};
</script>
