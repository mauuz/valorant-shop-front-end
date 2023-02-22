<template>
  <div class="container">
    <div class="user-bg">
      <div class="user-detail" v-if="userInfo.name">
        <div class="user-avatar">
          <van-image
              round
              width="8rem"
              height="8rem"
              :src="userInfo.card_icon"
          />
        </div>
        <div class="user-name">
          {{userInfo.name}}
        </div>
        <div class="level">
          <van-image
              width="5rem"
              height="2rem"
              src="https://media.valorant-api.com/levelborders/49413ac2-4ed5-6953-5791-db838ccb58f3/levelnumberappearance.png"
          />
          <div class="user-level">
              {{userInfo.level}}
          </div>
        </div>

      </div>
    </div>
    <div class="spacer"></div>
    <div class="first-win" style="text-align: center;">
      首胜刷新时间:
      <div>{{dateFormatter}}</div>
    </div>
    <div class="user-info">
      <div class="rank bg" v-if="rankInfo.rank_title">
        <div class="rank-info">
          <label class="label">当前段位</label>
          <div class="rank-icon" style="text-align: center;">
            <van-image
                round
                width="2.5rem"
                height="2.5rem"
                :src="rankInfo.rank_icon"
            />

          </div>
          <div class="rank-title">
            {{rankInfo.rank_title}}
          </div>
        </div>
        <div class="win-info rank-d">
          胜场
          <div class="win-number number">
            {{rankInfo.number_of_win}}
          </div>
        </div>
        <div class="total-info rank-d">
          总场
          <div class="total-number number">
            {{rankInfo.total_game}}
          </div>
        </div>
        <div class="rating-info rank-d">
          胜点
          <div class="rating number">
            {{rankInfo.ranked_rating}}
          </div>
        </div>
        <div class="loss-info rank-d">
          胜率
          <div class="win-rate number">
            {{ winPersentage}}%
          </div>
        </div>
      </div>
      <div class="mission bg">
        <div class="daily-mission">
          <div style="display:flex;">
            <div class="mission-title" style="flex: 1;">每日任务</div>
          </div>

          <div class="mission-detail" v-for="(item,index) in btpInfo.mission.daily_mission">
            <div class="title-container">
              <div class="title">
                {{item.title}}
              </div>
              <div style="text-align: right;flex:1">{{item.xp_grant}}xp</div>
            </div>

            <div class="mission-progress">
              <van-progress :percentage="percentageCalculated(item.current_progrss,item.progress_to_complete)" color="#ec4958"/>
              <div class="mission-value">{{item.current_progrss}}/{{item.progress_to_complete}}</div>
            </div>
          </div>
        </div>
        <div class="weekly-mission">
          <div style="display:flex;">
            <div class="mission-title" style="flex: 1;">每周任务</div>
            <div>{{dateCalculated(btpInfo.mission.weekly_mission[0])}}</div>
          </div>
          <div class="mission-detail" v-for="(item,index) in btpInfo.mission.weekly_mission">
            <div class="title-container">
              <div class="title">
                {{item.title}}
              </div>
              <div style="text-align: right;flex:1">{{item.xp_grant}}xp</div>
            </div>

            <div class="mission-progress">
              <van-progress :percentage="percentageCalculated(item.current_progrss,item.progress_to_complete)" color="#ec4958"/>
              <div class="mission-value">{{item.current_progrss}}/{{item.progress_to_complete}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="battlepass bg" v-if="btpInfo.name">
          <div class="btp-name" style="text-align: center;font-size:1.5rem;font-weight: bold;margin-bottom: 0.625rem;">
            {{btpInfo.name}}
          </div>
          <div class="btp-level">
            <div>通行证等级:</div>
            <div style="text-align: right;flex: 1;font-weight: bold;font-size:1.1rem;">LV:{{btpInfo.current_level}}/55</div>
          </div>
          <div class="btp-xp">
            <div class="remain">
              <div>经验:</div>
              <div style="font-weight: bold;flex: 1;text-align: right;font-size:1.1rem;">{{btpInfo.total_xp-btpInfo.current_xp}}xp</div>
            </div>

            <div class="xp-progress">
              <van-progress :percentage="xpPersentage" color="#ec4958"/>
            </div>
            <p style="text-align:center;font-weight: bold;font-size:1rem;">{{ btpInfo.current_xp }}/{{ btpInfo.total_xp }}</p>
          <div class="btp-rp">
            <div class="remain">
              <div>R点:</div>
              <div style="font-weight: bold;flex: 1;text-align: right;font-size:1.1rem;">{{btpInfo.remain_rp}}</div>
            </div>

            <div class="xp-progress">
              <van-progress inactive :percentage="rpPersentage" />
            </div>

            <p style="text-align:center;font-weight: bold;font-size:1rem;">{{btpInfo.total_rp-btpInfo.remain_rp}}/{{btpInfo.total_rp}}</p>

          </div>
          </div>
          <div class="btp-time">
             赛季倒计时:
            <div class="count-down">
              <van-count-down :time="countDown" format="DD 天 HH 时 mm 分 ss 秒" style="color: white;font-weight: bold;font-size:1.1rem;text-align:center;"/>
            </div>

          </div>
      </div>
      <div class="logout">
        <van-button color="#ec4958" block @click="logout">退出</van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ref,reactive,onMounted,computed} from 'vue'
