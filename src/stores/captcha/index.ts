import {defineStore} from "pinia"
import requests from "../../request"
import 'vant/es/notify/style'
import { Notify } from 'vant'
interface UserInfo {
    username: string
    FA2 :boolean
    token :string
}
export const codeStore = defineStore('codeStore',{
    state:()=>{
        return {
            code:''
        }
    },
    getters:{

    },
    actions:{
        async checkCode() {
            let data = new FormData()
            let userInfo = localStorage.getItem("userInfo")
            if(userInfo){
                let userObj = JSON.parse(userInfo)
                if(userObj.FA2){
                    data.append('code',this.code)
                    data.append('username',userObj.username)
                    let result = await requests({
                        url:'/code',
                        method:'post',
                        data:data,
                        headers:{
                            Authorization:userObj.token
                        },
                    })

                    if(result.data.status == 'success'){
                        window.location.replace('#/index/store')
                    }else {
                        window.location.replace('#/')
                        localStorage.clear()
                    }

                }
            }
        }
    }
})