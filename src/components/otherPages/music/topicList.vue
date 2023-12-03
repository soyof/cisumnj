<template>
  <div class="topic-list">
    <el-table
      :data="props.topicList"
      style="width: 100%"
      size="small"
      highlightCurrentRow
      @row-click="handleTableRowClick"
    >
      <el-table-column type="expand" width="30">
        <template #default="scope">
          <div class="topic-creator-info">
            <HeaderLine class="topic-list-header-line" title="话题详情" />
            <div class="topic-creator-info-wrap">
              <div v-if="scope.row.creator.avatarUrl" class="topic-creator-info-item">
                <div class="topic-creator-info-item-label">
                  头像
                </div>
                <div class="topic-creator-user-info">
                  <el-avatar :size="30" :src="scope.row.creator.avatarUrl" />
                </div>
              </div>
              <div class="topic-creator-info-item">
                <div class="topic-creator-info-item-label">
                  昵称
                </div>
                <div class="topic-creator-info-item-value">
                  <span class="topic-creator-info-item-value-txt">{{ scope.row.creator.nickname || '--' }}</span>
                </div>
              </div>
              <div class="topic-creator-info-item">
                <div class="topic-creator-info-item-label">
                  签名
                </div>
                <div class="topic-creator-info-item-value">
                  <span class="topic-creator-info-item-value-txt">{{ scope.row.creator.signature || '--' }}</span>
                </div>
              </div>
              <div class="topic-creator-info-item">
                <div class="topic-creator-info-item-label">
                  最后登录IP
                </div>
                <div class="topic-creator-info-item-value">
                  <span class="topic-creator-info-item-value-txt">{{ scope.row.creator.lastLoginIP || '--' }}</span>
                </div>
              </div>
              <div class="topic-creator-info-item">
                <div class="topic-creator-info-item-label">
                  最后登录时间
                </div>
                <div class="topic-creator-info-item-value">
                  <span class="topic-creator-info-item-value-txt">{{ scope.row.creator.lastLoginTime ? formatDate(scope.row.creator.lastLoginTime, 'yyyy-MM-dd hh:mm:ss') : '--' }}</span>
                </div>
              </div>
              <div class="topic-creator-info-item">
                <div class="topic-creator-info-item-label">
                  话题创建时间
                </div>
                <div class="topic-creator-info-item-value">
                  <span class="topic-creator-info-item-value-txt">{{ scope.row.creator.createTime ? formatDate(scope.row.creator.createTime, 'yyyy-MM-dd hh:mm:ss') : '--' }}</span>
                </div>
              </div>
              <div class="topic-creator-info-item">
                <div class="topic-creator-info-item-label">
                  标签
                </div>
                <div class="topic-creator-info-item-value">
                  <template v-if="scope.row.creator.expertTags && scope.row.creator.expertTags.length > 0">
                    <el-tag v-for="(tag, tagIds) in scope.row.creator.expertTags" :key="`${tagIds}-tag`">
                      {{ tag }}
                    </el-tag>
                  </template>
                  <span v-else class="topic-creator-nickname">--</span>
                </div>
              </div>
              <div class="topic-creator-info-item">
                <div class="topic-creator-info-item-label">
                  相关图片
                </div>
                <div class="topic-creator-info-item-value">
                  <el-image
                    :src="scope.row.creator.backgroundUrl"
                    :previewSrcList="[scope.row.creator.backgroundUrl]"
                    :initialIndex="4"
                    previewTeleported
                    fit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="封面" width="80" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center">
            <el-image
              style="width: 30px; height: 30px"
              :src="scope.row.rectanglePicUrl"
              :previewSrcList="[scope.row.coverUrl]"
              :initialIndex="4"
              previewTeleported
              fit="cover"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        showOverflowTooltip
        prop="title"
        label="话题"
        minWidth="300"
      />
      <el-table-column
        showOverflowTooltip
        prop="recmdTitle"
        label="推荐主题"
        minWidth="300"
      />
      <el-table-column
        showOverflowTooltip
        prop="recmdContent"
        label="推荐内容"
        minWidth="300"
      />
      <el-table-column
        showOverflowTooltip
        prop="tags"
        label="标签"
        width="120"
        :formatter="formatTagsFn"
      />
      <el-table-column
        showOverflowTooltip
        prop="likedCount"
        label="收藏数"
        width="120"
      />
      <el-table-column
        showOverflowTooltip
        prop="shareCount"
        label="分享数"
        width="120"
      />
      <el-table-column
        showOverflowTooltip
        prop="readCount"
        label="浏览数"
        width="120"
      />
      <el-table-column
        showOverflowTooltip
        prop="addTime"
        label="添加时间"
        width="180"
        :formatter="formatterDateTimeFn"
      />
    </el-table>
    <div v-if="curColInfo && Object.keys(curColInfo).length > 0" class="topic-item-dtl">
      <HeaderLine
        class="topic-item-dtl-header-line"
        title="话题内容"
        :isShowExpand="true"
        :defaultExpand="true"
      >
        <template #content>
          <div class="topic-item-dtl-content">
            <div class="topic-item-dtl-content-info">
              <p v-if="curColInfo.title || curColInfo.recomdTitle" class="topic-item-dtl-content-info-title">
                {{ curColInfo.title || curColInfo.recomdTitle }}
              </p>
              <p v-if="curColInfo.pubTime" class="t-i-d-times">
                <span>发布时间: {{ curColInfo.pubTime ? formatDate(curColInfo.pubTime, 'yyyy-MM-dd hh:mm:ss') : '--' }}</span>
                <span>更新时间: {{ curColInfo.updateTime ? formatDate(curColInfo.updateTime, 'yyyy-MM-dd hh:mm:ss') : '--' }}</span>
                <span>阅读量: {{ curColInfo.readCount || 0 }}</span>
              </p>
              <p v-if="curColInfo.tags" class="t-i-d-tag">
                <el-tag v-for="(tag, tagIds) in curColInfo.tags" :key="`${tagIds}-t-i-dtl-tag`">
                  {{ tag }}
                </el-tag>
              </p>
            </div>
            <div
              v-for="(item, itemIds) in curColInfo.content"
              :key="`${itemIds}-${item.id}-${item.type}-content`"
              class="topic-item-dtl-content-item"
            >
              <p v-if="item.type !== 2" v-html="item.content"></p>
            </div>
          </div>
        </template>
      </HeaderLine>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, ref } from 'vue'
