import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import RouterMap from './routers'
import FastClick from 'fastclick'

FastClick.attach(document.body)

// 注册插件
Vue.use(Router)
Vue.use(Resource)

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
