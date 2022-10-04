<template>
  <div v-if="list && list.length > 0" class="artist-list">
    <SingerItem
      v-for="item in list"
      :key="`${item.id}-singer-list`"
      :info="item"
      @detail="handleSingerDetail"
    />
    <template v-if="list && list.length - 2 > 0">
      <em
        v-for="(item, ids) in Array(list.length - 2)"
        :key="`singer-list-placeholder-${ids}-${randomStr}`"
        class="singer-list-placeholder"
      ></em>
    </template>
  </div>
  <SelfEmpty v-else :showTitle="false" />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, defineEmits, defineProps } from 'vue'
import SingerItem from '@/components/music/singerItem.vue'
import { randomFn } from '@/utils/utils'

defineEmits('update:list')
const $router = useRouter()
defineProps({
  list: {
    type: Array,
    required: false,
    default() {
      return []
    }
  }
})

const randomStr = computed(() => {
  return randomFn()
})

const handleSingerDetail = (info: any) => {
  $router.push(`/epoch/singer/${info.id}`)
}
</script>

<style lang="less" scoped>
.artist-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-bottom: 15px;
  box-sizing: border-box;

  .singer-item {
    width: 150px;
    overflow: hidden;
  }

  > em.singer-list-placeholder {
    width: 150px;
  }
}
</style>
