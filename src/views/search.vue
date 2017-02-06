<template>
    <div>
        <!-- 头部 -->
        <div class="v-hd">
            <div class="v-back" @click="goback"><i class="iconfont">&#xe602;</i></div>
            <div class="v-search">
                <search-cat @result-click="resultClick" @on-change="getResult" @del-history="delHistory" :results="results" :value.sync="searchVal" :cats="catsArr" :cats-val.sync="catsVal" :placeholder="searchPhr"></search-cat>
            </div>
        </div>
        <!-- 商品 -->
        <div class="v-prolist" v-show="catsVal === '商品'">
            <tab>
                <tab-item :selected="this.tabProsNum === 0" @click="tabProsFn(0)">销售量</tab-item>
                <tab-item :selected="this.tabProsNum === 1" @click="tabProsFn(1)">新品</tab-item>
                <tab-item :selected="this.tabProsNum === 2" @click="tabProsFn(2)">价格</tab-item>
            </tab>
            <div class="v-pbd">
                <products-list :proslist="prosList"></products-list>
            </div>
        </div>
        <!-- 店铺 -->
        <div class="v-shoplist" v-show="catsVal === '店铺'">
            <tab>
                <tab-item :selected="this.tabShopNum === 0" @click="tabShopFn(0)">销售量</tab-item>
                <tab-item :selected="this.tabShopNum === 1" @click="tabShopFn(1)">店铺评分</tab-item>
            </tab>
            <div class="v-sbd">
                <div class="v-shop" v-for="items of shopList">
                    <div class="v-shophd" v-link="{path:'shop',query:{supplierId:items.customer_id}}">
                        <div class="info">
                            <img :src="items.logo" :alt="items.name" class="img">
                            <div class="detail">
                                <div class="name">{{items.name}}</div>
                                <div class="num">
                                    <span class="sales">销量{{items.order_amount}}</span>
                                    <span class="total">共{{items.good_amount}}件商品</span>
                                </div>
                            </div>
                        </div>
                        <div class="entry">
                            <button class="weui_btn weui_btn_mini weui_btn_default weui_btn_plain_default btn">进入店铺</button>
                        </div>
                    </div>
                    <div class="v-shopbd">
                        <div class="pro" v-for="item of items.hz_Goods_TopSales"><img :src="item.picture_url" v-link="{path: 'product-detail',query:{pro:item.good_id}}" alt="" class="img"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    Search,
    Tab,
    TabItem,
} from 'vux/src/components';
import SearchCat from '../components/search-cat/index.vue'
import ProductsList from '../components/products-list/index.vue'

