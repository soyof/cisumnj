<template>
  <div>
    <h-drawer
      v-model="value"
      :width="width"
      :height="height"
      :title="title"
      :closable="closable"
      :mask-closable="maskClosable"
      :mask="mask"
      :mask-style="maskStyle"
      :styles="styles"
      :scrollable="scrollable"
      :placement="placement"
      :transfer="transfer"
      :class-name="className"
      :inner="inner"
      ref="detialDrawer"
      class="detialDrawer"
      @on-close="handleClose"
      @on-visible-change="onVisibleChange"
    >
      <div slot="header">
        <div>
          {{ title }}
          <a
            v-if="fullScreen"
            class="h-drawer-close"
            style="float: right; margin-right: 26px; margin-top: 4px"
            @click="toggleFullscreen"
          >
            <Icon :name="fullscreenFlag ? 'narrow' : 'fullscreen'" />
          </a>
          <a
            v-if="pin"
            class="h-drawer-close"
            style="float: right; margin-right: 52px; margin-top: 4px"
            @click="togglePin"
          >
            <!-- <Icon :name="pinFlag ? 'pin' : 'android-star-outline'"></Icon> -->
            <Icon :name="pinFlag ? 't-b-locking' : 't-b-unlock'" />
          </a>
        </div>
      </div>
      <template>
        <slot name="drawerBody"></slot>
      </template>
    </h-drawer>
  </div>
</template>
<script>
import { oneOf } from '../../../../utils/tools.js';
import { on, off } from '../../../../utils/api/commonUtil.js';

export default {
  name: 'rcmpDrawer',
  props: {
    showDrawer: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    width: {
      type: [Number, String],
      default: 256
    },
    height: {
      type: [Number, String],
      default: 256
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    mask: {
      type: Boolean,
      default: false
    },
    maskStyle: {
      type: Object
    },
    styles: {
      type: Object
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    placement: {
      validator(value) {
        return oneOf(value, ['left', 'right', 'down', 'up']);
      },
      default: 'right'
    },
    transfer: {
      type: Boolean,
      default() {
        return !this.$IVIEW || this.$IVIEW.transfer === ''
          ? true
          : this.$IVIEW.transfer;
      }
    },
    className: {
      type: String
    },
    inner: {
      type: Boolean,
      default: false
    },
    fullScreen: {
      type: Boolean,
      default: true
    },
    pin: {
      type: Boolean,
      default: true
    },
    handleClose: {
      type: Function,
      default: () => {}
    },
    onVisibleChange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      fullscreenFlag: false,
      drawerWidth: '50%',
      pinFlag: false,
      value: false
    };
  },
  computed: {},
  watch: {
    value(val) {
      this.$emit('update:showDrawer', val);
    },
    showDrawer(val) {
      this.value = val;
    }
  },
  mounted() {
    // 侧边抽屉可拖动改变大小
    const drag = this.$refs.detialDrawer.$el.getElementsByClassName(
      'h-drawer h-drawer-right'
    )[0];
    drag.style.width = '50%';
    on(drag, 'mousedown', this.resizeDrawer);
    // 侧边抽屉内鼠标点下后移动不改变抽屉大小
    on(
      this.$refs.detialDrawer.$el.getElementsByClassName('h-drawer-header')[0],
      'mousedown',
      (e) => {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
      }
    );
    on(
      this.$refs.detialDrawer.$el.getElementsByClassName('h-drawer-body')[0],
      'mousedown',
      (e) => {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
      }
    );
    on(
      this.$refs.detialDrawer.$el.getElementsByClassName('h-drawer-close')[0],
      'mousedown',
      (e) => {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
      }
    );
    this.addDrawerEvent();
  },
  created() {
    this.value = this.showDrawer;
  },
  activated() {
    const drag = this.$refs.detialDrawer.$el.getElementsByClassName(
      'h-drawer h-drawer-right'
    )[0];
    on(drag, 'mousedown', this.resizeDrawer);
  },
  deactivated() {
    const drag = this.$refs.detialDrawer.$el.getElementsByClassName(
      'h-drawer h-drawer-right'
    )[0];
    off(drag, 'mousedown', this.resizeDrawer);
  },
  destroyed() {},
  beforeDestroy() {
    const drag = this.$refs.detialDrawer.$el.getElementsByClassName(
      'h-drawer h-drawer-right'
    )[0];
    off(drag, 'mousedown', this.resizeDrawer);
  },
  methods: {
    resizeDrawer(event) {
      const drag = this.$refs.detialDrawer.$el.getElementsByClassName(
        'h-drawer h-drawer-right'
      )[0];
      event = event || window.event; // 兼容IE浏览器
      //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      if (typeof drag.setCapture !== 'undefined') {
        drag.setCapture();
      }
      const self = this;
      document.onmousemove = function(event) {
        event = event || window.event;
        let moveX = window.innerWidth - event.clientX;
        if (moveX < 200) {
          moveX = 200;
        } else if (moveX > window.innerWidth) {
          moveX = window.innerWidth;
        }
        drag.style.width = (moveX * 100) / window.innerWidth + '%';
        self.drawerWidth = (moveX * 100) / window.innerWidth + '%';
      };
      document.onmouseup = function(event) {
        this.onmousemove = null;
        this.onmouseup = null;
        // 修复低版本ie bug
        if (typeof drag.releaseCapture !== 'undefined') {
          drag.releaseCapture();
        }
      };
    },
    windowClickEvent(e) {
      e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
      this.$emit('update:showDrawer', false);
    },
    drawerClickEvent(e) {
      e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
    },
    addDrawerEvent() {
      this.pinFlag = false;
      on(window, 'click', this.windowClickEvent);
      on(this.$refs.detialDrawer.$el, 'click', this.drawerClickEvent);
    },
    delDrawerEvent() {
      this.pinFlag = true;
      off(window, 'click', this.windowClickEvent);
      off(this.$refs.detialDrawer.$el, 'click', this.drawerClickEvent);
    },
    toggleFullscreen() {
      this.fullscreenFlag = !this.fullscreenFlag;
      this.$refs.detialDrawer.$el.getElementsByClassName(
        'h-drawer h-drawer-right'
      )[0].style.width = this.fullscreenFlag ? '100%' : this.drawerWidth;
    },
    togglePin() {
      this.pinFlag = !this.pinFlag;
      this.pinFlag ? this.delDrawerEvent() : this.addDrawerEvent();
    },
    changePin() {
      if (!this.pinFlag) {
        this.pinFlag = true;
        this.delDrawerEvent();
      }
    }
  }
};
</script>
<style>
.detialDrawer .h-drawer-body {
  padding: 8px 16px;
}
.detialDrawer .h-drawer-body .h-tabs-content .h-tabs-tabpane .dataGrid {
  width: calc(100% - 2px);
}

.detialDrawer .h-form-row .h-form-item.no-label.absolute {
  position: absolute;
  right: 0;
  bottom: 0;
}
.detialDrawer .h-drawer {
  cursor: w-resize;
}
.detialDrawer .h-drawer-header {
  cursor: default;
  padding: 14px;
  margin: 0 2px;
}
.detialDrawer .h-drawer-body {
  cursor: default;
  padding: 8px 14px;
  margin: 0 2px;
}
.black .detialDrawer .h-drawer-content {
  background-color: #19212c;
  color: #fff;
}
</style>
