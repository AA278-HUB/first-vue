<template>
  <div class="categories-list">
    <h2>热门小组</h2>
    <div class="groups-wrapper">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <RouterLink :to="`/category/${category.slug}`">
          # {{ category.name }} ({{ category.postCount }})
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 🌟 这里的 categories 数据最终应该从 Pinia/API 加载
const categories = ref([
    { id: 1, name: '编程技术', slug: 'tech', postCount: 1200 },
    { id: 2, name: '生活娱乐', slug: 'life', postCount: 850 },
    { id: 3, name: '运动健身', slug: 'sport', postCount: 430 },
    // ... 更多小组
]);
</script>

<style scoped>
.groups-wrapper {
  display: flex;
  gap: 15px;
  overflow-x: auto; /* 允许横向滚动 */
}
.category-card {
  /* 简单的卡片样式 */
  flex-shrink: 0;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: #f7f7f7;
  font-weight: bold;
}
</style>
