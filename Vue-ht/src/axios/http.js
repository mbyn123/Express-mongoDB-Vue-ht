// import Vue from 'vue'
import axios from 'axios'
import { Loading, Message ,Notification} from 'element-ui'
import router from '../router/index';


let loading
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}

function endLoading() {
    loading.close()
}
//请求拦截器
axios.interceptors.request.use(
    config => {
        //开始loading动画
        startLoading()
        //设置请求头，提供Token令牌
        config.headers.Authorization = localStorage.getItem('token')
        return config
    },
    error => {
        return Promise.reject(error)
    })

//响应拦截器
axios.interceptors.response.use(
    response => {
        //结束loading动画    
        endLoading()
        return response
    },
    error => {
        endLoading() //结束loading动画
        //拦截所有的错误提示信息，展示
        const errMsg=error.response.data.msg
        Message({
            message: errMsg?errMsg:'出错啦',
            type: 'error'
        })
         // 获取token过期状态码401
        const {status} = error.response;
        if (status == 401) {
            // Message.error('token失效,请重新登录')
            Notification({
                title: '错误',
                message: 'token失效,请重新登录',
                type: 'error'
              })
            localStorage.removeItem('token')//删除token
            router.push('/login')//重新跳转到登录页
        }

        return Promise.reject(error)
    })

export default axios