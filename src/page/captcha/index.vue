<template>
  <div class="container">
    <div class="title" style="font-size: 1.25rem;font-weight: bold;margin-bottom:0.625rem;color: white;">
      🐸的小店
    </div>
    <div class="login-form">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              v-model="code"
              name="验证码"
              label="验证码"
              placeholder="验证码"
              :rules="[{ required: true, message: '请填写验证码' }]"
              style="font-size:1rem"
          />

        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block native-type="submit" color="#ec4958">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>

</template>

<script lang="ts">
import {ref,getCurrentInstance} from 'vue'
import {useRouter} from "vue-router"
import { ElMessage } from 'element-plus'
import {storeToRefs} from "pinia"
import {codeStore} from '../../stores/captcha'

export default {
  name: "index",
  setup(){
    const store = codeStore()
    const {code} = storeToRefs(store)
    const onSubmit = async ()=>{
      await store.checkCode()
    }
    return {
      onSubmit,code
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