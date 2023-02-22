<template>
  <div class="container">
    <div class="title" style="font-size: 1.25rem;font-weight: bold;margin-bottom:0.625rem;color:#ffffff;">
      🐸的小店
    </div>
    <div class="login-form">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              v-model="username"
              name="👊账号"
              label="👊账号"
              placeholder="账号"
              :rules="[{ required: true, message: '请填写用户名' }]"
              style="font-size:1rem"
          />
          <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
              style="font-size:1rem"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block native-type="submit" color="#ec4958">
            登陆
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="footer" style="color: #ffffff;position: absolute;bottom:1.25rem;">
      Powered by:Mauuz
      @2023
    </div>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import {loginStore} from '../../stores/login'
export default {
  name: "index",
  setup(){
    const store = loginStore()
    const {username,password} = storeToRefs(store)

    const onSubmit = async ()=>{
      await store.login()
    }
    return {
      onSubmit,username,password
    }
  }
}
</script>

<style scoped>
  .login-form {
    border-radius: 0.625rem;
    padding:1.25rem;
    max-width:18.75rem;
    background-color: #0e1923;
  }
  .container {
    background-color: #0e1923;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
  }
</style>