<template>
    <scroll class="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <el-rate
                            size="mini"
                            class="rate"
                            v-model="seller.score"
                            disabled
                            text-color="#ff9900"
                            score-template="{value}">
                    </el-rate>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2 class="">起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2 class="">商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2 class="">平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>

                <div class="favorite" @click="favorite=!favorite">
                    <span class="icon-favorite" :class="{'active':favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="supports-item" v-for="item in seller.supports">
                        <span class="icon" :class="ClassMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <scroll :scrollX="true" :scrollY="false" ref="picWrapper" class="pic-wrapper">
                    <ul ref="picList" class="pic-list">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" alt="" width="120" height="90">
                        </li>
                    </ul>
                </scroll>
            </div>
            <split></split>
            <div class="infos">
                <h1 class="title">商家信息</h1>
                <ul>
                    <li class="info-item" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </scroll>
</template>

<script>
    import Scroll from './../scroll/scroll'
    import Split from './../split/split'

    export default {
        name: "",
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                favorite: true
            }
        },
        computed: {
            favoriteText() {
                return this.favorite ? '已收藏' : '收藏';
            }
        },
        watch: {
            'seller.pics': function () {
                this.$nextTick(() => {
                    let picWidth = 120;
                    let marign = 6;
                    let width = (picWidth + 6) * this.seller.pics.length - marign;
                    this.$refs.picList.style.width = `${width}px`;
                    this.$refs.picWrapper.refresh();
                });
            }
        },
        created() {
            this.ClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.$nextTick(() => {
                if (this.seller.pics) {
                    let picWidth = 120;
                    let marign = 6;
                    let width = (picWidth + 6) * this.seller.pics.length - marign;
                    this.$refs.picList.style.width = `${width}px`;
                    this.$refs.picWrapper.refresh();
                }
            });
        },
        mounted() {
        },
        methods: {},
        components: {Scroll, Split}
    }
</script>

<style scoped>
    .seller {
        position: absolute;
        top: 174px;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
    }

    .overview {
        padding: 18px;
    }

    .title {
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 8px;
        color: rgb(7, 17, 27);
    }

    .desc {

        line-height: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .rate {
        display: inline-block;
        vertical-align: top;
    }

    .desc > .text {
        margin-right: 12px;
        display: inline-block;
        vertical-align: top;
        padding-bottom: 18px;
        font-size: 10px;
        color: rgb(77, 85, 93);
    }

    .supports-item > .text {
        margin-right: 12px;
        display: inline-block;
        vertical-align: top;
        padding-bottom: 18px;
        font-size: 10px;
        color: rgb(77, 85, 93);
    }

    .remark {
        display: flex;
        padding-top: 18px;
    }

    .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
    }

    .block:last-child {
        border: none;
    }

    .block > h2 {
        margin-bottom: 4px;
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    .content {
        line-height: 24px;
        font-size: 10px;
        color: rgb(7, 17, 27);
    }

    .stress {
        font-size: 24px;
    }

    .supports {
        padding: 0 12px;
    }

    .bulletin {
        padding: 18px 18px 0px 18px;
    }

    .bulletin > .title {
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 8px;
        color: rgb(7, 17, 27);
    }

    .content-wrapper {
        padding: 0px 12px 16px 12px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
    }

    .content-wrapper .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
    }

    .pics {
        padding: 18px;
    }

    .pics > .title {
        margin-bottom: 12px;
    }

    .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
    }

    .pic-list {
        font-size: 0;
    }

    .pic-item {
        display: inline-block;
        margin-right: 6px;
        width: 120px;
        height: 90px;
    }

    .pic-item:last-child {
        margin-right: 0px;
    }

    .infos {
        padding: 18px;
    }

    .infos > .title {
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .info-item {
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 16px;
        color: rgb(7, 17, 27);
    }

    .favorite {
        position: absolute;
        top: 18px;
        right: 18px;
        width: 40px;
        text-align: center;
    }

    .icon-favorite {
        display: block;
        font-size: 24px;
        color: #d4d6d9;
        line-height: 24px;
        margin-bottom: 4px;
    }

    .icon-favorite.active {
        color: rgb(240, 20, 20);
    }

    .favorite > .text {
        line-height: 10px;
        font-size: 10px;
        color: rgb(77, 85, 93);
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


</style>