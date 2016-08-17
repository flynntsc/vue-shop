<template>
    <!-- 头部 -->
    <x-header :left-options="{showBack: true,backText:' '}" class="v-ghd">店铺分类</x-header>
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
        return {}
    },
    ready() {

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
</style>
