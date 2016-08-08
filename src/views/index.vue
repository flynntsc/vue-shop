<template>
    <!-- 头部 -->
    <div class="v-hd">
        <div class="v-pos">
            <i class="iconfont">&#xe600;</i>
            <span class="name">{{posName}}</span>
        </div>
        <div class="v-search">
            <search-cat @result-click="resultClick" @on-change="getResult" @del-history="delHistory" :results="results" :value.sync="searchVal" :cats="catsArr" :cats-val.sync="catsVal" :placeholder="searchPhr"></search-cat>
        </div>
        <div class="v-cart">
            <i class="iconfont">&#xe601;</i>
        </div>
    </div>

    <!-- 广告图 -->
    <div class="v-banner">
        <div class="lban">
            <img src="http://temp.im/160x320" alt="">
        </div>
        <div class="rban">
            <div class="rhd">
                <img src="http://temp.im/160" alt="">
            </div>
            <div class="rbd">
                <img src="http://temp.im/80x160" alt="">
                <img src="http://temp.im/80x160" alt="">
            </div>
        </div>
    </div>


    <!-- 菜单 -->
    <div class="v-nav">
        <flexbox class="vux-1px-tb" :gutter="0">
            <flexbox-item class="vux-1px-r">
                <a class="item item1" href="#">
                    <div class="img meishi"></div>
                    <div class="text">机油</div>
                </a>
            </flexbox-item>
            <flexbox-item class="vux-1px-r">
                <a class="item item2" href="#">
                    <div class="img meishi"></div>
                    <div class="text">轮胎</div>
                </a>
            </flexbox-item>
            <flexbox-item class="vux-1px-r">
                <a class="item item3" href="#">
                    <div class="img meishi"></div>
                    <div class="text">配件</div>
                </a>
            </flexbox-item>
            <flexbox-item>
                <a class="item item4" href="#">
                    <div class="img meishi"></div>
                    <div class="text">轻量化设备</div>
                </a>
            </flexbox-item>
        </flexbox>
        <flexbox class="vux-1px-b" :gutter="0">
            <flexbox-item class="vux-1px-r">
                <a class="item item5" href="#">
                    <div class="img meishi"></div>
                    <div class="text">卡车定制</div>
                </a>
            </flexbox-item>
            <flexbox-item class="vux-1px-r">
                <a class="item item6" href="#">
                    <div class="img meishi"></div>
                    <div class="text">维修保养</div>
                </a>
            </flexbox-item>
            <flexbox-item class="vux-1px-r">
                <a class="item item7" href="#">
                    <div class="img meishi"></div>
                    <div class="text">享约惠</div>
                </a>
            </flexbox-item>
            <flexbox-item>
                <a class="item item8" href="#">
                    <div class="img meishi"></div>
                    <div class="text">抵用券</div>
                </a>
            </flexbox-item>
        </flexbox>
    </div>

    <!-- 热新好 -->
    <div class="v-pros">
        <tab>
            <tab-item :selected="tabSel === 0" @click="tabSel = 0">热销</tab-item>
            <tab-item :selected="tabSel === 1" @click="tabNewSel">新品</tab-item>
            <tab-item :selected="tabSel === 2" @click="tabLovSel">猜你喜欢</tab-item>
        </tab>
        <!-- tab热销产品 -->
        <div class="v-list" v-show="tabSel === 0">
            <div class="v-prolist">
                <div class="v-pro" v-for="items of hotPros">
                    <div class="hd">
                        <img :src="items.image" :alt="items.name" class="img">
                    </div>
                    <div class="bd">
                        <div class="pri">￥{{items.price}}</div>
                        <div class="name">{{items.name}}</div>
                    </div>
                </div>
            </div>
            <div class="f-tac">
                <spinner :type="ios" slot="value" v-show="disHot"></spinner>
            </div>
        </div>
        <!-- tab新品产品 -->
        <div class="v-list" v-show="tabSel === 1">
            <div class="v-prolist">
                <div class="v-pro" v-for="items of newPros">
                    <div class="hd">
                        <img :src="items.image" :alt="items.name" class="img">
                    </div>
                    <div class="bd">
                        <div class="pri">￥{{items.price}}</div>
                        <div class="name">{{items.name}}</div>
                    </div>
                </div>
            </div>
            <div class="f-tac">
                <spinner :type="ios" slot="value" v-show="disNew"></spinner>
            </div>
        </div>
        <!-- tab猜你喜欢 -->
        <div class="v-list" v-show="tabSel === 2">
            <div class="v-prolist">
                <div class="v-pro" v-for="items of lovPros">
                    <div class="hd">
                        <img :src="items.image" :alt="items.name" class="img">
                    </div>
                    <div class="bd">
                        <div class="pri">￥{{items.price}}</div>
                        <div class="name">{{items.name}}</div>
                    </div>
                </div>
            </div>
            <div class="f-tac">
                <spinner :type="ios" slot="value" v-show="disLov"></spinner>
            </div>
        </div>
    </div>

    <!-- 机油 -->
    <div class="v-pros">
        <tab>
            <tab-item :selected="true">机油</tab-item>
            <tab-item></tab-item>
            <tab-item></tab-item>
        </tab>
        <!-- 机油产品 -->
        <div class="v-list">
            <div class="v-prolist">
                <div class="v-pro" v-for="items of cat1Pros">
                    <div class="hd">
                        <img :src="items.image" :alt="items.name" class="img">
                    </div>
                    <div class="bd">
                        <div class="pri">￥{{items.price}}</div>
                        <div class="name">{{items.name}}</div>
                    </div>
                </div>
            </div>
            <div class="f-tac">
                <spinner :type="ios" slot="value" v-show="disCat1"></spinner>
            </div>
        </div>
    </div>

