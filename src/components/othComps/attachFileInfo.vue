<template>
  <div class="attach-file-info">
    <h-upload
      v-if="isShowUpload && !isRead"
      :action="uploadFileUrl"
      :with-credentials="true"
      :data="data"
      :before-upload="beforeUploadFile"
      :on-progress="handleProgressFn"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-format-error="uploadFormatError"
      :on-exceeded-size="uploadExceededSize"
      :show-upload-list="false"
      :showErrorlist="false"
      :max-size="uploadFileSize"
      :type="uploadType"
      :accept="accept"
      :class="uploadBoxClassName"
      v-bind="$attrs"
      ref="attachUpload"
      name="file"
    >
      <slot name="uploadBtn">
        <div v-if="isBtnUpload" class="upload-btn-wrap-line">
          <h-button :loading="uploadLoading">{{ uploadBtnTxt }}</h-button>
        </div>
        <div v-else class="upload-btn-wrap">
          <h-icon name="upload" size="52" class="upload-icon-color" />
          <p>点击或将文件拖拽到这里上传</p>
          <p v-if="isShowAcceptTypeTips" class="upload-btn-wrap-tips">支持{{ accept }}格式文件上传</p>
        </div>
      </slot>
      <div slot="tip">
        <slot name="tip"></slot>
      </div>
    </h-upload>
    <h-table
      v-if="(isShowFileList && !isEmptyFile) || isRead"
      :loading="fileLoading || uploadLoading"
      :columns="columns"
      :data="fileList"
      :class="['file-table-wrap', isRead ? 'file-list-read' : '']"
      showTitle
    />
    <SelfLoading
      v-if="uploadLoading && !isBtnUpload"
      loadingText="文件上传中..."
      fix
    />
  </div>
</template>

