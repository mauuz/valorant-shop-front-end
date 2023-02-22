import {defineStore} from "pinia"
import requests from "../../request"
interface RankInfo {
    number_of_win: number
    rank_icon: string
    rank_title: string
    ranked_rating :number
    total_game: number
}
export const rankStore = defineStore('rankStore',{
    state:()=>{
        let rankInfo :RankInfo= {
            number_of_win:0,
            rank_icon:'',
            rank_title:'',
            ranked_rating:0,
            total_game:0
        }
        return {
            rankInfo
        }
    },
    getters:{

    },
    actions:{
        async getRankInfo() {
            let userObj = localStorage.getItem('userInfo')
            if(userObj){
                let userInfo = JSON.parse(userObj)
                if('token' && 'username' in userInfo){
                    let result = await requests({
                        url:'/user/rank',
                        headers:{
                            Authorization:userInfo.token
                        },
                        params:{
                            username: userInfo.username
                        }
                    })

                    if(result.data.status == 'success'){
                        this.rankInfo = result.data.msg
                    }else {
                        // window.location.href = '#/'
                        // localStorage.clear()
                    }
                }
            }
        }
    }
})