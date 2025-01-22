<script setup>
import { onMounted } from 'vue'
import { useInfoStore } from '../store/InfoStore.js'

const InfoStore = useInfoStore()
onMounted(() => {})
</script>

<template>
  <div style="width: 100%; height: 100%; background: #42d392"></div>
</template>

<style scoped></style>
