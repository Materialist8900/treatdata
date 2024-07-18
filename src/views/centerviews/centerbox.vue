<template>
  <div class="centerbox">
    <div class="boxtitle">
      <div class="zuo"></div>
      <span class="titletext">模型选择</span>
      <div class="you"></div>
    </div>
    <div class="boxwrap">
      <ul class="modeMenu">
        <li class="menu-item">
          <router-link to="/index/centerbox/studymode">训练模式</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/index/centerbox/reslovemode">分析模式</router-link>
        </li>
      </ul>
      <router-view />
    </div>
  </div>
</template>

<script setup></script>
<style lang="less" scoped>
.centerbox {
  margin-bottom: 30px;

  .boxtitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.8525390625%, #01aaff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url('../../assets/img/xiezuo.png') no-repeat;
    }

    .you {
      background: url('../../assets/img/xieyou.png') no-repeat;
    }
  }
  .boxwrap {
    height: 548px;
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;
    .modeMenu {
      display: flex;
      width: 100%;
      height: 50px;
      background-color: #040812;
      border-radius: 12px;
      border: none;
      .menu-item {
        flex: 1;
        height: 100%;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        letter-spacing: 6px;
        background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.8525390625%, #01aaff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0 10px;
        a {
          display: block;
          height: 100%;
          line-height: 50px;
          text-align: center;
        }
      }
    }
  }
}
</style>
