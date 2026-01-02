//1.根域名配置
//2.超时时间
//3.请求/响应拦截器

import axios from "axios"
import router from "../router"

const http = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',//根域名
    timeout: 5000 //超时时间
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
    let token = localStorage.getItem("user_token")
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

        return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    //对失效token进行处理
    if(error.response.status === 401) {
        localStorage.removeItem("user_token");
        router.navigate('/login');
        window.location.reload()
    }
    return Promise.reject(error)
})

export { http }
