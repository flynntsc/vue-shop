<template>
    <div>
        <!-- 头部 -->
        <!-- 改造并替换为search-cat -->
        <x-header :left-options="{showBack: true,backText:''}" class="m-searchHd">
            <search cancel-text="取消" placeholder="搜索店内商品" @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="searchVal"></search>
            <div slot="right" class="v-catbtn" v-link="{path:'shopcat'}">
                <i class="iconfont">&#xe603;</i>
                <div class="txt">分类</div>
            </div>
        </x-header>
    </div>
</template>

<script>
import {
    XHeader,
    Search,
} from 'vux/src/components';


export default {
    components: {
        XHeader,
        Search,
    },
    data() {
        return {
            // 店铺id
            shop: '',
            // 搜索
            searchVal: '',
            results: [],
            resultsHot: [],
        }
    },
    created() {
        // 获取店铺id
        this.shop = this.$route.query.shop || ''
    },
    ready() {
        // 获取热门搜索词
        this.$http.get(`/app/shopping/productKeySearch.htm?store=${this.shop}`).then(res => {
            if (res.ok) {
                this.resultsHot = JSON.parse(res.data).rows
            }
        })
    },
    methods: {
        resultClick(val) {
            this.$router.go(`/shop-products?store=${this.shop}&keyWords=${val.title}`)
        },
        getResult() {
            if (!this.searchVal) {
                // (暂无法显示)
                this.results = this.resultsHot
            } else {
                this.$http.get(`/app/shopping/productKeySearch.htm?store=${this.shop}&keyWords=${this.searchVal}`).then(res => {
                    if (res.ok) {
                        this.results = JSON.parse(res.data).rows
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/styles/iconfont.scss';
.m-searchHd {
    padding: 0;
    background: #c50a1d;
}

.v-catbtn {
    line-height: 14px;
    text-align: center;
    color: #fff;
    i {
        height: 14px;
        font-size: 18px;
    }
    .txt {
        height: 14px;
        font-size: 12px;
    }
}
</style>
<style lang="scss">
/* 头部搜索改造 */

.m-searchHd {
    h1.vux-header-title {
        margin: 0 50px;
        height: 28px;
        line-height: 28px;
        padding: 8px 0;
        text-align: left;
        color: #666;
        .weui_search_bar {
            padding: 0;
        }
        .vux-search-fixed {
            .weui_search_bar {
                padding: 8px 10px;
                font-size: 16px;
                background: #c50a1d;
            }
        }
    }
    div.vux-header-right {
        top: 8px;
    }
}
</style>
