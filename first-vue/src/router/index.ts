// 文件路径: router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
// 注意：HomeView 和 AboutView 的 import 也可以删除了

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ==========================================
    // 此处是路由表，已清空默认的 / 和 /about 路由
    // 你可以在这里添加你的 /user-profile 或 /dashboard 等真实路由
    // ==========================================
  ],
})

export default router
