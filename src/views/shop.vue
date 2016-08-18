<template>
    <div class="v-shop">
        <!-- 搜索 -->
        <div class="v-hd">
            <div class="v-back" @click="goback"><i class="iconfont">&#xe602;</i></div>
            <div class="v-search" v-link="{path:'shop-products?focus=1'}">
                <div class="vux-search-box">
                    <div class="weui_search_bar" id="search_bar">
                        <form class="weui_search_outer">
                            <div class="vux-search-mask"></div>
                            <div class="weui_search_inner">
                                <i class="weui_icon_search"></i>
                                <input type="text" class="weui_search_input" id="search_input" autocomplete="off" required="" placeholder="店内搜索商品">
                                <a href="javascript:" class="weui_icon_clear" id="search_clear"></a>
                            </div>
                            <label for="search_input" class="weui_search_text" id="search_text">
                                <i class="weui_icon_search"></i>
                                <span>店内搜索商品</span>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
            <div class="v-catbtn" v-link="{path:'shop-category'}">
                <i class="iconfont">&#xe603;</i>
                <div class="txt">分类</div>
            </div>
        </div>

        <div class="v-wrap">
            <!-- 店铺头部 -->
            <div class="v-shophd" :style="{backgroundImage:'url('+indexData.backgroundImage+')'}">
                <div class="logo"></div>
                <div class="data">
                    <div class="name">{{indexData.name}}</div>
                    <div class="nums">销量{{indexData.sales}} 共{{indexData.total}}件商品</div>
                    <div class="more" v-if="indexData.isSenior">
                        <div class="ren">认</div> 企业实名认证
                    </div>
                </div>
                <div class="mark"></div>
            </div>

            <!-- 轮播图 -->
            <swiper :list="indexData.swiperList" :auto="true" class="v-swiper"></swiper>

            <!-- 优惠劵 -->
            <div class="v-coupons">
                <img src="../assets/images/_coupons.jpg" alt="" class="img">
            </div>

            <!-- 商家推荐 -->
            <div class="v-list">
                <div class="title">商家推荐</div>
                <div class="v-prolist">
                    <div class="v-pro" v-for="items of indexData.hotList">
                        <div class="hd">
                            <img :src="items.image" alt="" class="img">
                        </div>
                        <div class="bd">
                            <div class="name">{{items.name}}</div>
                            <div class="data">
                                <span class="pri">￥{{items.price}}</span>
                                <span class="sales">已售出：{{items.sales}}件</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 新品上市 -->
            <div class="v-list">
                <div class="title">新品上市</div>
                <div class="v-prolist">
                    <div class="v-pro" v-for="items of indexData.newList">
                        <div class="hd">
                            <img :src="items.image" alt="" class="img">
                        </div>
                        <div class="bd">
                            <div class="name">{{items.name}}</div>
                            <div class="data">
                                <span class="pri">￥{{items.price}}</span>
                                <span class="sales">已售出：{{items.sales}}件</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 所有商品 -->
            <div class="v-goall" v-link="{path:`shop-products?shop=${shop}`}">查看所有商品</div>
        </div>

        <!-- 底部菜单 -->
        <div class="v-fnav">
            <div class="it">店铺介绍</div>
            <div class="it">店铺公告</div>
        </div>
    </div>
</template>

<script>
import {
    Swiper,
    Tab,
    TabItem,
} from 'vux/src/components';
import SearchCat from '../components/search-cat/index.vue'
import ProductsList from '../components/products-list/index.vue'


export default {
    components: {
        Swiper,
        Tab,
        TabItem,
        ProductsList,
    },
    data() {
        return {
            // 店铺id
            shop: '',
            indexData: {
                shop: '',
                backgroundImage: '',
                logo: '',
                name: '',
                sales: '',
                total: '',
                isSenior: false,
                swiperList: [],
                hotList: [],
                newList: [],
            }
        }
    },
    created() {
        // 获取店铺id
        this.shop = this.$route.query.shop || 0
    },
    ready() {
        const url = `/app/shopping/shop-index.htm?shop=${this.shop}`
        this.$http.get(url).then(res => {
            if (res.ok) {
                this.indexData = Object.assign({}, JSON.parse(res.data).rows)
            }
        })
    },
    methods: {
        // 返回
        goback() {
            history.back()
        },
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/styles/iconfont.scss';
.v-shop {
    background: #efefef;
    padding: 44px 0;
}

.v-wrap {
    // flex: 1;
}

// 搜索头部
.v-hd {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    display: flex;
    z-index: 5;
    align-items: center;
    background-color: #c50a1d;
}

.v-search {
    flex: 1;
    padding: 8px;
    .weui_search_bar {
        padding: 0;
    }
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

.v-catbtn {
    padding-right: 10px;
    line-height: 18px;
    text-align: center;
    color: #fff;
    i {
        height: 14px;
        font-size: 24px;
    }
    .txt {
        height: 14px;
        font-size: 12px;
    }
}

// 店铺头部
.v-shophd {
    position: relative;
    width: 100%;
    padding-bottom: 33%;
    background: url('') no-repeat 50% 50% / 100% auto transparent;
    .logo {
        position: absolute;
        bottom: 0;
        left: 15px;
        width: 80px;
        height: 80px;
        background: url('../assets/images/_logo.jpg') no-repeat 0 0 / 100% auto transparent;
    }
    .data {
        position: absolute;
        left: 105px;
        bottom: 5px;
        .name {
            font-size: 16px;
            color: #333;
        }
        .nums {
            line-height: 30px;
            font-size: 14px;
            color: #999;
        }
        .more {
            line-height: 16px;
            font-size: 14px;
            color: #f00;
            .ren {
                display: inline-block;
                border-radius: 2px;
                pading: 2px;
                color: #fff;
                background: #cf7207;
            }
        }
    }
    .mark {
        position: absolute;
        right: 15px;
        bottom: 0;
        width: 50px;
        height: 50px;
        background: url('../assets/images/_mark.jpg') no-repeat 0 0 / 100% auto transparent;
    }
}

// 轮播图
.v-swiper {
    margin-top: 10px;
}

// 优惠券
.v-coupons {
    .img {
        width: 100%;
    }
}

// 产品列表
.v-list {
    margin-bottom: 10px;
    padding: 10px 5px;
    background: #fff;
    .title {
        padding: 0 5px;
    }
}

.v-prolist {
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
                height: 100%;
            }
        }
        .bd {
            .name {
                height: 24px;
                line-height: 24px;
                overflow: hidden;
                font-size: 16px;
            }
            .data {
                font-size: 14px;
                .pri {
                    color: #f00;
                }
                .sales {
                    font-size: 12px;
                    color: #888;
                }
            }
        }
    }
}

// 查看所有
.v-goall {
    padding: 5px 0;
    border-bottom: 10px solid #efefef;
    font-size: 14px;
    text-align: center;
    background: #fff;
}

// 底部菜单
.v-fnav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    display: flex;
    text-align: center;
    color: #fff;
    .it {
        flex: 1;
        height: 44px;
        line-height: 44px;
        &:nth-child(1) {
            background: rgba(8, 8, 8, .8);
            color: #fc9;
        }
        &:nth-child(2) {
            background: rgba(255, 51, 0, .8);
            color: #fff;
        }
    }
}
</style>
