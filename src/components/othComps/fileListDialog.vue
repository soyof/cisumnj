<template>
  <h-msg-box
    :value="config.isShow"
    :title="config.title || '附件'"
    :width="width"
    :maxHeight="maxHeight"
    :maskClosable="maskClosable"
    transfer
    @on-close="handleClose"
    @on-cancel="handleClose"
  >
    <AttachFileInfo :fileList="config.fileList" isRead />
    <template #footer>
      <h-button @click="handleClose">关闭</h-button>
    </template>
  </h-msg-box>
</template>

<script>
import AttachFileInfo from './attachFileInfo';
export default {
  name: 'FileListDialog',
  components: {
    AttachFileInfo
  },
  props: {
    config: {
      type: Object,
      required: false,
      default() {
        return {
          isShow: false,
          fileList: [],
          title: '附件'
        };
      }
    },
    title: {
      type: String,
      required: false,
      default: '附件'
    },
    maskClosable: {
      type: Boolean,
      required: false,
      default: false
    },
    maxHeight: {
      type: Number,
      required: false,
      default: 700
    },
    width: {
      type: Number,
      required: false,
      default: 700
    }
  },
  methods: {
    handleClose() {
      this.config.isShow = false;
      this.config.fileList = [];
      this.config.title = '附件';
      this.$emit('close');
    }
  }
};
</script>

<style scoped>

</style>
