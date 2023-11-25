<template>
  <div v-loading="loading" class="music-score">
    <div class="music-info">
      <div class="music-name">
        {{ musicInfo.name }}
        <template v-if="musicInfo.ar && musicInfo.ar.length > 0">
          <el-tag
            v-for="item in musicInfo.ar"
            :key="item.id"
            class="mx-1"
            round
          >
            {{ item.name }}
          </el-tag>
        </template>
      </div>
    </div>
    <div class="music-score-wrap">
      <el-scrollbar v-if="musicScoreList && musicScoreList.length > 0">
        <el-space
          wrap
          alignment="stretch"
        >
          <div
            v-for="(item, ids) in musicScoreList"
            :key="`${item.id}-score-${ids}`"
            class="music-score-wrap-item"
          >
            <div class="music-score-type">
              {{ item?.name }} - {{ item?.playVersion }}
            </div>
            <el-image
              v-if="item?.coverImageUrl"
              :src="item?.coverImageUrl"
              :zoomRate="1.2"
              :maxScale="7"
              :minScale="0.2"
              :previewSrcList="[item?.coverImageUrl]"
              :initialIndex="4"
              loading="lazy"
              fit="cover"
            />
          </div>
        </el-space>
      </el-scrollbar>
      <el-empty v-else description="暂无内容" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import service from '@/plugins/axios'

const $route = useRoute()

const musicId = $route.params.musicId
const musicInfo = ref({})
const musicScoreList = ref([])
const loading = ref(true)

const getMusicScoreList = () => {
  service.get(`/api/sheet/list?id=${musicId}`).then((res :any) => {
    musicScoreList.value = res?.data?.musicSheetSimpleInfoVOS || []
  })
}

const getMusicDtl = () => {
  service.get(`/api/song/detail?ids=${musicId}`).then((res: any) => {
    musicInfo.value = res.songs[0] || {}
  })
}
loading.value = true
Promise.all([getMusicDtl(), getMusicScoreList()]).finally(() => {
  loading.value = false
})

</script>

<style scoped lang="less">
.music-score {
  width: 100%;
  height: @layout-pages-height;
  padding: 16px;
  box-sizing: border-box;
  .music-info {
    height: 30px;
    margin-bottom: 24px;
    .music-name {
      font-size: 24px;
    }
  }
  .music-score-wrap {
    height: calc(100% - 54px);
    //overflow: auto;
    .music-score-wrap-item {
      width: 300px;
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
      padding: 5px;
      border: 1px solid #ccc;
      .music-score-type {
        margin-bottom: 8px;
        font-size: 16px;
        line-height: 28px;
        text-align: center;
      }
      .el-image {
        width: 300px;
        margin: 0 auto;
      }
    }
    .el-empty {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
