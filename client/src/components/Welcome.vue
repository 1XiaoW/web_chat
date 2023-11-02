<script setup lang="ts">
import { ref } from 'vue';
import styled from 'vue3-styled-components';
import Robot from '../assets/robot.gif';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

const props = defineProps(['currentUser']);
</script>

<template>
  <Container>
    <img :src="Robot" alt="" />
    <h1>
      欢迎, <span>{{ currentUser.username }}!</span>
    </h1>
    <h3>请选择联系人开始聊天</h3>
  </Container>
</template>

<style lang="scss" scoped></style>
