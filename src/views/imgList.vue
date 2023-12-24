<template>
  <div class="img-list">
    <div class="img-list-header">
      <ThrottleButton type="primary" round @click="getImgListRandom">
        随机
      </ThrottleButton>
      <ThrottleButton type="danger" round @click="getImgListPages">
        列表
      </ThrottleButton>
    </div>
    <div v-if="imgList && imgList.length > 0" class="img-list-wrap">
      <el-image
        v-for="(item, ids) in imgList"
        :key="item.imageUrl"
        :src="item.imageUrl"
        :previewSrcList="previewUrls(ids)"
        loading
        lazy
      />
    </div>
    <SimplePagination
      v-if="type === 2"
      :pages="pages"
      :loading="loading"
      @change="getImgListPages"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import SimplePagination from '@/components/global/simplePagination.vue'
import ThrottleButton from '@/components/global/throttleButton.vue'
import { ROLL_TOOLS_APP_ID, ROLL_TOOLS_APP_SECRET } from '@/dic'
import services from '@/plugins/axios'

const imgList: any = ref([])
const loading = ref(false)
const type = ref(1)
const pages = reactive({
  pageIndex: 1,
  isMore: true
})

const getImgListRandom = () => {
  if (type.value === 2) {
    imgList.value = []
  }
  type.value = 1
  pages.pageIndex = 0
  loading.value = true
  services.get('https://www.mxnzp.com/api/image/girl/list/random', {
    app_id: ROLL_TOOLS_APP_ID,
    app_secret: ROLL_TOOLS_APP_SECRET
  }).then((res: any) => {
    imgList.value = res.data || []
  }).finally(() => {
    loading.value = false
  })
}

const getImgListPages = () => {
  if (type.value === 1) {
    imgList.value = []
  }
  type.value = 2
  loading.value = true
  services.get('https://www.mxnzp.com/api/image/girl/list', {
    app_id: ROLL_TOOLS_APP_ID,
    app_secret: ROLL_TOOLS_APP_SECRET,
    page: pages.pageIndex
  }).then((res: any) => {
    // console.log(res.data)
    const result = res.data
    imgList.value = [
      ...imgList.value,
      ...result || []
    ]
  }).finally(() => {
    loading.value = false
  })
}

const previewUrls = computed(() => {
  return (ids: number) => {
    const nextList = imgList.value.slice(ids, imgList.value.length).map((item: any) => item.imageUrl)
    const constPreList = imgList.value.slice(0, ids).map((item: any) => item.imageUrl).reverse()
    return [...nextList, ...constPreList]
  }
})

getImgListRandom()
</script>

<style lang="less" scoped>
.img-list {
  width: 100%;
  .img-list-header {
    margin-bottom: 8px;
  }
  .img-list-wrap {
    text-align: center;
    padding-bottom: 24px;
    min-height: @layout-pages-height;
  }
}
</style>
