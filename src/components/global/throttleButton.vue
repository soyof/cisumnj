<template>
  <el-button v-if="isBtn" @click="handleThrottle('click')">
    <slot></slot>
  </el-button>
  <el-tag v-else @click="handleThrottle('click')">
    <slot></slot>
  </el-tag>
</template>

<script>
export default {
  name: 'ThrottleButton',
  props: {
    throttleTime: {
      type: Number || String,
      required: false,
      default: 1000
    },
    isBtn: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      timer: null
    }
  },
  methods: {
    handleThrottle(eventName) {
      const throttleTime = +this.throttleTime || 1000
      return (...args) => {
        if (!this.timer) {
          this.$emit(eventName, ...args)
          this.timer = setTimeout(() => {
            this.timer = null
          }, throttleTime)
        } else {
          // this.$emit('frequently', ...args)
        }
      }
    }
  }
}
</script>
