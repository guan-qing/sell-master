<template>
    <transition name="food">
        <scroll v-if="food" v-show="showFlag" class="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt=""/>
                    <div class="back" @click="showFlag=false">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">{{food.price|currency}}</span>
                        <span class="old" v-show="food.oldPrice">{{food.oldPrice|currency}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div @click="addFirst(food)" class="buy" v-show="!food.count||food.count===0">
                            加入购物车
                        </div>
                    </transition>
                </div>
                <split></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评论</h1>
                    <ratingSelect :desc="desc" :onlyContent.sync="onlyContent" :selectType.sync="selectType"
                                  :ratings="food.ratings"></ratingSelect>
                </div>
                <div class="rating-wrapper">
                    <ul v-show="food.ratings&&food.ratings.length">
                        <li v-show="needShow(rating.rateType,rating.text)" class="rating-item"
                            v-for="rating in food.ratings">
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                            </div>
                            <div class="time">
                                {{rating.rateTime|fromDate('yyyy-MM-dd hh:mm:ss')}}
                            </div>
                            <p class="text">
                                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                                {{rating.text}}
                            </p>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings||!food.ratings.length">
                        暂无评价
                    </div>
                </div>
            </div>
        </scroll>
    </transition>

</template>

<script>
    import Vue from 'vue'
    import Split from './../split/split'
    import Scroll from './../scroll/scroll'
    import Cartcontrol from './../cartcontrol/cartcontrol'
    import ratingSelect from './../ratingselect/ratingselect'

    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        name: "",
        props: {
            food: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: false,
                desc: {all: '全部', positive: '推荐', negative: '吐槽'}
            }
        },
        methods: {
            show() {
                this.showFlag = true;
            },
            addFirst(food) {
                Vue.set(food, 'count', 1);
            },
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            }
        },
        filters: {
            currency: function (value) {
                if (!value) return ''
                return '￥' + value
            }
        },
        components: {Split, Scroll, Cartcontrol, ratingSelect}
    }
</script>

<style scoped>
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;
        transition: all 0.2s linear;
    }

    .image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
    }

    .image-header > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .back {
        position: absolute;
        top: 5px;
        left: 0;
        color: #fff;
    }

    .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
    }

    .content {
        padding: 18px;
        position: relative;
    }

    .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-weight: 700;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }

    .detail {
        margin-bottom: 18px;
        line-height: 10px;
    }

    .sell-count, .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    .sell-count {
        margin-right: 12px;
    }

    .content > .price {
        line-height: 24px;
        position: relative;
    }

    .price > .now {
        font-weight: 700;
        font-weight: 700;
        font-size: 14px;
        color: rgb(240, 20, 20);
    }

    .price > .old {
        color: rgb(147, 153, 159);
        font-size: 10px;
        text-decoration: line-through;
    }

    .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
    }

    .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 10px;
        border-radius: 12px;
        color: #fff;
        background: rgb(0, 160, 220);
        transition: all 0.5s;
    }

    .info {
        padding: 18px;
    }

    .text {
        color: rgb(147, 153, 159);
        font-size: 12px;
        line-height: 24px;
    }

    .rating {
        padding-top: 18px;
    }

    .rating > .title {
        margin-left: 18px;
        line-height: 14px;
        font-weight: 700;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }

    .rating-wrapper {
        padding: 0 18px;
    }

    .rating-item {
        position: relative;
        padding: 16px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .user {
        position: absolute;
        right: 0;
        top: 16px;
        line-height: 12px;
    }

    .name {
        color: rgb(147, 153, 159);
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
        margin-right: 6px;
    }

    .avatar {
        border-radius: 50%;
    }

    .rating-item > .time {
        margin-bottom: 6px;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    .rating-item > .text {
        font-size: 12px;
        line-height: 16px;
        color: rgb(7, 17, 27);
    }

    .no-rating {
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147, 153, 159);
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

    .food-enter-active, .food-leave-active {
        transform: translate3d(0, 0, 0);
    }

    .food-enter, .food-leave-to {
        transform: translate3d(100%, 0, 0);
    }

    .fade-enter-active, .fade-leave-active {
        opacity: 1;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>