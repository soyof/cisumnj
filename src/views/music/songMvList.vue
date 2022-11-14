<template>
  <div class="song-mv-list">
    <div class="song-mv-list-left">
      <el-scrollbar height="100%">
        <div class="song-mv-list-left-wrap">
          <div class="song-type-item">
            <el-tag class="cate-type" effect="dark" type="danger">
              语种
            </el-tag>
            <div
              v-for="(area, ids) in areaListCN"
              :key="`song-mv-area-${ids}`"
              :class="['song-mv-cate-item', curArea === area ? 'actives' : '']"
              @click="handleChooseAreaOrType(area, 'curArea')"
            >
              {{ area }}
            </div>
          </div>
          <div class="song-type-item">
            <el-tag class="cate-type" effect="dark">
              类型
            </el-tag>
            <div
              v-for="(mvType, ids) in mvTypeList"
              :key="`song-mv-type-${ids}`"
              :class="['song-mv-cate-item', curType === mvType ? 'actives' : '']"
              @click="handleChooseAreaOrType(mvType, 'curType')"
            >
              {{ mvType }}
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div v-loading="cateLoading" class="song-mv-list-right">
      <el-scrollbar height="100%">
        <div class="mv-list-wrap">
          <template v-if="mvList && mvList.length">
            <MvItem
              v-for="item in mvList"
              :key="item.id"
              class="mv-list-item"
              :config="item"
            />
          </template>
          <template v-if="mvList && mvList.length - 2 > 0">
            <em
              v-for="(item, ids) in Array(mvList.length - 2)"
              :key="`item-placeholder-${ids}`"
              class="item-list-placeholder"
            ></em>
          </template>
          <SimplePagination
            :pages="pages"
            :loading="loading"
            @change="getMvList"
          />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import services from '@/plugins/axios'
import { areaListCN, mvTypeList } from '@/dic'
import MvItem from '@/components/music/mvItem.vue'

const loading = ref(false)
const cateLoading = ref(false)
const curArea = ref('内地')
const curType = ref('全部')
const mvList = ref([])
const pages = reactive({
  pageIndex: 0,
  limit: 30,
  isMore: true
})

const getMvList = (isAdd = true) => {
  if (!isAdd) {
    cateLoading.value = true
  }
  loading.value = true
  services.get(`/api/mv/all?area=${curArea.value}&type=${curType.value}&limit=${pages.limit}&offset=${pages.pageIndex * pages.limit}`).then((res: any) => {
    const newList = res.data || []
    if (isAdd) {
      mvList.value = mvList.value.concat(newList)
    } else {
      mvList.value = newList
    }
    pages.isMore = res.hasMore
  }).finally(() => {
    loading.value = false
    cateLoading.value = false
  })
}

const handleChooseAreaOrType = (area: string, key: string) => {
  if (key === 'curArea') {
    curArea.value = area
  } else {
    curType.value = area
  }
  pages.pageIndex = 1
  pages.isMore = true
  getMvList(false)
}
getMvList()
</script>

<style lang="less" scoped>
.song-mv-list {
  width: 100%;
  height: @layout-pages-height;
  display: flex;
  .song-mv-list-left {
    width: 120px;
    min-width: 120px;
    max-width: 120px;
    border-right: 1px solid @border-gray-color;
    .song-mv-list-left-wrap {
      padding: 0 16px 0 6px;
      .song-type-item {
        padding-top: 20px;
        padding-bottom: 20px;
        border-bottom: 3px solid #909399;
        &:first-child {
          padding-top: 0;
        }
        &:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }
        .cate-type {
          width: 100%;
          height: 35px;
          margin-bottom: 8px;
        }
        .song-mv-cate-item {
          width: 100%;
          height: 35px;
          cursor: pointer;
          border-radius: 5px;
          box-shadow: 2px 2px 5px #ccc;
          margin-bottom: 12px;
          .center();
          &.actives {
            .actives-bgc();
          }
        }
      }
    }
  }

  .song-mv-list-right {
    flex: 1;
    max-height: 100%;
    padding: 0 15px;
    overflow: hidden;
    .mv-list-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      padding-bottom: 15px;
      padding-right: 12px;
      box-sizing: border-box;
      .mv-list-item {
        margin-right: 8px;
        margin-bottom: 10px;
      }
      .item-list-placeholder {
        width: 240px;
        margin-right: 8px;
        //margin-bottom: 10px;
      }
    }
  }
}
</style>
