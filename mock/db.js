'use strict'
const faker = require('faker/locale/zh_CN')

// 是否只生成1个数值以便生成API
const numConfig = 0

// 生成多个数据
function eachFn(fn, num) {
    let arr = [],
        obj = {}
    num = numConfig || num || 10
    for(let i = 0; i < num; i++) {
        arr.push(fn.call(this));
    }
    return arr;
}

// 数组随机选一个
Array.prototype.random = function () {
    return this[Math.random() * this.length | 0]
};

// 常用数据
const myName = () => faker.name.findName();
const myTel = () => faker.phone.phoneNumber();
const myNum = () => faker.random.number({ max: 9999999999, min: 1000000000 });
const myNum2 = () => faker.random.number({ max: 9999, min: 0 });
const myDay = () => faker.random.number({ max: 99, min: 0 });
const myArea = () => {
    var arr = [];
    arr.push(faker.address.state())
    arr.push(faker.address.cityPrefix() + faker.address.citySuffix())
    arr.push(faker.address.city())
    return arr;
};
const myArea2 = () => {
    var arr = [];
    arr.push(faker.address.state())
    arr.push(faker.address.city())
    return arr;
};
const myAddress = () => faker.address.state() + ' ' + faker.address.city() + ' ' + faker.address.streetName();
const myState = () => faker.address.state();
const myAbbr = () => faker.address.stateAbbr();
const myCompany = () => faker.name.firstName() + faker.name.lastName() + '有限公司';
const myShop = () => faker.name.firstName() + faker.name.lastName() + '店铺名称';
const myPro = () => faker.name.firstName() + faker.name.lastName() + '产品名称';
const myWords = () => faker.random.words();
const myImg = (num = 100) => 'http://temp.im/' + num;
const myDate = () => {
    let now = Date.now();
    now += Math.random() * 10000000 | 0;
    now = new Date(now);
    return now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay();
}
const myPlate = () => {
    return myAbbr() + myNum2();
}

// 随机筛选数据
const rank = ['企业', '个人'];
const types = ['日常拜访', '潜在客户'];
const authentication = ['个人', '营运车主', '乘用车', '物流企业', '供应商'];
const motorCat = ['综合物流'];
const favorable = ['特惠积分', '月结积分（柴油）', '月结积分（汽油）', '月结积分（柴汽油）', '月结'] // 优惠方式
const stats = ['待执行', '执行中', '已完成', '已取消'];
const certType = ['身份证', '护照', '港澳通行证', '台胞证', '其他'];
const certType2 = ['三证分离（传统）', '三证合一（一码）', '三证分离（多码）']; // 企业证件类型
const cardType = ['挂失', '申请解挂失', '申请换卡', '申请退卡', '正常', '禁用', '退卡']; // 油卡状态
const signs = ['已签到', '']
const iBoolean = [true, false]
const isNeed = ['需要', '不需要']
const isHave = ['有', '无']


// 产品名
function searchPros() {
    return {
        title: myPro(),
    }
}

// 店铺名
function searchShop() {
    return {
        title: myShop(),
    }
}
// 产品列表1
function prosList1() {
    return {
        url: '/category/product/url',
        image: myImg(),
        name: myPro(),
        price: myNum2(),
    }
}
// 产品列表1
function prosList2() {
    return {
        url: '/category/product/url',
        image: myImg(),
        name: myPro(),
        price: myNum2(),
        num: myDay(),
    }
}


module.exports = function () {
    return {
        // 首页
        'hot-pros': {
            EXPLAIN: '首页热销产品',
            res: 200,
            rows: eachFn(prosList1, 6)
        },
        'new-pros': {
            EXPLAIN: '首页新品产品',
            rows: eachFn(prosList1, 6)
        },
        'lov-pros': {
            EXPLAIN: '首页猜你喜欢',
            rows: eachFn(prosList1, 6)
        },
        'cat1-pros': {
            EXPLAIN: '首页机油分类产品',
            rows: eachFn(prosList1, 6)
        },
        // 搜索
        'search-pros-title': {
            EXPLAIN: '搜索引申关键字-商品',
            rows: eachFn(searchPros)
        },
        'search-shop-title': {
            EXPLAIN: '搜索引申关键字-店铺',
            rows: eachFn(searchShop)
        },
        'search-pros': {
            EXPLAIN: '关键词搜索结果-商品(默认销售量排序)',
            ARGUMENT: '关键词（word=关键词）、销售量（sort=0）、新品（sort=1）、价格低到高（sort=2&order=0）、价格高到低（sort=2&order=1）',
            rows: eachFn(prosList2, 6)
        },
        'search-shop': {
            EXPLAIN: '关键词搜索结果-店铺',
            ARGUMENT: '关键词（word=关键词）、销售量（sort=0）、店铺评分（sort=1）',
            rows: eachFn(searchShop, 6)
        },
    }
}
