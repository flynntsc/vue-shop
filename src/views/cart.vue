<template>
    <div class="v-cart">
        <!-- 头部 -->
        <x-header :left-options="{showBack: false}" class="v-hd">
            购物车
            <i class="iconfont v-back" slot="left" @click="goback">&#xe602;</i>
        </x-header>
        <div class="v-wrap">
            <div class="v-cell" v-for="items of cartArrs" :class="{'v-cell-1' : $index === 0 || items.hz_goods_mange.supplier_id !== cartArrs[$index - 1].hz_goods_mange.supplier_id}">
                <div class="v-cellhd" v-if="$index === 0 || items.hz_goods_mange.supplier_id !== cartArrs[$index - 1].hz_goods_mange.supplier_id">
                    <label>
                        <input type="radio" name="shop" id="" :value="items.hz_goods_mange.supplier_id" @click="radioFn($index)" v-model="items.selected"> {{items.hz_goods_mange.supplier_name}}
                    </label>
                </div>
                <div class="v-cellbd">
                    <div class="sel">
                        <label>
                            <input type="checkbox" name="" id="" v-model="items.checked" @click="checkboxFn($index,items.checked)">
                        </label>
                    </div>
                    <div class="pro">
                        <img :src="items.picture_url" alt="">
                    </div>
                    <div class="box">
                        <div class="name" v-link="{path:'product-detail',query:{pro:items.goods_id}}">{{items.hz_goods_mange.goods_name}}</div>
                        <div class="price">￥{{items.hz_goods_mange.price_new || items.hz_goods_mange.current_price}}</div>
                        <div class="nums">
                            <number2 :value.sync="items.amount" @on-change="numChange"></number2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部菜单 -->
        <div class="v-ft">
            <!-- <div class="sel">
                <label>
                    <input type="checkbox" name="" id="" v-model="allSel"> 全选
                </label>
            </div> -->
            <div class="total">合计：￥<span class="pri">{{cartTotal}}</span></div>
            <div class="buy" v-show="cartTotal > 0" @click="goBuy">立即购买</div>
            <div class="empty" v-else>请先选择</div>
        </div>
        <toast :show.sync="checkMsg" type="warn" :time="1.5" width="12em">只能选择同个店铺商品</toast>
    </div>
</template>
<script>
import {
    XHeader,
    Toast,
} from 'vux/src/components'

import Number2 from '../components/x-number2/index.vue'

export default {
    components: {
        XHeader,
        Number2,
        Toast,
    },
    data() {
        return {
            // ajax获取数据
            cartData: {
                cartList: [{
                    'id': '1222',
                    'goods_id': 138,
                    'picture_url': 'http://temp.im/100x100',
                    'amount': 1,
                    'hz_goods_mange': {
                        'supplier_id': 101,
                        'supplier_name': '车队汇',
                        'goods_name': '轮胎0001',
                        'current_price': '100',
                        'price_new': '10',
                    }
                }, {
                    'id': '1222',
                    'goods_id': 313,
                    'picture_url': 'http://temp.im/100x100',
                    'amount': 2,
                    'hz_goods_mange': {
                        'supplier_id': 102,
                        'supplier_name': '车队汇222',
                        'goods_name': '壳牌机油1000',
                        'current_price': '1000',
                        'price_new': '500',
                    }
                }, {
                    'id': '1222',
                    'goods_id': 139,
                    'picture_url': 'http://temp.im/100x100',
                    'amount': 3,
                    'hz_goods_mange': {
                        'supplier_id': 101,
                        'supplier_name': '车队汇',
                        'goods_name': '轮胎0002',
                        'current_price': '200',
                        'price_new': '100',
                    }
                }],
            },
            // 获取后转换处理
            cartArrs: [],
            // 选中的店铺id
            cartShop: '',
            cartNums: '',
            cartTotal: 0.00,

            // 弹窗
            checkMsg: false,
        }
    },
    ready() {
        let url = `/api/shopping/shop_cart/show_shop_cart.htm`
        this.$http.get(url).then(res => {
            let data = JSON.parse(res.data)

            // 遍历添加的属性
            let objSel = {
                selected: '',
                checked: false,
            }
            this.cartData = Object.assign({}, this.cartData, data)
            this.cartArrs = this.cartData.cartList.sort((a, b) => a.hz_goods_mange.supplier_id - b.hz_goods_mange.supplier_id).map(v => Object.assign({}, v, objSel))
        })
    },
    watch: {
        // 监听选中的店铺->更改数组
        cartShop(id) {
            // this.cartArrs = this.cartArrs.map(v => {
            //     v.checked = v.hz_goods_mange.supplier_id === id
            //     return v
            // })

            this.cartArrs = this.cartArrs.map(v => {
                v.selected = id
                if (v.hz_goods_mange.supplier_id !== id) {
                    v.checked = false
                }
                return v
            })
        },
        // 监听选中的产品总数->影响总价
        cartNums(n, m) {
            this.cartTotal = this.cartArrs.filter(v => v.checked === true).reduce((a, b) => a + b.amount * (b.hz_goods_mange.price_new || b.hz_goods_mange.current_price), 0)
        },
    },
    methods: {
        // 返回
        goback() {
            history.back()
        },
        // 点击店铺单选按钮
        radioFn(i) {
            this.cartShop = this.cartArrs[i].hz_goods_mange.supplier_id
            this.cartNums = this.cartArrs.map(v => {
                v.checked = v.hz_goods_mange.supplier_id === this.cartShop
                return v
            }).filter(v => v.checked === true).reduce((a, b) => a + b.amount, 0)
        },
        // 如何更改多选框
        checkboxFn(i, bool) {
            let shopId = this.cartArrs[i].hz_goods_mange.supplier_id
            if (shopId !== this.cartShop) {
                this.cartShop = shopId
            }
            // 点击后的值=取反
            this.cartArrs[i].checked = !bool
            console.log(this.cartArrs[i].checked)
            this.cartNums = this.cartArrs.filter(v => {
                    return v.checked === true
                }).reduce((a, b) => a + b.amount, 0)
                // 数量相同时不变？？？
        },
        // 更改数量 -> 选中数量
        numChange(i) {
            this.cartNums = this.cartArrs.filter(v => v.checked === true).reduce((a, b) => a + b.amount, 0)
        },
        goBuy() {

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
    .empty {
        flex: 1;
        padding: 0 15px;
        background: rgba(225, 225, 225, .8);
        color: #fff;
    }
}

// 购物车
.v-cell {
    background: #fff;
    &.v-cell-1 {
        margin-top: 10px;
    }
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
