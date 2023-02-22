import {defineStore} from "pinia"
import requests from "../../request"
import 'vant/es/notify/style'
import { Notify } from 'vant'
interface UserInfo {
    username: string
    FA2 :boolean
    token :string
}
export const valorantStore = defineStore('valorant',{
    state:()=>{
        return {
            storeItem:[{name: '', price: 0, icon: 'string'}],
            vp:0,
            rp:0
        }
    },
    getters:{

    },
    actions:{
        async getStoreItem(){
            let userObj = localStorage.getItem('userInfo')
            if(userObj){
                let userInfo :UserInfo= JSON.parse(userObj)
                if('token' && 'username' in userInfo){
                    let result = await requests({
                        url:'/store',
                        headers:{
                          Authorization:userInfo.token
                        },
                        params:{
                            username: userInfo.username
                        }
                    })

                    if(result.data.status == 'success'){
                        this.storeItem = result.data.msg
                    }else {
                        window.location.href = '#/'
                        localStorage.clear()
                    }
                }
            }

        },
        async getWallet(){
            let userObj = localStorage.getItem('userInfo')
            if(userObj){
                let userInfo :UserInfo= JSON.parse(userObj)
                if('token' && 'username' in userInfo){
                    let result = await requests({
                        url:'/user/wallet',
                        headers:{
                            Authorization:userInfo.token
                        },
                        params:{
                            username: userInfo.username
                        }
                    })

                    if(result.data.status == 'success'){
                        this.vp = result.data.msg.vp
                        this.rp = result.data.msg.rp
                    }else {
                        window.location.href = '#/'
                        localStorage.clear()
                    }
                }
            }

        }
    }
})