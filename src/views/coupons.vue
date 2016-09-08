<template>
    <!-- 头部 -->
    <x-header :left-options="{showBack: false}" class="v-ghd">
        {{isShowGet ? '已领取抵用券' : '未领取抵用券'}}
        <i class="iconfont" slot="left" @click="goback">&#xe602;</i>
        <span slot="right" @click="showAllFn" v-show="!isShowGet">已领取</span>
        <span slot="right" @click="showAllFn" v-else>未领取</span>
    </x-header>

    <!-- 未领取列表 -->
    <div class="v-coupons" v-show="!isShowGet">
        <div class="v-coupon" v-for="(key,items) of noGetList" track-by="$index" :class="items.isEmpty ? 'z-dis': ''">
            <div class="l">
                <div class="hd">￥{{items.value}}</div>
                <div class="bd">满{{items.lower_price}}使用</div>
            </div>
            <div class="m">
                <div class="name">{{items.store_name}}</div>
                <div class="txt">{{items.use_range}}</div>
                <div class="txt">使用期限:{{items.use_time}}</div>
            </div>
            <div class="r" @click="getFn(key)">
                <div class="get">立即领取</div>
            </div>
        </div>
    </div>

    <!-- 已领取列表 -->
    <div class="v-coupons" v-else>
        <div class="v-coupon" v-for="items of getList" track-by="$index" :class="items.isPast ? 'z-past': ''">
            <div class="l">
                <div class="hd">￥{{items.value}}</div>
                <div class="bd">满{{items.lower_price}}使用</div>
            </div>
            <div class="m">
                <div class="name">{{items.store_name}}</div>
                <div class="txt">{{items.use_range}}</div>
                <div class="txt">使用期限:{{items.use_time}}</div>
            </div>
            <div class="r">
                <div class="get">立即使用</div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    XHeader,
} from 'vux/src/components';


export default {
    components: {
        XHeader,
    },
    data() {
        return {
            // 头部
            isShowGet: true,
            noGetList: [],
            getList: [],
        }
    },
    ready() {
        this.$http.get('/api/shopping/coupons.htm').then(res => {
            if (res.ok) {
                let data = JSON.parse(res.data)
                this.noGetList = data.rows
                this.getList = data.rows2
            }
        })
    },
    methods: {
        // 返回
        goback() {
            history.back()
        },
        showAllFn() {
            this.isShowGet = !this.isShowGet
        },
        getFn(key) {
            this.getList.unshift(this.noGetList[key])
            this.noGetList.splice(key, 1)

            // 提交数据变更
            // this.$http.past('/api/shopping/coupons-update.htm').then(res => {
            //     console.log(res.ok)
            // })
        },
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/styles/iconfont.scss';
.v-ghd {
    background-color: #c50a1d;
}

.v-coupons {
    padding: 10px;
}

.v-coupon {
    display: flex;
    position: relative;
    margin-bottom: 10px;
    &.z-dis {
        &:after {
            content: '已抢光';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(150, 150, 150, .8);
            color: #f00;
        }
    }
    &.z-past {
        &:after {
            content: '已过期';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(150, 150, 150, .8);
            color: #f00;
        }
    }
    .l {
        padding: 10px 4px;
        white-space: nowrap;
        text-align: center;
        background: #fc0;
        .hd {
            font-weight: 700;
            font-size: 20px;
            color: #fff;
        }
        .bd {
            font-size: 12px;
            color: #666;
        }
    }
    .m {
        flex: 1;
        border-left: 1px dotted #ececec;
        background: #fc0;
        padding: 5px 2px 0 4px;
        .name {
            font-size: 16px;
        }
        .txt {
            font-size: 12px;
            color: #666;
        }
    }
    .r {
        display: flex;
        padding: 0 10px;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #fff;
        background: #cecece;
        font-size: 12px;
        .get {
            width: 30px;
        }
    }
}
</style>
