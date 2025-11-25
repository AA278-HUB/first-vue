<template>
  <div class="home-page-container">

    <CategoriesList class="categories-area" />

    <PostFeed class="feed-area" />

  </div>
</template>

<script setup lang="ts">
// 假设您将这两个组件创建在 src/components 目录下
import CategoriesList from '@/components/CategoriesList.vue'
import PostFeed from '@/components/PostFeed.vue'
import { onMounted } from 'vue';
import { usePostStore } from '@/stores/postStore';

// 使用 Pinia Store 获取数据 (假设你已经创建了 postStore)
const postStore = usePostStore();

onMounted(() => {
  // 页面加载后，从 C# 后端 API 获取帖子数据
  postStore.fetchPosts();
});
</script>

<style scoped>
.home-page-container {
  /* 简单的垂直布局 */
  display: flex;
  flex-direction: column;
  gap: 30px; /* 组件之间的垂直间距 */
}

.categories-area {
  /* 样式可设计为横向滚动条或卡片网格 */
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}
</style>
