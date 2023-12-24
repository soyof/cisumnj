<template>
  <div class="sentence-day">
  </div>
</template>

<script lang="ts" setup>
import services from '@/plugins/axios'
import { ROLL_TOOLS_APP_ID, ROLL_TOOLS_APP_SECRET } from '@/dic'

const getSentenceInfo = () => {
  services.get('https://www.mxnzp.com/api/jokes/list', {
    app_id: ROLL_TOOLS_APP_ID,
    app_secret: ROLL_TOOLS_APP_SECRET,
    page: 1
  }).then((res: any) => {
    console.log(res)
  })
}

getSentenceInfo()
</script>
