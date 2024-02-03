<template>
  <div v-loading="loading" class="funny-joke">
    <el-scrollbar>
      <div class="funny-joke-header">
        <ThrottleButton type="primary" round @click="getSentenceInfoRandom">
          随机
        </ThrottleButton>
        <ThrottleButton type="danger" round @click="getSentenceInfo">
          列表
        </ThrottleButton>
      </div>
      <div
        v-if="funnyJokeList && funnyJokeList.length"
        id="funnyJokeWrap"
        class="funny-joke-wrap"
      >
        <el-card
          v-for="(item, ids) in funnyJokeList"
          :key="`${ids}-funnyJoke`"
          shadow="always"
          class="box-card"
        >
          <p class="funny-joke-content-item" v-html="item.content"></p>
          <template #footer>
            {{ item.updateTime }}
          </template>
        </el-card>
        <SimplePagination
          v-if="fjType === 2"
          :pages="pages"
          :loading="loading"
          @change="getSentenceInfo"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import SimplePagination from '@/components/global/simplePagination.vue'
import ThrottleButton from '@/components/global/throttleButton.vue'
import services from '@/plugins/axios'
import { ROLL_TOOLS_APP_ID, ROLL_TOOLS_APP_SECRET } from '@/dic'

const funnyJokeList: any = ref([])
const fjType = ref(1)
const loading = ref(false)
const pages = reactive({
  pageIndex: 0,
  limit: 30,
  isMore: false
})

const getSentenceInfo = () => {
  if (fjType.value === 1) {
    funnyJokeList.value = []
  }
  fjType.value = 2
  loading.value = true
  const params: any = {
    app_id: ROLL_TOOLS_APP_ID,
    app_secret: ROLL_TOOLS_APP_SECRET,
    page: pages.pageIndex
  }
  services.get('https://www.mxnzp.com/api/jokes/list', params).then((res: any) => {
    const result = res.data
    funnyJokeList.value = [
      ...funnyJokeList.value,
      ...result.list || []
    ]
    pages.isMore = result.page !== result.totalPage
  }).finally(() => {
    loading.value = false
  })
}

const getSentenceInfoRandom = () => {
  if (fjType.value === 2) {
    funnyJokeList.value = []
  }
  pages.pageIndex = 0
  fjType.value = 1
  services.get('https://www.mxnzp.com/api/jokes/list/random', {
    app_id: ROLL_TOOLS_APP_ID,
    app_secret: ROLL_TOOLS_APP_SECRET
  }).then((res: any) => {
    funnyJokeList.value = res.data
  }).finally(() => {
    loading.value = false
  })
}

getSentenceInfoRandom()
</script>

<style lang="less" scoped>
.funny-joke {
  width: 100%;
  height: @layout-pages-height;
  .funny-joke-header {
    margin-bottom: 8px;
  }

  .funny-joke-wrap {
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    .el-card {
      // width: 48%;
      margin-bottom: 12px;

      :deep(.el-card__body) {
        padding-top: 12px;
        padding-bottom: 12px;
      }

      :deep(.el-card__footer) {
        color: #999;
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .funny-joke-content-item {
      line-height: 24px;
    }

  }

}
</style>
