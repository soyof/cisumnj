<template>
  <div v-loading="mvLoading" class="song-mv-dtl">
    <div class="mv-dtl-wrap">
      <Split v-model:modelValue="splitVal" min="300px">
        <template #left>
          <el-scrollbar>
            <div class="mv-dtl-left">
              <HeaderLine title="作者信息" />
              <div v-if="Object.keys(artistInfo).length > 0" class="artist-info">
                <SingerInfoForTable :artistInfo="artistInfo" />
              </div>
            </div>
          </el-scrollbar>
        </template>
        <template #right>
          <el-scrollbar @scroll="handleRightScrollEvent">
            <div class="mv-dtl-right">
              <div class="mv-dtl-right-header">
                <div class="mv-info-item">
                  <div class="mv-name">
                    {{ mvInfo?.name }}
                  </div>
                  <div class="mv-item-wrap-flex">
                    <div class="mv-item">
                      作者：{{ mvInfo?.artistName }}
                    </div>
                    <div class="mv-item">
                      发布时间：{{ mvInfo?.publishTime }}
                    </div>
                    <div class="mv-item">
                      时长：{{ formatTime2HMS(mvInfo?.duration) }}
                    </div>
                    <div class="mv-item">
                      播放次数：{{ mvInfo?.playCount }}
                    </div>
                    <div class="mv-item">
                      分享次数：{{ mvInfo?.shareCount }}
                    </div>
                    <div class="mv-item">
                      收藏：{{ mvInfo?.subCount }}
                    </div>
                  </div>
                  <el-tooltip
                    effect="dark"
                    :content="mvInfo?.desc || '--'"
                    placement="top"
                    :showAfter="1000"
                    :hideAfter="0"
                  >
                    <div class="mv-desc mv-item">
                      简介：{{ mvInfo?.desc || '--' }}
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <div class="mv-dtl-right-content">
                <VideoPlayer v-show="mvId" ref="videoPlayerCom" :mvId="mvId" />
                <div class="mv-same-list">
                  <HeaderLine title="相关推荐" />
                  <div class="mv-same-list-box">
                    <el-scrollbar>
                      <template v-if="sameMvList && sameMvList.length > 0">
                        <SimpleVdItem
                          v-for="item in sameMvList"
                          :key="`same-${item.artistId}-${item.id}`"
                          :config="item"
                          :class="mvId.toString() === item.id.toString() ? 'vd-item-actives' : ''"
                          @svClick="handlePlaySameMv"
                        />
                      </template>
                    </el-scrollbar>
                  </div>
                </div>
              </div>
              <div class="mv-dtl-right-footer">
                <HeaderLine title="更多MV" />
                <el-row
                  class="singer-mv-list"
                  :gutter="24"
                  justify="space-between"
                >
                  <el-col
                    v-for="item in singerMv"
                    :key="`singer-mv-${item.artistId}-${item.id}`"
                    :span="10"
                  >
                    <SimpleVdItem
                      :class="mvId.toString() === item.id.toString() ? 'vd-item-actives' : ''"
                      class="singer-mv-item"
                      :config="item"
                      @svClick="handlePlaySameMv"
                    />
                  </el-col>
                  <SimplePagination
                    v-if="pages.isMore"
                    :pages="pages"
                    :loading="loading"
                    @change="getArtistMvList"
                  />
                </el-row>
              </div>
            </div>
          </el-scrollbar>
        </template>
      </Split>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import service from '@/plugins/axios'
import { formatTime2HMS } from '@/utils/utils'

import Split from '@/components/split/split.vue'
import SingerInfoForTable from '@/components/music/singerInfoForTable.vue'
import VideoPlayer from '@/components/music/video/videoPlayer.vue'
import SimpleVdItem from '@/components/music/video/simpleVdItem.vue'

const $route = useRoute()
const mvInfo: any = ref({})
const artistInfo: any = ref({})
const splitVal = ref(0.3)
const sameMvList: any = ref([])
const singerMv: any = ref([])
const videoPlayerCom = ref()
const mvLoading = ref(false)
const loading = ref(false)
const pages = reactive({
  pageIndex: 0,
  limit: 30,
  isMore: false
})

const mvId = ref($route.params.mvId)
const arId = computed(() => $route.params.arId)

