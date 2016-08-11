'use strict'

export default function (router) {
    router.map({
        // 截取判断再跳转页面
        '/': {
            name: 'home',
            component(res) {
                require(['./views/loading.vue'], res);
            }
        },
        // 加载
        '/loading': {
            name: 'loading',
            component(res) {
                require(['./views/loading.vue'], res);
            }
        },
        // 首页
        '/index': {
            name: 'index',
            component(res) {
                require(['./views/index.vue'], res);
            }
        },
        // 搜索结果
        '/search': {
            name: 'search-pros',
            component(res) {
                require(['./views/search.vue'], res);
            }
        },
        // 品类商品列表
        '/category': {
            name: 'category',
            component(res) {
                require(['./views/category.vue'], res);
            }
        },
    })
}
