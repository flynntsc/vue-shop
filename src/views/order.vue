<template>
    <div class="v-cart">
        <!-- 头部 -->
        <x-header :left-options="{showBack: false}" class="v-hd">
            确认订单
            <i class="iconfont v-back" slot="left">&#xe602;</i>
        </x-header>

        <div class="v-bd">
            <!-- 配送 -->
            <div class="v-send">
                <!-- select vux -->
                <cell title="配送方式">到店自提</cell>
            </div>

            <!-- 地址 -->
            <div class="v-address" v-show="sendVal === '1'">
                <div class="hd">
                    <div class="name">收货人：张三</div>
                    <div class="tel">13455432234</div>
                    <div class="arrow"></div>
                </div>
                <div class="bd">
                    收获地址：福建省厦门市思明区莲前毅力的的搜房就搜到分奇偶时间覅欧舒丹
                </div>
            </div>
        </div>

        <!-- 底部菜单 -->
        <div class="v-ft">
            <div class="total">合计：￥<span class="pri">0.00</span></div>
            <div class="buy">立即购买</div>
        </div>
    </div>
</template>

<script>
import {
    XHeader,
    Cell,
} from 'vux/src/components'


export default {
    components: {
        XHeader,
        Cell,
    },
    data() {
        return {
            sendArr: ['送货上门', '到店自提', '到店安装', '上门安装'],
            sendVal: '1',
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
@mixin arrow {
    content: " ";
    display: inline-block;
    transform: rotate(45deg);
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    @content;
}

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

.v-bd {
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

// 配送
.v-send {
    margin-bottom: 10px;
    background: #fff;
}

// 地址
.v-address {
    position: relative;
    margin-bottom: 10px;
    padding: 0 15px;
    background: #fff;
    .hd {
        display: flex;
        padding: 10px 0;
        line-height: 24px;
        .name {
            flex: 1;
        }
        .tel {
            text-align: right;
        }
        .arrow {
            @include arrow;
            position: relative;
            top: 20px;
            margin-left: .3em;
        }
    }
    .bd {
        position: relative;
        top: -5px;
        padding-right: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #666;
    }
}

// 送货方式
// .v-cell {
//     display: flex;
//     padding: 10px 15px;
//     font-size: 14px;
//     line-height: 24px;
//     background: #fff;
//     .hd {}
//     .bd {
//         position: relative;
//         flex: 1;
//         &:after {
//             @include arrow;
//             position: absolute;
//             right: 40%;
//             top: 50%;
//             transform: rotate(45deg) translate(-50%, -50%);
//         }
//         .sel {
//             position: relative;
//             display: block;
//             width: 100%;
//             height: 24px;
//             line-height: 24px;
//             border: 0 none;
//             font-size: 14px;
//             background: #fff;
//         }
//     }
//     .ft {
//         // flex: 1;
//     }
// }
</style>
