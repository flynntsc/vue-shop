<template>
    <loading :show="isShow"></loading>
</template>

<script>
import {
    Loading,
} from 'vux/src/components';

export default {
    data() {
            return {
                isShow: true
            }
        },
        created() {
            this.$route.router.go('/index')

            // const isIn = localStorage.getItem('isIn') || false;
            // if (isIn) {
            //     this.$route.router.go('/index')
            // } else {
            //     this.$route.router.go('/login')
            // }
        },
        components: {
            Loading,
        }
}
</script>
<style></style>