import { showConfirmDialog } from 'vant'
import {storeToRefs} from 'pinia'
import {userInfoStore} from '../../stores/userInfo'
import {rankStore} from '../../stores/rank'
import {battlepassStore} from '../../stores/battlepass'
import moment from 'moment'
import 'vant/es/dialog/style'
import {useRouter} from 'vue-router'

interface BtpInfo {
  current_level: number
  current_xp: number
  end_time: string
  name :string
  remain_rp: number
  total_rp:number
  total_xp: number
}

export default {
  name: "index",
  setup(){
    const router = useRouter()
    const userStore = userInfoStore()
    const rankInfoStore = rankStore()
    const btpStore = battlepassStore()
    const {rankInfo} = storeToRefs(rankInfoStore)
    const {userInfo} = storeToRefs(userStore)
    const {btpInfo} = storeToRefs(btpStore)
    const logout = ()=>{
      showConfirmDialog({
        confirmButtonColor:'#ec4958',
        title: '退出登录',
        message:
            '您确定要退出登录吗？',
      })
          .then(() => {
            localStorage.clear()
            router.replace('/')
          })
          .catch(() => {
            // on cancel
          })
    }
    onMounted(async ()=>{
      await userStore.getUserInfo()
      await rankInfoStore.getRankInfo()
      await btpStore.getBtpInfo()
    })
    let dateFormatter = computed(()=>{
      return moment.utc(userInfo.value.NextTimeFirstWinAvailable).format('YYYY-MM-DD HH:mm:ss')
    })
    let countDown = computed(()=>{
        let date = moment(btpInfo.value.end_time)
        let duration = moment.duration(date.diff(moment()))
        return duration.asMilliseconds()
    })
    let xpPersentage = computed(():number=>{

      if (btpInfo.value.total_xp && btpInfo.value.current_xp != 0) {
        const progress = (btpInfo.value.current_xp / btpInfo.value.total_xp) * 100
        return Math.round(progress * 100) / 100
      } else {
        return 0
      }

    })
    let rpPersentage = computed(():number=>{
      // if(btpInfo.value.total_rp && btpInfo.value.remain_rp !=0){
      //   return parseInt(((btpInfo.value.total_rp -btpInfo.value.remain_rp )/btpInfo.value.total_rp).toFixed(2)*100)
      // }else {
      //   return 0
      // }
      if (btpInfo.value.total_rp && btpInfo.value.remain_rp != 0) {
        const progress = ((btpInfo.value.total_rp -btpInfo.value.remain_rp )/btpInfo.value.total_rp) * 100
        return Math.round(progress * 100) / 100
      } else {
        return 0
      }

    })
    let winPersentage = computed(():number=>{
      //rankInfo.number_of_win/rankInfo.total_game).toFixed(2)*100
      if (rankInfo.value.number_of_win && rankInfo.value.total_game != 0) {
        const progress = (rankInfo.value.number_of_win/rankInfo.value.total_game) * 100
        return Math.round(progress * 100) / 100
      } else {
        return 0
      }
    })
    let percentageCalculated = computed(()=>(progress: number,total: number):number=>{
      if (progress && total != 0) {
        const result = (progress/total) * 100
        return Math.round(result * 100) / 100
      } else {
        return 0
      }
    })
    let dateCalculated = computed(()=>(date:any)=>{
      return moment.utc(date).format('YYYY-MM-DD HH:mm:ss')
    })
    return {
      logout,userInfo,dateFormatter,rankInfo,btpInfo,countDown,xpPersentage,rpPersentage,winPersentage,percentageCalculated,dateCalculated
    }
  }
}
</script>

