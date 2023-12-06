<template>
  <h-button v-bind="$attrs" v-on="event"><slot></slot></h-button>
</template>
<script>
export default {
  name: 'DebounceButton',
  props: {
    debounceTime: {
      type: Number | String,
      required: false,
      default: 1000
    },
    debounceType: {
      type: Number,
      required: false,
      default: 1 // 1: 普通防抖函数   2: 立即执行的防抖函数
    }
  },
  data() {
    return {
      timer: null
    };
  },
  computed: {
    event() {
      if (this.$listeners.click) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.$listeners.click = this.handleThrottle('click');
      }
      return this.$listeners;
    }
  },
  methods: {
    handleThrottle(eventName) {
      const _this = this;
      const debounceTime = +this.debounceTime || 1000;
      return (...args) => {
        if (this.debounceType === 1) {
          if (_this.timer) clearTimeout(_this.timer);
          _this.timer = null;
          _this.timer = setTimeout(() => {
            _this.$emit(eventName, ...args);
            _this.timer = null;
          }, debounceTime);
        } else {
          if (_this.timer) clearTimeout(_this.timer);
          const callNow = !_this.timer;
          _this.timer = setTimeout(() => {
            _this.timer = null;
          }, debounceTime);
          if (callNow) _this.$emit(eventName, ...args);
        }
      };
    }
  }
};
</script>
