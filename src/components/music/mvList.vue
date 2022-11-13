<template>
  <div>
    <el-table :data="mvList" style="width: 100%" size="small">
      <el-table-column label="MV图片" width="80" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center">
            <el-image
              style="width: 30px; height: 30px"
              :src="scope.row.imgurl"
              :previewSrcList="[scope.row.imgurl16v9]"
              :initialIndex="4"
              previewTeleported
              fit="cover"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column
        showOverflowTooltip
        prop="name"
        label="MV名称"
        minWidth="150"
      >
        <template #default="scope">
          <span class="actives" @click="handleTargetPlayMv(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        showOverflowTooltip
        prop="artistName"
        label="作者"
      />
      <el-table-column
        showOverflowTooltip
        prop="playCount"
        label="播放次数"
        minWidth="120"
      />
      <el-table-column
        showOverflowTooltip
        prop="duration"
        label="时长"
        :formatter="formatTime2HMSFn"
      />
      <el-table-column showOverflowTooltip prop="publishTime" label="发布时间" />
    </el-table>
    <SimplePagination
      :pages="pages"
      :loading="loading"
      @change="getMvList"
    />
  </div>
</template>

<script lang='ts' setup>
// import VideoItem from '@/components/music/videoItem.vue'
import { defineProps, reactive, ref } from 'vue'
import service from '@/plugins/axios'
import { useFormatDate } from '@/hooks/useFormatDate'

const props = defineProps({
  singerId: {
    type: String || Number,
    required: true,
    default: ''
  }
})
const mvList = ref([])
const loading = ref(false)
const pages = reactive({
  pageIndex: 0,
  limit: 50,
  isMore: true
})

const { formatTime2HMSFn } = useFormatDate()

const getMvList = () => {
  service.get(`/api/artist/mv?id=${props.singerId}&limit=${pages.limit}&offset=${pages.pageIndex * pages.limit}`).then((res: any) => {
    pages.isMore = !!res.hasMore
    mvList.value = mvList.value.concat(res.mvs)
  }).finally(() => {
    loading.value = false
  })
}

const handleTargetPlayMv = (info) => {
  console.log(info)
  // /mv/detail
  service.get(`/api/mv/url?id=${info.id}`).then((res: any) => {
    console.log(res)
  }).finally(() => {
  })
}
getMvList()
</script>

<style lang="less" scoped>
</style>
