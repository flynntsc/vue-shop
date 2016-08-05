<template>
    <div class="v-shd">
        <search v-ref:search cancel-text="取消" class="v-search"></search>
        <select name="" id="" class="v-catsel">
            <option value="0">商品</option>
            <option value="1">店铺</option>
        </select>
    </div>
</template>

<script>
import {
    Search,
} from 'vux/src/components';

export default {
    components: {
        Search,
    },
    data() {
        return {
            isShow: true
        }
    },
    ready() {
        this.$refs.search.touch()
        this.$refs.search.setFocus()
    },
}
</script>
<style lang="scss" scoped>
.v-catsel {
    position: fixed;
    top: 0;
    left: 10px;
    z-index: 5;
}

.v-search {
    .weui_search_inner {
        margin-left: 20px;
    }
}
</style>
