<script>
import rcmpZTreeSelect from '../../../comComponents/rcmpZTreeSelect'
export default {
  name: 'rcmpAmsFundAccountTreeSelect',
  extends: rcmpZTreeSelect,
  props: {
    busUrl: {
      type: String,
      default: 'xxx'
    },
    filterable: {
      type: Boolean,
      default: true
    },
    isTreeFilter: {
      type: Boolean,
      default: false
    }
  },
  mounted () {}
}
</script>
