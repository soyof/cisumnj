<template>
  <h-button v-bind="$attrs" v-on="event"><slot></slot></h-button>
</template>
<script>
export default {
  name: 'ThrottleButton',
  props: {
    throttleTime: {
      type: Number | String,
      required: false,
      default: 1000
    }
  },
  data() {
    return {
      timer: null
    }
  },
  computed: {
    event() {
      if (this.$listeners.click) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.$listeners.click = this.handleThrottle('click')
      }
      return this.$listeners
    }
  },
  methods: {
    handleThrottle(eventName) {
      const _this = this
      const throttleTime = +this.throttleTime || 1000
      return (...args) => {
        if (!_this.timer) {
          _this.$emit(eventName, ...args)
          _this.timer = setTimeout(() => {
            _this.timer = null
          }, throttleTime)
        } else {
          _this.$emit('frequently', ...args)
        }
      }
    }
  }
}
</script>
