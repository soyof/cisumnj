<template>
  <div class="m-search-info">
    <div :ref="el => headerDom = el" class="header-search">
      <el-select v-model="searchType" class="m-2" @change="handleSelectChange">
        <el-option
          v-for="item in selectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input v-model="keywords" placeholder="搜索..." @change="getSongList(1)" />
    </div>
    <div class="song-list-wrap" :style="listWrapStyle">
      <SongList v-if="searchType === '1'" v-model:maxHeight="tableHeight" v-model:list="songList" />
      <ArtistList v-if="searchType === '100'" v-model:list="singerList" class="search-artist-list" />
    </div>
    <SimplePagination
      v-if="pages.isMore"
      :ref="el => paginationDom = el"
      :pages="pages"
      :loading="loading"
      @change="getSongList(0)"
    />
  </div>
</template>

<script lang="ts" setup>

import { reactive, ref, computed } from 'vue'
import SongList from '@/components/music/songList.vue'
import ArtistList from '@/components/music/artistList.vue'

import services from '@/plugins/axios'
import { useAutoTable } from '@/hooks/useAutoTable'
import { formatTime2HMS } from '@/utils/utils'

const { tableHeight, headerDom, paginationDom }: any = useAutoTable()
const keywords = ref('')
const searchType = ref('1')
const songList = ref([])
const singerList = ref([])
const loading = ref(false)
const pages = reactive({
  pageIndex: 0,
  limit: 50,
  isMore: false
})
const selectList = [
  { label: '歌曲', value: '1' },
  { label: '专辑', value: '10' },
  { label: '歌手', value: '100' }
]

const listWrapStyle = computed(() => {
  return !singerList.value || singerList.value.length === 0 ? { height: tableHeight.value } : {}
})

const handleSelectChange = () => {
  songList.value = []
  singerList.value = []
}

const setSongList = (res: any, flag: 0 | 1) => {
  pages.isMore = ((pages.pageIndex + 1) * pages.limit <= res.songCount)
  const newList = (res.songs || []).map((item: any) => {
    return {
      ...item,
      author: item.al.name,
      duration: formatTime2HMS(item.dt)
    }
  })
  if (!flag) {
    songList.value = songList.value.concat(newList)
  } else {
    songList.value = newList
  }
}

const setSingerList = (res: any, flag: 0 | 1) => {
  pages.isMore = ((pages.pageIndex + 1) * pages.limit <= res.artistCount)
  const newList = res.artists || []
  if (!flag) {
    singerList.value = singerList.value.concat(newList)
  } else {
    singerList.value = newList
  }
}

const getSongList = (flag: 0 | 1) => {
  if (!keywords.value) return
  const params = {
    keywords: keywords.value,
    type: searchType.value,
    ...pages
  }
  loading.value = true
  services.get('/api/cloudsearch', params).then((res: any) => {
    // pages.isMore = pages.pageIndex * pages.limit < res.songCount
    if (searchType.value === '1') {
      setSongList(res, flag)
    } else if (searchType.value === '100') {
      setSingerList(res, flag)
    }
  }).finally(() => {
    loading.value = false
  })
}
// getSongList()
</script>

<style lang="less" scoped>
.m-search-info {
  position: relative;
  .header-search {
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: -12px;
    padding: 5px 0;
    margin-bottom: 12px;
    z-index: 2;
    background-color: #fff;

    .el-select {
      width: 120px;
      height: 40px;
      margin-right: 15px;
      :deep(.select-trigger) {
        height: 100%;
        .el-input, .el-input__wrapper, .el-input__inner {
          height: 100%;
        }
      }
    }

    .el-input {
      width: 500px;
      height: 40px;
      border-radius: 30px;
      overflow: hidden;
      border: 1px solid @active-color;

      .is-focus {
        border: none;
      }

      :deep(.el-input__wrapper) {
        box-shadow: none;
        &:hover {
          box-shadow: none;
        }
      }

      :deep(.el-input__inner) {
        width: 100%;
        height: 100%;
        border: none;
        color: #626aef;
        &:focus {
          border: none;
        }
      }
    }
  }
  .song-list-wrap {
    .search-artist-list {
    }
  }
  .simple-pagination {
    margin-top: 10px;
  }
}
</style>
