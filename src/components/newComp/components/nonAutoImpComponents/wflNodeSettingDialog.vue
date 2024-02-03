<template>
  <h-msg-box
    v-model="config.isShow"
    :closable="true"
    :width="450"
    :title="config.title || '下一节点处理人设置'"
    @on-open="handleOnOpen"
    @on-close="handleClose"
    @on-cancel="handleClose"
  >
    <h-select
      v-model="nodeHandleUserIds"
      placeholder="请选择处理人"
      multiple
      isCheckall
      isString
    >
      <h-option
        v-for="(item, ids) in nodeHandlerList"
        :key="`${item.id}-${ids}`"
        :value="item.id"
        :label="item.name"
      />
    </h-select>
    <template slot="footer">
      <h-button @click="handleClose">取消</h-button>
      <h-button :loading="loading" type="primary" @click="handleSubmitSetting">确定</h-button>
    </template>
    <SelfLoading v-if="dataLoading" fix />
  </h-msg-box>
</template>

<script>
import services from '../../utils/services';
import SelfLoading from '../otherComponents/selfLoading';
export default {
  name: 'WflNodeSettingDialog',
  components: {
    SelfLoading
  },
  props: {
    config: {
      type: Object,
      required: false,
      default: _ => ({
        isShow: false,
        title: '下一节点处理人设置',
        item: {}
      })
    },
    wlServer: {
      type: String,
      required: false,
      default: _ => '/hsrcm/hsrcm-wfl-server/v'
    }
  },
  data() {
    return {
      dataLoading: false,
      loading: false,
      nodeHandleUserIds: '',
      nextNodeName: '',
      nodeHandlerList: []
    };
  },
  methods: {
    handleOnOpen() {
      const { action, processInstanceId, taskId } = this.config.item;
      if (!action || !processInstanceId || !taskId) {
        this.$hMessage.warning('传入信息不完整，请确定');
        return;
      }
      const params = {
        action_value: action.value,
        process_instance_id: processInstanceId,
        task_id: taskId
      };
      this.getNextNodeName(params);
      this.getNodeHandlerList(params);
    },
    getNextNodeName(params) {
      this.dataLoading = true;
      services.get(`${this.wlServer}/getNextNodeName`, params).then(res => {
        this.nextNodeName = res.result || '';
      }).finally(_ => {
        this.dataLoading = false;
      });
    },
    getNodeHandlerList(params) {
      this.dataLoading = true;
      services.get(`${this.wlServer}/findNextCandidatesByInstanceNodeName`, params).then(res => {
        this.nodeHandlerList = res.result || [];
      }).finally(_ => {
        this.dataLoading = false;
      });
    },
    handleClose() {
      this.config.isShow = false;
      this.nodeHandleUserIds = '';
      this.config.item = {};
      this.nodeHandlerList = [];
    },
    setLoadingStatus(status) {
      this.loading = !!status;
    },
    handleSubmitSetting() {
      const { action, processNodeInfo } = this.config.item;
      const actionValue = action.value;
      const actionName = action.name;
      const activityName = processNodeInfo.activityName || processNodeInfo.activity_name;
      const othParams = {
        [`bpm_candidate_${this.nextNodeName || activityName}`]: this.nodeHandleUserIds || ''
      };
      this.$emit('submit', { actionValue, actionName, othParams }, this);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
