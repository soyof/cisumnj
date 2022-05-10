<template>
  <div class="singer-dtl">
    <div class="singer-dtl-item">
      <HeaderLine
        class="singer-dtl-header"
        title="个人简述"
        :isShowExpand="true"
        :defaultExpand="true"
      >
        <template #content>
          <p class="singer-dtl-txt">
            {{ singerInfo.briefDesc }}
          </p>
        </template>
      </HeaderLine>
    </div>
    <template v-if="singerInfo.introduction && singerInfo.introduction.length > 0">
      <div v-for="(item, ids) in singerInfo.introduction" :key="`introduction-${ids}`" class="singer-dtl-item">
        <HeaderLine
          class="singer-dtl-header"
          :title="item.ti"
          :isShowExpand="true"
          :defaultExpand="false"
        >
          <template #content>
            <p class="singer-dtl-txt">
              {{ item.txt }}
            </p>
          </template>
        </HeaderLine>
      </div>
    </template>
    <div v-if="singerInfo.topicData && singerInfo.topicData.length > 0" class="singer-dtl-item">
      <HeaderLine
        title="相关话题"
        :isShowExpand="true"
        :defaultExpand="true"
      >
        <template #content>
          <div class="singer-topic-list">
            <TopicList :topicList="singerInfo.topicData" />
          </div>
        </template>
      </HeaderLine>
    </div>
  </div>
</template>

<script lang='ts' setup>
import TopicList from '@/components/music/topicList'
import { defineProps, ref, Ref } from 'vue'
import Api from '@/plugins/axios'
import { SingerInfoInterface } from '@/interface'
const service = Api.service

const props = defineProps({
  singerId: {
    type: String || Number,
    required: true
  }
})

const singerInfo: Ref<SingerInfoInterface> = ref({
  briefDesc: '',
  introduction: [],
  topicData: []
})

const getSingerDetail = () => {
  service.get(`/api/artist/desc?id=${props.singerId}`).then((res: any) => {
    console.log(res)
    singerInfo.value = { ...res }
  })
}

getSingerDetail()

</script>

<style lang="less" scoped>
.singer-dtl {
  .singer-dtl-item {
    margin-bottom: 15px;
    .singer-dtl-header {
      margin-bottom: 10px;
    }
    .singer-dtl-txt {
      line-height: 22px;
      padding: 0 12px;
      font-size: 12px;
      white-space: pre-line;
    }

    .singer-topic-list {
      padding: 0 12px;
    }
  }
}
</style>
