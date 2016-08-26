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
        // 商品?type=*&word=*sort=*order=*
        // 店铺?word=*&sort=*
        '/search': {
            name: 'search-pros',
            component(res) {
                require(['./views/search.vue'], res);
            }
        },
        // 所有品类商品列表?cat=id
        // 店铺品类商品列表?shop=id&cat=id
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
        // 店铺首页?shop=id
        '/shop': {
            name: 'shop',
            component(res) {
                require(['./views/shop.vue'], res);
            }
        },
        // 店铺所有分类?shop=id
        '/shop-category': {
            name: 'shop-category',
            component(res) {
                require(['./views/shop-category.vue'], res);
            }
        },
        // 店铺产品列表展示?shop=id
        // 店铺内搜索?shop=id&word=word
        '/shop-products': {
            name: 'shop-products',
            component(res) {
                require(['./views/shop-products.vue'], res);
            }
        },
        // 店铺产品详情页?shop=id&pro=id
        '/product-detail': {
            name: 'product-detail',
            component(res) {
                require(['./views/product-detail.vue'], res);
            }
        },
        // 购物车
        '/cart': {
            name: 'cart',
            component(res) {
                require(['./views/cart.vue'], res);
            }
        },
        // 订单
        '/order': {
            name: 'order',
            component(res) {
                require(['./views/order.vue'], res);
            }
        },
    })
}
