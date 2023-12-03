<template>
  <div class="album-list">
    <el-table :data="albumList" style="width: 100%" size="small">
      <el-table-column label="专辑图片" width="80" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center">
            <el-image
              style="width: 30px; height: 30px"
              :src="scope.row.picUrl"
              :previewSrcList="[scope.row.blurPicUrl]"
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
        label="专辑名称"
        minWidth="150"
      />
      <el-table-column
        showOverflowTooltip
        prop="company"
        label="公司"
        minWidth="120"
      />
      <el-table-column showOverflowTooltip prop="subType" label="类型" />
      <el-table-column showOverflowTooltip prop="publishTime" label="发布时间"
        :formatter="formatterDateFn"
      />
    </el-table>
    <SimplePagination
      :pages="pages"
      :loading="loading"
      @change="getSingerAlbum"
    />
  </div>
</template>

<script lang="ts" setup>

import { defineProps, reactive, ref, onMounted } from 'vue'
import service from '@/plugins/axios'
import { useFormatDate } from '@/hooks/useFormatDate'

const props = defineProps({
  singerId: {
    type: String || Number,
    required: true
  }
})

const loading = ref(false)

const pages = reactive({
  pageIndex: 0,
  limit: 50,
  isMore: true
})

const { formatterDateFn } = useFormatDate()

const albumList = ref([])

const getSingerAlbum = () => {
  service.get(`/api/artist/album?id=${props.singerId}&limit=${pages.limit}&offset=${pages.pageIndex * pages.limit}`).then((res: any) => {
    pages.isMore = !!res.more
    const newList = res.hotAlbums || []
    albumList.value = albumList.value.concat(newList)
  })
}

onMounted(() => {
  getSingerAlbum()
})

</script>

<style lang="less" scoped>
.album-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