export default {
    components: {
        SearchCat,
        Tab,
        TabItem,
        ProductsList,
    },
    data() {
        return {
            // 当前客户id
            customerId: '',
            // 搜索
            catsArr: ['商品', '店铺'],
            catsVal: '商品',
            searchPhr: '机油',
            searchVal: '',
            results: [],
            // tab菜单-商品
            tabProsNum: 0,
            tabPrice: 0,
            // tab菜单-店铺
            tabShopNum: 0,
            // 数据结果
            prosList: [],
            shopList: [],
        }
    },
    created() {},
    ready() {
        // 根据url参数请求相应数据
        let getRes = (url, sort, type = 0) => {
            this.$http.get(`/api/shopping/${url}?keyWords=${this.searchVal}&sort=${sort}`).then(res => {
                if (res.ok) {
                    let rows = JSON.parse(res.data).rows;
                    !type ? this.prosList = rows : this.shopList = rows
                }
            })
        }

        // 初始化数据结果
        let sort = this.$route.query.sort || 0
        this.searchPhr = this.searchVal = this.$route.query.keyWords || ''
        this.catsVal = this.$route.query.type || '商品'
        this.catsVal === '店铺' ? getRes('storeList.htm', sort, 1) : getRes('productSearch.htm', sort)
    },
    methods: {
        // 返回
        goback() {
            history.back()
        },
        // 拼成合适格式
        mystr2Arr(itemName) {
            let str = localStorage.getItem(itemName) || ''
            return str.split(',').map(v => {
                return {
                    title: v
                }
            })
        },
        // 删除搜索历史
        delHistory(catsVal) {
            this.results = []
            catsVal === '店铺' ? localStorage.setItem('wehgc-shop', '') : localStorage.setItem('wehgc-pros', '')
        },
        getResult() {
            // 显示搜索历史词
            if (!this.searchVal) {
                if (this.catsVal === '店铺') {
                    return this.results = this.mystr2Arr('wehgc-shop')
                }
                return this.results = this.mystr2Arr('wehgc-pros')
            }

            // ajax获取数据
            let getData = url => {
                this.$http.get(url + '?keyWords=' + this.searchVal).then(res => {
                    if (res.ok) {
                        this.results = JSON.parse(res.data).rows
                    }
                })
            }

            if (this.catsVal === '店铺') {
                getData('/api/shopping/productKeySearch.htm')
            } else {
                getData('/api/shopping/storeKeySearch.htm')
            }
        },
        getResult() {
            // 显示搜索历史词
            if (!this.searchVal) {
                if (this.catsVal === '店铺') {
                    return this.results = this.mystr2Arr('wehgc-shop')
                }
                return this.results = this.mystr2Arr('wehgc-pros')
            }

            // ajax获取数据
            let getData = url => {
                this.$http.get(url + '?keyWords=' + this.searchVal).then(res => {
                    if (res.ok) {
                        this.results = JSON.parse(res.data).rows
                    }
                })
            }

            if (this.catsVal === '店铺') {
                getData('/api/shopping/storeKeySearch.htm')
            } else {
                getData('/api/shopping/productKeySearch.htm')
            }
        },
        resultClick(val) {
            // 将搜索词保存
            let addHisWord = itemName => {
                let saveStr = localStorage.getItem(itemName)
                if (!saveStr) {
                    localStorage.setItem(itemName, val.title)
                } else {
                    let newStr = val.title
                    let arr = saveStr.split(',')
                    if (arr.indexOf(newStr) === -1) {
                        saveStr = arr.slice(-9).join(',')
                        localStorage.setItem(itemName, saveStr + ',' + newStr)
                    }
                }
            }

            if (this.catsVal === '店铺') {
                addHisWord('wehgc-shop')
                this.searchVal = val.title
                this.tabShopFn(this.tabShopNum)
            } else {
                addHisWord('wehgc-pros')
                this.searchVal = val.title
                this.tabProsFn(this.tabProsNum)
            }
        },
        // tab切换显示-商品
        tabProsFn(n) {
            let num = n || 0,
                arg = '',
                url = ''
            if (num === 2) {
                // 选择价格再次点击价格
                if (this.tabProsNum === 2) {
                    this.tabPrice = ~~!this.tabPrice
                }
                arg = `&order=${this.tabPrice}`
            }
            this.tabProsNum = num
            url = `/api/shopping/productSearch.htm?keyWords=${this.searchVal}&sort=${num + arg}`
            this.$http.get(url).then(res => {
                if (res.ok) {
                    this.prosList = JSON.parse(res.data).rows
                }
            })
        },
        // tab切换显示-店铺
        tabShopFn(n) {
            let num = n || 0,
                url = ''
            this.tabShopNum = num
            url = `/api/shopping/storeList.htm?keyWords=${this.searchVal}&sort=${num}`
            this.$http.get(url).then(res => {
                if (res.ok) {
                    this.shopList = JSON.parse(res.data).rows
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/styles/iconfont.scss';
// 自定义头部
.v-hd {
    position: relative;
    display: flex;
    // padding: 0 10px;
    background-color: #c50a1d;
}

.v-search {
    flex: 1;
    padding: 8px;
}

.v-back {
    width: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
}

// 店铺列表
.v-shop {
    border-bottom: 5px solid #efefef;
    padding: 10px;
}

// 店铺列表
.v-shophd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #efefef;
    .info {
        .img {
            float: left;
            width: 50px;
        }
        .detail {
            margin-left: 60px;
            .name {
                overflow: hidden;
                height: 28px;
                line-height: 28px;
                white-space: normal;
                font-size: 18px;
            }
            .num {
                overflow: hidden;
                height: 22px;
                line-height: 22px;
                white-space: normal;
                .sales {
                    font-size: 14px;
                }
                .total {
                    font-size: 14px;
                }
            }
        }
    }
    .entry {
        width: 80px;
        .btn {
            white-space: nowrap;
        }
    }
}

.v-shopbd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .pro {
        width: 24%;
        .img {
            width: 100%;
            height: 100%;
        }
    }
}

.v-shopbd {}
</style>
<style lang="scss">
// 修改组件样式
.v-search {
    .weui_search_bar {
        padding: 0;
    }
    .vux-search-fixed {
        .weui_search_bar {
            padding: 8px 10px;
        }
    }
    .weui_search_text {
        // text-align: left;
    }
}
</style>
