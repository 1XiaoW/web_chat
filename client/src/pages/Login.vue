<script setup lang="ts">
import styled from 'vue3-styled-components';
import Logo from '../assets/logo.svg';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { reqLogin } from '../api/chat';
import { useRouter } from 'vue-router';

// 使用vue3-styled-components库定义样式
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

const $Router = useRouter();

const formData = ref({
  username: 'admin',
  password: '12345678',
});

onMounted(() => {
  isLogined();
});

// 检查是否已登录
const isLogined = () => {
  if (localStorage.getItem('chatApp-user')) $Router.push('/');
};

// 表单验证
const handleValidation = () => {
  const { password, username } = formData.value;
  if (password === '') {
    message.error('账户和密码是必须的');
    return false;
  } else if (username === '') {
    message.error('账户和密码是必须的');
    return false;
  }
  return true;
};

// 处理表单提交事件
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (handleValidation()) {
    const res: any = await reqLogin(formData.value);
    if (res.status === 0) {
      localStorage.setItem('chatApp-user', JSON.stringify(res.user));
      $Router.push('/');
    } else {
      message.error(res.msg);
    }
  } else {
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
          min="3"
          name="username" />
        <input
          v-model="formData.password"
          type="password"
          placeholder="密码"
          name="password" />
        <button type="submit">现在登录</button>
        <span>还没有账号? <router-link to="/register">注册</router-link></span>
      </form>
    </FormContainer>
  </div>
</template>

<style lang="scss" scoped></style>
