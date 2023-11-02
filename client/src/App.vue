<script setup lang="ts">
import { provide } from 'vue';
provide('theme', '');
</script>

<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped></style>
