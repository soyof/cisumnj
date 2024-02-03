<template>
  <div class="wfCommon" style="position: relative">
    <wf-async-component
      v-if="loadStatus === 1"
      :showSaveBtn="showSaveBtn"
      :showActionBtn="showActionBtn"
      :hideRemark="hideRemark"
      :getBizUuid="getBizUuid"
      :Horn="WorkflowHorn"
      :viewMode="viewMode"
      :noticeSubmitMode="noticeSubmitMode"
      :enableFormTemplate="enableFormTemplate"
      :setFirstHumanNodeHideRemark="setFirstHumanNodeHideRemark"
      :checkForm="handleCheckForm"
      :getFormData="getFormData"
      :enableTraceInfoTab="enableTraceInfoTab"
      :enableProcessGraphTab="enableProcessGraphTab"
      :enableTimeConsumingInfoTab="enableTimeConsumingInfoTab"
      :class="['wf-common-wrap', viewMode ? 'wf-common-hide-footer-wrap' : '']"
      ref="todoTemp"
      @receiveData="receiveData"
    >
      <div :style="viewMode ? {height: '100%'} : {height: 'calc(100% - 50px)'} " class="workflow-form-wrap">
        <slot></slot>
      </div>
      <template v-if="isShowCustomBtn" slot="customBtnPanel">
        <slot name="preCustomBtnPanel"></slot>
        <template v-if="!isInitiate">
          <h-button
            v-for="action in actions"
            :key="action.value"
            @click="onSubmitForm(action.value, action.name, action)"
          >
            {{ action.name }}
          </h-button>
        </template>
        <template v-else>
          <h-button @click="closeWflTab">取消</h-button>
          <DebounceButton
            :debounceType="2"
            :loading="loading"
            type="primary"
            @click="onSubmitForm('', startBtnTxt)"
          >{{ startBtnTxt }}</DebounceButton>
        </template>
        <slot name="nextCustomBtnPanel"></slot>
      </template>
      <!-- 自定义标签页插槽，参考 http://rdcdocs.hundsun.com/pages/viewpage.action?pageId=13833666 -->
      <template v-for="num in 5" v-slot:[`tabPanel${num}`]>
        <slot :name="`tabPanel${num}`"></slot>
      </template>
    </wf-async-component>
    <SelfLoading v-if="loading" fix />
    <WflNodeSettingDialog
      v-if="isSupportSettingNodeHandler"
      :config="nodeHandlerConfig"
      :wlServer="wlServer"
      @submit="handleSubmitBySettingNodeHandler"
    />
  </div>
</template>

<script>
import SelfLoading from './selfLoading';
import DebounceButton from './debounceButton';
import WflNodeSettingDialog from '../nonAutoImpComponents/wflNodeSettingDialog';
import services from '../../utils/services';

