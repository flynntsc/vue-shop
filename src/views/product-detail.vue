<template>
    <div class="v-product">
        <!-- 头部 -->
        <x-header :left-options="{showBack: false}" class="v-hd">
            卡车商城
            <i class="iconfont v-back" slot="left" @click="goback">&#xe602;</i>
            <i class="iconfont v-cart" slot="right" v-link="{path:'cart'}">&#xe601;</i>
        </x-header>
        <!-- 主内容 -->
        <div class="v-detail">
            <div class="v-detailhd">
                <!-- 轮播图 -->
                <swiper :list="productData.hz_goods_picture" class="v-swiper"></swiper>
                <!-- 信息 -->
                <div class="v-prodtl">
                    <div class="name">{{productData.goods.goods_name}}</div>
                    <div class="share">
                        <i class="iconfont">&#xe604;</i>
                        <div class="c">分享</div>
                    </div>
                    <div class="price">
                        <div class="pri1">￥{{productData.goods.price_new || productData.goods.current_price}}</div>
                        <del class="pri2" v-if="productData.goods.price_new < productData.goods.current_price">￥{{productData.goods.current_price}}</del>
                    </div>
                    <div class="info">
                        <div class="l">运费: {{productData.freightage || 0}}</div>
                        <div class="m">月销量: {{productData.total_sales || 0}}</div>
                        <div class="r">{{productData.address}}</div>
                    </div>
                </div>
                <!-- 属性 -->
                <div class="v-prosku" @click="seeSkus" v-if="hasSku">
                    <div class="hd">已选</div>
                    <div class="bd">{{skuText}}</div>
                    <div class="ft">...</div>
                </div>
            </div>
            <div class="v-detailbd">
                <!-- <div class="v-favorable">
                    <cell link="javascript;">
                        <span slot="after-title">领取优惠券</span>
                    </cell>
                    <cell link="javascript;">
                        <span slot="after-title">领取积分</span>
                    </cell>
                </div> -->
                <div class="v-myshop">
                    <div class="hd">{{productData.goods.supplier}}</div>
                    <div class="bd">
                        <div class="mark z-act" v-show="shop_collect" @click="markShop(0)"><i class="iconfont">&#xe607;</i> 您已收藏</div>
                        <div class="mark" @click="markShop(1)" v-else><i class="iconfont">&#xe608;</i> 收藏店铺</div>
                        <div class="link" v-link="{path:'shop',query:{shop:productData.goods.supplier_id}}">进入店铺</div>
                    </div>
                </div>
            </div>
            <!-- tab -->
            <div class="v-tabs">
                <tab>
                    <tab-item :selected="tabSel === 0" @click="tabSel = 0">商品详情</tab-item>
                    <tab-item :selected="tabSel === 1" @click="tabArgs">产品参数</tab-item>
                    <!-- <tab-item :selected="tabSel === 2" @click="tabAssess">评价</tab-item> -->
                </tab>
                <div class="v-tabcon">
                    <div class="v-content" v-show="tabSel === 0">1</div>
                    <div class="v-content" v-show="tabSel === 1">
                        <table class="v-atable">
                            <tbody>
                                <tr v-for="items of tabArgsCon">
                                    <td>{{items.name}}</td>
                                    <td>{{items.value}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- loading -->
                        <div class="f-tac">
                            <spinner :type="ios" slot="value" v-show="disTab1"></spinner>
                        </div>
                    </div>
                    <!-- <div class="v-content" v-show="tabSel === 2">{{tabAssessCon}}
                    <div class="f-tac">
                        <spinner :type="ios" slot="value" v-show="disTab2"></spinner>
                    </div>
                </div> -->
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div class="v-ft">
            <!-- <div class="contact">
                <i class="iconfont">&#xe605;</i>
            </div> -->
            <div class="markpro">
                <i class="iconfont z-act" v-show="pros_collect" @click="markpro(0)">&#xe609;</i>
                <i class="iconfont" @click="markpro(1)" v-else>&#xe606;</i>
            </div>
            <div class="cart" @click="add2Cart">加入购物车</div>
            <div class="buy">立即购买</div>
        </div>
        <!-- 属性弹框 -->
        <!-- Actionsheet2 -->
        <actionsheet2 :show.sync="isSku" :class="isSku ? '' : 'v-hideDiv'">
            <!-- 产品简要信息 -->
            <div class="v-skuPros">
                <div class="ld">
                    <img src="http://temp.im/80x80" alt="">
                </div>
                <div class="md">
                    <div class="pri">￥{{productData.goods.current_price}}</div>
                    <div class="no">商品编号：{{productData.goods.goods_no}}</div>
                </div>
                <div class="rd" @click="offSku">&times;</div>
            </div>
            <!-- 所有属性 -->
            <div class="v-skuList">
                <div class="hd">{{skuTitle}}</div>
                <div class="bd">
                    <button class="weui_btn weui_btn_mini weui_btn_default weui_btn_plain_default" :class="skuSel == $index ? 'z-crt': ''" v-for="items of productData.hz_goods_skuList" @click="selSku($index)">{{items.property_value_a}}</button>
                </div>
                <div class="hd">服务</div>
                <div class="bd">
                    <button class="weui_btn weui_btn_mini weui_btn_default weui_btn_plain_default" :class="serSel == $index ? 'z-crt': ''" v-for="items of serList" @click="selSer($index)">{{items.text}}</button>
                </div>
                <div class="hd">配送</div>
                <div class="bd">
                    <button class="weui_btn weui_btn_mini weui_btn_default weui_btn_plain_default" :class="shipSel == $index ? 'z-crt': ''" v-for="items of shipList" @click="selShip($index)">{{items}}</button>
                </div>
                <div class="hd">数量（库存：{{amountMax}}）</div>
                <div class="bd" style="overflow:hidden;">
                    <number2 :value.sync="amount" :max="amountMax" :width="80" @on-change="numChange"></number2>
                </div>
            </div>
            <!-- 属性栏的小菜单 -->
            <div class="v-skuFt">
                <div class="btn" @click="add2Cart">加入购物车</div>
            </div>
        </actionsheet2>
        <!-- 弹框提示 -->
        <toast :show.sync="toastShow" :time="toastTime">{{toastText}}</toast>
    </div>
</template>
<script>
import {
    XHeader,
    Swiper,
    Cell,
    Tab,
    TabItem,
    Spinner,
    Toast,
} from 'vux/src/components'

import Actionsheet2 from '../components/actionsheet2/index.vue'
import Number2 from '../components/x-number2/index.vue'

export default {
    components: {
        XHeader,
        Swiper,
        Cell,
        Tab,
        TabItem,
        Spinner,
        Actionsheet2,
        Number2,
        Toast,
    },
    data() {
        return {
            goods_id: '',
            // 属性显示/隐藏
            hasSku: false,
            skuText: '',
            isSku: false,
            skuSel: 0,
            skuTxt: '',
            skuTitle: '',
            serSel: 0,
            serList: [{
                'text': '无需服务'
            }],
            shipList: [],
            shipSel: 0,
            shipTxt: '',
            amount: 1, // 数量
            amountMax: 99, // 库存
            productData: {
                shop: '',
                id: '',
                goods: {
                    current_price: '0',
                    price_new: '0',
                },
                hz_goods_detail: [],
                hz_goods_picture: [],
                hz_goods_skuList: [],
                price: '',
                price_origin: '',
                total_sales: '',
                freightage: '',
                detail: '',
                // 收藏后获得的id
                collect_id: '',
            },
            shop_collect: false,
            pros_collect: false,
            // tab栏
            tabSel: 0,
            tabArgsCon: [],
            tabAssessCon: '',
            disTab1: true,
            disTab2: true,

            // 弹框提示
            toastShow: false,
            toastTime: 1500,
            toastText: '加入购物车成功',
        }
    },
    ready() {
        const vm = this
        vm.goods_id = vm.$route.query.pro || 0
        let url = `/api/shopping/goods_details.htm?goods_id=${vm.goods_id}`
        vm.$http.get(url).then(res => {
            if (res.ok) {
                vm.productData = Object.assign({}, JSON.parse(res.data))
                vm.shipList = vm.productData.goods.ship_method.split(',')
                vm.amountMax = +vm.productData.goods.inventory
                console.dir(vm.shipList)

                // 判断规格 & 服务
                const checkSku = vm.productData.hz_goods_skuList && vm.productData.hz_goods_skuList.length > 0
                const checkSer = !!vm.productData.goods_server
                vm.hasSku = checkSku || checkSer

                // 初始化属性选择
                vm.buildSku()
                if (vm.hasSku) {}

                // 是否有规格属性
                if (checkSku) {
                    vm.skuTitle = vm.productData.hz_goods_skuList[vm.skuSel].property_id_a
                }
                // 服务内容
                if (checkSer) {
                    let ser = vm.productData.goods_server
                    ser.text = `${ser.service_name}+${ser.service_charge}元`
                    vm.serList.push(ser)
                }

                // 手动转换数组属性
                vm.productData.hz_goods_picture.img = vm.productData.hz_goods_picture
                vm.productData.hz_goods_picture = this.productData.hz_goods_picture.map(v => {
                    v.img = v.picture_url
                    return v
                })
            }
        })
    },
    watch: {
        skuSel(val) {
            const vm = this
            vm.buildSku()
        },
        serSel(val) {
            const vm = this
            vm.buildSku()
        },
        shipSel(val) {
            const vm = this
            vm.buildSku()
        },
    },
    methods: {
        // 返回
        goback() {
            history.back()
        },
        markFn(id, type) {

        },
        // 显示属性弹框
        seeSkus() {
            const vm = this
            vm.isSku = true
        },
        // 关闭属性弹框
        offSku() {
            const vm = this
            vm.isSku = false
        },
        // 已选属性拼接
        buildSku() {
            const vm = this
            vm.skuTxt = vm.productData.hz_goods_skuList[vm.skuSel] ? vm.productData.hz_goods_skuList[vm.skuSel].property_value_a : ''
            vm.serTxt = vm.serList[vm.serSel].text
            vm.shipTxt = vm.shipList[vm.shipSel]
            vm.skuText = `${vm.skuTxt} ${vm.serTxt} ${vm.shipTxt} x ${vm.amount}`
        },
        // 点击选择属性
        selSku(num) {
            const vm = this
            vm.skuSel = num
        },
        // 选择服务
        selSer(num) {
            const vm = this
            vm.serSel = num
        },
        // 选择配送
        selShip(num) {
            const vm = this
            vm.shipSel = num
        },
        // 数量变更
        numChange() {
            const vm = this
            vm.buildSku()
        },
        // 收/去藏店铺
        markShop(bool) {
            const vm = this
            let id = vm.productData.goods.supplier_id
            let url = bool ? `/api/shopping/favorite_save.htm?goods_id=${id}&type=shop` : `/api/shopping/favorite_remove.htm?id=${id}`
            vm.shop_collect = !!bool
            vm.$http.get(url).then(res => {
                if (res.ok) {
                    console.log(res)
                }
            })

        },
        // 收/去藏产品
        markpro(bool) {
            const vm = this
            let url = bool ? `/api/shopping/favorite_save.htm?goods_id=${vm.goods_id}&type=goods` : `/api/shopping/favorite_remove.htm?id=${vm.goods_id}`
            vm.pros_collect = !!bool
            vm.$http.get(url).then(res => {
                if (res.ok) {
                    vm.productData.collect_id = JSON.parse(res.data).collect_id

                    // 先解决未登陆问题
                    console.log(JSON.parse(res.data))
                }
            })
        },
        tabArgs() {
            const vm = this
            vm.tabSel = 1
            vm.tabArgsCon = vm.productData.hz_goods_detail
            vm.disTab1 = 0

        },
        tabAssess() {
            const vm = this
            vm.tabSel = 2
            vm.disTab2 = 0
            vm.tabAssessCon = '暂无评价'
        },
        add2Cart() {
            const vm = this
            let amount = vm.amount
            let sku_id = vm.productData.hz_goods_skuList[vm.skuSel].id
            let goods_id = vm.goods_id
            let is_server = !!vm.serSel
            let trans_type = vm.shipTxt || '物流配送'
            let trans_value = '' || '福建省/厦门市'
            let visit_charge = '' || 0
                // 参数还未补全，请看接口？？？
            let query = {
                amount,
                sku_id,
                goods_id,
                is_server,
                trans_type,
                trans_value,
                visit_charge,
            }
            console.log(query)
            let url = `/api/shopping/shop_cart/add_shop_cart.htm`
            vm.isSku = false
            vm.toastShow = true

            vm.$http.get(url, query).then(res => {
                console.log(res)

                // 返回购物车数量
            })
        },
    },
}
</script>
<style lang="scss" scoped>
@import '../assets/styles/iconfont.scss';
.v-product {
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

.v-cart {
    font-size: 20px;
    color: #fff;
}

// 主体
.v-detail {}

.v-detailhd {
    // background: #fff;
}

.v-prodtl {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 10px 15px;
    // border-bottom: 10px solid #efefef;
    background: #fff;
    .name {
        height: 44px;
        line-height: 22px;
        padding-right: 44px;
        overflow: hidden;
        font-size: 18px;
    }
    .share {
        position: absolute;
        right: 10px;
        top: 5px;
        width: 44px;
        height: 44px;
        text-align: center;
        color: #666;
        i {
            line-height: 30px;
            font-size: 24px;
        }
        .c {
            line-height: 14px;
            font-size: 14px;
        }
        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            transform: scaleX(.5);
            border-left: 1px solid #ececec;
        }
    }
    .price {
        line-height: 40px;
        .pri1 {
            display: inline-block;
            font-size: 20px;
            color: #f00;
        }
        .pri2 {
            font-size: 14px;
            color: #999;
        }
    }
    .info {
        display: flex;
        line-height: 20px;
        font-size: 14px;
        color: #666;
        .l {}
        .m {
            text-align: center;
            flex: 1;
        }
        .r {
            text-align: right;
        }
    }
}

.v-imgbd {}

.v-prosku {
    display: flex;
    box-sizing: border-box;
    padding: 10px 0;
    margin-bottom: 10px;
    line-height: 20px;
    font-size: 14px;
    background: #fff;
    .hd {
        padding-left: 15px;
        padding-right: 10px;
        color: #999;
    }
    .bd {
        flex: 1;
    }
    .ft {
        padding: 0 15px 0 5px;
        font-size: 16px;
    }
}

.v-hideDiv {
    position: relative;
    z-index: -1;
}

// 属性栏中的产品
.v-skuPros {
    position: relative;
    margin: 0 15px 10px 15px;
    font-size: 14px;
    .ld {
        position: absolute;
        top: -20px;
        left: 0;
        background: #fff;
        img {
            width: 80px;
            height: 80px;
        }
    }
    .md {
        box-sizing: border-box;
        height: 60px;
        margin-left: 100px;
        padding-top: 20px;
        line-height: 20px;
        .pri {
            font-size: 16px;
            color: #f00;
        }
        .no {
            color: #999;
        }
    }
    .rd {
        position: absolute;
        top: 0;
        right: 0;
        line-height: 36px;
        font-size: 20px;
        color: #999;
    }
}

// 属性栏
.v-skuList {
    position: relative;
    padding: 0 15px 15px;
    font-size: 14px;
    color: #666;
    &:before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid #ececec;
        transform: scaleY(.5)
    }
    &:after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid #ececec;
        transform: scaleY(.5)
    }
    .hd {
        line-height: 36px;
    }
    .bd {
        line-height: 1;
        .weui_btn {
            margin-bottom: 10px;
            &.z-crt {
                border-color: #c50a1d;
                color: #c50a1d;
            }
            &+.weui_btn {
                margin-top: 0;
                margin-left: 10px;
            }
        }
    }
}

