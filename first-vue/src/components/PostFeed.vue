<template>
  <div class="post-feed">
    <h1>公共讨论区</h1>
    <div v-for="post in posts" :key="post.id" class="post-item">
      <RouterLink :to="`/post/${post.id}`" class="post-title">
        {{ post.title }}
      </RouterLink>
      <div class="post-meta">
        发布于 {{ post.category }} | by {{ post.author }}
      </div>
    </div>
    <p v-if="!posts.length">当前没有帖子，快来发布第一个吧！</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePostStore } from '@/stores/postStore';

// 从 Pinia Store 中获取帖子列表
const postStore = usePostStore();
const posts = computed(() => postStore.postsList); // 假设 Store 中有一个 postsList 数组
</script>

<style scoped>
.post-item {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}
.post-title {
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}
.post-meta {
  font-size: 0.9em;
  color: #666;
  margin-top: 5px;
}
</style>