export default {
  name: 'WorkflowTemplate',
  components: {
    SelfLoading,
    DebounceButton,
    WflNodeSettingDialog
  },
  props: {
    wlServer: {
      type: String,
      required: true,
      default: '/hsrcm/hsrcm-wfl-server/v'
    },
    isInitiate: { // 是否为发起节点
      type: Boolean,
      required: false,
      default: false
    },
    handleCheckForm: {
      type: Function,
      required: false,
      default() {
        return (flag) => {
          return true;
        };
      }
    },
    showSaveBtn: {
      type: Boolean,
      required: false,
      default: false
    },
    showActionBtn: {
      type: Boolean,
      required: false,
      default: false
    },
    hideRemark: {
      type: Boolean,
      required: false,
      default: true
    },
    enableFormTemplate: {
      type: Boolean,
      required: false,
      default: true
    },
    setFirstHumanNodeHideRemark: {
      type: Boolean,
      required: false,
      default: true
    },
    getFormData: {
      type: Function,
      required: false,
      default: _ => {}
    },
    submitForm: {
      type: Function,
      required: true
    },
    saveFormFunc: {
      type: Function,
      default: () => {
        return new Promise((resolve, reject) => {
          resolve(true);
        });
      }
    },
    enableTraceInfoTab: { // 是否显示留痕记录标签页
      type: Boolean,
      required: false,
      default: true
    },
    enableProcessGraphTab: { // 是否显示流程图标签页
      type: Boolean,
      required: false,
      default: true
    },
    enableTimeConsumingInfoTab: { // 是否显示耗时统计标签页
      type: Boolean,
      required: false,
      default: true
    },
    startProcessMenuId: {
      type: String,
      required: false,
      default: ''
    },
    startBtnTxt: {
      type: String,
      required: false,
      default: _ => '发起'
    },
    isSupportSettingNodeHandler: {
      type: Boolean,
      required: false,
      default: _ => false
    }
  },
  data() {
    return {
      processKey: '', // 流程号
      taskId: '', // 任务号
      processInstanceId: '', // 流程实例编号
      loadStatus: 0,
      loading: false,
      startBtnLoading: false,
      WorkflowHorn: {},
      isInfoSuccess: false,
      bizUuid: '',
      openType: 'start',
      viewMode: false,
      noticeSubmitMode: false,
      actions: [],
      processNodeInfo: {}, // 当前节点信息
      baseInfo: {},
      curClickNodeBtnInfo: {},
      nodeHandleParams: null,
      nodeHandlerConfig: {
        isShow: false,
        item: {}
      }
    };
  },
  computed: {
    isShowCustomBtn() {
      return !this.viewMode && !this.showActionBtn;
    }
  },
  created() {
    let paramsObj = this.$route.meta.menuArgs.main;
    const routeQuery = this.$route.query;
    const routeQueryMain = this.$route.query.main ? JSON.parse(this.$route.query.main) : {};
    if (paramsObj && paramsObj !== '') {
      paramsObj = JSON.parse(paramsObj);
    } else {
      paramsObj = {};
    }
    const newParamsObj = {
      ...paramsObj,
      ...routeQuery,
      ...routeQueryMain
    };
    const taskId = newParamsObj.taskId || '';
    this.processKey = newParamsObj.processKey || '';
    this.taskId = taskId;
    this.processInstanceId = newParamsObj.processInstanceId || '';
    const viewMode = newParamsObj.viewMode;
    if (viewMode) {
      this.viewMode = true;
    }
    const noticeSubmitMode = newParamsObj.noticeSubmitMode;
    const noticeId = newParamsObj.noticeId;
    if (noticeSubmitMode) {
      this.noticeSubmitMode = true;
    }
    this.WorkflowHorn.getUrlHost = () => {
      return window.WORKFLOW_CONFIG.WORKFLOWURL_HOME;
    };
    this.WorkflowHorn.getTaskId = () => {
      return taskId;
    };
    this.WorkflowHorn.getProcessKey = () => {
      return this.processKey;
    };
    this.WorkflowHorn.getNoticeId = () => {
      return noticeId;
    };
    this.$emit('wflCreated', this);
  },
  beforeMount() {
    this.resolveThirdPartyResources('workflow', 'workflowToDo').then((res) => {
      if (res) {
        this.$options.components['wf-async-component'] = res.default || res;
        this.loadStatus = 1;
      } else {
        this.loadStatus = -1;
      }
    });
  },
  mounted() {
    this.$emit('wflMounted', this);
  },
  methods: {
    getBizUuid() {
      // 获取业务唯一流水id
      return this.bizUuid;
    },
    getFormInfo(processInstanceId) {
      if (processInstanceId) {
        this.setLoadingStatus(true);
        services.post(`${this.wlServer}/getFormInfo`, {
          process_instance_id: processInstanceId,
          task_id: this.taskId
        }).then(res => {
          if (res && res.result) {
            this.baseInfo = res.result.form_info_object || {};
            this.$emit('getFormInfo', res.result.form_info_object || {}, this);
          }
        }).finally(_ => {
          this.setLoadingStatus(false);
          this.isInfoSuccess = true;
        });
      } else {
        this.$emit('getFormInfo', {}, this);
      }
    },
    receiveData(obj) {
      const routeInfo = this.$route.query;
      // 接收表单对象的一些信息，包含实例id，任务id，业务流水id等信息
      this.taskId = obj.taskId || routeInfo.taskId;
      this.processInstanceId = obj.processInstanceId || routeInfo.processInstanceId;
      this.processNodeInfo = obj.formInfo.processNodeInfoObj;
      this.openType = obj.formInfo.openType;
      this.bizUuid = obj.businessUuid || obj.processInstanceId || routeInfo.processInstanceId;
      this.actions = obj.formInfo.actions;
      this.getFormInfo(this.processInstanceId);
    },
    onSubmitForm(actionVal, actionName, action) {
      this.curClickNodeBtnInfo = { ...action };
      if (this.isSupportSettingNodeHandler && action && +action.assignNext === 1) { // 当assignNext为1时,需用户手动设置下一节点处理人
        // 仅校验表单是否必填,不进行流程提交处理
        this.submitForm(actionVal, actionName, this, false).then(_ => {
          // 打开设置下一节点处理人弹窗，并进行相关选择
          this.nodeHandlerConfig.item = {
            taskId: this.taskId,
            processNodeInfo: this.processNodeInfo,
            action: action,
            processInstanceId: this.processInstanceId
          };
          this.nodeHandlerConfig.isShow = true;
        });
      } else {
        this.handleSubmitFormToWfl(actionVal, actionName);
      }
    },
    // 点击设置节点处理人弹窗中确定按钮，进行流程表单内容提交
    handleSubmitBySettingNodeHandler(params, _this) {
      this.nodeHandleParams = params.othParams;
      _this.setLoadingStatus(true);
      this.handleSubmitFormToWfl(params.actionValue, params.actionName).then(_ => {
        this.curClickNodeBtnInfo = {};
        _this.handleClose();
        this.nodeHandleParams = null;
      }).finally(_ => {
        _this.setLoadingStatus(false);
      });
    },
    handleSubmitFormToWfl(actionVal, actionName) {
      this.startBtnLoading = true;
      return this.submitForm(actionVal, actionName, this, true).then(hsBpmRemark => {
        this.$refs['todoTemp'] && (this.$refs['todoTemp'].hsBpmRemark = hsBpmRemark || '');
        this.curClickNodeBtnInfo = {};
        this.closeWflTab();
        if (!this.isInitiate) {
          this.afterSubmitMethod();
          this.$hMsgBox.success({
            'title': '提示',
            'content': '成功提交任务'
          });
        } else {
          this.$hMsgBox.success({
            'title': '提示',
            'content': `${this.startBtnTxt}成功`
          });
        }
      }).finally(_ => {
        this.startBtnLoading = false;
      });
    },
    closeWflTab() {
      const initMenuId = this.$route.meta.menuArgs._menu_id || (this.isInitiate ? this.startProcessMenuId : `todoTask_${this.$route.meta.id}_${this.taskId}`);
      const menuId = this.$route.query.menuId ? this.$route.query.menuId : initMenuId;
      this.$emit('closeWflTab', this.isInitiate, menuId);
      menuId && this.$tabs.closeTab(menuId);
    },
    afterSubmitMethod() {
      const tabList = this.$store.state.root.skeleton.tabList;
      const menuId = this.$route.meta.menuArgs._menu_id || (this.isInitiate ? this.startProcessMenuId : `todoTask_${this.$route.meta.id}_${this.taskId}`);
      const curIds = tabList.findIndex(item => item.uuid === menuId);
      const preIds = curIds - 1;
      if (preIds > -1) {
        const refreshList = ['historyProcess', 'todoTask'];
        if (refreshList.includes(tabList[preIds].uuid)) {
          this.$tabs.refresh(tabList[preIds].uuid);
        }
      }
    },
    setLoadingStatus(flag) {
      this.loading = flag;
    },
    getNodeHandlerList(action) {
      services.get(`${this.wlServer}/findNextCandidatesByInstanceNodeName`, {
        action_value: action.value,
        process_instance_id: this.processInstanceId,
        task_id: this.taskId
      }).then(res => {
        this.nodeHandlerList = res.result || [];
      });
    },
    handleCancelByNodeHandler() {
      this.isShowHandlerForNode = false;
      this.nodeHandleUserIds = '';
      this.curClickNodeBtnInfo = {};
    }
  }
};
</script>

<style lang="scss" scoped>
.wfCommon {
  width: 100%;
  height: 100%;
  background: #fff;
  .wf-common-wrap {
    .workflow-form-wrap {
      width: 100%;
      height: calc(100% - 50px);
      padding: 0 16px;
      overflow: auto;
    }
  }
  /deep/ .wf-task-tab {
    .foot-opt {
      //bottom: 7px !important;
    }
  }
}
.wf-common-hide-footer-wrap {
  /deep/ .wf-task-tab {
    .foot-opt {
      display: none;
    }
  }
}
</style>
