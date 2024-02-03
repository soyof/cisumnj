<script>
import rcmpSelect from '../../../comComponents/rcmpSelect'
export default {
  name: 'rcmpAMSFundAccount',
  extends: rcmpSelect,
  props: {
    busUrl: {
      type: String,
      default: ''
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
    }
  },
  data () {
    return {}
  },
  created () {
    // if (this.busUrl && this.optionList.length === 0) {
    //    this.urlPath = this.busUrl + '?dict_entr=' + this.dictEntr
    // }
  }
}
</script>
