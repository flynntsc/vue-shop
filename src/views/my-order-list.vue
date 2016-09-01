<template>
    <div class="v-my">
        <!-- 头部 -->
        <x-header :left-options="{showBack: false}" class="v-hd">
            我的订单
            <i class="iconfont v-back" slot="left" @click="goback">&#xe602;</i>
        </x-header>

        <!-- 订单菜单 -->
        <tab>
            <tab-item :selected="tabSel === 0" @click="tabLovSel">全部</tab-item>
            <tab-item :selected="tabSel === 1" @click="tabNewSel">待报价</tab-item>
            <tab-item :selected="tabSel === 2" @click="tabLovSel">待付款</tab-item>
            <tab-item :selected="tabSel === 3" @click="tabLovSel">待发货</tab-item>
            <tab-item :selected="tabSel === 4" @click="tabLovSel">已发货</tab-item>
            <tab-item :selected="tabSel === 5" @click="tabLovSel">已完成</tab-item>
        </tab>
        <!-- 订单主体 -->
        <div class="v-orders">
            <!-- 订单1 -->
            <div class="v-order">
                <div class="v-shop">
                    <div class="hd">
                        <div class="tt">汇管车平台自营店</div>
                        <div class="tc">待报价</div>
                    </div>
                    <div class="bd">
                        <productcell :proslist="proscellList"></productcell>
                    </div>
                    <div class="ft">
                        <div class="total">共2件商品 合计：<span class="f-c2">待报价</span></div>
                    </div>
                </div>
                <div class="v-btns">
                    <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_warn"> 取消订单 </button></span>
                </div>
            </div>

            <!-- 订单1 -->
            <div class="v-order">
                <div class="v-shop">
                    <div class="hd">
                        <div class="tt">汇管车平台自营店</div>
                        <div class="tc">待付款</div>
                    </div>
                    <div class="bd">
                        <productcell :proslist="proscellList"></productcell>
                    </div>
                    <div class="ft">
                        <div class="total">共2件商品 合计：<span class="f-c2">$ 23123</span></div>
                    </div>
                </div>
                <div class="v-btns">
                    <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_primary"> 付款 </button></span>
                    <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_warn"> 取消订单 </button></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    XHeader,
    Tab,
    TabItem,
} from 'vux/src/components'
import productcell from '../components/product-cell'


export default {
    components: {
        XHeader,
        Tab,
        TabItem,
        productcell,
    },
    data() {
        return {
            // 订单中的所含产品临时变量
            proscellList: [{
                img: 'http://temp.im/80x80',
                name: '产品名称11123123',
                sku: '123',
                pri: '99992.00',
                num: 2,
            }, {
                img: 'http://temp.im/80x80',
                name: '产品名称11123123',
                sku: '123',
                pri: '99992.00',
                num: 2,
            }],
        }
    },
    created() {},
    ready() {},
    methods: {
        // 返回
        goback() {
            history.back()
        },
        tabLovSel() {},
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/styles/iconfont.scss';
// 箭头
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

@mixin borderBottom {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #cecece;
    transform: scaleY(.5);
}

.v-my {
    overflow: hidden;
    background: #efefef;
}

.v-hd {
    background-color: #c50a1d;
}

.v-back {
    font-size: 22px;
    color: #fff;
}

.v-order {
    margin-bottom: 10px;
    line-height: 24px;
    background: #fff;
    .hd {
        display: flex;
        position: relative;
        padding: 10px 15px 5px 0;
        margin-left: 15px;
        &:before {
            @include borderBottom;
        }
        .tt {
            flex: 1;
        }
        .tc {
            color: #f60;
        }
    }
    .bd {
        position: relative;
        margin-left: 15px;
        &:before {
            @include borderBottom;
        }
    }
    .ft {
        text-align: right;
        .total {
            position: relative;
            margin-left: 15px;
            padding: 5px 15px 5px 0;
            &:before {
                @include borderBottom;
            }
        }
    }
}

.v-btns {
    padding: 10px 15px 5px 0;
    text-align: right;
    .btn {
        display: inline-block;
        margin-left: 10px;
    }
}

.f-c1 {
    color: #f00;
}

.f-c2 {
    color: #f60;
}
</style>
