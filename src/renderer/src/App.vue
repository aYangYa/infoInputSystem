<template>
  <div class="mainPage">
    <welcome-page />
  </div>
</template>

<style>
.mainPage {
  width: 1600px;
  height: 900px;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #498ecc;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #023656;
}
</style>
<script setup lang="ts">
import WelcomePage from './components/WelcomePage.vue'
</script>
