<template>
  <div class="container">
    <div class="wallet" >
      <div class="vp" style="padding:0.9375rem;width: 5rem;text-align:left;">
        <van-image
            width="25"
            height="25"
            src="https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/largeicon.png"
        />
        <div class="vp-text">
          {{vp}}
        </div>
      </div>
      <div class="rp" style="padding:10px;width: 5.5rem;text-align:left;">
        <van-image
            width="35"
            height="35"
            src="https://media.valorant-api.com/currencies/e59aa87c-4cbf-517a-5983-6e81511be9b7/largeicon.png"
        />
        <div class="rp-text">
          {{rp}}
        </div>
      </div>

    </div>
    <div class="items" v-for="(item,index) in storeItem" v-if="storeItem.length > 1">
        <div class="img" style="margin:0 auto;">
          <van-image
              width="200"
              height="100"
              fit="contain"
              :src="item.icon"
          />
        </div>
        <div class="detail center">
            {{item.name}}
        </div>
        <div class="price center">
          {{item.price}} vp
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ref,reactive,onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import {valorantStore} from '../../stores/store'
interface StoreItem {
  name: string
  price: number
  icon: string
}
export default {
  name: "index",
  setup(){
    const store = valorantStore()
    const {storeItem,vp,rp} = storeToRefs(store)
    // let data :array = [{'name': 'Celestial Fan', 'price': 3550, 'icon': 'https://media.valorant-api.com/weaponskinlevels/7302d465-46cd-2a43-655f-93aee59030db/displayicon.png'}, {'name': 'Silvanus Stinger', 'price': 1275, 'icon': 'https://media.valorant-api.com/weaponskinlevels/d547c575-4572-9d77-42e5-bea022e5f07b/displayicon.png'}, {'name': 'Sensation Vandal', 'price': 875, 'icon': 'https://media.valorant-api.com/weaponskinlevels/f4bfff96-487a-cf9e-08cc-d590d962c4e6/displayicon.png'}, {'name': 'Recon Phantom', 'price': 1775, 'icon': 'https://media.valorant-api.com/weaponskinlevels/5be0b43b-4e66-ab8a-91d9-be9137e2e1c2/displayicon.png'}]
    onMounted(async ()=>{
      await store.getStoreItem()
      await store.getWallet()
    })
    return {
      storeItem,vp,rp
    }
  }
}
</script>

<style scoped>
  .title {
    margin-bottom: 1.25rem;
  }
  .container {
    padding: 1.25rem;
    height: auto;
    min-height:100%;
    width: 100%;
    background-color: #0e1923;
    color: #ffffff;
    box-sizing: border-box;
  }
  .items {
    margin: 0 auto;
    padding:1.25rem;
    width: 100%;
    max-width: 25rem;
    max-height: 10.625rem;
    background-color: #ec4958;
    margin-bottom:1.25rem;
    border-radius:0.625rem;
    box-sizing: border-box;
  }
  .img {
    width: 12.5rem;
    height: 6.25rem;
  }
  .center {
    text-align:center
  }
  .wallet {
    color: #ffffff;
    display:flex;
    justify-content: space-around;
    text-align: center;
    border-radius:0.3125rem;
    height: 3.75rem;
    /*background-color: #ffb16b;*/
    background-color: #333b44;
    margin-bottom: 1.25rem;
  }
  .vp {

    position:relative;
  }
  .rp {

    position:relative;
  }
  .vp-text {
    line-height:0;
    font-size:1rem;
    font-weight: bold;
    position:absolute;
    top:49%;
    right:1.5rem;
  }
  .rp-text {
    line-height:0;
    font-size:1rem;
    font-weight: bold;
    position:absolute;
    top:49%;
    right:1.5rem;
  }
</style>