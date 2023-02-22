
<script setup lang="ts">
</script>

<template>
  <router-view v-slot= {Component}>
    <component :is="Component" />
  </router-view>
</template>

<style>

  html,body,#app {
    width: 100%;
    height: 100%;
    font-family: 'Consolas';
  }


</style>
