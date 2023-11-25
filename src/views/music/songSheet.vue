<template>
  <div class="song-sheet">
    <div ref="pagesHeader" class="song-sheet-header">
      <div class="song-sheet-header-item">
        <el-select
          v-model="order"
          placeholder="请选择"
          disabled
          size="small"
          @change="handleHotChange"
        >
          <el-option
            v-for="item in orderList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="song-sheet-header-item">
        <el-select
          v-model="cate"
          placeholder="请选择"
          size="small"
          @change="getMusicList(1)"
        >
          <el-option
            v-for="item in cateList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>
    </div>
    <el-table
      ref="songTable"
      :data="list"
      :max-height="tableHeight"
      stripe
      size="default"
      style="width: 100%"
    >
      <el-table-column type="expand" width="30">
        <template #default="scope">
          <SongSheetDtl :info="scope.row.creator" />
        </template>
      </el-table-column>
      <el-table-column label="封面" width="80" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center">
            <el-image
              style="width: 30px; height: 30px"
              :src="scope.row.coverImgUrl"
              :previewSrcList="[scope.row.coverImgUrl]"
              :initialIndex="4"
              previewTeleported
              fit="cover"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="300"
        showOverflowTooltip
      >
        <template #default="scope">
          <span class="actives" @click="handleTargetSongDtl(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" showOverflowTooltip />
      <el-table-column
        prop="playCount"
        label="播放量"
        width="100"
        showOverflowTooltip
      />
      <el-table-column
        prop="shareCount"
        label="分享数"
        width="100"
        showOverflowTooltip
      />
      <el-table-column
        prop="playCount"
        label="播放量"
        width="100"
        showOverflowTooltip
      />
      <el-table-column
        prop="subscribedCount"
        label="订阅量"
        width="100"
        showOverflowTooltip
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
      />
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="180"
      />
    </el-table>
    <Pagination
      ref="pagination"
      :pager="pager"
      :pageSizes="[20, 60, 100, 150]"
      @change="getMusicList"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SongSheetDtl from '@/components/music/songSheetDtl.vue'
import { formatDate } from '@/utils/utils'
import tableMixins from '@/mixins/table'

@Options({
  components: {
    SongSheetDtl
  },
  mixins: [tableMixins],
  data() {
    return {
      order: 'hot',
      orderList: [
        { value: 'new', label: '最新' },
        { value: 'hot', label: '最热' }
      ],
      cate: '全部',
      cateList: [],
      list: [],
      pager: {
        pageIndex: 1,
        limit: 20,
        total: 0
      }
    }
  },
  created() {
    this.getHotCateList()
    this.getMusicList()
    this.getList()
  },
  methods: {
    getList() {
      this.$http.get('/api/countries/code/list').then((res: any) => {
        // console.log(res)
      })
    },
    getHotCateList() {
      this.$http.get('/api/playlist/hot').then((res: any) => {
        if (!res) return
        this.cateList = [{ name: '全部', id: 0 }, ...res.tags]
      })
    },
    getMusicList(pageIndex: number) {
      pageIndex = pageIndex || this.pager.pageIndex
      const params = {
        offset: (pageIndex - 1) * this.pager.limit,
        limit: this.pager.limit,
        order: this.order,
        cat: this.cate
      }
      this.$http.get('/api/top/playlist', params).then((res: any) => {
        const playlists = res.playlists || []
        this.pager.total = res.total
        this.list = playlists.map((item: any) => {
          const { createTime, updateTime } = item
          item.createTime = createTime ? formatDate(createTime) : '--'
          item.updateTime = updateTime ? formatDate(updateTime) : '--'
          return item
        })
      })
    },
    handleHotChange() {
      this.cate = ''
      this.getMusicList(1)
    },
    handleCalcTableHeight() {
      let pageHeight = (document.documentElement && document.documentElement.clientHeight) || 0
      let headerHeight = 0
      let pagiHeight = 0
      if (document.documentElement && document.documentElement.clientHeight) {
        pageHeight = document.documentElement.clientHeight
      }
      if (this.$refs['pagesHeader'] && this.$refs['pagesHeader'].clientHeight) {
        headerHeight = this.$refs['pagesHeader'].clientHeight
      }
      if (this.$refs['pagination'] && this.$refs['pagination'].$el && this.$refs['pagination'].$el.clientHeight) {
        pagiHeight = this.$refs['pagination'].$el.clientHeight
      }

      if (pageHeight) {
        const height = Math.floor(pageHeight - headerHeight - pagiHeight - 66)
        this.tableHeight = height > 100 ? height : 100
      } else {
        this.tableHeight = 'calc(100vh - 150px)'
      }
    },
    handleTargetSongDtl(info: any) {
      this.$router.push(`/epoch/mSongList/${info.id}`)
    }
  }
})
export default class Pages extends Vue {}
</script>

<style lang="less" scoped>
.song-sheet {
  &-header {
    display: flex;
    align-items: center;
    &-item {
      height: 30px;
      margin-right: 16px;
    }
  }
}
</style>
