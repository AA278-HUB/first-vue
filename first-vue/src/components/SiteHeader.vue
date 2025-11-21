<script setup lang="ts">
// 这里可以写逻辑，比如获取用户名等，暂时留空
</script>

<template>
  <header class="header-container">
    <div class="logo">
      我的网站
    </div>

    <div class="user-info">
      <span>张三</span>
      <span class="divider">|</span>
      <a href="#" class="logout">退出</a>
    </div>
  </header>
</template>

<style scoped>
.header-container {
  /* 核心布局：弹性盒子 */
  display: flex;
  /* 关键属性：两端对齐（左边的在最左，右边的在最右） */
  justify-content: space-between;
  /* 垂直居中 */
  align-items: center;

  /* 一些装饰样式 */
  height: 60px;
  padding: 0 20px;
  background-color: #f8f9fa; /* 浅灰色背景 */
  border-bottom: 1px solid #ddd;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.user-info {
  font-size: 14px;
  color: #666;
}

.divider {
  margin: 0 8px;
  color: #ccc;
}

.logout {
  text-decoration: none;
  color: #409eff;
  cursor: pointer;
}
</style>
