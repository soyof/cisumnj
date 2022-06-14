<template>
  <div class="song-list">
    <el-table :data="list">
      <el-table-column type="index" label="#" width="60" />
      <el-table-column prop="name" label="歌曲名">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span class="song-name">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="pubTimes" label="发布时间" />
      <el-table-column prop="alName" label="专辑" />
      <el-table-column
        align="center"
        width="100"
        prop="alName"
        label="操作"
      >
        <template #default>
          <el-icon>
            <Download />
          </el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { Download } from '@element-plus/icons-vue'
import { defineProps } from 'vue'

defineProps({
  list: {
    type: Array,
    required: true,
    default() {
      return []
    }
  }
})
</script>

<style scoped>

</style>
