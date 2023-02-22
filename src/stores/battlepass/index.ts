import {defineStore} from "pinia"
import requests from "../../request"
interface DailyMission {
    current_progrss: number
    expiration_date: string
    progress_to_complete: number
    title: string
    xp_grant: number
}
interface WeeklyMission {
    current_progrss: number
    expiration_date: string
    progress_to_complete: number
    title: string
    xp_grant: number
}
interface Mission {
    daily_mission: DailyMission[]
    weekly_mission: WeeklyMission[]
}
interface BtpInfo {
    current_level: number
    current_xp: number
    end_time: string
    name :string
    remain_rp: number
    total_rp:number
    total_xp: number,
    mission: Mission
}
export const battlepassStore = defineStore('battlepassStore',{
    state:()=>{
        let btpInfo :BtpInfo= {
            current_level: 0,
            current_xp: 0,
            end_time: '',
            name :'',
            remain_rp: 0,
            total_rp:0,
            total_xp: 0,
            mission:{
                daily_mission:[],
                weekly_mission:[]
            }
        }
        return {
            btpInfo
        }
    },
    getters:{

    },
    actions:{
        async getBtpInfo() {
            let userObj = localStorage.getItem('userInfo')
            if(userObj){
                let userInfo = JSON.parse(userObj)
                if('token' && 'username' in userInfo){
                    let result = await requests({
                        url:'/user/battlepass',
                        headers:{
                            Authorization:userInfo.token
                        },
                        params:{
                            username: userInfo.username
                        }
                    })

                    if(result.data.status == 'success'){
                        this.btpInfo = result.data.msg
                    }else {
                        // window.location.href = '#/'
                        // localStorage.clear()
                    }
                }
            }
        }
    }
})