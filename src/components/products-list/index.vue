<template>
    <div class="v-pbd">
        <div class="v-pro" v-for="items of proslist">
            <div class="lbox">
                <img :src="items.image" :alt="items.name" class="img">
            </div>
            <div class="rbox">
                <div class="name">{{items.name}}</div>
                <div class="price">￥{{items.price}}</div>
                <div class="num">月销量{{items.sales}}件</div>
                <div class="cart" @click="cart-click"><i class="iconfont">&#xe601;</i></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        proslist: {
            type: Array,
            default: []
        },
    },
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/iconfont.scss';
// 产品列表
.v-pro {
    box-sizing: border-box;
    border-bottom: 5px solid #efefef;
    padding: 10px;
    .lbox {
        float: left;
        width: 100px;
        .img {
            width: 100%;
        }
    }
    .rbox {
        position: relative;
        height: 100px;
        margin-left: 110px;
        .name {
            height: 48px;
            line-height: 24px;
            overflow: hidden;
        }
        .price {
            line-height: 32px;
            font-size: 18px;
            color: #f00;
        }
        .num {
            line-height: 20px;
            font-size: 14px;
            color: #999;
        }
        .cart {
            position: absolute;
            bottom: 0;
            right: 10px;
            i {
                font-size: 20px;
            }
        }
    }
}
</style>
