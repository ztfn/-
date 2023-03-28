// 调用封装的axios访问后端数据，接口

import http from '../utils/request'
// 请求首页数据
export const getData = () => {
    // 返回一个promise对象
    return http.get('/home/getData')
}
export const getList = (params) => {
    // 返回一个promise对象
    return http.get('/home/getList', params)
}
export const addList = (data) => {
    // 返回一个promise对象
    // console.log(data, '###');
    return http.post('/home/addList', data)
}
export const updateList = (data) => {
    // 返回一个promise对象
    return http.post('/home/updateList', data)
}
export const delList = (data) => {
    // 返回一个promise对象
    return http.post('/home/delList', data)
}

export const getMenu = (params) => {
    // 返回一个promise对象
    return http.get('/Login/getMenu', params)
}