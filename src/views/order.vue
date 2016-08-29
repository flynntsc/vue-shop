<template>
    <div class="v-order">
        <!-- 头部 -->
        <x-header :left-options="{showBack: false}" class="v-hd">
            确认订单
            <i class="iconfont v-back" slot="left">&#xe602;</i>
        </x-header>

        <div class="v-bd">
            <!-- 配送 -->
            <div class="v-send">
                <!-- select vux -->
                <div class="v-way">
                    <selector :value.sync="sendVal" title="配送方式" :options="sendOptions"></selector>
                </div>
                <!-- 送货上门 || 上门安装 -->
                <div class="v-way" v-show="sendVal === '送货上门' || sendVal === '上门安装'">
                    <cell title="送货形式：">快递</cell>

                    <!-- 地址 -->
                    <div class="v-address">
                        <div class="hd">
                            <div class="name">收货人：张三</div>
                            <div class="tel">13455432234</div>
                            <div class="arrow"></div>
                        </div>
                        <div class="bd">
                            收货地址：福建省厦门市思明区莲前毅力的的搜房就搜到分奇偶时间覅欧舒丹
                        </div>
                    </div>
                </div>

                <!-- 到店自提 -->
                <div class="v-way" v-show="sendVal === '到店自提'">
                    <cell title="自提门店：">汇管车湖滨门店</cell>
                    <cell title="预计自提日期" link="javascript;" @click="calendarShow = !calendarShow">{{calendarVal}}</cell>
                    <cell title="">使用期限：购买成功后100天内有效</cell>
                </div>

                <!-- 到店安装 -->
                <div class="v-way" v-show="sendVal === '到店安装'">
                    <cell title="安装门店：">米其林授权服务店湖滨店</cell>
                    <cell title="预计到店日期" @click="calendarShow = !calendarShow">{{calendarVal}}</cell>
                    <cell title="">使用期限：购买成功后100天内有效</cell>
                </div>
            </div>

            <!-- 产品信息 -->
            <div class="v-pros">
                <div class="v-pro">
                    <div class="v-cellhd">
                        <div class="hd">汇管车平台自营店</div>
                    </div>
                    <div class="v-cellbd">
                        <div class="hd">
                            <img src="http://temp.im/80x80" alt="" class="img">
                        </div>
                        <div class="bd">
                            <div class="v-txt">
                                <div class="name">米其林圣诞节佛寺的金佛 米其林圣诞节佛寺的金佛寺的见风使舵都是是的寺的见风使舵都是是的</div>
                                <div class="sku">规格</div>
                                <div class="nums">
                                    <div class="pri f-red">￥23.30</div>
                                    <div class="num">x2</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="v-cellbd">
                        <div class="bd">运费</div>
                        <div class="ft f-red">+ 0.00</div>
                    </div>
                    <div class="v-cellbd">
                        <div class="bd">店铺活动：满2件减50</div>
                        <div class="ft f-red">- 50.00</div>
                    </div>
                    <div class="v-cellbd">
                        <div class="hd">卖家留言：</div>
                        <div class="bd">
                            <input type="text" class="ipt" placeholder="选填">
                        </div>
                    </div>
                    <div class="v-cellbd">
                        <div class="bd"></div>
                        <div class="ft">
                            共2件商品 合计：<span class="f-red">￥4939.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部菜单 -->
        <div class="v-ft">
            <div class="total">合计：￥<span class="pri">0.00</span></div>
            <div class="buy">立即购买</div>
        </div>

        <!-- 日期选择 -->
        <inline-calendar class="v-calendar" :class="calendarShow ? 'z-crt' : ''" :value.sync="calendarVal" :start-date="startDate" :end-date="endDate" :highlight-weekend="highlightWeekend" :weeks-list="weeksList">
        </inline-calendar>
    </div>
</template>

<script>
import {
    XHeader,
    Selector,
    Cell,
    XInput,
    InlineCalendar,
} from 'vux/src/components'


export default {
    components: {
        XHeader,
        Selector,
        Cell,
        XInput,
        InlineCalendar,
    },
    data() {
        return {
            sendOptions: ['送货上门', '到店自提', '到店安装', '上门安装'],
            sendVal: '送货上门',
            // 日期选择
            calendarVal: '',
            calendarShow: false,
            startDate: '2016-08-29',
            endDate: '2016-10-07',
            highlightWeekend: true,
            weeksList: ['日', '一', '二', '三', '四', '五', '六 '],

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
    watch: {
        calendarVal(val) {
            this.calendarShow = false
        },
    },
    methods: {
        // 返回
        goback() {
            history.back()
        },
        todayDay() {

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

@mixin borderTop {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #cecece;
    transform: scaleY(.5);
}

.v-order {
    box-sizing: border-box;
    overflow-x: hidden;
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

// 配送
.v-send {
    // margin-bottom: 10px;
}

.v-way {
    margin-bottom: 10px;
    background: #fff;
}

// 地址
.v-address {
    position: relative;
    margin-bottom: 10px;
    padding: 0 15px;
    background: #fff;
    &:before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        margin-left: 15px;
        border-top: 1px solid #cecece;
        transform: scaleY(.5);
    }
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

// 日期选择
.v-calendar {
    position: fixed;
    z-index: 6;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: translateY(100%);
    &.z-crt {
        transform: translateY(0);
    }
}

// 产品
.v-pro {
    margin-bottom: 10px;
    background: #fff;
}

.v-cellhd {
    background: #fff;
    &+.v-cellbd:before {
        @include borderTop;
    }
    .hd {
        padding: 10px 15px;
    }
}

.v-cellbd {
    position: relative;
    display: flex;
    margin-left: 15px;
    padding-right: 15px;
    background: #fff;
    &+.v-cellbd:before {
        @include borderTop;
    }
    .hd {
        padding: 10px 0;
        white-space: nowrap;
    }
    .bd {
        flex: 1;
        padding: 10px 0;
        .ipt {
            width: 100%;
            box-sizing: border-box;
            -webkit-appearance: none;
            border: 0 none;
            font-size: 14px;
        }
    }
    .ft {
        padding: 10px 0;
        white-space: nowrap;
        text-align: right;
    }
}

.v-txt {
    padding-left: 10px;
    line-height: 20px;
    .name {
        display: -webkit-box;
        height: 40px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 14px;
    }
    .sku {
        font-size: 12px;
        color: #666;
    }
    .nums {
        position: relative;
        .num {
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 12px;
            color: #666;
        }
    }
}

.f-red {
    color: #f00;
}
</style>
