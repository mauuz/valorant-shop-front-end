import axios from 'axios'
import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/index.css'
import { ElMessage } from 'element-plus'
const requests = axios.create({
    baseURL:'https://valorant.jellon.store',
    timeout:50000
})

requests.interceptors.request.use(
    (config )=>{
        const loadingInstance = ElLoading.service({
            lock:true,
            text:'Loading...',
            background:'rgba(14, 25, 35,0.5)',
            customClass:'loading-text'
        })
        return config
    })

requests.interceptors.response.use((res)=>{
    const loadingInstance = ElLoading.service({
        lock:true,
        text:'Loading...',
        background:'rgba(14, 25, 35,0.5)',
        customClass:'loading-text'
    })
    loadingInstance.close()
    if(res.data.status == 'fail'){
        ElMessage.error(res.data.msg)
    }

    return res

},(error)=>{
    console.log('请求错误',error)
    const loadingInstance = ElLoading.service({
        lock:true,
        text:'Loading...',
        background:'rgba(14, 25, 35,0.5)',
        customClass:'loading-text'
    })
    loadingInstance.close()
    ElMessage.error('Request timeout!Network error!')

})
export default requests