<template>
    <div class="v-payment">
        <!-- 头部 -->
        <x-header :left-options="{showBack: false}" class="v-hd">
            付款
            <i class="iconfont v-back" slot="left">&#xe602;</i>
        </x-header>

        <div class="v-bd">
            <!-- 支付 -->
            <group title="支付方式">
                <radio :options="payArr" :value.sync="payVal"></radio>
            </group>
        </div>

        <!-- 底部菜单 -->
        <div class="v-ft">
            <div class="total">合计：￥<span class="pri">0.00</span></div>
            <div class="buy">支付</div>
        </div>
    </div>
</template>

<script>
import {
    XHeader,
    Group,
    Radio,
} from 'vux/src/components'


export default {
    components: {
        XHeader,
        Group,
        Radio,
    },
    data() {
        return {
            payArr: ['账号余额付款', '积分付款', '银联支付'],
            payVal: '账号余额付款'
        }
    },
    ready() {
        const url = `/app/shopping/shop-index.htm?shop=${this.shop}`
        this.$http.get(url).then(res => {
            if (res.ok) {
                this.indexData = Object.assign({}, JSON.parse(res.data).rows)

                // ajax后再更改
                this.payArr = ['账号余额付款 余额：999.99', '积分付款 2', '银联支付 3']
                this.payVal = '账号余额付款 余额：999.99'
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
@mixin borderTop {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #cecece;
    transform: scaleY(.5);
}

.v-payment {
    box-sizing: border-box;
    overflow-x: hidden;
    background: #efefef;
    padding-top: 44px;
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
    background: rgba(255, 255, 255, .9);
    color: #666;
    &:before {
        @include borderTop;
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
        background: #c50a1d;
        color: #fff;
    }
}

.f-red {
    color: #f00;
}
</style>