import { useFormatDate } from '@/hooks/useFormatDate'
import { formatDate } from '@/utils/utils'
const props = defineProps({
  topicList: {
    type: Array,
    required: true,
    default() {
      return []
    }
  }
})

const { formatterDateTimeFn, formatTagsFn } = useFormatDate()
const curColInfo = ref({})

const handleTableRowClick = (row: any) => {
  curColInfo.value = row.topic || {}
}

</script>

<style lang="less" scoped>
.topic-list {
  .topic-creator-info {
    padding: 12px;
    :deep(.topic-list-header-line) {
      .header-line {
        padding: 0 !important;
        font-weight: 400;
        background-color: #fff;

        .header-line-title {
          .header-line-title-line {
            background-color: #F56C6C;
          }

          .header-line-title-text {
            font-size: 12px !important;
          }
        }
      }
    }

    .topic-creator-info-wrap {

      .topic-creator-info-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        .topic-creator-info-item-label {
          align-self: flex-start;
          width: 80px;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          margin-right: 15px;
          font-size: 12px;
          text-align: right;
          background-color: #f5f5f5;
        }

        .topic-creator-info-item-value {
          line-height: 30px;
          font-size: 12px;

          .topic-creator-info-item-value-txt {
            font-size: 12px;
          }

          .el-tag {
            margin-right: 5px;
            margin-bottom: 5px;
            font-size: 12px;

            :deep(.el-tag__content) {
              font-size: 12px;
            }
          }
        }
      }

    }
  }

  .topic-item-dtl {
    margin-top: 15px;

    .topic-item-dtl-header-line {
      :deep(.header-line) {
        height: 20px;
        font-weight: 400;
        background-color: #f5f5f5;

        .header-line-title {
          .header-line-title-line {

          }

          .header-line-title-text {
            font-size: 12px !important;
          }
        }
      }

      .topic-item-dtl-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 12px;

        .topic-item-dtl-content-info {
          padding-bottom: 10px;
          margin-bottom: 15px;
          border-bottom: 2px dashed #409EFF;
          .topic-item-dtl-content-info-title {
            line-height: 25px;
            margin-bottom: 10px;
            font-weight: 700;
            text-align: center;
          }
          .t-i-d-times {
            line-height: 20px;
            font-size: 12px;
            > span {
              margin-right: 20px;
              font-size: 12px;
            }
          }
          .t-i-d-tag {
            .el-tag {
              margin: 5px 5px 5px 0;
              height: 20px;
              :deep(.el-tag__content) {
                font-size: 12px;
              }
            }
          }
        }

        .topic-item-dtl-content-item {
          p {
            font-size: 12px;
            line-height: 22px;
          }
        }

      }
    }
  }
}
</style>
