<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '@/api' // 引入配置好的 Axios 实例 (需确保 src/api.ts 存在)
import axios from 'axios'

// === 1. 状态变量 ===
const isLoggedIn = ref(false)
const showModal = ref(false)

const username = ref('')
const password = ref('')

const isLoading = ref(false)
const loginError = ref('')

// === 2. 真实 API 请求函数 (使用 apiClient) ===
const loginApi = async (user: string, pass: string) => {
    // 假设后端返回的数据结构是 { token: '...', username: '...' }
    const response = await apiClient.post('/login', { username: user, password: pass });

    if (response.data && response.data.token) {
        return response.data;
    } else {
        throw new Error(response.data.message || '登录失败，请检查账号密码。');
    }
}

// === 3. 核心登录方法 (HandleLogin) ===
const handleLogin = async () => {
    loginError.value = ''

    if (!username.value || !password.value) {
        loginError.value = '请输入完整的账号和密码。'
        return
    }

    isLoading.value = true

    try {
        const result = await loginApi(username.value, password.value)

        // 存储 Token 和 用户名
        localStorage.setItem('userToken', result.token);
        localStorage.setItem('username', result.username || username.value);

        isLoggedIn.value = true
        username.value = result.username || username.value;

        closeLogin()

    } catch (error: unknown) {
      // 使用 Axios 提供的类型守卫来安全地处理 Axios 错误
        if (axios.isAxiosError(error)) {
            // 检查 error.response 是否存在，并优先获取后端返回的 message
            const msg = error.response?.data?.message || error.message || '服务器返回异常数据。';
            loginError.value = msg;
        } else {
            // 处理非 Axios 导致的通用 JS 错误（如网络连接断开）
            // 需要使用类型断言 (as Error) 才能访问 .message 属性
            loginError.value = (error as Error).message || '发生未知错误。';
        }

        password.value = '';
    } finally {
        isLoading.value = false
    }
}

// === 4. 生命周期：初始化检查 ===
onMounted(() => {
    const token = localStorage.getItem('userToken');
    const storedUsername = localStorage.getItem('username');

    if (token) {
        isLoggedIn.value = true;
        username.value = storedUsername || '用户';
    }
});


// === 5. 辅助方法 ===
const openLogin = () => { showModal.value = true }
const closeLogin = () => {
  showModal.value = false
  username.value = ''
  password.value = ''
  loginError.value = ''
}
const logout = () => {
    isLoggedIn.value = false
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    username.value = ''
}
</script>

<template>
  <header class="header-container">
    <div class="logo">我的网站</div>

    <div class="user-info">
      <div v-if="isLoggedIn">
        <span>欢迎，{{ username || '用户' }}</span>
        <span class="divider">|</span>
        <a href="#" @click.prevent="logout">退出</a>
      </div>

      <div v-else>
        <a href="#" @click.prevent="openLogin" class="login-link">登录</a>
        <span class="divider">|</span>
        <a href="#" class="register-link">注册</a>
      </div>
    </div>
  </header>

  <div v-if="showModal" class="modal-overlay" @click.self="closeLogin">
    <div class="modal-box">
      <h3>用户登录</h3>

      <p v-if="loginError" class="error-message">{{ loginError }}</p>

      <div class="input-group">
        <label>账号：</label>
        <input type="text" v-model="username" placeholder="请输入用户名">
      </div>

      <div class="input-group">
        <label>密码：</label>
        <input type="password" v-model="password" placeholder="请输入密码" @keyup.enter="handleLogin">
      </div>

      <div class="modal-actions">
        <button
          @click="handleLogin"
          class="btn-confirm"
          :disabled="isLoading"
        >
          <span v-if="isLoading">登录中...</span>
          <span v-else>登录</span>
        </button>
        <button @click="closeLogin" class="btn-cancel" :disabled="isLoading">取消</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ========================================= */
/* I. 头部导航样式 */
/* ========================================= */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: #333; /* 深色头部 */
  color: white;
  border-bottom: 1px solid #222;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
}

.user-info a {
  color: #409eff;
  text-decoration: none;
  cursor: pointer;
}
.user-info span {
    font-size: 14px;
}
.divider { margin: 0 10px; color: #666; }

/* ========================================= */
/* II. 弹窗和遮罩层样式 */
/* ========================================= */
.modal-overlay {
  /* 关键定位：脱离文档流，铺满全屏，并保证在最上层 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  z-index: 1001;
}

.modal-box h3 {
  margin-top: 0;
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}

/* 错误信息样式 */
.error-message {
  color: #f56c6c; /* 红色 */
  font-size: 13px;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 15px;
}

/* 输入框样式 */
.input-group {
  margin-bottom: 15px;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
  color: #606266;
}
.input-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.3s;
}
.input-group input:focus {
    border-color: #409eff;
    outline: none;
}

/* 按钮样式 */
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}
.btn-confirm {
  background-color: #409eff;
  color: white;
  flex-grow: 1;
  margin-right: 10px;
}
.btn-cancel {
  background-color: #909399;
  color: white;
  flex-grow: 1;
}

/* 禁用按钮样式 (加载状态) */
button:disabled {
    background-color: #a0cfff !important;
    cursor: not-allowed;
}
</style>
