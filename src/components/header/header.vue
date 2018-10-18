<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="header-img">
                <img wdith="64" height="64" class="avatar" :src="seller.avatar" alt="">
            </div>
            <div class="header-content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="desc">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="ClassMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="header-code" v-if="seller.supports" @click="datailShow=true">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="datailShow=true">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>

        <transition name="fade">
            <div class="detail" v-show="datailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <el-rate class="score" v-model="seller.score" disabled></el-rate>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>

                        <ul v-if="seller.supports" class="supports">
                            <li class="supports-item" v-for="item in seller.supports">
                                <span class="icon" :class="ClassMap[item.type]"></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>

                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>

                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close">
                    <i @click="datailShow=false" class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: {
            seller: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                datailShow: false,
            }
        },
        created() {
            this.ClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

        },
        methods: {}
    }
</script>

<style scoped>
    .header {
        color: #fff;
        position: relative;
        background: rgba(7, 17, 27, 0.3);
    }

    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        z-index: -1;
        filter: blur(10px);
    }

    .detail {
        position: fixed;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7, 17, 27, 0.8);
        top: 0;
    }

    .detail-wrapper {
        min-height: 100%;
        width: 100%;
    }

    .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
    }

    .detail-main > .name, .title {
        line-height: 16px;
        font-size: 16px;

        text-align: center;
    }

    .detail-main > .title {
        width: 80%;
        margin: 28px auto 24px auto !important;
        display: flex;
    }

    .title > .line {
        flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .title > .text {
        padding: 0 12px;
        font-size: 14px;
        font-weight: 700;
        line-height: 12px;
    }

    .supports {
        width: 80%;
        margin: 0 auto;
    }

    .supports-item {
        padding: 0 12px;
        margin-bottom: 12px;
        font-size: 0;
    }

    .score {
        height: 24px;
        line-height: 24px;
        margin-top: 10px;
        margin-bottom: 28px;
        text-align: center;
    }

    .el-rate__item {
        padding: 8px !important;
    }

    .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
    }

    .clearfix {
        display: inline-block;
    }

    .clearfix:after {
        display: block;
        content: '.';
        height: 0;
        line-height: 0;
        clear: both;
        visibility: hidden;
    }

    .content-wrapper {
        padding: 24px 12px 8px 24px;
        position: relative;
    }

    .avatar {
        border-radius: 2px;
    }

    .bulletin {
        width: 80%;
        margin: 0 auto;
    }

    .bulletin > .content {
        padding: 0 12px;
        line-height: 24px;
        font-size: 12px;
    }

    .header-img {
        vertical-align: top;
        display: inline-block;
    }

    .header-content {
        display: inline-block;
        font-size: 14px;
        margin-left: 16px;
    }

    .header-code {
        position: absolute;
        background: rgba(0, 0, 0, 0.2);
        right: 12px;
        bottom: 18px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        text-align: center;
    }

    .count {
        font-size: 10px;
    }

    .icon-keyboard_arrow_right {
        font-size: 10px;
    }

    .title {
        margin: 2px 0 8px 0;

    }

    .brand {
        width: 30px;
        height: 18px;
        display: inline-block;
        background: url("./brand@2x.png");
        background-size: 30px 18px;
        vertical-align: top;
    }

    .name {
        margin-left: 6px;
        font-size: 16px;
        line-height: 18px;
        font-weight: bold;
    }

    .desc {
        line-height: 12px;
        font-size: 12px;
        font-weight: 200;
        margin-bottom: 10px;
    }

    .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background-size: 12px 12px !important;
        background-repeat: no-repeat;
        vertical-align: top !important;
    }

    .text {
        line-height: 12px;
        font-size: 12px;
        font-weight: 200;
        vertical-align: top
    }

    .bulletin-wrapper {
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        background: rgba(7, 17, 27, 0.2);
    }

    .bulletin-wrapper > .icon-keyboard_arrow_right {
        position: absolute;
        right: 12px;
        font-size: 10px;
        top: 8px;
    }

    .bulletin-title {
        background: url("./bulletin@2x.png");
        background-size: 22px 12px;
        display: inline-block;
        width: 22px;
        height: 12px;
        vertical-align: top;
        margin-top: 7px;
    }

    .bulletin-text {
        vertical-align: top;
        font-size: 10px;
        font-weight: 200;
    }

    .decrease {
        background: url("./decrease_1@2x.png");
    }

    .discount {
        background: url("./discount_1@2x.png");
    }

    .special {
        background: url("./special_1@2x.png");
    }

    .guarantee {
        background: url("./guarantee_1@2x.png");
    }

    .invoice {
        background: url("./invoice_1@2x.png");
    }


    .fade-enter-active, .fade-leave-active {
        background: rgba(7, 17, 27, 0.8);
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        background: rgba(7, 17, 27, 0);
        opacity: 0;
    }
</style>