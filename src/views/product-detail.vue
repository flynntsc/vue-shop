<template>
    <!-- 头部 -->
    <x-header :left-options="{showBack: false}" class="v-catHd">
        {{categoryName}}
        <i class="iconfont" slot="left">&#xe602;</i>
        <span slot="right" @click="filterClick">筛选</span>
    </x-header>

    <!-- 商品 -->
    <div class="v-prolist">
        <tab>
            <tab-item :selected="this.tabProsNum === 0" @click="tabProsFn(0)">销售量</tab-item>
            <tab-item :selected="this.tabProsNum === 1" @click="tabProsFn(1)">新品</tab-item>
            <tab-item :selected="this.tabProsNum === 2" @click="tabProsFn(2)">价格</tab-item>
        </tab>
        <products-list :proslist="prosList"></products-list>
    </div>

    <!-- Actionsheet2 -->
    <actionsheet2 :show.sync="isShow">
        <div class="vux-popup-picker-header" style="background:#efefef;">
            <div class="vux-flexbox vux-flex-row">
                <div class="vux-flexbox-item" style="text-align: left; padding-left: 15px; line-height: 44px; margin-left: 8px;" @click="resetClick">重置</div>
                <div class="vux-flexbox-item" style="text-align: right; padding-right: 15px; line-height: 44px; margin-left: 8px;" @click="canelClick">取消</div>
            </div>
        </div>

        <selector title="品牌" :options="brandData" :value.sync="brandVal"></selector>
        <selector title="胎面宽度" :options="widthData" :value.sync="widthVal"></selector>
        <selector title="服务内容" :options="serverData" :value.sync="serverVal"></selector>

        <div class="weui_cell v-pricell">
            <div class="weui_cell_bd cellbd">
                <p>价格区间</p>
            </div>
            <div class="weui_cell_ft cellft">
                <div class="weui_cell_bd cellftbd cellftbd1">
                    <input class="weui_input" type="tel" v-model="priceVal1" placeholder="最低价格">
                </div>
                <div class="weui_cell_bd cellftbd2"> - </div>
                <div class="weui_cell_bd cellftbd">
                    <input class="weui_input" type="tel" v-model="priceVal2" placeholder="最高价格">
                </div>
            </div>
        </div>

        <div class="vux-actionsheet-gap"></div>
        <div class="weui_actionsheet_cell" @click="filterBtn">确认</div>
    </actionsheet2>
</template>

<script>
import {
    XHeader,
    Tab,
    TabItem,
    Selector,
} from 'vux/src/components';
import ProductsList from '../components/products-list/index.vue'
import Actionsheet2 from '../components/actionsheet2/index.vue'


export default {
    components: {
        XHeader,
        Tab,
        TabItem,
        ProductsList,
        Actionsheet2,
        Selector,
    },
    data() {
        return {
            // 头部
            categoryName: '分类列表',
            categoryId: 0,
            // tab菜单-商品
            tabProsNum: 0,
            tabPrice: 0,
            // 数据结果
            prosList: [],
            // 上拉框
            isShow: false,
            brandData: ['全部', '米其林'],
            brandVal: '全部',
            widthData: ['全部', '米其林'],
            widthVal: '全部',
            serverData: ['全部', '米其林'],
            serverVal: '全部',
            priceVal1: '',
            priceVal2: '',
        }
    },
    ready() {
        this.categoryId = this.$route.query.id || 0
        this.$http.get(`/app/shopping/productSearch.htm?id=${this.categoryId}&sort=${this.tabProsNum}`).then(res => {
            if (res.ok) {
                let data = JSON.parse(res.data)
                this.prosList = data.rows
                this.categoryName = data.category_name || this.categoryName
            }
        })
    },
    methods: {
        // tab切换显示-商品
        tabProsFn(n) {
            let num = n || 0,
                arg = '',
                url = ''
            if (num === 2) {
                // 选择价格再次点击价格
                if (this.tabProsNum === 2) {
                    this.tabPrice = ~~!this.tabPrice
                }
                arg = `&order=${this.tabPrice}`
            }
            this.tabProsNum = num
            url = `/app/shopping/productSearch.htm?id=${this.categoryId}&sort=${num + arg}`
            this.$http.get(url).then(res => {
                if (res.ok) {
                    this.prosList = JSON.parse(res.data).rows
                }
            })
        },
        filterClick() {
            this.isShow = true
        },
        resetClick() {
            this.brandVal = this.widthVal = this.serverVal = '全部'
            this.priceVal1 = this.priceVal2 = ''
        },
        canelClick() {
            this.isShow = false
        },
        filterBtn() {
            let brandVal = this.brandVal === '全部' ? '' : this.brandVal
            let widthVal = this.widthVal === '全部' ? '' : this.widthVal
            let serverVal = this.serverVal === '全部' ? '' : this.serverVal

            // 针对价格情况
            let queryOrder = this.tabProsNum === 2 ? `&order=${this.tabPrice}` : ''

            this.$http.get(`/app/shopping/productSearch.htm?id=${this.categoryId}&sort=${this.tabProsNum}&brand=${brandVal}&width=${widthVal}&server=${serverVal}&price1=${this.priceVal1}&price2=${this.priceVal2}${queryOrder}`).then(res => {
                if (res.ok) {
                    let data = JSON.parse(res.data)
                    this.prosList = data.rows
                    this.isShow = false
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/styles/iconfont.scss';
.v-catHd {
    background: #c50a1d;
}

.v-cellbd {
    flex: 3;
}

// 价格区间
.v-pricell {
    .cellbd {
        white-space: nowrap;
    }
    .cellft {
        display: flex;
        .cellftbd {
            flex: 3;
        }
        .cellftbd1 {
            input {
                text-align: right;
            }
        }
        .cellftbd2 {
            flex: 1;
            text-align: center;
        }
    }
}
</style>
