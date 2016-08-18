<template>
    <div class="vux-search-box">
        <div class="weui_search_bar" id="search_bar" :class="{weui_search_focusing: !isCancel}">
            <div class="v-search-box" v-if="cats.length">
                <select name="" id="" class="vux-search-cat" v-model="catsVal" v-show="isFixed">
                    <option v-for="(key,item) in cats" :value="item" :selected="item == catsVal">{{item}}</option>
                </select>
            </div>
            <form class="weui_search_outer" @submit.prevent="$emit('on-submit', value)">
                <div class="vux-search-mask" @click="touch" v-show="!isFixed"></div>
                <div class="weui_search_inner">
                    <i class="weui_icon_search"></i>
                    <input type="text" class="weui_search_input" id="search_input" placeholder="{{placeholder}}" autocomplete="off" required v-model="value" v-el:input/>
                    <a href="javascript:" class="weui_icon_clear" id="search_clear" @click="clear"></a>
                </div>
                <label for="search_input" class="weui_search_text" id="search_text">
                    <i class="weui_icon_search"></i>
                    <span>{{placeholder}}</span>
                </label>
            </form>
            <a href="javascript:" class="weui_search_cancel" id="search_cancel" @click="cancel">{{cancelText}}</a>
        </div>
        <div class="weui_cells weui_cells_access vux-search_show" id="search_show" v-show="isFixed">
            <div class="weui_cell" v-for="item in results" @click="handleResultClick(item)">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>{{item.title}}</p>
                </div>
            </div>
            <div class="weui_cell" style="text-align:center;" v-show="!value && results.length">
                <div class="weui_cell_bd weui_cell_primary">
                    <a @click="delHis" href="javascript:" class="weui_btn weui_btn_mini weui_btn_default">清除搜索历史</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: '搜索'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        value: {
            type: String,
            twoWay: true,
            default: ''
        },
        results: {
            type: Array,
            default () {
                return []
            }
        },
        autoFixed: {
            type: Boolean,
            default: true
        },
        cats: {
            type: Array,
            default () {
                return []
            }
        },
        catsVal: {
            type: String,
            twoWay: true,
            default: ''
        },
    },
    methods: {
        clear() {
            this.value = ''
            this.isFocus = true
            this.setFocus()
        },
        cancel() {
            this.value = ''
            this.isCancel = true
            this.isFixed = false
            this.$emit('on-cancel')
        },
        handleResultClick(item) {
            this.$emit('result-click', item)
            this.isCancel = true
            this.isFixed = false
        },
        touch() {
            this.isCancel = false
            if (this.autoFixed) {
                this.isFixed = true
            }
        },
        setFocus() {
            this.$els.input.focus()
            this.$emit('on-change', this.value)
        },
        delHis() {
            this.$emit('del-history', this.catsVal)
        }
    },
    data() {
        return {
            isCancel: true,
            isFocus: false,
            isFixed: false
        }
    },
    watch: {
        isFixed(val) {
            if (val === true) {
                this.$el.classList.add('vux-search-fixed')
                this.setFocus()
                this.isFocus = true
            } else {
                this.$el.classList.remove('vux-search-fixed')
            }
        },
        value(val) {
            this.$emit('on-change', this.value)
        },
        catsVal(val) {
            this.$emit('on-select', val)
            this.$emit('on-change', this.value)
        },
    }
}
</script>

<style lang="less">
@import '../../../node_modules/vux/src/styles/weui/icon/weui_icon_font';
@import '../../../node_modules/vux/src/styles/weui/widget/weui_searchbar/weui_searchbar';
.vux-search-fixed {
    position: fixed;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 5;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    .weui_search_outer:after {
        border-radius: 0 10px 10px 0;
        border-left: 0 none;
    }
}

.vux-search-box {
    width: 100%;
}

.vux-search_show {
    margin-top: 0;
    overflow-y: auto;
    height: 100%;
}

.vux-search-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
}

.vux-search-cat {
    position: relative;
    display: block;
    height: 28px;
    line-height: 28px;
    appearance: none;
    padding: 0 10px 0 5px;
    border: 0 none;
    border-radius: 0;
    font-size: 16px;
    background-color: #fff;
    color: #888;
}
</style>
<style lang="scss" scoped>
.v-search-box {
    display: none;
    position: relative;
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        border-top: 4px solid #666;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
    }
}

.vux-search-fixed {
    .v-search-box {
        display: block;
    }
}

.weui_search_bar {
    background-color: #c50a1d;
}

.weui_search_cancel {
    color: #fff;
}
</style>
