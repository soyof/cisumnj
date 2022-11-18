<template>
  <div class="singer-detail">
    <div class="singer-detail-header">
      <div class="singer-name">
        {{ singerInfo.name }}
        <span v-if="singerInfo.nickname" class="nick-name">{{ singerInfo.nickname }}</span>
        <template v-if="singerInfo.identifyTag && singerInfo.identifyTag.length > 0">
          <el-tag
            v-for="(item, ids) in singerInfo.identifyTag"
            :key="`${ids}-identifyTag-header`"
            size="small"
            effect="dark"
          >
            {{ item }}
          </el-tag>
        </template>
        <template v-if="singerInfo.identities && singerInfo.identities.length > 0">
          <el-tag
            v-for="(item, ids) in singerInfo.identities"
            :key="`${ids}-identities-header`"
            size="small"
            effect="dark"
          >
            {{ item }}
          </el-tag>
        </template>
        <el-tag
          v-if="singerInfo.description"
          size="small"
          effect="dark"
        >
          {{ singerInfo.description }}
        </el-tag>
      </div>
      <template v-if="curTab !== 'desc'">
        <HeaderLine class="singer-desc-header" title="个人简述" />
        <p class="singer-desc">
          {{ singerInfo.briefDesc }}
        </p>
      </template>
    </div>
    <div class="singer-detail-content">
      <el-tabs v-model="curTab" @tab-click="handleTabClick">
        <el-tab-pane
          v-for="(tab, ids) in tabList"
          :key="`${tab.name}-${ids}`"
          :label="tab.label"
          :name="tab.name"
        >
          <component
            :is="tab.component"
            v-if="tab.name === 'top'"
            url="/api/artist/top/song"
            :singerId="singerId"
            :isTop="true"
          />
          <component
            :is="tab.component"
            v-else-if="tab.name === 'allSong'"
            url="/api/artist/songs"
            :singerId="singerId"
            :isTop="false"
            :isPagination="true"
          />
          <component :is="tab.component" v-else :singerId="singerId" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang='ts' setup>
// import { Picture as IconPicture } from '@element-plus/icons-vue'
import SingerSongList from '@/components/music/singerSongList.vue'
import AlbumList from '@/components/music/albumList.vue'
import MvListVue from '@/components/music/video/mvList.vue'
import SingerDtl from '@/components/music/singerDtl.vue'

import { SingerDetailInterface } from '@/interface'

import { ref, getCurrentInstance, Ref } from 'vue'
import service from '@/plugins/axios'
const { ctx } = getCurrentInstance()

const tabList = [
  { label: '介绍', name: 'desc', component: SingerDtl },
  { label: 'top50', name: 'top', component: SingerSongList },
  { label: '全部歌曲', name: 'allSong', component: SingerSongList },
  { label: '专辑', name: 'album', component: AlbumList },
  { label: 'MV', name: 'mv', component: MvListVue }
]

const singerInfo: Ref<SingerDetailInterface> = ref({
  name: '',
  nickname: '',
  identifyTag: [],
  identities: [],
  description: '',
  briefDesc: ''
})
const curTab = ref('desc')

const singerId = ref(ctx.$root.$route.params.singerId)

const getSingerDetail = () => {
  service.get(`/api/artist/detail?id=${singerId.value}`).then((res: any) => {
    const { artist, user } = res
    if (artist) {
      singerInfo.value = { ...artist }
    }

    if (user) {
      singerInfo.value = { ...singerInfo.value, ...user }
    }
  })
}

const getSingerSong = () => {
  service.get(`/api/artist/detail?id=${singerId.value}`).then((res: any) => {
    const { artist, user } = res
    if (artist) {
      singerInfo.value = { ...artist }
    }

    if (user) {
      singerInfo.value = { ...singerInfo.value, ...user }
    }
  })
}

const handleTabClick = () => {
  // console.log(curTab)
}

getSingerDetail()
getSingerSong()
</script>

<style lang="less" scoped>
.singer-detail {
  padding: 10px 20px 30px;

  .singer-detail-header {

    .singer-name {
      display: flex;
      align-items: center;
      line-height: 22px;
      font-size: 16px;
      font-weight: 700;

      .nick-name {
        padding-left: 5px;
        font-weight: 400;
      }

      .el-tag {
        margin-left: 5px;
      }
    }

    .singer-signature {
      margin-top: 10px;
      color: #222;
    }

    .singer-desc-header {
      margin-top: 20px;
      box-sizing: border-box;
    }

    .singer-desc {
      margin-top: 10px;
      line-height: 22px;
      font-size: 12px;
    }
  }

  .singer-detail-content {
    margin-top: 20px;
  }
}
</style>
