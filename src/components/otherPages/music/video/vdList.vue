<template>
  <div class="vd-list-box">
    <el-scrollbar v-if="vdList && vdList.length > 0" class="vd-list-scrollbar">
      <div class="vd-list-wrap">
        <template v-if="vdList && vdList.length">
          <VdItem
            v-for="item in vdList"
            :key="item.id"
            class="mv-list-item"
            :config="item"
          />
        </template>
        <template v-if="vdList && vdList.length - 2 > 0">
          <em
            v-for="(item, ids) in Array(vdList.length - 2)"
            :key="`item-placeholder-${ids}`"
            class="item-list-placeholder"
          ></em>
        </template>
        <SimplePagination
          v-if="pages.isMore"
          :pages="pages"
          :loading="loading"
          @change="handleMore"
        />
      </div>
    </el-scrollbar>
    <SelfEmpty v-else />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import VdItem from '@/components/music/video/vdItem.vue'
import services from '@/plugins/axios'

// eslint-disable-next-line no-undef
defineEmits('update:queryInfo')
// eslint-disable-next-line no-undef
const props = defineProps({
  apiUrl: {
    type: String,
    required: true,
    default: ''
  },
  queryInfo: {
    type: Object,
    required: false,
    default() {
      return {
        area: '',
        type: ''
      }
    }
  }
})
const loading = ref(false)
const vdList = ref([])
const pages = reactive({
  pageIndex: 0,
  limit: 30,
  isMore: false
})

const getMvList = (pageIndex?: number) => {
  loading.value = true
  if (pageIndex || pageIndex === 0) {
    pages.pageIndex = pageIndex
  }
  const params: any = {
    ...props.queryInfo,
    offset: pages.pageIndex * pages.limit,
    limit: pages.limit
  }
  const areaAllIsEmpty = ['/api/mv/first', '/api/top/mv']
  if (areaAllIsEmpty.includes(props.apiUrl) && props.queryInfo?.area === '全部') {
    params['area'] = ''
  }
  services.get(props.apiUrl, params).then((res: any) => {
    const newList = res.data || res || []
    if (pages.pageIndex !== 0) {
      vdList.value = vdList.value.concat(newList)
    } else {
      vdList.value = newList
    }
    pages.isMore = res.hasMore || res.more
  }).finally(() => {
    loading.value = false
  })
}

const handleMore = () => {
  getMvList()
}

getMvList()

// eslint-disable-next-line no-undef
defineExpose({ getMvList: getMvList })

</script>

<style lang="less" scoped>
.vd-list-box {
  width: 100%;
  height: 100%;
}
.vd-list-scrollbar {
  padding: 0 15px;
  border-radius: 8px;
  .vd-list-wrap {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    min-width: 600px;
    height: 100%;
    padding-bottom: 15px;
    padding-right: 12px;
    box-sizing: border-box;
    .mv-list-item {
      //align-content: flex-start;
      margin-right: 8px;
      margin-bottom: 10px;
    }
    .item-list-placeholder {
      width: 240px;
      margin-right: 8px;
    }
  }
}

</style>
