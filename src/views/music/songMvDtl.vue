<template>
  <div class="song-mv-dtl">
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
          <div class="mv-dtl-right"></div>
        </template>
      </Split>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import service from '@/plugins/axios'

import Split from '@/components/split/split.vue'
import SingerInfoForTable from '@/components/music/singerInfoForTable.vue'

// const $router = useRouter()
const $route = useRoute()
const mvInfo = ref({})
const artistInfo = ref({})
const splitVal = ref(0.3)
console.log($route.params.mvId)

const mvId = computed(() => $route.params.mvId)
const arId = computed(() => $route.params.arId)

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
    console.log(artistInfo.value)
  })
}

const getMvDtlInfo = () => {
  return service.get('/api/mv/detail', {
    mvid: mvId.value
  }).then((res: any) => {
    mvInfo.value = res.data || {}
    return res.data || {}
  })
}

getMvDtlInfo().then(() => {
  getArtistInfo()
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
      //flex: 1;
    }
  }
}
</style>
