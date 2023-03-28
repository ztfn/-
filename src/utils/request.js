// axios 封装
import axios from "axios";

const http = axios.create({
    // 通用请求的地址前缀
    baseURL: 'api',
    // 最大请求时间,超时时间,单位毫秒
    timeout: 10000,
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    //在发送请求之前做
    return config
}, function (error) {
    //请求错误
    return Promise.reject(error)
})

//添加响应拦截器
http.interceptors.response.use(function (response) {
    // 在数据接收前做
    return response
}, function (error) {
    //响应出错，比如发生200，404等错误
    return Promise.reject(error)
})

export default http