<template>
  <h-spin v-bind="$attrs" class="self-loading">
    <slot>
      <h-icon name="load-c" size="18" class="self-loading-icon" />
      <div>{{ loadingText }}</div>
    </slot>
  </h-spin>
</template>

<script>
export default {
  name: 'SelfLoading',
  props: {
    loadingText: {
      type: String,
      required: false,
      default: 'Loading'
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .self-loading-icon {
  animation: ani-demo-spin 1s linear infinite;
  display: inline-block;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
