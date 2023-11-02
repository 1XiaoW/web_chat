<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import styled from 'vue3-styled-components';
import Logo from '../assets/logo.svg';

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #aaa;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: orange;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #343450;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

const props = defineProps(['contacts', 'currentUser']);
const $emit = defineEmits(['handleChatChange']);
// 定义响应式数据
const currentUserName = ref(undefined);
const currentUserImage = ref(undefined);
const currentSelected = ref(undefined);

onMounted(() => {});

// 监听 currentUser 的变化，更新当前用户信息
watch(
  () => props.currentUser,
  newValue => {
    getCurrentUser();
  }
);

// 获取当前用户信息
const getCurrentUser = () => {
  if (props.currentUser) {
    currentUserImage.value = props.currentUser.avatarImage;
    currentUserName.value = props.currentUser.username;
  } else console.log('我草你订单');
};

// 切换当前聊天联系人
const changeCurrentChat = (index, contact) => {
  currentSelected.value = index;
  $emit('handleChatChange', contact);
};
</script>

<template>
  <Container v-if="currentUserImage && currentUserName">
    <div class="brand">
      <img :src="Logo" alt="logo" />
      <h3>snappy</h3>
    </div>
    <div class="contacts">
      <div
        v-for="(contact, index) in contacts"
        :key="contact._id"
        :class="['contact', index === currentSelected ? 'selected' : '']"
        @click="changeCurrentChat(index, contact)">
        <div class="avatar">
          <img
            :src="`data:image/svg+xml;base64,${contact.avatarImage}`"
            alt="头像" />
        </div>
        <div class="username">
          <h3>{{ contact.username }}</h3>
        </div>
      </div>
    </div>
    <div class="current-user">
      <div class="avatar">
        <img
          :src="`data:image/svg+xml;base64,${currentUserImage}`"
          alt="头像" />
      </div>
      <div class="username">
        <h2>{{ currentUserName }}</h2>
      </div>
    </div>
  </Container>
</template>

<style lang="scss" scoped></style>
