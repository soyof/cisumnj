<script>
import rcmpZTreeSelect from "../../../comComponents/rcmpZTreeSelect";
export default {
  name: "rcmpRiskTypeTreeSelect",
  extends: rcmpZTreeSelect,
  props: {
    busUrl: {
      type: String,
      default: "xxx"
    },
    filterable: {
      type: Boolean,
      default: true
    },
    remote: {
      type: Boolean,
      default: false
    }
  }
};
</script>
