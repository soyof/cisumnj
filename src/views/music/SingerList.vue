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
              />
              <el-tag class="more">
                查看更多
              </el-tag>
            </div>
          </el-scrollbar>

          <SelfEmpty v-else :showTitle="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SingerType from '@/components/music/SingerType.vue'
// @ts-ignore
import SingerItem from '@/components/music/SingerItem.vue'

import tableMixins from '@/mixins/table'
import { letterInfo } from '@/dic'

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
      limit: 30,
      isMore: true,
      singerContentHeight: '100%'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.registerResizeEvent()
      this.getSingerList()
    })
  },
  methods: {
    getSingerList(pageIndex: Number) {
      // if (pageIndex === 0) {
      //   this.singerList = []
      // }
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
          this.$refs['singerBoxScrollbar'] && this.$refs['singerBoxScrollbar'].update()
        })
      })
    },
    handleChooseLetter(val: String) {
      this.initial = val
      this.getSingerList(1)
    },
    handleAreaAndTypeChange() {
      this.getSingerList(1)
    },
    resizeEvent() {
      if (this.$refs['singerBox'] && this.$refs['singerHeader']) {
        const boxHeight = this.$refs['singerBox'].clientHeight
        const headerHeight = this.$refs['singerHeader'].clientHeight
        const contentHeight = boxHeight - headerHeight
        this.singerContentHeight = contentHeight
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
        flex: 1;

        .singer-list-box {
          // display: flex;
          // flex-wrap: wrap;
          height: 100%;
          padding-bottom: 15px;
          box-sizing: border-box;
          .more {
            width: 100%;
            height: 30px;
            padding: 0 10px;
            margin: 0 20px;
            border-radius: 6px;
            box-sizing: border-box;
            cursor: pointer;
            .center();
          }
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
