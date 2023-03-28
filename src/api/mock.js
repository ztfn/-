

import Mock from "mockjs";
// 使用mock模拟后端对前端的请求进行处理
const list = {
    //
    tableData: [
        {
            name: 'oppo',
            todaybuy: 100,
            monthbuy: 300,
            totalbuy: 800
        },
        {
            name: 'oppo',
            todaybuy: 100,
            monthbuy: 300,
            totalbuy: 800
        },
        {
            name: 'oppo',
            todaybuy: 100,
            monthbuy: 300,
            totalbuy: 800
        },
        {
            name: 'oppo',
            todaybuy: 100,
            monthbuy: 300,
            totalbuy: 800
        },
        {
            name: 'oppo',
            todaybuy: 100,
            monthbuy: 300,
            totalbuy: 800
        },
        {
            name: 'oppo',
            todaybuy: 100,
            monthbuy: 300,
            totalbuy: 800
        },
    ],
    //折线图数据
    zhexian: {
        '2023-1-1': { '苹果': 2542, '菠萝': 3242, '哈密瓜': 3421, '桔子': 4123, '香蕉': 2523, '葡萄': 2942 },
        '2023-1-2': { '苹果': 5342, '菠萝': 3782, '哈密瓜': 2454, '桔子': 4356, '香蕉': 5496, '葡萄': 4362 },
        '2023-1-3': { '苹果': 4742, '菠萝': 3122, '哈密瓜': 5345, '桔子': 2784, '香蕉': 9427, '葡萄': 4367 },
        '2023-1-4': { '苹果': 4342, '菠萝': 4322, '哈密瓜': 3569, '桔子': 9248, '香蕉': 6547, '葡萄': 5678 },
        '2023-1-5': { '苹果': 3542, '菠萝': 2342, '哈密瓜': 3102, '桔子': 1347, '香蕉': 4235, '葡萄': 7856 },
        '2023-1-6': { '苹果': 9442, '菠萝': 1452, '哈密瓜': 9678, '桔子': 4587, '香蕉': 5647, '葡萄': 9780 },
    },
    //柱状图数据
    zhuzhuang: [
        { date: '周一', new: 5, active: 200 },
        { date: '周二', new: 10, active: 500 },
        { date: '周三', new: 12, active: 550 },
        { date: '周四', new: 60, active: 700 },
        { date: '周五', new: 65, active: 800 },
        { date: '周六', new: 53, active: 770 },
        { date: '周天', new: 33, active: 170 },
    ],
    // 饼状图数据
    bingzhuang: [
        { name: '小米', value: 2999 },
        { name: '苹果', value: 5999 },
        { name: 'vivo', value: 1600 },
        { name: 'oppo', value: 1999 },
        { name: '魅族', value: 2200 },
        { name: '三星', value: 4500 },
    ]

}

const list2 = {
    data: [],   //总列表
    newdata: [], //搜索过后的列表  
    count: 0,  //总数量
    pdata: []    //分页后的列表
}
for (let i = 1; i < 200; i++) {
    list2.data.push({ id: i, name: '张三', age: 18 + i, sex: 1, birth: '2022-1-2', addr: '四川' },)
}
for (let i = 1; i < 20; i++) {
    list2.data.push({ id: 200 + i, name: '李四', age: 18 + i, sex: 1, birth: '2022-1-2', addr: '四川' },)
}

//分割字符串url
function fenge(url) {
    let re = /name=(.*)&page=(\w+)&limit=(\w+)/
    // console.log(url.match(re));
    const [sum, oldname, page, limit] = url.match(re);
    const name = decodeURI(oldname);  //解码
    return { name, page, limit }
}

// 定义mock拦截
Mock.mock('api/home/getData', 'get', function () {
    // console.log('拦截到了前端的访问');
    return list
})
// 获取列表  /api\/home\/getList/ 正则匹配
Mock.mock(/api\/home\/getList/, 'get', function (params) {

    // console.log(pageData);
    // console.log('拦截到了前端的访问');
    // 若get请求没有传参则返回
    // return list2
    // 若get请求传了分页参数过来，则根据情况返回
    // console.log(params.url);
    let { name, page, limit } = fenge(params.url)
    // console.log(name, page, limit);   //1,10
    // 过滤，默认是空
    list2.newdata = list2.data.filter((val) => { return val.name.indexOf(name) > -1 })
    list2.count = list2.newdata.length  //过滤后的数量
    list2.pdata = list2.newdata.slice(limit * (page - 1), limit * page)
    return list2

})
// 获取列表
// 若get请求没有传参则返回
// Mock.mock('api/home/getList', 'get', function () {
//     // console.log('拦截到了前端的访问');
//     return list2
// })

// // 若get请求带有参数
// Mock.mock('api/home/getList?:page&:limit', 'get', function (params) {
//     // console.log('拦截到了前端的访问');
//     console.log(params);
//     return list2
// })

// 新增列表
Mock.mock('api/home/addList', 'post', function (data) {
    // console.log('拦截到了前端的访问');
    // console.log(JSON.parse(data.body)); //！！！
    list2.data.unshift({ ...JSON.parse(data.body), id: list2.data.length + 1 })

})
// 修改列表
Mock.mock('api/home/updateList', 'post', function (data) {
    // console.log('拦截到了前端的访问');
    data = JSON.parse(data.body)
    // console.log(data);
    const index = list2.data.findIndex(val => val.id === data.id)
    list2.data.splice(index, 1, data)   //替换
})
// 删除列表
Mock.mock('api/home/delList', 'post', function (data) {
    // console.log('拦截到了前端的访问');
    data = JSON.parse(data.body)
    list2.data = list2.data.filter((val) => { return val.id !== data.id })
})

const menu1 = [   //管理员模块
    {
        path: '/Home', name: "Home", label: '首页', icon: 's-home', url: 'Home.vue'
    },
    {
        path: '/Mall', name: "Mall", label: '商品管理', icon: 'video-play', url: 'Mall.vue'
    },
    {
        path: '/User', name: "User", label: '用户管理', icon: 'user', url: 'User.vue'
    },
    {
        label: '其他', icon: 'location', children: [{ path: '/Page1', name: "Page1", label: '页面1', url: 'PageOne.vue' },
        { path: '/Page2', name: "Page2", label: '页面2', url: 'PageTwo.vue' }
        ]
    },
]
const menu2 = [   //普通用户模块
    {
        path: '/Home', name: "Home", label: '首页', icon: 's-home', url: 'Home.vue'
    },
    {
        path: '/Mall', name: "Mall", label: '商品管理', icon: 'video-play', url: 'Mall.vue'
    },
]

// 登录检测
Mock.mock(/api\/Login\/getMenu/, 'get', function (params) {
    // console.log(params, '###');
    const re = /username=(.*)&password=(.*)/
    const [sum, username, password] = params.url.match(re)
    // console.log(username, password);
    if (username === 'admin' && password === '123456') {
        return {
            code: 2000,
            tooken: Mock.Random.guid(),//模拟随机数 
            menu: menu1
        }
    }
    else if (username === 'shp' && password === '123456') {
        return {
            code: 2000,
            tooken: Mock.Random.guid(),//模拟随机数 
            menu: menu2
        }
    }
    else {
        return { code: -200 }
    }
})