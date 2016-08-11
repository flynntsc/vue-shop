<template>
    <div>
        <div class="weui_mask_transition" :class="{'weui_fade_toggle': show}" :style="{display: show ? 'block' : 'none'}" @click="hideBd"></div>
        <div class="weui_actionsheet" :class="{'weui_actionsheet_toggle': show}">
            <div class="weui_actionsheet_menu">
                <slot></slot>
                <div class="vux-actionsheet-gap" v-if="hasCancel"></div>
                <div class="weui_actionsheet_cell vux-actionsheet-cancel" v-if="hasCancel" @click="hideBd">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        hasCancel: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        hideBd() {
            this.show = false;
        }
    },
}
</script>
