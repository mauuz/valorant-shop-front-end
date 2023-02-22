import {defineStore} from "pinia"
import requests from "../../request"
import 'vant/es/notify/style'
import { Notify } from 'vant'
interface UserInfo {
    username: string
    FA2 :boolean
    token :string
}
export const loginStore = defineStore('login',{
    state:()=>{
        return {
            username:'',
            password:''
        }
    },
    getters:{

    },
    actions:{
        async login(){
            const data = new FormData();
            data.append('username', this.username)
            data.append('password', this.password)
            let result = await requests({
                url:'/login',
                method: 'POST',
                data
            })
            if(result.data.status == 'success'){
                localStorage.setItem('userInfo',JSON.stringify({username:this.username,FA2:result.data.msg['2fa'],token:result.data.msg.token}))
                if(!result.data.msg['2fa']){
                    window.location.replace('#/index/store')
                }else {
                    window.location.href = '#/code'

                }
            }


        }
    }
})