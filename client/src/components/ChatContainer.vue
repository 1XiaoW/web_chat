<script setup lang="ts">
import { onMounted, ref, reactive, watch, nextTick } from 'vue';
import styled from 'vue3-styled-components';
import Logout from '../components/Logout.vue';
import ChatInput from '../components/ChatInput.vue';
import { reqAddMsg, reqGetAllMessage } from '../api/chat';

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
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
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: orange;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #000;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

const props = defineProps(['currentChat', 'currentUser', 'socket']);
// 定义消息列表
const messages: any = ref([]);
// 定义接收到的消息
const arrivalMessage: { fromSelf: boolean; message: string } = reactive({
  fromSelf: false,
  message: '',
});
// 定义滚动容器的引用
const scrollRef = ref();

// 监听当前聊天对象的变化，获取聊天记录
watch(
  () => props.currentChat,
  async () => {
    const res = await reqGetAllMessage({
      from: props.currentUser._id,
      to: props.currentChat._id,
    });
    messages.value = res;
  },
  {
    immediate: true,
  }
);

// 监听msg-receive事件，接收到新消息时更新arrivalMessage
onMounted(async () => {
  await props.socket.on('msg-receive', (msg: any) => {
    arrivalMessage.fromSelf = false;
    arrivalMessage.message = msg;
  });
});

// 处理发送消息的方法
const handleSendMsg = async (msg: any) => {
  // 发送消息到后端
  await reqAddMsg({
    from: props.currentUser._id,
    to: props.currentChat._id,
    message: msg,
  });

  // 发送消息到socket服务器
  props.socket.emit('send-msg', {
    to: props.currentChat._id,
    from: props.currentUser._id,
    message: msg,
  });

  // 更新消息列表
  const msgs = [...messages.value];
  msgs.push({ fromSelf: true, message: msg });
  messages.value = msgs;
};

// watch(props.socket, () => {
//   props.socket.on('msg-receive', msg => {
//     console.log(msg);
//     arrivalMessage.value = { fromSelf: false, message: msg };
//   });
// });

// 监听arrivalMessage的变化，将新消息添加到消息列表中
watch(arrivalMessage, newValue => {
  messages.value = [...messages.value, newValue];
});

// 监听messages的变化，在DOM更新后滚动到最底部
watch(messages, async () => {
  await nextTick();
  if (scrollRef.value)
    scrollRef.value?.at(-1).scrollIntoView({ behavior: 'smooth' });
});
</script>

<template>
  <Container>
    <div class="chat-header">
      <div class="user-details">
        <div class="avatar" v-if="currentChat.avatarImage">
          <img
            :src="`data:image/svg+xml;base64,${currentChat.avatarImage}`"
            alt="" />
        </div>
        <div class="username">
          <h3>{{ currentChat.username }}</h3>
        </div>
      </div>
      <Logout></Logout>
    </div>
    <div class="chat-messages">
      <div ref="scrollRef" v-for="(message, index) in messages" :key="index">
        <div :class="['message', message.fromSelf ? 'sended' : 'recieved']">
          <div class="content">
            <p>{{ message.message }}</p>
          </div>
        </div>
      </div>
    </div>
    <ChatInput @handleSendMsg="handleSendMsg"></ChatInput>
  </Container>
</template>

<style lang="scss" scoped></style>
