<script>
import rcmpSelect from '../../../comComponents/rcmpSelect'
export default {
  name: 'rcmpMarketCodeSelect',
  extends: rcmpSelect,
  props: {
    busUrl: {
      type: String,
      default: '/getDictList?dict_entr=B0027'
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
    }
  },
  data () {
    return {}
  },
  created () {
    if (this.busUrl && this.optionList.length === 0) {
      this.urlPath = this.baseServer + this.busUrl
    }
  }
}
</script>
