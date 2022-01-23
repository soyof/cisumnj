<template>
  <div class="self-empty">
    <div v-if="showImg" class="img">
      <img src="@/assets/images/empty_logo.png" alt="">
    </div>
    <div v-if="showTitle" class="text">
      {{ title }}
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    showImg: {
      type: Boolean,
      required: false,
      default: true
    },
    showTitle: {
      type: Boolean,
      required: false,
      default: true
    },
    title: {
      type: String,
      required: false,
      default: '暂无内容'
    }
  },
  data() {
    return {
    }
  }
})
</script>

<style lang="less" scoped>
.self-empty {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .center();

  .img {
    width: 150px;
    height: 150px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  .text {
    font-size: 14px;
    color: #ccc;
  }

}
</style>
