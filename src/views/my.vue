<template>
    <div class="v-my">
        <!-- 头部 -->
        <x-header :left-options="{showBack: false}" class="v-hd">
            我的
            <i class="iconfont v-back" slot="left" @click="goback">&#xe602;</i>
        </x-header>

        <!-- 信息 -->
        <div class="v-user">
            <div class="hd">
                <img src="http://temp.im/80x80" alt="" class="img">
            </div>
            <div class="bd">
                <div class="tt">李四 <span class="f-c2">Lv.1</span></div>
                <div class="tc">认证类型：个人</div>
            </div>
            <div class="ft">
                <span class="arrow"></span>
            </div>
        </div>

        <!-- 订单 -->
        <div class="v-order">
            <div class="hd">
                <div class="tt">商品订单</div>
                <div class="tc" v-link="{path:'my-order-list'}">查看全部订单</div>
            </div>
            <div class="bd">
                <div class="it">待报价</div>
                <div class="it">待付款</div>
                <div class="it">待发货</div>
                <div class="it">已发货</div>
                <div class="it">已完成</div>
            </div>
        </div>

        <!-- 列表 -->
        <div class="v-cells">
            <cell title="收货地址" link="javascript;"></cell>
            <cell title="开票设置" link="javascript;"></cell>
            <cell title="子账号" link="javascript;"></cell>
            <cell title="关于APP" link="javascript;"></cell>
        </div>

    </div>
</template>

<script>
import {
    XHeader,
    Cell,
} from 'vux/src/components';


export default {
    components: {
        XHeader,
        Cell,
    },
    data() {
        return {}
    },
    created() {},
    ready() {},
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
    background: #efefef;
}

.v-hd {
    background-color: #c50a1d;
}

.v-back {
    font-size: 22px;
    color: #fff;
}

// 用户信息
.v-user {
    display: flex;
    position: relative;
    margin-bottom: 10px;
    padding: 10px 15px;
    background: #fff;
    &:after {
        @include borderBottom;
    }
    .hd {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid #ececec;
        overflow: hidden;
        .img {
            width: 100%;
        }
    }
    .bd {
        padding: 5px 10px;
        flex: 1;
        line-height: 25px;
        font-size: 16px;
        .tt {}
        .tc {}
    }
    .ft {
        line-height: 60px;
        .arrow {
            @include arrow;
        }
    }
}

// 订单
.v-order {
    position: relative;
    margin-bottom: 10px;
    padding: 10px 0;
    line-height: 24px;
    background: #fff;
    &:after {
        @include borderBottom;
    }
    .hd {
        position: relative;
        display: flex;
        margin-bottom: 10px;
        margin-left: 15px;
        padding-bottom: 10px;
        padding-right: 15px;
        &:after {
            @include borderBottom;
        }
        .tt {
            flex: 1;
        }
        .tc {
            font-size: 14px;
            color: #666;
        }
    }
    .bd {
        display: flex;
        text-align: center;
        .it {
            flex: 1;
            font-size: 14px;
        }
    }
}

// 列表
.v-cells {
    position: relative;
    background: #fff;
    &:after {
        @include borderBottom;
    }
}

.f-c2 {
    color: #f00;
}
</style>
