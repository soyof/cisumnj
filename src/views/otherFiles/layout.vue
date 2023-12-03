<template>
  <div class="layout">
    <div class="layout-header">
      <!-- header -->
      <div class="layout-header-left">
        <div class="logo"></div>
        <!-- <div class="text">J-MUSIC</div> -->
      </div>
      <div class="layout-header-center"></div>
      <div class="layout-header-right"></div>
    </div>
    <Split
      v-model="splitVal"
      class="layout-content"
      min="200px"
    >
      <template #left>
        <div class="layout-content-left">
          <el-scrollbar>
            <SideMenu />
          </el-scrollbar>
        </div>
      </template>
      <template #right>
        <div class="layout-content-right">
          <el-scrollbar ref="layoutContentRightScrollbar" wrapClass="layout-content-right-scrollbar-wrap">
            <router-view />
          </el-scrollbar>
        </div>
      </template>
    </Split>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import SideMenu from '@/components/sideMenu/sideMenu.vue'
import Split from '@/components/split/split.vue'

export default defineComponent({
  components: {
    SideMenu,
    Split
  },
  setup() {
    const splitVal = ref('200px')
    return {
      splitVal
    }
  }
})
</script>

<style lang="less" scoped>
.layout {
  position: relative;
  width: 100vw;
  height: 100vh;
  &-header {
    display: flex;
    align-items: center;
    height: @layout-header-height;
    background: rgba(#9796f0, .1);
    box-shadow: 0 6px 3px -7px rgb(#9796f0, .7);
    // background: -webkit-linear-gradient(to right, #fbc7d4, #9796f0);
    // background: linear-gradient(to right, #fbc7d4, #9796f0);
    // animation: linearGradient 6s ease-in-out 1s infinite alternate forwards;

    &-left {
      display: flex;
      align-items: center;
      height: 100%;
      margin-left: 6px;
      // color: #f5f5f5;
      animation: textColor 6s ease-in-out 1s infinite alternate forwards;

      .logo {
        width: 130px;
        height: 36px;
        background: transparent url('~@/assets/images/logo_jn.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  &-content {
    margin-top: 0;
    height: @layout-content-height;
    &-left, &-right {
      width: 100%;
      height: @layout-content-height;
    }

    &-left {
      padding-top: 5px;
      font-size: 16px;
      box-sizing: border-box;
    }

    &-right {

      :deep(.layout-content-right-scrollbar-wrap) {
        box-sizing: border-box;
        padding: @layout-content-padding;
      }
    }
  }

  @keyframes linearGradient {
    0% {
      background: #9796f0;
      background: -webkit-linear-gradient(to right, #fbc7d4, #9796f0);
      background: linear-gradient(to right, #fbc7d4, #9796f0);
    }
    20% {
      background: #fbc7d4;
      background: -webkit-linear-gradient(to right, #9796f0, #fbc7d4);
      background: linear-gradient(to right, #9796f0, #fbc7d4);
    }
    40% {
      background: #E55D87;
      background: -webkit-linear-gradient(to right, #5FC3E4, #E55D87);
      background: linear-gradient(to right, #5FC3E4, #E55D87);
    }
    60% {
      background: #5FC3E4;
      background: -webkit-linear-gradient(to right, #E55D87, #5FC3E4);
      background: linear-gradient(to right, #E55D87, #5FC3E4);
    }
    80% {
      background: #12c2e9;
      background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);
      background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9);
    }
    100% {
      background: #f64f59;
      background: -webkit-linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
      background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
    }
  }

  @keyframes textColor {
    0% {
      color: #04382B;
    }
    20% {
      color: #68690F;
    }
    40% {
      color: #222;
    }
    60% {
      color: #f1f1f1;
    }
    80% {
      color: #f3f3f3;
    }
    100% {
      color: #f5f5f5;
    }
  }

}
</style>
