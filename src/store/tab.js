
import Cookies from "js-cookie";
//管理菜单的全局数据
export default {
    namespaced: true,
    state: {
        isCollapse: false,    //控制菜单是否展开
        menuData: [          //面包屑，用于路径显示
            {
                path: '/',
                name: 'Home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ],
        meun: []         //注册路由显示，不同用户所拥有的权限不同
    },
    mutations: {
        collapseMenu(state, value) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑
        selectMenu(state, value) {
            console.log(value);
            // 判断添加的是不是首页
            if (value.name !== '/Home') {
                // 返回添加的和已有数组里相同的索引，不存在返回负值
                const index = state.menuData.findIndex(item => item.name === value.name)
                if (index === -1) {
                    state.menuData.push(value)
                }
            }
        },
        //删除标签、面包屑
        closeTag(state, item) {
            // console.log(item);
            const index = state.menuData.findIndex(val => val.name === item.name)
            state.menuData.splice(index, 1)  //删除从指定位置开始的一个数据
        },
        //从后端传来的数据进行添加
        setMenu(state, item) {
            state.meun = item
            // console.log(state.meun);
            // 将数据再备份一份在cookie中
            Cookies.set('menu', JSON.stringify(state.meun))
        },

        //动态注册路由
        addMenu(state, router) {
            // 判断缓存中是否有数据
            if (!Cookies.get('menu')) return
            const menu = JSON.parse(Cookies.get('menu'))
            const menuArray = []
            // 创建相应的路由对象
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(value => {
                        value.component = () => import(`../pages/${value.url}`)
                        return value
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../pages/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log(menuArray, '###111');
            // 动态的向$router添加路由,.addRoute相当于添加一个已有路由的子路由
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }

    }
}