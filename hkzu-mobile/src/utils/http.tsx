/*
 * @Author: LiYu ly19863208695@qq.com
 * @Date: 2026-01-02 23:29:01
 * @LastEditors: LiYu ly19863208695@qq.com
 * @LastEditTime: 2026-01-02 23:29:32
 * @FilePath: \react_12_30\hkzu-mobile\src\utils\http.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios"
import router from "../router"

const http = axios.create({
    baseURL: 'http://localhost:8080',//根域名
    timeout: 5000 //超时时间
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
    const token = localStorage.getItem("user_token")
    if (token) {
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
    if (error.response.status === 401) {
        localStorage.removeItem("user_token");
        router.navigate('/login');
        window.location.reload()
    }
    return Promise.reject(error)
})

export { http }
