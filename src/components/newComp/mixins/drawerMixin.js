import { oneOf } from '../utils/tools.js'
export default {
  props: {
    showDrawer: {
      type: Boolean,
      default: false
    },
    drawerTitle: {
      type: String,
      default: '预警明细信息'
    },
    drawerWidth: {
      type: [Number, String],
      default: 256
    },
    drawerHeight: {
      type: [Number, String],
      default: 256
    },
    drawerClosable: {
      type: Boolean,
      default: true
    },
    drawerMaskClosable: {
      type: Boolean,
      default: false
    },
    drawerMask: {
      type: Boolean,
      default: false
    },
    drawerMaskStyle: {
      type: Object
    },
    drawerStyles: {
      type: Object
    },
    drawerScrollable: {
      type: Boolean,
      default: false
    },
    drawerPlacement: {
      validator (value) {
        return oneOf(value, ['left', 'right', 'down', 'up'])
      },
      default: 'right'
    },
    drawerTransfer: {
      type: Boolean,
      default () {
        return !this.$IVIEW || this.$IVIEW.transfer === ''
          ? true
          : this.$IVIEW.transfer
      }
    },
    drawerClassName: {
      type: String
    },
    drawerInner: {
      type: Boolean,
      default: false
    },
    drawerFullScreen: {
      type: Boolean,
      default: true
    },
    drawerPin: {
      type: Boolean,
      default: true
    },
    drawerHandleClose: {
      type: Function,
      default: () => { }
    },
    drawerOnVisibleChange: {
      type: Function,
      default: () => { }
    },
    // 按钮权限
    btnRightCode: {
      type: Object,
      default: () => { return {}; }
    }
  }
}
