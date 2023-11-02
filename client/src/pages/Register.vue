<script setup lang="ts">
import styled from 'vue3-styled-components';
import Logo from '../assets/logo.svg';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { reqRegister } from '../api/chat';
import { useRouter } from 'vue-router';

// 使用styled-components库定义样式
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #ccc;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #eee;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #6ab940;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #a2f552;
      outline: none;
    }
  }
  button {
    background-color: #6ab940;
    color: black;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    &:hover {
      background-color: #6ab940;
    }
  }
  span {
    color: black;
    a {
      color: #6ab940;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
onMounted(() => {
  isLogined(); // 在组件挂载后检查用户是否已登录
});

const isLogined = () => {
  if (localStorage.getItem('chatApp-user')) $Router.push('/'); // 如果用户已登录，跳转到首页
};

const $Router = useRouter(); // 获取Vue Router实例

const formData = ref({
  // 定义表单数据的响应式引用
  username: 'admin',
  email: '213123@qq.com',
  password: '12345678',
  confirmPassword: '12345678',
});

const handleValidation = () => {
  // 表单验证函数
  const { password, confirmPassword, username, email } = formData.value;
  if (password !== confirmPassword) {
    // 检查密码和确认密码是否相同
    message.error('密码和确认密码不相同');
    return false;
  } else if (username.length < 3) {
    // 检查用户名长度是否小于3个字符
    message.error('用户名长度不能小于3个字符');
    return false;
  } else if (password.length < 8) {
    // 检查密码长度是否小于8个字符
    message.error('密码长度应大于或等于8个字符');
    return false;
  } else if (email === '') {
    // 检查邮箱是否为空
    message.error('邮箱是必填项');
    return false;
  }

  return true; // 验证通过
};

const handleSubmit = async (e: Event) => {
  // 提交表单处理函数
  e.preventDefault();
  if (handleValidation()) {
    // 验证表单数据
    const res: any = await reqRegister(formData.value); // 发起注册请求
    if (res.status === 0) {
      // 注册成功
      localStorage.setItem('chatApp-user', JSON.stringify(res.user)); // 将用户信息保存到localStorage
      $Router.push('/'); // 跳转到首页
    } else {
      message.error(res.msg); // 注册失败，显示错误消息
    }
  } else {
    // 表单验证未通过
  }
};
</script>

<template>
  <div class="">
    <FormContainer>
      <form @submit="handleSubmit($event)">
        <div class="brand">
          <img :src="Logo" alt="Logo" />
          <h1>WanChat</h1>
        </div>
        <input
          v-model="formData.username"
          type="text"
          placeholder="账户"
          name="username" />
        <input
          v-model="formData.email"
          type="email"
          placeholder="邮箱"
          name="email" />
        <input
          v-model="formData.password"
          type="password"
          placeholder="密码"
          name="password" />
        <input
          v-model="formData.confirmPassword"
          type="password"
          placeholder="确认密码"
          name="confirmPassword" />
        <button type="submit">注册用户</button>
        <span>已有账号? <router-link to="/login">登录</router-link></span>
      </form>
    </FormContainer>
  </div>
</template>

<style lang="scss" scoped></style>
