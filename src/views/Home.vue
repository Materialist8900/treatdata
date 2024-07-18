<template>
  <ScaleScreen :width="1920" :height="1080" class="scale-wrap" :selfAdaption="true">
    <div class="bg">
      <div class="host-body">
        <!-- 头部 s -->
        <div class="d-flex jc-center title_wrap">
          <div class="zuojuxing"></div>
          <div class="youjuxing"></div>
          <div class="guang"></div>
          <div class="d-flex jc-center">
            <div class="title">
              <span class="title-text">算力可视化平台</span>
            </div>
          </div>
        </div>
        <!-- 头部 e-->
        <!-- 内容  s-->
        <router-view />
        <!-- 内容 e -->
      </div>
    </div>
  </ScaleScreen>
</template>

<script setup>
import ScaleScreen from '@/components/scale-screen/scale-screen.vue'

import { ref } from 'vue'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './home.less';
</style>
