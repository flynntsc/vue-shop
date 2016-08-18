'use strict'
const faker = require('faker/locale/zh_CN')

// 是否只生成1个数值以便生成API
const onlyOne = 0

// 生成多个数据
function eachFn(fn, num, ...args) {
    let arr = [],
        obj = {}
    num = onlyOne || num || 10
    for(let i = 0; i < num; i++) {
        arr.push(fn.apply(this, args));
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
// 自定义后缀文字
const myStr = (str = '') => faker.name.firstName() + faker.name.lastName() + str;
// 自定义数值个数??????????
// const myNums =
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
const useRange = ['全店通用', '机油专用', '配件专用']
const signs = ['已签到', '']
const iBoolean = [true, false]
const isNeed = ['需要', '不需要']
const isHave = ['有', '无']


// 产品名
function searchProsTitle() {
    return {
        title: myPro(),
    }
}

// 店铺名
function searchShopTitle() {
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
        name: myStr('产品名称'),
        price: myNum2(),
        num: myDay(),
        sales: myDay(),
    }
}
// 店铺信息
function shopList() {
    return {
        shop: myDay(),
        logo: myImg(80),
        name: myStr('店铺名称'),
        sales: myDay(),
        total: myNum2(),
        isSenior: iBoolean.random(),
        list: [{
            url: '#',
            name: myStr('产品名称'),
            image: myImg(100)
        }, {
            url: '#',
            name: myStr('产品名称'),
            image: myImg(100)
        }, {
            url: '#',
            name: myStr('产品名称'),
            image: myImg(100)
        }, {
            url: '#',
            name: myStr('产品名称'),
            image: myImg(100)
        }]
    }
}
// 抵用券
function coupons(bool = false) {
    return {
        id: myDay(),
        value: myDay(),
        lower_price: myDay(),
        store_name: myStr('店铺名称'),
        use_range: useRange.random(),
        use_time: '2016.01.01~2016.12.12',
        isEmpty: iBoolean.random(),
        isPast: iBoolean.random(),
        isGet: bool
    }
}
// 店铺首页
function shopIndex() {
    return {
        shop: myDay(),
        backgroundImage: myImg('320x110'),
        logo: myImg(80),
        name: myStr('店铺名称'),
        sales: myDay(),
        total: myNum2(),
        isSenior: iBoolean.random(),
        swiperList: [{
            url: 'javascript:',
            img: myImg('320x180'),
            title: '说明文字可有可无'
        }, {
            url: 'javascript:',
            img: myImg('320x180'),
            title: '说明文字可有可无'
        }, {
            url: 'javascript',
            img: myImg('320x180'),
            title: '说明文字可有可无'
        }],
        hotList: eachFn(prosList2, 6),
        newList: eachFn(prosList2, 6),
    }
}


module.exports = function () {
    return {
        // 首页
        'index.htm': {
            EXPLAIN: '首页热销产品',
            res: 200,
            rows: eachFn(prosList1, 6)
        },
        'new_products.htm': {
            EXPLAIN: '首页新品产品',
            rows: eachFn(prosList1, 6)
        },
        'like_products.htm': {
            EXPLAIN: '首页猜你喜欢',
            rows: eachFn(prosList1, 6)
        },
        'cat1-pros.htm': {
            EXPLAIN: '首页机油分类产品',
            rows: eachFn(prosList1, 6)
        },
        // 搜索
        'productKeySearch.htm': {
            EXPLAIN: '搜索引申关键字-商品',
            ARGUMENT: '输入词（keyWords=输入词）',
            rows: eachFn(searchProsTitle)
        },
        'storeKeySearch.htm': {
            EXPLAIN: '搜索引申关键字-店铺',
            ARGUMENT: '输入词（keyWords=输入词）',
            rows: eachFn(searchShopTitle)
        },
        'productSearch.htm': {
            EXPLAIN: '关键词搜索结果-商品(默认销售量排序) && 品类商品列表页面',
            ARGUMENT: '店铺（shop=店铺id）分类（id=分类id）、关键词（word=关键词）、销售量（sort=0）、新品（sort=1）、价格低到高（sort=2&order=0）、价格高到低（sort=2&order=1）、品牌（brand=品牌词）、胎面宽度（width=选项内容）、服务内容（server=选项内容）、价格区间小（price1=价格数值）、价格区间大（price2=价格数值）',
            category_name: myStr('分类名称'),
            id: myNum2(),
            rows: eachFn(prosList2, 6)
        },
        'storeSearch.htm': {
            EXPLAIN: '关键词搜索结果-店铺(默认销售量排序)',
            ARGUMENT: '关键词（word=关键词）、销售量（sort=0）、店铺评分（sort=1）',
            rows: eachFn(shopList, 6)
        },
        'coupons.htm': {
            EXPLAIN: '抵用券（未领取&&已领取）',
            ARGUMENT: '关键词（word=关键词）、销售量（sort=0）、店铺评分（sort=1）',
            rows: eachFn(coupons, 6),
            rows2: eachFn(coupons, 6, true)
        },
        'coupons-update.htm': {
            EXPLAIN: '抵用券更新数据，POST提交地址',
        },
        'shop-index.htm': {
            EXPLAIN: '店铺首页',
            rows: shopIndex(),
        },
    }
}