</template>

<script>
import {
    XHeader,
    Flexbox,
    FlexboxItem,
    Tab,
    TabItem,
    Spinner,
} from 'vux/src/components'

import SearchCat from '../components/search-cat/index.vue'

export default {
    components: {
        XHeader,
        SearchCat,
        Flexbox,
        FlexboxItem,
        Tab,
        TabItem,
        Spinner,
    },
    data() {
        return {
            posName: '厦门',
            // 搜索
            catsArr: ['商品', '店铺'],
            catsVal: '商品',
            searchPhr: '机油',
            searchVal: '',
            results: [],
            // 产品列表
            tabSel: 0,
            hotPros: [],
            disHot: true,
            newPros: [],
            disNew: true,
            lovPros: [],
            disLov: true,
            cat1Pros: [],
            disCat1: true,
        }
    },
    created() {
        // 初始化搜索词
        this.results = this.mystr2Arr('wehgc-pros')
    },
    ready() {
        // 初始化热销产品
        this.$http.get('/api/hot-pros').then(res => {
            if (!res.data) return

            this.hotPros = JSON.parse(res.data).rows
            this.disHot = false
        })

        // 初始化机油产品
        this.$http.get('/api/cat1-pros').then(res => {
            if (!res.data) return

            this.cat1Pros = JSON.parse(res.data).rows
            this.disCat1 = false
        })
    },
    methods: {
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
        delHistory(catVal) {
            this.results = []
            catVal === '店铺' ? localStorage.setItem('wehgc-shop', '') : localStorage.setItem('wehgc-pros', '')
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
                this.$http.get(url).then(res => {
                    if (res.data) {
                        this.results = JSON.parse(res.data).rows
                    }
                })
            }

            if (this.catsVal === '店铺') {
                getData('api/search-shop-title')
            } else {
                getData('api/search-pros-title')
            }
        },
        // 点击关键词
        resultClick(val) {
            // 将搜索词保存=>需限制数量！！！
            let addHisWord = itemName => {
                let saveStr = localStorage.getItem(itemName)
                if (!saveStr) {
                    localStorage.setItem(itemName, val.title)
                } else {
                    let newStr = val.title
                    if (saveStr.split(',').indexOf(newStr) === -1) {
                        localStorage.setItem(itemName, saveStr + ',' + newStr)
                    }
                }
            }

            this.catsVal === '店铺' ? addHisWord('wehgc-pros') : addHisWord('wehgc-shop')
            this.$router.go(`/search?type=${this.catsVal}&word=${val.title}&sort=0`)
        },
        tabNewSel() {
            this.tabSel = 1
            if (this.disNew) {
                this.$http.get('/api/new-pros').then(res => {
                    if (!res.data) return

                    this.newPros = JSON.parse(res.data).rows
                    this.disNew = false
                })
            }
        },
        tabLovSel() {
            this.tabSel = 2
            if (this.disLov) {
                this.$http.get('/api/lov-pros').then(res => {
                    if (!res.data) return

                    this.lovPros = JSON.parse(res.data).rows
                    this.disLov = false
                })
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import '../assets/styles/iconfont.scss';
// 自定义头部
.v-hd {
    position: relative;
    display: flex;
    padding: 0 10px;
    background-color: #c50a1d;
}

.v-pos {
    height: 44px;
    line-height: 44px;
    color: #fff;
    .name {
        font-size: 14px;
    }
}

.v-search {
    flex: 1;
    padding: 8px;
}

.v-cart {
    height: 44px;
    line-height: 44px;
    i {
        font-size: 18px;
        color: #fff;
    }
}

// 广告
.v-banner {
    display: flex;
    .lban {
        flex: 1;
        height: 320px;
    }
    img {
        width: 100%;
        height: 100%;
    }
    .rhd {
        height: 160px;
    }
    .rbd {
        display: flex;
    }
}

// 菜单
.v-nav {
    .item {
        display: block;
        box-sizing: border-box;
        font-size: 12px;
        color: #303030;
        position: relative;
        margin-bottom: 10px;
        .img {
            width: 40px;
            height: 40px;
            margin: 8px auto 5px;
            background-repeat: no-repeat;
            background-size: 40px auto!important;
            background-position: center;
        }
        .text {
            font-size: 13px;
            text-align: center;
            line-height: 1em;
        }
        .meishi {
            background: url('../assets/images/_index_nav.png') no-repeat
        }
    }
}

// 热新好
.v-list {
    padding: 10px 5px;
}

.v-prolist {
    // display: flex;
    overflow: hidden;
    .v-pro {
        box-sizing: border-box;
        width: 50%;
        float: left;
        padding: 0 5px;
        .hd {
            height: 145px;
            overflow: hidden;
            .img {
                width: 100%;
            }
        }
        .bd {
            .name {
                height: 32px;
                line-height: 16px;
                overflow: hidden;
                font-size: 12px;
            }
            .pri {
                color: #f00;
                font-size: 14px;
            }
        }
    }
}

// f-*
.f-mt10 {
    margin-top: 10px;
}

.f-tac {
    text-align: center;
}
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
}
</style>
