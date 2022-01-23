<template>
  <div class="singer-item">
    <div class="singer-item-avatar">
      <img :src="info.img1v1Url" alt="">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})
console.log(props.info.img1v1Url)
</script>

<style lang="less" scoped>
.singer-item {
  .singer-item-avatar {
    width: 130px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
