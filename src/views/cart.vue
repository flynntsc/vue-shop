<template>
    <div class="v-cart">
        <!-- 头部 -->
        <x-header :left-options="{showBack: false}" class="v-hd">
            购物车
            <i class="iconfont v-back" slot="left">&#xe602;</i>
        </x-header>

        <div class="v-wrap">
            <div class="v-cell">
                <div class="v-cellhd">
                    <label>
                        <input type="checkbox" name="" id=""> 汇管车平台自营店
                    </label>
                </div>
                <div class="v-cellbd">
                    <div class="sel">
                        <label>
                            <input type="checkbox" name="" id="">
                        </label>
                    </div>
                    <div class="pro">
                        <img src="http://temp.im/180x80" alt="">
                    </div>
                    <div class="box">
                        <div class="name">米其林-XZE 高档绝无仅有卓多喝点开房大厦卡车载重轮胎全新正品</div>
                        <div class="price">￥2499.00</div>
                        <div class="nums">
                            <number2></number2>
                        </div>
                    </div>
                </div>
                <div class="v-cellbd">
                    <div class="sel">
                        <label>
                            <input type="checkbox" name="" id="">
                        </label>
                    </div>
                    <div class="pro">
                        <img src="http://temp.im/80x80" alt="">
                    </div>
                    <div class="box">
                        <div class="name">米其林-XZE 高档绝无仅有卓多喝点开房大厦卡车载重轮胎全新正品</div>
                        <div class="price">￥2499.00</div>
                        <div class="nums">
                            <number2></number2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="v-cell">
                <div class="v-cellhd">
                    <label>
                        <input type="checkbox" name="" id=""> 汇管车平台自营店2222
                    </label>
                </div>
                <div class="v-cellbd">
                    <div class="sel">
                        <label>
                            <input type="checkbox" name="" id="">
                        </label>
                    </div>
                    <div class="pro">
                        <img src="http://temp.im/80x80" alt="">
                    </div>
                    <div class="box">
                        <div class="name">米其林-XZE 高档绝无仅有卓多喝点开房大厦卡车载重轮胎全新正品</div>
                        <div class="price">￥2499.00</div>
                        <div class="nums">
                            <number2></number2>
                        </div>
                    </div>
                </div>
                <div class="v-cellbd">
                    <div class="sel">
                        <label>
                            <input type="checkbox" name="" id="">
                        </label>
                    </div>
                    <div class="pro">
                        <img src="http://temp.im/80x80" alt="">
                    </div>
                    <div class="box">
                        <div class="name">米其林-XZE 高档绝无仅有卓多喝点开房大厦卡车载重轮胎全新正品</div>
                        <div class="price">￥2499.00</div>
                        <div class="nums">
                            <number2></number2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部菜单 -->
        <div class="v-ft">
            <div class="sel">
                <label>
                    <input type="checkbox" name="" id=""> 全选
                </label>
            </div>
            <div class="total">合计：￥<span class="pri">0.00</span></div>
            <div class="buy">立即购买</div>
        </div>
    </div>
</template>

<script>
import {
    XHeader,
} from 'vux/src/components'

import Number2 from '../components/x-number2/index.vue'


export default {
    components: {
        XHeader,
        Number2,
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
.v-cart {
    background: #efefef;
    padding: 44px 0;
}

.v-hd {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 44px;
    background: #c50a1d;
}

.v-back {
    font-size: 22px;
    color: #fff;
}

.v-wrap {
    // flex: 1;
}

// 底部菜单
.v-ft {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #fff;
    color: #666;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid #ececec;
        transform: scaleY(.5);
    }
    .sel {
        padding: 0 15px;
        font-size: 14px;
    }
    .total {
        flex: 2;
        font-size: 14px;
        text-align: right;
        padding-right: 10px;
        .pri {
            font-size: 16px;
            color: #f00;
        }
    }
    .buy {
        flex: 1;
        padding: 0 15px;
        background: rgba(255, 51, 0, .8);
        color: #fff;
    }
}

// 购物车
.v-cell {
    margin-bottom: 10px;
    background: #fff;
}

.v-cellhd {
    padding: 10px 15px;
    background: #f8f8f8;
}

.v-cellbd {
    position: relative;
    display: flex;
    padding: 5px 15px 5px 0;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-bottom: 1px solid #ececec;
        transform: scaleY(.5);
    }
    .sel {
        line-height: 1;
        label {
            display: block;
            padding: 30px 10px 30px 15px;
        }
    }
    .pro {
        // margin-right: 10px;
        width: 80px;
        height: 80px;
        border: 1px solid #ececec;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .box {
        flex: 1;
        position: relative;
        margin-left: 10px;
        .name {
            display: -webkit-box;
            height: 40px;
            line-height: 20px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
        .price {
            position: absolute;
            bottom: 5px;
            left: 0;
            color: #f00;
        }
        .nums {
            position: absolute;
            right: 0;
            bottom: 5px;
        }
    }
}
</style>
