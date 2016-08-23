<template>
    <div class="v-product">
        <!-- 头部 -->
        <x-header :left-options="{showBack: false}" class="v-catHd">
            卡车商城
            <i class="iconfont v-back" slot="left">&#xe602;</i>
            <i class="iconfont v-cart" slot="right">&#xe601;</i>
        </x-header>

        <!-- 主内容 -->
        <div class="v-detail">
            <div class="v-detailhd">
                <!-- 轮播图 -->
                <swiper :list="productData.img_list" class="v-swiper"></swiper>
                <!-- 信息 -->
                <div class="v-prodtl">
                    <div class="name">{{productData.name}}</div>
                    <div class="share">
                        <i class="iconfont">&#xe604;</i>
                        <div class="c">分享</div>
                    </div>
                    <div class="price">
                        <div class="pri1">￥{{productData.price}}</div>
                        <del class="pri2" v-if="productData.price < productData.price_origin">￥{{productData.price_origin}}</del>
                    </div>
                    <div class="info">
                        <div class="l">运费: {{productData.freightage}}</div>
                        <div class="m">月销量: {{productData.sales}}</div>
                        <div class="r">{{productData.address}}</div>
                    </div>
                </div>
            </div>

            <div class="v-detailbd">
                <cell link="javascript;">
                    <span slot="after-title">领取优惠券</span>
                </cell>
            </div>
        </div>
    </div>
</template>

<script>
import {
    XHeader,
    Swiper,
    Cell,
} from 'vux/src/components';


export default {
    components: {
        XHeader,
        Swiper,
        Cell,
    },
    data() {
        return {
            // 头部
            shop: '',
            pro: '',
            productData: {
                shop: '',
                id: '',
                name: '',
                img_list: [],
                price: '',
                price_origin: '',
                sales: '',
                freightage: '',
                detail: '',
            }
        }
    },
    ready() {
        let shop = this.$route.query.shop || 0
        let pro = this.$route.query.pro || 0
        let url = `/app/shopping/product-detail.htm?shop=${shop}&pro=${pro}`
        this.$http.get(url).then(res => {
            if (res.ok) {
                this.productData = Object.assign({}, JSON.parse(res.data).rows)
            }
        })
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
@import '../assets/styles/iconfont.scss';
.v-product {
    background: #efefef;
    padding: 44px 0;
}

.v-catHd {
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
    background: #fff;
}

.v-prodtl {
    margin-bottom: 10px;
    padding: 10px 15px;
    position: relative;
    box-sizing: border-box;
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

.v-detailbd {
    background: #fff;
}
</style>
