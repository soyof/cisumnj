<script>
import { deepCopy } from '../../../../utils/tools.js';
import httpFetch from '../../../../utils/api/api.js';
import { SelectTree, Checkbox } from 'h_ui';

export default {
  name: 'rcmpTreeSelect',
  components: { SelectTree, Checkbox },
  mixins: [SelectTree],
  props: {
    busUrl: {
      type: String,
      default: ''
    },
    methodType: {
      type: String,
      default: 'get'
    }
  },
  data() {
    return {};
  },
  mounted() {
    // 如果有请求，根据配置的请求获取数据
    this.requestData();
  },
  methods: {
    requestData() {
      if (this.busUrl && this.data.length === 0) {
        httpFetch({
          url: this.busUrl,
          method: this.methodType,
          data: this.params,
          noFormat: true,
          responseType: 'text'
        }).then(result => {
          if (result.data.error_code) {
            this.$hMessage.error(result.data.error_message || '获取数据失败！');
            return;
          }
          const response = result.data.result;
          if (response && response.length > 0) {
            // this.data = response
            this.baseDate = this.expandLevels(deepCopy(response));
          }
        });
      }
    }
  }
};
</script>
