<template>
  <div class="singer-type-list">
    <el-scrollbar class="singer-type-scrollbar" wrapClass="singer-type-scrollbar-wrap">
      <div
        v-for="(item, ids) in areaList"
        :key="`${item.value}-${ids}-area`"
        class="singer-type-item"
      >
        <HeaderLine noBgc :title="item.label" />
        <div class="singer-type-item-info">
          <div
            v-for="(type, typeIds) in typeList"
            :key="`${type.value}-${typeIds}-${ids}-type-singer`"
            :class="['singer-type-item-info-item', { 'actives': isActives(item.value, type.value) }]"
            @click="handleClickType(item, type)"
          >
            {{ type.value === -1 ? type.label : (item.label + type.label) }}
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ValueLabelInterface } from '@/interface'

@Options({
  props: {
    areaAndType: {
      type: String,
      required: true
    },
    curTitle: {
      type: String,
      required: false,
      default: '全部'
    }
  },
  emits: ['update:areaAndType', 'update:curTitle'],
  data() {
    return {
      typeList: [
        { value: -1, label: '全部' },
        { value: 1, label: '男歌手' },
        { value: 2, label: '女歌手' },
        { value: 3, label: '乐队' }
      ],
      areaList: [
        { value: 7, label: '华语' },
        { value: 96, label: '欧美' },
        { value: 8, label: '小日本' },
        { value: 16, label: '棒子' },
        { value: 0, label: '其它' }
      ]
    }
  },
  computed: {
    isActives() {
      return (area: string, type: string) => {
        return `${area},${type}` === this.areaAndType
      }
    }
  },
  created() {
    this.getSingerTypeList()
  },
  methods: {
    getSingerTypeList() {
      this.$http.get('/api/artist/list?type=-1&area=-1').then((res: any) => {
        console.log(res)
      })
    },
    handleClickType(area: ValueLabelInterface, type: ValueLabelInterface) {
      const areaVal = area.value
      const typeVal = type.value
      const title = `${area.label}` + (type.value === -1 ? `（${type.label}）` : type.label)
      this.$emit('update:areaAndType', `${areaVal},${typeVal}`)
      this.$emit('update:curTitle', title)
      this.$emit('change')
    }
  }
})
export default class SingerList extends Vue {}
</script>

<style lang="less" scoped>
.singer-type-list {
  width: 100%;
  height: 100%;
  padding-right: 1px;
  border-right: 1px solid @border-gray-color;
  box-sizing: border-box;

  .singer-type-scrollbar {
    :deep(.singer-type-scrollbar-wrap) {
      overflow-x: hidden;
    }
    :deep(.el-scrollbar__bar.is-horizontal) {
      display: none !important;
    }
  }

  .singer-type-item {
    width: 100%;

    &-info {
      padding: 5px 0;

      &-item {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        font-size: 12px;
        box-sizing: border-box;
        border-radius: 5px;
        cursor: pointer;
        .ellipsis();

        &.actives {
          color: #303133;
          background-color: @active-bgl-color;
        }
      }
    }
  }
}
</style>
