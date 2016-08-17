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
        // 所有品类商品列表&&店铺品类商品列表
        '/category-products': {
            name: 'category-products',
            component(res) {
                require(['./views/category-products.vue'], res);
            }
        },
        // 抵用券领取
        '/coupons': {
            name: 'coupons',
            component(res) {
                require(['./views/coupons.vue'], res);
            }
        },
        // 店铺首页
        '/shop-index': {
            name: 'shop-index',
            component(res) {
                require(['./views/shop-index.vue'], res);
            }
        },
        // 店铺所有分类 shop-category
        '/shop-category': {
            name: 'shop-category',
            component(res) {
                require(['./views/shop-category.vue'], res);
            }
        },
        // 店铺产品列表展示&&店铺内搜索 shop-products
        '/shop-products': {
            name: 'shop-products',
            component(res) {
                require(['./views/shop-products.vue'], res);
            }
        },
    })
}
