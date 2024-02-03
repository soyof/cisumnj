<template>
  <h-tooltip
    :delay="$attrs.delay || 500"
    v-bind="$attrs"
    :customTransferClassName="$attrs.customTransferClassName || 'self-tooltip-poper-wrap'"
    :transfer="($attrs.transfer || $attrs.transfer === false) ? $attrs.transfer : true"
    autoPlacement
  >
    <slot></slot>
    <slot slot="content" name="content"></slot>
  </h-tooltip>
</template>

<script>
export default {
  name: 'SelfTooltip',
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.self-tooltip-poper-wrap {
  max-width: 600px;
  max-height: 300px;
  overflow: hidden;
  .h-tooltip-content {
    max-width: 600px;
    max-height: 300px;
    overflow: hidden;
    .h-tooltip-inner {
      max-width: 600px;
      max-height: 300px;
      padding: 5px 8px;
      white-space: pre-wrap;
      word-break: break-all;
      line-height: 25px;
      overflow: auto;
    }
  }
}
</style>
