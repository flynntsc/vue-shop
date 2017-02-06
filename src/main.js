import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import RouterMap from './routers'
import FastClick from 'fastclick'

FastClick.attach(document.body)

// 注册插件
Vue.use(Router)
Vue.use(Resource)

Vue.http.post('/client/authority/s_login.htm?customer_id=20404').then(res => {
    console.log(`默认全局登录：${JSON.parse(res.data).msg}`)
})

// 实例化路由
const router = new Router({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
})

const App = Vue.extend({})

RouterMap(router)

router.start(App, '#app')
