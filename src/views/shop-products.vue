<template>
    <div>
        <!-- 头部 -->
        <div class="v-hd">
            <div class="v-back" @click="goback"><i class="iconfont">&#xe602;</i></div>
            <div class="v-search">
                <search-cat v-ref:search @result-click="resultClick" @on-change="getResult" @del-history="delHistory" :results="results" :value.sync="searchVal" :cats="catsArr" :placeholder="searchPhr"></search-cat>
            </div>
        </div>

        <!-- 商品 -->
        <div class="v-prolist">
            <tab>
                <tab-item :selected="this.tabProsNum === 0" @click="tabProsFn(0)">销售量</tab-item>
                <tab-item :selected="this.tabProsNum === 1" @click="tabProsFn(1)">新品</tab-item>
                <tab-item :selected="this.tabProsNum === 2" @click="tabProsFn(2)">价格</tab-item>
            </tab>
            <div class="v-pbd">
                <products-list :proslist="prosList"></products-list>
            </div>
        </div>
    </div>
</template>

<script>
import {
    Search,
    Tab,
    TabItem,
} from 'vux/src/components'
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
            shop: '',
            // 搜索
            searchPhr: '店内搜索商品',
            searchVal: '',
            results: [],
            // tab菜单-商品
            tabProsNum: 0,
            tabPrice: 0,
            // 数据结果
            prosList: [],
        }
    },
    created() {},
    ready() {
        // 根据url参数请求相应数据
        let getRes = (url, sort, type = 0) => {
            this.$http.get(`/app/shopping/${url}?shop=${this.shop}&word=${this.searchVal}&sort=${this.sort}`).then(res => {
                if (res.ok) {
                    console.log(res)
                    let rows = JSON.parse(res.data).rows;
                    !type ? this.prosList = rows : this.shopList = rows
                }
            })
        }

        // 初始化数据结果
        let sort = this.$route.query.sort || 0
        this.shop = this.$route.query.shop || 0
        this.searchPhr = this.searchVal = this.$route.query.word || this.searchPhr
        getRes('productSearch.htm', sort)

        // 页面打开直接获取焦点
        if (this.$route.query.focus) {
            this.$refs.search.touch()
        }
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
        delHistory() {
            this.results = []
            localStorage.setItem('wehgc-pros', '')
        },
        getResult() {
            // 显示搜索历史词
            this.results = this.mystr2Arr('wehgc-pros')

            // ajax获取数据
            let getData = url => {
                this.$http.get(url + '?keyWords=' + this.searchVal).then(res => {
                    if (res.ok) {
                        this.results = JSON.parse(res.data).rows
                    }
                })
            }

            getData('/app/shopping/storeKeySearch.htm')
        },
        getResult() {
            // 显示搜索历史词
            this.results = this.mystr2Arr('wehgc-pros')

            // ajax获取数据
            let getData = url => {
                this.$http.get(url + '?keyWords=' + this.searchVal).then(res => {
                    if (res.ok) {
                        this.results = JSON.parse(res.data).rows
                    }
                })
            }

            getData('/app/shopping/productKeySearch.htm')
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

            addHisWord('wehgc-pros')
            this.searchVal = val.title
            this.tabProsFn(this.tabProsNum)
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
            url = `/app/shopping/productSearch.htm?word=${this.searchVal}&sort=${num + arg}`
            this.$http.get(url).then(res => {
                if (res.ok) {
                    this.prosList = JSON.parse(res.data).rows
                }
            })
        },
    }
}
</script>
<style lang="scss">
@import '../assets/styles/iconfont.scss';
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
<style lang="scss" scoped>
// 自定义头部
.v-hd {
    position: relative;
    display: flex;
    align-items: center;
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
    i {
        font-size: 22px;
    }
}
</style>
