<script setup lang="ts">
import { SendOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import styled from 'vue3-styled-components';
import V3Emoji from 'vue3-emoji';
import 'vue3-emoji/dist/style.css';

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #505058;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      //   .pollup {
      //     width: 20rem;
      //     left: 50px;
      //   }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

// 定义props
const $emit = defineEmits(['handleSendMsg']);
// 定义消息内容
const msg = ref('');

// 处理点击表情的方法
const handleEmojiClick = emoji => {
  let message = msg.value;
  message += emoji;
  msg.value = message;
};

// 处理发送消息的方法
const sendChat = event => {
  event.preventDefault();
  if (msg.value.length > 0) {
    $emit('handleSendMsg', msg.value);
    msg.value = '';
  }
};
</script>

<template>
  <Container>
    <div class="button-container">
      <div class="emoji">
        <V3Emoji fix-pos="upright" @click-emoji="handleEmojiClick" />
      </div>
    </div>
    <form class="input-container" @submit="sendChat($event)">
      <input type="text" placeholder="请输入你要发送的信息" v-model="msg" />
      <button type="submit">
        <SendOutlined />
      </button>
    </form>
  </Container>
</template>

<style lang="scss" scoped></style>
