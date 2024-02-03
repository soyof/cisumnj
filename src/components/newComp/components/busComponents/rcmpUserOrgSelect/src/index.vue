<script>
import rcmpSimpleSelect from '../../../comComponents/rcmpSimpleSelect';
export default {
  name: 'rcmpUserOrgSelect',
  extends: rcmpSimpleSelect,
  props: {
    busUrl: {
      type: String,
      default: '/getUserAllOrgList'
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
    baseServer: {
      type: String,
      default: ''
    },
    labelField: {
      type: String,
      default: 'org_name'
    },
    valueField: {
      type: String,
      default: 'org_id'
    }
  },
  data() {
    return {};
  },
  created() {
    if (this.busUrl && this.optionList.length === 0) {
      this.urlPath = this.baseServer + this.busUrl;
    }
  }
};
</script>
