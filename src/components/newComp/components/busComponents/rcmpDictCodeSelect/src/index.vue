<script>
// 数据字典组件
import rcmpSelect from '../../../comComponents/rcmpSelect';
export default {
  name: 'rcmpDictCodeSelect',
  extends: rcmpSelect,
  props: {
    busUrl: {
      type: String,
      default: '/getDictList'
    },
    // 多选 是否显示全选
    isCheckall: {
      type: Boolean,
      default: true
    },
    // 是否有搜索框
    filterable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    dictEntr: {
      type: String,
      default: ''
    },
    baseServer: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // session里面有的先从里面拿
    isSessionGet: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  created() {
    if (this.busUrl && this.optionList.length === 0) {
      this.urlPath =
        this.baseServer + this.busUrl + '?dict_entr=' + this.dictEntr;
    }
  }
};
</script>
