<template>
  <h-msg-box
    v-model="isShow"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template>
      <slot></slot>
    </template>
    <slot name="header" #header></slot>
    <slot name="footer" #footer></slot>
    <slot name="close" #close></slot>
  </h-msg-box>
</template>

<script>
export default {
  name: 'DialogTemplate',
  model: {
    prop: 'isShow',
    event: 'change'
  },
  props: {
    isShow: {
      type: Boolean,
      required: false,
      default: _ => false
    }
  },
  data() {
    return {
      loading: false,
      formInfo: {
        test: ''
      }
    };
  },
  watch: {
    isShow(val) {
      this.$emit('change', this.isShow);
    }
  },
  methods: {
    handleClose() {
      this.handleResetData();
      this.$emit('close');
    }
  }
};
</script>
