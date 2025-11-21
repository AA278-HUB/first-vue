<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <SiteHeader />

  <main class="main-content">
    <h1>欢迎来到我的 Vue 网站</h1>
    <p>现在它应该是上下两行结构了。</p>
    <div class="content-box">
      在这里开始你的开发...
    </div>
  </main>
</template>

<style>
/* 这里我们只保留最基础的重置 */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: white; /* 确保背景是白色的 */
}

.main-content {
  padding: 20px;
}
</style>
