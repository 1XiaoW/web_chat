<script setup lang="ts">
import { LogoutOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import styled from 'vue3-styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

const $Router = useRouter();

// 退出登录处理函数
const handleClick = () => {
  localStorage.clear();
  $Router.push('/login');
};
</script>

<template>
  <Button @click="handleClick">
    <LogoutOutlined />
  </Button>
</template>

<style lang="scss" scoped></style>
