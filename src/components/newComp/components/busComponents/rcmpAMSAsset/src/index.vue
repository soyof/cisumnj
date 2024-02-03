<script>
// 资产单元控件实现，原AMSAsset
import rcmpSelect from '../../../comComponents/rcmpSelect'
export default {
  name: 'rcmpAMSAsset',
  extends: rcmpSelect,
  props: {
    busUrl: {
      type: String,
      default: ''
    },
    dictEntr: {
      type: String,
      default: ''
    },
    isCheckall: {
      // 多选 是否显示全选
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  created () {
    this.urlPath = this.busUrl ? this.busUrl : '/aaa'
  }
}
</script>
