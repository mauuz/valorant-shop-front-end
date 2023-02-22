import {defineStore} from "pinia"
import requests from "../../request"
interface UserInfo {
    name: string,
    level: number,
    card_icon: string,
    NextTimeFirstWinAvailable :string
}
export const userInfoStore = defineStore('userInfoStore',{
    state:()=>{
        let userInfo :UserInfo= {
            name:'',
            level:0,
            card_icon:'',
            NextTimeFirstWinAvailable:''
        }
        return {
            userInfo
        }
    },
    getters:{

    },
    actions:{
        async getUserInfo() {
            let userObj = localStorage.getItem('userInfo')
            if(userObj){
                let userInfo = JSON.parse(userObj)
                if('token' && 'username' in userInfo){
                    let result = await requests({
                        url:'/user/info',
                        headers:{
                            Authorization:userInfo.token
                        },
                        params:{
                            username: userInfo.username
                        }
                    })

                    if(result.data.status == 'success'){
                        this.userInfo = result.data.msg
                    }else {
                        window.location.href = '#/'
                        localStorage.clear()
                    }
                }
            }
        }
    }
})