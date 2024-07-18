<template>
  <div class="contents">
    <div class="contetn_left">
      <div class="pagetab"></div>
      <ItemWrap class="contetn_left-top contetn_lr-item" title="设备总览"></ItemWrap>
      <ItemWrap class="contetn_left-center contetn_lr-item" title="用户总览"></ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="设备提醒"
        style="padding: 0 10px 16px 10px"
      ></ItemWrap>
    </div>
    <div class="contetn_center">
      <div class="contetn_center_top">
        <router-view />
      </div>
      <ItemWrap class="contetn_center-bottom" title="安装计划"></ItemWrap>
    </div>
    <div class="contetn_right">
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="报警次数"></ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="报警排名(TOP8)"
        style="padding: 0 10px 16px 10px"
      ></ItemWrap>
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="数据统计图 "></ItemWrap>
    </div>
  </div>
</template>

<script setup>
import ItemWrap from '@/components/item-wrap/item-wrap.vue'
</script>
<style lang="less" scoped>
// 内容
.contents {
  .contetn_left,
  .contetn_right {
    width: 540px;
    box-sizing: border-box;
  }

  .contetn_center {
    width: 720px;
  }

  //左右两侧 三个块
  .contetn_lr-item {
    height: 310px;
  }

  .contetn_center_top {
    width: 100%;
  }

  // 中间
  .contetn_center {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .contetn_center-bottom {
    height: 315px;
  }

  //左边 右边 结构一样
  .contetn_left,
  .contetn_right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
  }
}

@keyframes rotating {
  0% {
    -webkit-transform: rotate(0) scale(1);
    transform: rotate(0) scale(1);
  }
  50% {
    -webkit-transform: rotate(180deg) scale(1.1);
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}
</style>
