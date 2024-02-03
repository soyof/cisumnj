<template>
  <div class="self-empty">
    <slot>
      <img v-if="showImg && imgUrl" :src="imgUrl" class="self-empty-no-data-img">
      <p class="self-empty-no-data-text">{{ noDataText }}</p>
    </slot>
  </div>
</template>

<script>

export default {
  name: 'SelfEmpty',
  props: {
    noDataText: {
      type: String,
      required: false,
      default: '暂无数据'
    },
    showImg: {
      type: Boolean,
      required: false,
      default: false
    },
    imgUrl: {
      type: String,
      required: false,
      default: require('./empty.svg')
    }
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
.self-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #999;
  user-select: none;
  .self-empty-no-data-img {
    display: block;
    width: 80px;
    height: 80px;
    user-select: none;
    cursor: default;
    pointer-events: none;
  }
  .self-empty-no-data-text {
    line-height: 20px;
    margin-top: 3px;
  }
}
</style>