<style scoped>
  .container {
    height: auto;
    min-height:100%;
    width: 100%;
    background-color: #0f1923;
    color: #ffffff;
    box-sizing: border-box;
  }
  .user-bg {
    position: relative;
    height: 10rem;
    background-color: #ec4958;
  }
  .user-detail {
    text-align: center;
    position: absolute;
    top:6rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .level {
    position: absolute;
    top:60%;
    left: 50%;
    transform: translateX(-50%);

  }
  .user-level {
    position:absolute;
    top:20%;
    left: 49.5%;
    transform: translateX(-50%);
  }
  .user-avatar {
    position: relative;
    border-radius:100%;
    border: 0.1875rem solid #ffffff;
  }
  .rank {
    display: flex;
    justify-content: space-between;
    padding: 1.25rem;
    border-radius:1.25rem;
    height: auto;
    margin-top:1.25rem;
    box-sizing: border-box;
  }
  .bg {
    background-color: #333b44;
  }
  .battlepass {
    border-radius:1.25rem;
    height: 6.25rem;
    margin-top:1.25rem;
  }
  .user-info {
    margin: 0 auto;
    max-width:50rem;
    /*color: #0e1923;*/
    padding: 0.625rem;
  }
  .spacer {
    height: 7.5rem;
  }
  .user-name {
    margin-top: 1rem;
    font-size:1.6rem;
    font-weight:bold;
    text-align: center;
  }
  .logout {
    margin-top:1.25rem;
  }
  .rank-title {
    text-align: center;
    font-size:1.2rem;
    font-weight:bold;
  }
  .rank-d {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    /*border: 1px solid red;*/
    width: 6.25rem;
  }
  .rank-info {
    text-align: center;
    width: 9.375rem;
  }
  .rank-icon {
    margin-top: 0.625rem;
  }
  .number {
    font-size: 1.3rem;
    font-weight: bold;
  }
  .label {
    font-size:1rem;
    font-weight: bold;
  }
  .battlepass {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.25rem;
    height: auto;
  }
  .xp-progress {
    margin-top:1.25rem;
  }
  .count-down {
    margin-top:1rem;
  }
  .btp-level {
    display: flex;
    margin-bottom: 1.25rem;
  }
  .remain {
    display: flex;
  }
  .mission {
    justify-content: space-between;
    padding: 1.25rem;
    border-radius:1.25rem;
    height: auto;
    margin-top:1.25rem;
    box-sizing: border-box;
  }
  .mission-title {
    font-size:1.1rem;
    font-weight: bold;
  }
  .mission-progress {
    margin-top:0.9375rem;
  }
  .mission-value {
    margin-top: 0.9375rem;
    text-align: center;
  }
  .mission-detail {
    margin-top:0.625rem;
  }
  .title-container {
    display: flex;
  }
  .weekly-mission {
    margin-top:1.6rem;
  }
</style>