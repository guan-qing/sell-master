<template>
    <scroll class="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <el-rate
                                class="rate"
                                v-model="seller.score"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                        </el-rate>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <el-rate
                                class="rate"
                                v-model="seller.foodScore"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                        </el-rate>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">送达时间</span>
                        <div class="rate">{{seller.deliveryTime}}分钟</div>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingSelect :desc="desc" :onlyContent.sync="onlyContent" :selectType.sync="selectType"
                          :ratings="ratings"></ratingSelect>
            <div class="rating-wrapper">
                <ul v-show="ratings&&ratings.length">
                    <li v-show="needShow(rating.rateType,rating.text)" class="rating-item"
                        v-for="rating in ratings">
                        <div class="avatar">
                            <img class="avatar" width="28" height="28" :src="rating.avatar" alt="">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="rate-wrapper">
                                <el-rate
                                        size="mini"
                                        class="rate"
                                        v-model="rating.score"
                                        disabled
                                        text-color="#ff9900"
                                        score-template="{value}">
                                </el-rate>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟内送达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommed">
                                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                                <span class="recommend" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime|fromDate('yyyy-MM-dd hh:mm:ss')}}
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="no-rating" v-show="!ratings||!ratings.length">
                    暂无评价
                </div>
            </div>
        </div>

    </scroll>
</template>

<script>
    import Split from './../split/split'
    import RatingSelect from './../ratingselect/ratingselect'
    import Scroll from './../scroll/scroll'
    import Shopcart from './../shopcart/shopcart'

    const ALL = 2;
    export default {
        name: "",
        props: {
            seller: {
                type: Object
            }
        },
        created() {
            this._initRatings()
        },
        data() {
            return {
                ratings: [],
                showFlag: false,
                selectType: ALL,
                onlyContent: false,
                desc: {all: '全部', positive: '满意', negative: '不满意'}
            }
        },
        methods: {
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            },
            _initRatings() {
                this.$http.get('http://localhost:3000/ratings').then((res) => {
                    this.ratings = res.data;
                }, (e) => {
                    console.log("请求商品信息失败,错误信息:" + e)
                });
            }
        },
        components: {Split, RatingSelect, Scroll, Shopcart}
    }
</script>

<style>
    .ratings {
        position: absolute;
        top: 174px;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
    }

    .ratings-content {
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .ratings-content .overview {
        display: flex;
        padding: 18px 0;
    }

    .overview-left {
        flex: 0 0 137px;
        width: 137px;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
    }

    .overview-right {
        flex: 1;
        padding-left: 18px;
    }

    .score {
        font-size: 24px;
        line-height: 28px;
        color: rgb(255, 153, 0);
        margin-bottom: 6px;
    }

    .title {
        line-height: 12px;
        font-size: 12px;
        margin-bottom: 6px;
    }

    .score-wrapper {
        line-height: 18px;
        padding-bottom: 4px;
    }

    .score-wrapper > .title {
        margin-right: 6px;
    }

    .rank {
        font-size: 10px;
        line-height: 10px;
        color: rgb(147, 153, 159);
    }

    .rate {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        color: rgb(147, 153, 159);
    }

    .rating-wrapper {
        padding: 0 18px;
    }

    .rating-item {
        display: flex;
        padding: 18px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .rating-wrapper .avatar img {
        border-radius: 50%;
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
    }

    .content {
        flex: 1;
        position: relative;
    }

    .name {
        line-height: 12px;
        font-size: 10px;
        color: rgb(7, 17, 27);
        margin-bottom: 4px;
    }

    .rate-wrapper {
        margin-bottom: 6px;
    }

    .content > .text {
        font-size: 12px;
        line-height: 18px;
        padding-bottom: 8px;
    }

    .delivery {
        display: inline-block;
        vertical-align: top;
        color: rgb(147, 153, 159);
        font-size: 10px;
        line-height: 12px;
    }

    .time {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 10px;
        line-height: 12px;
        color: rgb(147, 153, 159);
    }

    .rate-wrapper .el-rate__icon {
        font-size: 10px;
        margin-right: 4px;
    }

    .recommend {
        font-size: 9px;
        line-height: 18px;
        color: rgb(147, 153, 159);
        margin-right: 8px;
        border-width: 1px;
        border-color: rgba(7, 17, 27, 0.1);
        background: #fff;
        border-radius: 2px;
    }

    .icon-thumb_up, .icon-thumb_down {
        font-size: 12px;
        line-height: 24px;
        margin-right: 4px;
    }

    .icon-thumb_up {
        color: rgb(0, 160, 220);
    }

    .icon-thumb_down {
        color: rgb(147, 153, 159);
    }
</style>