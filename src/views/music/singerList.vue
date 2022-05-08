<template>
  <div class="singer-list">
    <div class="singer-list-left">
      <SingerType
        v-model:areaAndType="areaAndType"
        v-model:curTitle="curTitle"
        @change="handleAreaAndTypeChange"
      />
    </div>

    <div class="singer-list-right">
      <HeaderLine
        class="singer-list-right-title"
        :title="curTitle"
        :isLine="false"
        noBgc
      />
      <div ref="singerBox" class="singer-list-right-content">
        <div ref="singerHeader" class="singer-list-right-content-header">
          <span
            v-for="item in letterList"
            :key="`${item.value}-singer-header-item`"
            :class="['singer-header-item', { 'actives': item.value === initial }]"
            @click="handleChooseLetter(item.value)"
          >
            {{ item.label }}
          </span>
        </div>
        <div class="singer-list-right-content-singer">
          <el-scrollbar
            v-if="singerList && singerList.length > 0"
            ref="singerBoxScrollbar"
            :height="singerContentHeight"
          >
            <div class="singer-list-box">
              <SingerItem
                v-for="item in singerList"
                :key="`${item.id}-singer-list`"
                :info="item"
                @detail="handleSingerDetail"
              />
              <i
                v-for="(item, ids) in Array(singerList.length - 2)"
                :key="`singer-list-placeholder-${ids}`"
                class="singer-list-placeholder"
              ></i>
            </div>
            <el-tag
              v-if="isMore"
              class="more"
              @click="getMore"
            >
              查看更多
            </el-tag>
          </el-scrollbar>
          <SelfEmpty v-else :showTitle="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SingerType from '@/components/music/singerType.vue'
// @ts-ignore
import SingerItem from '@/components/music/singerItem.vue'

import tableMixins from '@/mixins/table'
import { letterInfo } from '@/dic'

import * as _ from 'lodash'

@Options({
  components: {
    SingerType,
    SingerItem
  },
  mixins: [tableMixins],
  data() {
    return {
      areaAndType: '7,-1',
      curTitle: '华语（全部）',
      initial: '-1',
      letterList: [
        { label: '热门', value: '-1' },
        ...letterInfo,
        { label: '其它', value: '0' }
      ],
      singerList: [],
      pageIndex: 0,
      limit: 80,
      isMore: true,
      singerContentHeight: 'calc(100vh - 150px)'
    }
  },
  created() {
    this.getMoreThrottle = _.debounce(this.getSingerListForMore, 2000, { leading: true })
  },
  mounted() {
    this.$nextTick(() => {
      this.registerResizeEvent()
      this.getSingerList()
    })
  },
  methods: {
    getSingerList(pageIndex: number) {
      const arr = this.areaAndType.split(',')
      const params = {
        limit: this.limit,
        offset: pageIndex || this.pageIndex,
        type: arr[1] || '-1',
        area: arr[0] || '-1',
        initial: this.initial
      }
      this.$http.get('/api/artist/list', params).then((res: any) => {
        this.singerList = res.artists || []
        this.isMore = res.more
        this.$nextTick(() => {
          this.resizeEvent()
        })
      })
    },
    getSingerListForMore() {
      const arr = this.areaAndType.split(',')
      this.pageIndex = this.pageIndex + 1
      const offset = this.pageIndex * this.limit
      const params = {
        limit: this.limit,
        offset: offset,
        type: arr[1] || '-1',
        area: arr[0] || '-1',
        initial: this.initial
      }

      this.$http.get('/api/artist/list', params).then((res: any) => {
        const list = res.artists || []
        this.singerList = [...this.singerList, ...list]
        this.isMore = res.more
      })
    },
    getMore() {
      this.getMoreThrottle()
    },
    handleChooseLetter(val: string) {
      this.initial = val
      this.getSingerList(1)
    },
    handleAreaAndTypeChange() {
      this.getSingerList(1)
    },
    handleSingerDetail(info: any) {
      this.$router.push(`/epoch/singer/${info.id}`)
    },
    resizeEvent() {
      if (this.$refs['singerBox'] && this.$refs['singerHeader']) {
        const boxHeight = this.$refs['singerBox'].clientHeight
        const headerHeight = this.$refs['singerHeader'].clientHeight
        const contentHeight = boxHeight - headerHeight
        this.singerContentHeight = contentHeight <= 200 ? 200 : contentHeight
        this.$refs['singerBoxScrollbar'] && this.$refs['singerBoxScrollbar'].update()
      }
    },
    registerResizeEvent() {
      window.addEventListener('resize', this.resizeEvent)
    },
    unRegisterResizeEvent() {
      window.removeEventListener('resize', this.resizeEvent)
    }
  }
})
export default class SingerList extends Vue {}
</script>

<style lang="less" scoped>
.singer-list {
  display: flex;
  width: 100%;
  height: @layout-pages-height;
  overflow: hidden;

  &-left {
    width: 180px;
    height: 100%;
  }

  &-right {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    &-title {
      width: 100%;
      height: 40px;
      padding-bottom: 10px;
      border-bottom: 1px solid @border-light-color;
      box-sizing: border-box;
    }

    &-content {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-top: 15px;
      box-sizing: border-box;
      overflow: hidden;
      &-header {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding-bottom: 15px;
        .singer-header-item {
          height: 21px;
          line-height: 21px;
          padding: 3px 8px;
          margin: 0 5px;
          font-size: 12px;
          border-radius: 6px;
          cursor: pointer;
          .center();

          &.actives {
            color: #fff;
            background-color: @theme-color;
          }
        }
      }
      &-singer {
        width: 100%;
        flex: 1;

        :deep(.el-scrollbar__view) {
          width: 100%;
          padding-bottom: 20px;
        }

        .singer-list-box {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 100%;
          height: 100%;
          padding-bottom: 15px;
          box-sizing: border-box;
          // margin: 0 1%;

          // &:after {
          //   content: '';
          //   flex: 1;
          // }

          .singer-item {
            width: 150px;
            overflow: hidden;
          }

          > i.singer-list-placeholder {
            width: 150px;
          }
        }

        .more {
          width: calc(100% - 40px);
          height: 30px;
          padding: 0 10px;
          margin: 0 20px;
          border-radius: 6px;
          box-sizing: border-box;
          cursor: pointer;
          .center();
        }

        .self-empty {
          .img {
            width: 150px;
            height: 135px;
          }
        }
      }
    }
  }
}
</style>
