<script>
// 业务标识控件实现，原businessFlag
import rcmpSelect from '../../../comComponents/rcmpSelect'
export default {
  name: 'rcmpBusinessFlag',
  extends: rcmpSelect,
  props: {
    busUrl: {
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
  }
}
</script>
