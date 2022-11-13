<template>
  <div class="song-mv-list">
    <div class="song-mv-list-left">
      <div
        v-for="(area, ids) in areaListCN"
        :key="`song-mv-area-${ids}`"
        :class="['song-mv-cate-item', curArea === area ? 'actives' : '']"
        @click="handleChooseArea(area)"
      >
        {{ area }}
      </div>
    </div>
    <div class="song-mv-list-right">
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
          <SimplePagination />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import services from '@/plugins/axios'
import { areaListCN } from '@/dic/index'
import MvItem from '@/components/music/mvItem.vue'
// import SimplePagination from '@/components/global/simplePagination.vue'

console.log(services)

const curArea = ref('内地')
const mvList = ref([])
console.log(mvList)

const getMvList = () => {
  services.get(`/api/mv/all?area=${curArea.value}&limit=${50}&offset=${1}`).then((res: any) => {
    console.log(res)
    mvList.value = res
  })
}

const handleChooseArea = (area: string) => {
  curArea.value = area
}

getMvList()
</script>

<style lang="less" scoped>
.song-mv-list {
  width: 100%;
  height: @layout-pages-height;
  display: flex;
  .song-mv-list-left {
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    padding-right: 5px;
    border-right: 1px solid @border-gray-color;
    .song-mv-cate-item {
      width: 100%;
      height: 35px;
      cursor: pointer;
      border-radius: 5px;
      box-shadow: 2px 2px 5px #ccc;
      margin-bottom: 12px;
      .center();
      &.actives {
        .actives();
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
