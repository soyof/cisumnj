<!--
 * @Author: shihm30235
 * @Date: 2020-08-31 10:14:01
 * @LastEditTime: 2020-09-30 15:18:11
-->
<script>
import rcmpZTreeSelect from "../../../comComponents/rcmpZTreeSelect";
export default {
  name: "rcmpRiskItemTreeSelect",
  mixins: [rcmpZTreeSelect],
  props: {
    busUrl: {
      type: String,
      default: "xxx"
    },
    filterable: {
      type: Boolean,
      default: true
    },
    showBottom: {
      type: Boolean,
      default: true
    },
    onlyChild: {
      type: Boolean,
      default: true
    },
    remote: {
      type: Boolean,
      default: false
    }
  },
  mounted() {}
};
</script>
