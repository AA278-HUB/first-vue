<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
// 注意：<RouterView /> 是由 main.ts 注册后，全局可用的组件，不需要在这里导入。
</script>

<template>
  <SiteHeader />

  <main class="main-content">
    <RouterView />
    </main>
</template>

<style>
/* 这里我们只保留最基础的重置 */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: white;
}

.main-content {
  padding: 20px;
  /* 这里的 padding 会应用到所有路由加载的 View 组件外部 */
}
</style>
