<template>
    <div class="v-orders">
        <!-- Page1 - 订单页面 -->
        <div class="v-order" v-show="status === '0'">
            <!-- 头部 -->
            <x-header :left-options="{showBack: false}" class="v-hd">
                确认订单
                <i class="iconfont v-back" slot="left" @click="goback">&#xe602;</i>
            </x-header>
            <div class="v-bd-0">
                <!-- 配送 -->
                <div class="v-send">
                    <!-- select vux -->
                    <div class="v-way">
                        <selector :value.sync="sendVal" title="配送方式" :options="sendOptions" @on-change="changeWay"></selector>
                    </div>
                    <!-- 1物流配送 -->
                    <div class="v-way" v-show="sendVal === '物流配送'">
                        <cell title="送货形式：">快递</cell>
                        <div class="v-address" @click="goAddrList">
                            <div class="hd">
                                <div class="name">收货人：{{addrVal.posting_name}}</div>
                                <div class="tel">{{addrVal.mobile_number}}</div>
                                <div class="arrow"></div>
                            </div>
                            <div class="bd">
                                收货地址：{{addrVal.linkAddress}}
                            </div>
                        </div>
                    </div>
                    <!-- 4上门安装 -->
                    <div class="v-way" v-show="sendVal === '上门安装'">
                        <div class="v-address" @click="goAddrList">
                            <div class="hd">
                                <div class="name">联系人：{{addrVal.posting_name}}</div>
                                <div class="tel">{{addrVal.mobile_number}}</div>
                                <div class="arrow"></div>
                            </div>
                            <div class="bd">
                                预约上门地址：{{addrVal.linkAddress}}
                            </div>
                        </div>
                        <cell title="预约上门时间" @click="calendarShow = !calendarShow">{{linkDate}}</cell>
                        <cell title="">使用期限：购买成功后100天内有效</cell>
                    </div>
                    <!-- 2到店自提 -->
                    <div class="v-way" v-show="sendVal === '到店自提'">
                        <cell title="自提门店：">？？？</cell>
                        <cell title="预计自提日期" link="javascript;" @click="calendarShow = !calendarShow">{{linkDate}}</cell>
                        <cell title="">使用期限：购买成功后100天内有效</cell>
                    </div>
                    <!-- 3到店服务 -->
                    <div class="v-way" v-show="sendVal === '到店服务'">
                        <cell title="服务门店：">？？？</cell>
                        <cell title="预计到店日期" link="javascript;" @click="calendarShow = !calendarShow">{{linkDate}}</cell>
                        <cell title="">使用期限：购买成功后100天内有效</cell>
                    </div>
                </div>
                <!-- 产品信息 -->
                <div class="v-pros">
                    <div class="v-pro">
                        <div class="v-cellhd">
                            <div class="hd">{{proscellShop}}</div>
                        </div>
                        <productcell :proslist="proscellList"></productcell>
                        <div class="v-cellbd">
                            <div class="bd"></div>
                            <div class="ft">
                                共{{proscellNum}}件商品 合计：<span class="f-c2">+ {{proscellSum}}</span>
                            </div>
                        </div>
                        <div class="v-cellbd">
                            <div class="bd">运费</div>
                            <div class="ft f-c2">+ {{freightPrice}}</div>
                        </div>
                        <div class="v-cellbd">
                            <div class="bd">店铺活动：{{couponName}}</div>
                            <div class="ft f-c2">- {{couponPrice}}</div>
                        </div>
                        <div class="v-cellbd">
                            <div class="hd">卖家留言：</div>
                            <div class="bd">
                                <input type="text" class="ipt" placeholder="选填">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部菜单 -->
            <div class="v-ft">
                <div class="total">合计：<span class="pri">￥ {{orderTotal}}</span></div>
                <div class="buy" v-show="canBuy" @click="toPay">提交订单</div>
                <div class="buy z-dis" v-show="!canBuy">请填写完整</div>
            </div>
            <!-- 日期选择 -->
            <inline-calendar class="v-calendar" :class="calendarShow ? 'z-crt' : ''" :value.sync="linkDate" :start-date="startDate" :end-date="endDate" :highlight-weekend="highlightWeekend" :weeks-list="weeksList">
            </inline-calendar>
        </div>
        <!-- Page2 - 收货地址列表页面 -->
        <div class="v-alist" v-show="status === '1'">
            <!-- 头部 -->
            <x-header :left-options="{showBack: false}" class="v-hd">
                收货地址
                <i class="iconfont v-back" slot="left" @click="status = '0'">&#xe602;</i>
                <span class="f-c1" slot="right" @click="addAddr">新建</span>
            </x-header>
            <div class="v-bd-1">
                <div class="v-addrList">
                    <div class="v-addrbd" v-for="items of addrList" v-show="addrList.length" track-by="$index">
                        <div class="stat" v-if="items.isSel"><i class="iconfont">&#xe60b;</i></div>
                        <div class="cont" @click="selAddr($index)">
                            <div class="hd">
                                <div class="name">{{items.posting_name}}</div>
                                <div class="tel">{{items.mobile_number}}</div>
                            </div>
                            <div class="bd"><span class="defa" v-if="items.default_status === '默认收件'">默认</span>{{items.province_city}} {{items.detail_address}}</div>
                        </div>
                        <div class="edit" @click="editAddr($index)">
                            <i class="iconfont">&#xe60a;</i>
                        </div>
                    </div>
                    <div class="v-noAddr f-tac" v-show="!addrList.length">您还没有任何收货地址</div>
                </div>
            </div>
        </div>
        <!-- Page2 - 编辑收货地址页面 -->
        <div class="v-aedit" v-show="status === '2'">
            <!-- 头部 -->
            <x-header :left-options="{showBack: false}" class="v-hd">
                收货地址
                <i class="iconfont v-back" slot="left" @click="status = '1'">&#xe602;</i>
                <span class="f-c1" slot="right" @click="saveAddr">保存</span>
            </x-header>
            <div class="v-bd weui_cells">
                <x-input title="姓名" :value.sync="addrEdit.posting_name" name="username" placeholder="请输入姓名" is-type="china-name" :show-clear="false"></x-input>
                <x-input title="手机号码" :value.sync="addrEdit.mobile_number" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :show-clear="false"></x-input>
                <address title="省市区" :value.sync="addrEdit.pro_city" raw-value :list="addressData" hide-district></address>
                <x-textarea :max="50" :rows="2" name="detail" placeholder="详细地址:无需再写省市区" :show-counter="false" :value.sync="addrEdit.detail_address"></x-textarea>
                <checklist title="" :options="addrEdit.defaList" :value.sync="addrEdit.defaVal" :required="false"></checklist>
            </div>
        </div>
    </div>
