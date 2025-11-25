// 文件路径: src/api.ts

import axios from 'axios';

// 1. 创建一个 Axios 实例，方便管理全局配置
const apiClient = axios.create({
  // 【重要】请将这里替换为你真实的后端 API 基础地址
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
});

// 2. 配置请求拦截器：在发送请求前自动添加 Token
apiClient.interceptors.request.use(
  (config) => {
    // 每次发送请求前，检查 LocalStorage 中是否有 Token
    const token = localStorage.getItem('userToken');

    if (token) {
      // 如果有 Token，就把它添加到请求头中
      // 这是 JWT 认证的标准格式
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