<script>
import SelfLoading from './selfLoading';
import services from '../../utils/services';
import Cookies from 'js-cookie';
import { getValueType } from '../../utils/utils';
export default {
  name: 'AttachFileInfo',
  components: {
    SelfLoading
  },
  model: {
    prop: 'fileList',
    event: 'change'
  },
  props: {
    fileList: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    uploadType: {
      type: String,
      required: false,
      default: 'select',
      validator: value => ['select', 'drag'].includes(value)
    },
    isShowFileList: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowUpload: {
      type: Boolean,
      required: false,
      default: true
    },
    isRead: {
      type: Boolean,
      required: false,
      default: false
    },
    maxSize: {
      type: Number,
      required: false,
      default: 204800
    },
    uploadFileUrl: {
      type: String,
      required: false,
      default: '/hsrcm/hsrcm-pbs-server/v/fileUpload'
    },
    delFileUrl: {
      type: String,
      required: false,
      default: '/hsrcm/hsrcm-pbs-server/v/fileDelete'
    },
    downloadFileUrl: {
      type: String,
      required: false,
      default: '/hsrcm/hsrcm-pbs-server/v/pbs/export/download'
    },
    fileGroup: {
      type: String,
      required: false,
      default: 'group1'
    },
    data: { // 上传时附带的额外参数
      type: Object,
      required: false,
      default: () => ({})
    },
    accept: {
      type: String,
      required: false,
      default: '.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.xml,.pdf,.rar,.zip,image/jpg,image/jpeg,image/png,.mp3,.mp4,.wav'
    },
    isFileEmptyShowTable: {
      type: Boolean,
      required: false,
      default: true
    },
    beforeUpload: {
      type: Function,
      required: false,
      default() {
        return _ => true;
      }
    },
    isBtnUpload: {
      type: Boolean,
      required: false,
      default: false
    },
    isGrayBgcForUploadArea: {
      type: Boolean,
      required: false,
      default: _ => false
    },
    pbsServer: {
      type: String,
      required: false,
      default() {
        return '/hsrcm/hsrcm-pbs-server/v';
      }
    },
    isShowUploadUser: {
      type: Boolean,
      required: false,
      default: false
    },
    isMaxFileSizeForApi: {
      type: Boolean,
      required: false,
      default: true
    },
    delFileFn: {
      type: Function,
      required: false,
      default: null
    },
    delFileList: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    isShowAcceptTypeTips: {
      type: Boolean,
      required: false,
      default: _ => false
    },
    downloadParams: {
      type: Object,
      required: false,
      default: _ => ({})
    },
    uploadBtnDefTxt: {
      type: String,
      required: false,
      default: _ => '文件上传'
    }
  },
  data() {
    return {
      fileLoading: false,
      uploadLoading: false,
      uploadFileSize: 204800
    };
  },
  computed: {
    isEmptyFile() {
      return (!this.fileList || this.fileList.length === 0) && !this.isFileEmptyShowTable;
    },
    columns() {
      const columns = [
        { type: 'index', title: '序号', width: 60 },
        { key: 'file_name', title: '文件名称', ellipsis: true },
        { key: 'upload_time', title: '上传时间', width: 160 },
        { key: 'operaKey', title: '操作', width: 110, render: this.handleFileOperaRender }
      ];
      if (this.isShowUploadUser) {
        columns.splice(3, 0, { key: 'upload_user', title: '上传人', width: 160 });
      }
      return columns;
    },
    uploadBtnTxt() {
      return this.uploadLoading ? '上传中...' : (this.uploadBtnDefTxt || '文件上传');
    },
    uploadBoxClassName() {
      if (this.isBtnUpload) {
        return '';
      }
      return this.isGrayBgcForUploadArea ? 'attach-file-upload-wrap is-gray-bgc' : 'attach-file-upload-wrap';
    }
  },
  watch: {
    uploadLoading(val) {
      this.$emit('uploadChange', val);
    }
  },
  created() {
    this.isMaxFileSizeForApi && this.getUploadFileMaxSize();
  },
  methods: {
    getUploadFileMaxSize() {
      services.get(`${this.pbsServer}/fileProperties`).then(res => {
        if (res.result && res.result.maxFileSize) {
          this.uploadFileSize = res.result.maxFileSize * 1024;
        } else {
          this.uploadFileSize = this.maxSize;
        }
      });
    },
    handleFileOperaRender(h, params) {
      const downloadBtn = h('a', {
        attrs: {
          href: 'javascript:;'
        },
        style: {
          'marginRight': '8px'
        },
        on: {
          click: _ => this.handleDownloadFile(params.row)
        }
      }, '下载');
      const deleteBtn = h('a', {
        attrs: {
          href: 'javascript:;'
        },
        on: {
          click: _ => this.handleDeleteFile(params.row)
        }
      }, '删除');
      let domList = [downloadBtn, deleteBtn];
      if (this.isRead) {
        domList = [downloadBtn];
      }
      return h('div', {}, domList);
    },
    handleDownloadFile(file) {
      services.getDownload(this.downloadFileUrl, {
        file_group: this.fileGroup,
        file_path: file.url || file.file_path,
        file_name: file.name || file.file_name,
        create_user: Cookies.get('operator_code'),
        ...(this.downloadParams || {})
      });
    },
    handleDeleteFile(file) {
      if (this.delFileFn) {
        this.delFileFn(file);
        return;
      }
      if (!file || file.length === 0) return;
      this.fileLoading = true;
      services.post(this.delFileUrl, {
        file_group: this.fileGroup,
        file_path: file.url || file.file_path,
        file_name: file.name || file.file_name
      }).then((res) => {
        this.$hMessage.success('删除成功！');
        const ids = this.fileList.findIndex(item => (item.url === file.url && item.name === file.name));
        (ids > -1) && this.fileList.splice(ids, 1);
        this.$emit('change', this.fileList);
      }).finally(_ => {
        this.fileLoading = false;
      });
    },
    beforeUploadFile(file) {
      if (this.fileLoading) {
        this.$hMessage.warning('已有文件正在上传中，请等待上传成功后再继续!');
        return false;
      }
      if (this.beforeUpload) {
        return this.beforeUpload(file);
      }
      return true;
    },
    handleProgressFn(event, file, fileList) {
      if (!this.fileLoading) {
        this.fileLoading = true;
        this.uploadLoading = true;
      }
      this.$emit('uploading');
    },
    uploadSuccess(response, file) {
      this.fileLoading = false;
      this.uploadLoading = false;
      this.$emit('uploadSuccess');
      if (response.error_code === '' || response.errorCode === '') {
        if (getValueType(response.result) === 'object') {
          this.fileList.push({
            file_id: ' ',
            file_code: response.result.file_code,
            name: response.result.file_name,
            file_name: response.result.file_name,
            url: response.result.file_path,
            file_path: response.result.file_path,
            file_group: response.result.file_group,
            upload_time: response.result.upload_time,
            upload_user: response.result.upload_user,
            uid: file.uid
          });
        }
        this.$emit('change', this.fileList);
        this.$emit('uploadSuccess', this.fileList);
        this.$hMessage.success('已上传成功!');
      } else {
        this.uploadError(response);
      }
    },
    uploadError(response) {
      this.fileLoading = false;
      this.uploadLoading = false;
      const errorMessage = response.error_message || response.errorMessage;
      this.$emit('uploadError', errorMessage);
      this.$hMessage.error(errorMessage ? `上传失败，${response.error_message || response.errorMessage}` : '上传失败');
    },
    uploadFormatError(file, fileList) {
      this.fileLoading = false;
      this.uploadLoading = false;
      this.$emit('uploadFormatError', file, fileList);
      this.$hMessage.error('文件格式不支持');
    },
    uploadExceededSize(file, fileList) {
      this.fileLoading = false;
      this.uploadLoading = false;
      this.$emit('uploadExceededSize', file, fileList);
      this.$hMessage.error(`文件不能超过${Math.floor(this.uploadFileSize / 1024)}M`);
    },
    handleLastDelFile() {
      if (this.delFileList && this.delFileList.length > 0) {
        this.delFileList.forEach(file => {
          services.post(this.delFileUrl, {
            file_group: this.fileGroup,
            file_path: file.url || file.file_path,
            file_name: file.name || file.file_name
          }).then(_ => {
            const ids = this.fileList.findIndex(item => (item.url === file.url && item.name === file.name));
            (ids > -1) && this.fileList.splice(ids, 1);
            this.$emit('change', this.fileList);
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.attach-file-info {
  position: relative;
  /deep/ .attach-file-upload-wrap {
    .h-upload-click-wrapper {
      width: 100%;
      .h-upload-drag {
        width: 100%;
      }
    }
    &.is-gray-bgc {
      background: #f7f7f7;
      border: 1px dashed #d9d9d9;
    }
  }

  .upload-btn-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
    padding: 20px 0;
    cursor: pointer;
    .upload-icon-color {
      color: #0055e5;
    }
    .upload-btn-wrap-tips {
      font-size: 12px;
      color: #bbb;
      line-height: 18px;
    }
  }
  .upload-btn-wrap-line {

  }
  .file-table-wrap {
    margin-top: 12px;
  }
  .file-list-read {
    margin-top: 0;
  }
}
</style>