// 属性栏小菜单
.v-skuFt {
    display: flex;
    .btn {
        height: 44px;
        line-height: 44px;
        flex: 1;
        text-align: center;
        background: #ff9703;
        color: #fff;
    }
}

.v-detailbd {}

// 优惠相关
.v-favorable {
    margin-bottom: 10px;
    background: #fff;
}

// 店铺
.v-myshop {
    margin-bottom: 10px;
    padding: 10px 15px;
    background: #fff;
    .hd {
        margin-bottom: 10px;
        color: #2e77e3;
    }
    .bd {
        position: relative;
        text-align: center;
        &:after {
            content: " ";
            display: inline-block;
            transform: rotate(45deg);
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #c8c8cd;
            border-style: solid;
            position: absolute;
            top: -1px;
            right: 0;
            margin-left: .3em;
        }
        .mark {
            display: inline-block;
            margin-right: 20px;
            line-height: 24px;
            padding: 0 20px;
            border-radius: 5px;
            font-size: 14px;
            color: #333;
            background: #f1f1f1;
            &.z-act {
                i {
                    color: #f00;
                }
            }
        }
        .link {
            display: inline-block;
            line-height: 24px;
            padding: 0 20px;
            border-radius: 5px;
            font-size: 14px;
            color: #fff;
            background: #fe4b47;
        }
    }
}

// tab
.v-tabcon {
    background: #fff;
    margin-bottom: 10px;
}

// 参数表格
.v-atable {
    width: 100%;
    text-align: left;
    font-size: 14px;
    td {
        padding: 5px;
        background: #efefef;
        &:first-child {
            width: 30%;
            text-align: right;
        }
    }
}

.f-tac {
    text-align: center;
}

// 底部菜单
.v-ft {
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    text-align: center;
    color: #fff;
    background: rgba(255, 255, 255, .9);
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid #ececec;
        transform: scaleY(.5);
    }
    .contact {
        position: relative;
        width: 64px;
        height: 44px;
        &:before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            border-right: 1px solid #ececec;
            transform: scaleX(.5);
        }
        i {
            line-height: 44px;
            font-size: 26px;
            color: #2e77e3;
        }
    }
    .markpro {
        width: 64px;
        height: 44px;
        color: #666;
        i {
            line-height: 44px;
            font-size: 22px;
            &.z-act {
                color: #f00;
            }
        }
    }
    .cart {
        flex: 1;
        background: #ff9703;
    }
    .buy {
        flex: 1;
        background: #c50a1d;
    }
}
</style>
