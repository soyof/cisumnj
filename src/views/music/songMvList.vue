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
              v-for="(area, ids) in areaList"
              :key="`song-mv-area-${ids}`"
              :class="{'song-mv-cate-item': true, actives: queryInfo.area === area, disabled: !queryInfo.area }"
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
              v-for="(mvType, ids) in typeList"
              :key="`song-mv-type-${ids}`"
              :class="{'song-mv-cate-item': true, actives: queryInfo.type === mvType, disabled: !queryInfo.type }"
              @click="handleChooseAreaOrType(mvType, 'curType')"
            >
              {{ mvType }}
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div v-loading="cateLoading" class="song-mv-list-right">
      <el-tabs v-model="curTab" class="song-mv-list-tabs">
        <el-tab-pane label="全部" name="allMv">
          <VdList
            v-if="curTab === 'allMv'"
            ref="allMv"
            v-model:queryInfo="queryInfo"
            apiUrl="/api/mv/all"
          />
        </el-tab-pane>
        <el-tab-pane label="最新" name="newMv">
          <VdList
            v-if="curTab === 'newMv'"
            ref="newMv"
            v-model:queryInfo="queryInfo"
            apiUrl="/api/mv/first"
          />
        </el-tab-pane>
        <el-tab-pane label="推荐" name="recMv">
          <VdList
            v-if="curTab === 'recMv'"
            ref="recMv"
            v-model:queryInfo="queryInfo"
            apiUrl="/api/personalized/mv"
          />
        </el-tab-pane>
        <el-tab-pane label="网易出品" name="othMv">
          <VdList
            v-if="curTab === 'othMv'"
            ref="othMv"
            v-model:queryInfo="queryInfo"
            apiUrl="/api/mv/exclusive/rcmd"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { areaListCN, mvTypeList } from '@/dic'
import VdList from '@/components/music/vdList.vue'
const allMv = ref()
const newMv = ref()
const recMv = ref()
const othMv = ref()
const areaList = reactive(areaListCN)
const typeList = reactive(mvTypeList)
const curTab = ref('allMv')
const queryInfo = reactive({
  area: '内地',
  type: '全部'
})
const cateLoading = ref(false)

watch(curTab, (val) => {
  const noQuery = ['recMv', 'othMv']
  if (val === 'allMv') {
    queryInfo.type = '全部'
  } else {
    queryInfo.type = ''
  }
  if (noQuery.includes(val)) {
    queryInfo.area = ''
  } else {
    queryInfo.area = '全部'
  }
}, { immediate: true })

const handleChooseAreaOrType = (val: string, key: string) => {
  if (!val) return
  if (key === 'curArea') {
    queryInfo.area = val
  } else {
    queryInfo.type = val
  }
  switch (curTab.value) {
    case 'allMv':
      allMv.value?.getMvList(0)
      break
    case 'newMv':
      newMv.value?.getMvList(0)
      break
    case 'recMv':
      recMv.value?.getMvList(0)
      break
    case 'othMv':
      othMv.value?.getMvList(0)
      break
  }
}
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
    overflow: hidden;
    //display: flex;
    //flex-direction: column;
    .song-mv-list-right-top {
      display: flex;
      //align-items: center;
      width: 100%;
      height: 35px;
      padding: 0 15px;
      min-height: 35px;
      box-shadow: 2px 2px 5px #ccc;
    }
    :deep(.song-mv-list-tabs) {
      max-height: 100%;
      .el-tabs__header {
        height: 45px;
        min-height: 45px;
        .el-tabs__nav-wrap {
          padding: 0 15px;
        }
      }
      .el-tabs__content {
        height: calc(@layout-pages-height - 55px);
        .el-tab-pane {
          height: calc(@layout-pages-height - 55px);
        }
      }
    }
  }
}
</style>
