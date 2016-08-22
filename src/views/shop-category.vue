<template>
    <!-- 头部 -->
    <x-header :left-options="{showBack: true,backText:' '}" class="v-ghd">店铺分类</x-header>
    <div class="v-catlist">
        <!-- 全部商品 -->
        <div class="v-cat">
            <div class="weui_cells vux-no-group-title">
                <div class="weui_cell">
                    <div class="weui_cell_hd"> </div>
                    <div class="weui_cell_bd weui_cell_primary" v-link="{path:'category-products',query:{shop:this.shop}}">
                        <p>全部商品</p>
                    </div>
                    <div class="weui_cell_ft with_arrow"></div>
                </div>
            </div>
        </div>
        <div class="v-cat" v-for="items of categoryList">
            <div class="weui_cells vux-no-group-title">
                <div class="weui_cell">
                    <div class="weui_cell_hd"> </div>
                    <div class="weui_cell_bd weui_cell_primary" v-link="{path:'category-products',query:{shop:this.shop,cat:items.id}}">
                        <p>{{items.name}}</p>
                    </div>
                    <div class="weui_cell_ft with_arrow"></div>
                </div>
                <div class="v-catbd">
                    <div class="li" v-for="items of items.rows" v-link="{path:'product-detail',query:{shop:this.shop,pro:items.id}}">{{items.name}}</div>
                </div>
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
            shop: '',
            categoryList: [],
        }
    },
    ready() {
        this.shop = this.$route.query.shop || 0
        let url = `/app/shopping/shop-categorys.htm?shop=${this.shop}`
        this.$http.get(url).then(res => {
            if (res.ok) {
                this.categoryList = JSON.parse(res.data).rows
            }
        })
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
@import '../assets/styles/iconfont.scss';
.v-ghd {
    background-color: #c50a1d;
}

// 一级
.v-catbd {
    position: relative;
    overflow: hidden;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        transform: scaleY(.5);
        border-top: 1px solid #ececec;
    }
    .li {
        position: relative;
        float: left;
        width: 50%;
        box-sizing: border-box;
        padding: 10px 15px;
        text-indent: 15px;
        &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            transform: scaleY(.5);
            border-bottom: 1px solid #ececec;
        }
        &:nth-child(2n-1):after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            transform: scaleX(.5);
            border-right: 1px solid #ececec;
        }
    }
}
</style>
