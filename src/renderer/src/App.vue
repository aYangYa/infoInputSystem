<template>
  <div class="mainPage" :style="{ width: windowWidth + 'px', height: windowHeight + 'px' }">
    <welcome-page />
  </div>
</template>

<script setup lang="ts">
import WelcomePage from './components/WelcomePage.vue'
import { ref, onMounted } from 'vue'

let windowWidth = ref(window.innerWidth)
let windowHeight = ref(window.innerHeight)

onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  })
})
</script>

<style>
.mainPage {
  overflow: auto;
  background-color: white;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #a1a1a1;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #424242;
}
</style>
