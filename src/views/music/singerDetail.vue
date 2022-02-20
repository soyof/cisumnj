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
      <HeaderLine class="singer-desc-header" title="个人简述" />
      <p class="singer-desc">
        {{ singerInfo.briefDesc }}
      </p>
    </div>
    <div class="singer-detail-content">
      <el-tabs v-model="curTab" @tab-click="handleTabClick">
        <el-tab-pane label="top50" name="first">
          <SongList
            url="/api/artist/top/song"
            :singerId="singerId"
            :isTop="true"
          />
        </el-tab-pane>
        <el-tab-pane label="全部歌曲" name="second">
          <SongList
            url="/api/artist/songs"
            :singerId="singerId"
            :isTop="false"
          />
        </el-tab-pane>
        <el-tab-pane label="专辑" name="third">
          专辑
        </el-tab-pane>
        <el-tab-pane label="MV" name="fourth">
          MV
        </el-tab-pane>
        <el-tab-pane label="介绍" name="fifth">
          介绍
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang='ts' setup>
// import { Picture as IconPicture } from '@element-plus/icons-vue'
// @ts-ignore
import SongList from '@/components/music/songList.vue'
import { ref, getCurrentInstance } from 'vue'
import Api from '@/plugins/axios'
const service = Api.service
const { ctx } = getCurrentInstance()

const singerInfo = ref({})
const curTab = ref('first')

const singerId = ref(ctx.$root.$route.params.singerId)
const getSingerDetail = () => {
  service.get(`/api/artist/detail?id=${singerId.value}`).then(res => {
    const { artist, user } = res.data
    if (artist) {
      singerInfo.value = { ...artist }
    }

    if (user) {
      singerInfo.value = { ...singerInfo.value, ...user }
    }
  })
}

const getSingerSong = () => {
  service.get(`/api/artist/detail?id=${singerId.value}`).then(res => {
    const { artist, user } = res.data
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
  padding: 10px 20px;

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
    }
  }

  .singer-detail-content {
    margin-top: 20px;
  }
}
</style>
