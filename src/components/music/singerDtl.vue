<template>
  <div class="singer-dtl">
    content
  </div>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue'
import Api from '@/plugins/axios'
const service = Api.service

const props = defineProps({
  singerId: {
    type: String || Number,
    required: true
  }
})

const getSingerDetail = () => {
  service.get(`/api/artist/desc?id=${props.singerId}`).then(res => {
    console.log(res)
  })
}

getSingerDetail()

</script>

<style lang="less" scoped>
</style>