</template>
<script>
import {
    XHeader,
    Selector,
    Cell,
    XInput,
    XTextarea,
    Checklist,
    InlineCalendar,
    Address,
    AddressChinaData,
} from 'vux/src/components'

import value2name from 'vux/src/filters/value2name'
import name2value from 'vux/src/filters/name2value'
import productcell from '../components/product-cell'


export default {
    components: {
        XHeader,
        Selector,
        Cell,
        XInput,
        XTextarea,
        Checklist,
        InlineCalendar,
        Address,
        AddressChinaData,
        value2name,
        productcell,
    },
    data() {
        return {
            // 内页切换
            status: '0',
            // 数据
            // sendOptions: ['物流配送', '到店自提', '到店服务', '上门安装'],// 已过时？
            sendOptions: ['物流配送', '到店服务'],
            sendVal: '物流配送',
            // 日期选择
            calendarShow: false,
            startDate: '',
            endDate: '',
            highlightWeekend: true,
            weeksList: ['日', '一', '二', '三', '四', '五', '六 '],

            // 收货人信息
            addrVal: {
                posting_name: '',
                mobile_number: '',
                linkAddress: '',
            },
            linkDate: '',

            // 收货地址列表
            addrList: [],

            // 编辑收货地址
            addressData: AddressChinaData,
            addrEdit: {
                pro_city: ['福建省', '厦门市'],
                defaList: ['默认收件'],
                defaVal: [],
                isSel: false,

                id: '',
                customer_id: '',
                addr_type: '',
                province_city: '',
                detail_address: '',
                zip_code: '',
                posting_name: '',
                mobile_number: '',
                phone_number: '',
                default_status: '',
                exist_status: '',
                add_time: '',
                last_update_time: '',
            },
            isAddrNew: false,

            // 订单中的所含产品
            proscellShop: '',
            proscellList: [],
            proscellNum: '0',
            proscellSum: '0.00',
            freightPrice: '0.00',
            couponName: '无',
            couponPrice: '0.00',
            orderTotal: '0.00',

            // 是否可提交订单
            canBuy: false,
            queryObj: {
                supplier_id: '',
                goods_ids: '',
                cart_id: '',
            }
        }
    },
    ready() {
        const vm = this

        // 初始化获取用户地址列表
        let url = '/api/shopping/goods_order/getAddress.htm'
        vm.$http.get(url).then(res => {
            if (res.ok) {
                vm.addrList = JSON.parse(res.data || '[]')

                // 临时虚拟数据
                // vm.addrList = [{
                //     id: 1,
                //     posting_name: '收货人姓名',
                //     mobile_number: '13599843323',
                //     province_city: '福建省 厦门市',
                //     detail_address: '湖滨一里闽南大厦9楼汇管车公司',
                //     default_status: '默认收件',
                //     isSel: true, // 是否被选中
                // }, {
                //     id: 2,
                //     posting_name: '张三',
                //     mobile_number: '13599843323',
                //     province_city: '福建省 泉州市',
                //     detail_address: '塔头大道旁中国银行对面的快递费的谁看过点击路#403',
                //     default_status: '',
                //     isSel: false,
                // }]
            }
        })

        const pList = JSON.parse(vm.$route.query.prolist)

        // 获取queryObj值
        vm.queryObj.supplier_id = pList[0].hz_goods_mange.supplier_id
        vm.queryObj.goods_ids = reduce2Str(pList, 'goods_id')
        vm.queryObj.cart_id = reduce2Str(pList, 'id')

        // 获取配送方式
        vm.sendOptions = pList[0].hz_goods_mange.ship_method.split(',')
        vm.sendVal = pList[0].trans_type

        // 获取产品数据
        vm.proscellShop = pList[0].hz_goods_mange.supplier_name
        vm.proscellList = pList.map(v => {
            v.img = v.picture_url || 'http://temp.im/80x80'
            v.name = v.hz_goods_mange.goods_name
            v.sku = '' // 暂未找到规格
            v.pri = v.hz_goods_mange.current_price
            v.num = v.amount
            return v
        })
        vm.proscellNum = pList.reduce((a, b) => a + b.amount, 0)
            // 缺省价格运费、优惠。。。
        vm.proscellSum = pList.reduce((a, b) => a + b.amount * b.hz_goods_mange.current_price, 0).toFixed(2)

        // 拼接参数对象
        function reduce2Str(arr, att) {
            return arr.reduce((a, b) => a + (a === '' ? '' : ',') + b[att], '')
        }
    },
    watch: {
        // 监听价格计算->总价
        proscellSum(val) {
            const vm = this
            vm.orderTotal = (+val + +vm.freightPrice - +vm.couponPrice).toFixed(2)
        },
        // 监听时间控制日历显示
        linkDate(val) {
            this.calendarShow = false
        },
        // 监听地址列表选用哪个地址
        addrList(val) {
            if (!!val && Array.isArray(val)) {
                const vm = this
                let addrSeled = val.filter(v => v.isSel)[0] || val.filter(v => v.default_status === '默认收件')[0]
                vm.addrVal = addrSeled ? Object.assign({}, vm.addrVal, addrSeled, {
                    linkAddress: `${addrSeled.province_city} ${addrSeled.detail_address}`,
                }) : {}
            }
        },
        // 监听选用地址
        addrVal(val) {
            const vm = this
            vm.changeBuy()
        },
    },
    methods: {
        // 返回
        goback() {
            history.back()
        },
        // 获取时间 day = 当前增加天数
        getMyDate(day) {
            function formatNum(num) {
                return num > 9 ? num : 0 + '' + num
            }
            const vm = this
            let myDate = new Date(Date.now() + day * 24 * 3600 * 1000)
            let Y = myDate.getFullYear()
            let M = formatNum(myDate.getMonth() + 1)
            let D = formatNum(myDate.getDate())
            let h = formatNum(myDate.getHours())
            let m = formatNum(myDate.getMinutes())
            let s = formatNum(myDate.getSeconds())

            return `${Y}-${M}-${D}`
        },
        // 改变status = 切换页面
        goAddrList() {
            const vm = this
            vm.status = '1'
        },
        // 配送方式变更
        changeWay() {
            const vm = this
            vm.startDate = vm.linkDate = vm.getMyDate(1)
            vm.endDate = vm.getMyDate(100)

            vm.changeBuy()
        },
        // 选择地址
        selAddr(num) {
            const vm = this
            vm.addrList = vm.addrList.map((v, i) => {
                v.isSel = num === i
                return v
            })
        },
        // 新建地址
        addAddr() {
            const vm = this

            // 清空填写栏
            for (var key of Object.keys(vm.addrEdit)) {
                let val = vm.addrEdit[key]
                if (typeof val === 'string') {
                    vm.addrEdit[key] = ''
                }
                vm.addrEdit.defaVal = []
                vm.addrEdit.isSel = false
            }
            vm.status = '2'

            // 获取更大id值以免重复
            vm.addrEdit.id = vm.addrList.length > 0 ? Math.max(...vm.addrList.map(v => v.id)) + 1 : 1
            console.log(vm.addrEdit.id)
            vm.isAddrNew = true
        },
        // 去修改地址
        editAddr(num) {
            const vm = this

            vm.status = '2'
            vm.isAddrNew = false
            let addrObj = vm.addrList[num]
            let pro_city = addrObj.province_city.split(' ')
            let defaVal = addrObj.default_status === '默认收件' ? ['默认收件'] : []

            // 若地址不匹配出错，则强制设置个值 ????无效？
            try {
                pro_city = name2value(pro_city, vm.addressData).split(' ')
                console.log(pro_city)
            } catch (e) {
                console.log('try:' + e)
                pro_city = ["350000", "350200"]
            }
            vm.addrEdit = Object.assign({}, vm.addrEdit, vm.addrList[num], {
                pro_city: pro_city,
                defaVal: defaVal,
            })
        },
        // 保存修改地址
        saveAddr() {
            const vm = this
            let nameLength = vm.addrEdit.posting_name.length
            let mobiLength = vm.addrEdit.mobile_number.length
            if (nameLength > 1 && mobiLength > 10) {
                // 处理默认收件
                if (vm.addrEdit.defaVal[0] === '默认收件') {
                    console.log('设置为你默认收件')
                    vm.addrEdit.default_status = '默认收件'
                    vm.addrList = vm.addrList.map(v => {
                        v.default_status = ''
                        return v
                    })
                }

                // 上传更新到服务器
                let url = '/api/shopping/goods_order/save_addr.htm'
                vm.$http.get(url).then(res => {
                    console.log(res);
                    if (res.ok) {
                        console.log(JSON.parse(res.data).msg)
                        vm.status = '1'
                        vm.addrEdit.province_city = value2name(vm.addrEdit.pro_city, AddressChinaData)
                        if (vm.isAddrNew) { // 新增
                            vm.addrList.push(vm.addrEdit)

                            // 还需处理默认选择问题 && 添加更多属性？？？
                        } else { // 更新
                            vm.addrList = vm.addrList.map(v => {
                                if (v.id === vm.addrEdit.id) {
                                    v = Object.assign({}, vm.addrEdit)
                                }
                                return v
                            })
                        }
                    }
                })

            }
        },
        // 触发是否可购买
        changeBuy() {
            const vm = this
            let oneBool = (vm.sendVal === '物流配送' || vm.sendVal === '上门安装') && !!vm.addrVal.mobile_number
            let twoBool = vm.sendVal === '到店自提' || vm.sendVal === '到店服务'
            vm.canBuy = oneBool || twoBool
        },
        // 生成订单->支付
        toPay() {
            const vm = this
            const url = '/api/shopping/goods_order/to_place_order.htm'
            const query = vm.queryObj
            console.dir(query)
            vm.$http.get(url, query).then(res => {
                if (res.ok) {
                    vm.$router.go('/payment')
                }
            })
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

@mixin borderBottom {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #cecece;
    transform: scaleY(.5);
}

@mixin borderLeft {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-left: 1px solid #cecece;
    transform: scaleX(.5);
}

.v-order {
    box-sizing: border-box;
    overflow-x: hidden;
    background: #efefef;
    padding: 44px 0;
}

.v-alist {
    padding-top: 44px;
}

.v-aedit {
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

.v-bd-1 {}

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
        &.z-dis {
            background: #999;
            color: #fff;
        }
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
    position: relative;
    background: #fff;
    &:after {
        @include borderBottom;
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
    &:after {
        @include borderBottom;
    }
    &:last-child::after {
        border-width: 0;
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
            outline: none;
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

// 1-收货地址
.v-addrbd {
    position: relative;
    display: flex;
    padding: 0 0 5px 15px;
    background: #fff;
    &:before {
        @include borderBottom;
    }
    .stat {
        padding: 15px 10px 0 0;
        font-size: 20px;
        color: #f00;
    }
    .cont {
        // flex: 1;
        .hd {
            display: flex;
            line-height: 20px;
            padding: 5px 0;
            .name {
                flex: 1;
            }
            .tel {
                text-align: right;
            }
        }
        .bd {
            line-height: 18px;
            font-size: 14px;
            color: #666;
            .defa {
                display: inline-block;
                line-height: 14px;
                margin-right: 5px;
                padding: 1px 5px;
                background: #f00;
                color: #fff;
            }
        }
    }
    .edit {
        flex: 1;
        position: relative;
        margin-top: 15px;
        margin-left: 15px;
        padding: 0 15px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: #fff;
        color: #666;
        &:before {
            @include borderLeft;
        }
        i {
            font-size: 18px;
        }
    }
}

.f-tac {
    text-align: center;
}

.f-c1 {
    color: #fff;
}

.f-c2 {
    color: #f00;
}
</style>
