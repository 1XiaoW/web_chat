<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import styled from 'vue3-styled-components';
import { useRouter } from 'vue-router';
import { reqAllUsers } from '../api/chat';
import Contacts from '../components/Contacts.vue';
import Welcome from '../components/Welcome.vue';
import ChatContainer from '../components/ChatContainer.vue';
import { io } from 'socket.io-client';

// 使用vue3-styled-components库定义样式
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #ddd;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #cec9c9;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

// 定义变量和函数
const socket = ref(); // socket.io客户端实例
const $Router = useRouter(); // Vue Router实例
const contacts: any = ref([]); // 所有联系人的数组
const currentUser: any = ref({}); // 当前用户对象
const currentChat = ref(undefined); // 当前聊天对象

// 组件挂载时检查是否已登录
onMounted(() => {
  isLogined();
});

// 检查是否已登录
const isLogined = async () => {
  if (!localStorage.getItem('chatApp-user'))
    $Router.push('/login'); // 如果未登录则跳转到登录页面
  else {
    currentUser.value = await JSON.parse(localStorage.getItem('chatApp-user')!); // 获取当前用户对象
    if (Object.keys(currentUser.value).length !== 0) {
      socket.value = io('http://localhost:5000'); // 连接socket.io服务器
      socket.value.emit('add-user', currentUser.value._id); // 向服务器发送添加用户事件
    }
  }
};

// 监听当前用户变化，获取所有联系人
watch(currentUser, async () => {
  if (currentUser.value && currentUser.value.isAvatarImageSet) {
    const res = await reqAllUsers(currentUser.value._id);
    contacts.value = res;
  } else $Router.push('/setAvatar');
});

// 处理聊天切换事件
const handleChatChange = (chat: any) => {
  currentChat.value = chat;
};
</script>

<template>
  <div class="">
    <Container>
      <div class="container">
        <Contacts
          :contacts="contacts"
          :currentUser="currentUser"
          @handleChatChange="handleChatChange"></Contacts>
        <Welcome
          v-if="currentChat === undefined"
          :currentUser="currentUser"></Welcome>
        <ChatContainer
          v-else
          :currentChat="currentChat"
          :currentUser="currentUser"
          :socket="socket"></ChatContainer>
      </div>
    </Container>
  </div>
</template>

<style lang="scss" scoped></style>
