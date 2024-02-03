<script>
import rcmpTreeSelect from '../../../comComponents/rcmpTreeSelect'
export default {
  name: 'rcmpBranchTreeSelect',
  extends: rcmpTreeSelect,
  props: {
    busUrl: {
      type: String,
      default: 'xxx'
    }
  }
}
</script>
