<template>
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <div class="tab-bar">
    <van-tabbar v-model="active" route :safe-area-inset-bottom="true" :placeholder="true" active-color="#ec4958">
      <van-tabbar-item icon="shopping-cart-o" replace to="/index/store">商店</van-tabbar-item>
      <van-tabbar-item icon="user-o" replace to="/index/user">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import {ref,reactive} from 'vue'
export default {
  name: "index",
  setup(){
    const active = ref('home')
    return {
      active
    }
  }
}
</script>

<style scoped>

</style>