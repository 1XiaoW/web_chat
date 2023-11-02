<script setup lang="ts">
import styled from 'vue3-styled-components';
import loader from '../assets/loader.gif';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { reqSetAvatar } from '../api/chat';
import { useRouter } from 'vue-router';
import request from '../utils/request';
import { Buffer } from 'buffer';

// 使用vue3-styled-components库定义样式
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

// 头像 API 地址
const api = 'https://api.multiavatar.com/';
const $Router = useRouter();
const avatars: any = ref([]); // 存储头像列表
const isLoading = ref(true); // 加载状态
const selectedAvatar = ref(-1); // 当前选择的头像索引

// 组件挂载后执行的函数
onMounted(() => {
  isLogined(); // 检查用户登录状态
  getAvatarList(); // 获取头像列表
});

// 检查用户是否已登录
const isLogined = () => {
  if (!localStorage.getItem('chatApp-user')) $Router.push('/login');
};

// 获取头像列表
const getAvatarList = async () => {
  const data = [];
  for (let i = 0; i < 2; i++) {
    const image = await request.get(
      `${api}/${Math.round(Math.random() * 1000)}`
    );
    const buffer = new Buffer(image);
    data.push(buffer.toString('base64'));
  }
  avatars.value = data;
  isLoading.value = false;
};

// 设置用户头像
const setProfilePicture = async () => {
  if (selectedAvatar.value === -1) {
    message.error('请选择你的头像');
  } else {
    const user = await JSON.parse(localStorage.getItem('chatApp-user')!);
    const res: any = await reqSetAvatar(user._id, {
      image: avatars.value[selectedAvatar.value],
    });
    if (res.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = res.image;
      localStorage.setItem('chatApp-user', JSON.stringify(user));
      $Router.push('/');
    } else {
      message.error('头像设置错误，请重试');
    }
  }
};
</script>

<template>
  <div class="">
    <Container v-if="isLoading">
      <img :src="loader" alt="加载中" />
    </Container>
    <Container v-else>
      <div class="title-container">
        <h1>请选择你的头像</h1>
      </div>
      <div class="avatars">
        <div
          v-for="(avatar, index) in avatars"
          :key="index"
          :class="['avatar', selectedAvatar === index ? 'selected' : '']">
          <img
            :src="`data:image/svg+xml;base64,${avatar}`"
            alt="头像"
            @click="selectedAvatar = index" />
        </div>
      </div>
      <button @click="setProfilePicture" class="submit-btn">设置头像</button>
    </Container>
  </div>
</template>

<style lang="scss" scoped></style>