const handlePlaySameMv = (id: string) => {
  mvId.value = id + ''
}

const getArtistInfo = () => {
  service.get('/api/artist/detail', {
    id: arId.value
  }).then((res: any) => {
    artistInfo.value = {
      ...res?.data,
      ...res?.data?.artist,
      ...res?.data?.user,
      ...res?.data?.identify,
      artistName: mvInfo.value?.artistName
    }
  })
}

const getMvDtlInfo = () => {
  mvLoading.value = true
  return service.get('/api/mv/detail', {
    mvid: mvId.value
  }).then((res: any) => {
    mvInfo.value = res.data || {}
    return res.data || {}
  }).finally(() => {
    mvLoading.value = false
  })
}

// 获取相似MV
const getSameMvInfo = () => {
  mvLoading.value = true
  service.get('/api/simi/mv', {
    mvid: mvId.value
  }).then((res: any) => {
    sameMvList.value = res.mvs || []
    sameMvList.value.unshift(mvInfo.value)
  }).finally(() => {
    mvLoading.value = false
  })
}
// 获取歌手MV
const getArtistMvList = () => {
  service.get('/api/artist/mv', {
    id: arId.value,
    limit: pages.limit,
    offset: pages.pageIndex * pages.limit
  }).then((res: any) => {
    singerMv.value = singerMv.value.concat((res.mvs || []))
    pages.isMore = res.hasMore
  })
}

const handleRightScrollEvent = (scrollInfo: any) => {
  if (scrollInfo.scrollTop > 120) {
    videoPlayerCom.value.inPictureInPicture()
  } else {
    videoPlayerCom.value.outPictureInPicture()
  }
}

getMvDtlInfo().then(() => {
  getArtistInfo()
  getSameMvInfo()
  getArtistMvList()
})
</script>

<style lang="less" scoped>
.song-mv-dtl {
  width: 100%;
  height: @layout-pages-height;
  //padding: 20px;
  overflow: hidden;
  box-sizing: border-box;
  //margin: 0 auto;
  .mv-dtl-wrap {
    width: 100%;
    height: 100%;
    //display: flex;
    .mv-dtl-left {
      padding: 12px;
      .artist-info {
        padding-top: 8px;
      }
    }
    .mv-dtl-right {
      width: 100%;
      height: 100%;
      padding: 12px 12px 12px 18px;
      box-sizing: border-box;

      .mv-dtl-right-header {
        width: 100%;
        display: flex;
        align-items: center;
        min-height: 60px;
        padding-bottom: 18px;
        box-sizing: border-box;
        .mv-info-item {
          width: 100%;
          .mv-name {
            line-height: 25px;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 8px;
          }
          .mv-desc {
            color: @text-gray-color;
            line-height: 18px;
            font-size: 14px;
            font-weight: 500;
            .ellipsis();
          }
          .mv-item {
            line-height: 18px;
            color: @text-gray-color;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 6px;
          }
          .mv-item-wrap-flex {
            display: flex;
            .mv-item {
              min-width: 100px;
              margin-right: 16px;
              white-space: nowrap;
              .ellipsis();
            }
          }
        }
      }

      .mv-dtl-right-content {
        width: 100%;
        height: 500px;
        padding: 8px;
        box-sizing: border-box;
        display: flex;
        //flex-wrap: wrap;
        justify-content: center;

        .mv-same-list {
          display: flex;
          flex-direction: column;
          width: 300px;
          min-width: 300px;
          height: 480px;
          margin-left: 20px;
          margin-bottom: 15px;
          box-sizing: border-box;
          .mv-same-list-box {
            flex: 1;
            height: calc(100% - 45px);
            margin-top: 15px;
          }
        }
      }

      .mv-dtl-right-footer {
        width: 100%;
        margin-top: 50px;

        .singer-mv-list {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin-top: 15px;
          margin-left: 0 !important;
          margin-right: 0 !important;
          box-sizing: border-box;
        }
      }
    }
  }
  :deep(.el-image) {
    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      .el-icon {
        font-size: 60px;
        color: #ccc;
      }
    }
  }
  .vd-item-actives {
    background-color:  #d9ecff !important;
  }
}
</style>
