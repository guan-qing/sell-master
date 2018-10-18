<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="listShow">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight':totalCount>0}">
                            <span class="icon-shopping_cart"></span>
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :style="{color: totalPrice>0 ? '#fff' : ''}">￥{{totalPrice}}</div>
                    <div class="desc">另需加配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right">
                    <div class="pay" :class="{'enough': totalPrice>=minPrice}">{{payDesc}}</div>
                </div>
            </div>
            <div class="ball-container">
                <transition-group name="drop" tag="div" key="ball">
                    <div v-for="(ball,index) in balls" :key="index" class="ball" v-show="ball.show">\
                        <div class="inner inner-hook"></div>
                    </div>
                </transition-group>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="shopcartShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <scroll class="list-content">
                        <ul>
                            <li class="food" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </scroll>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div @click="shopcartShow=false" class="list-mask" v-show="shopcartShow"></div>
        </transition>
    </div>
</template>

<script>
    import Cartcontrol from './../cartcontrol/cartcontrol'
    import Scroll from './../scroll/scroll'

    export default {
        name: "",
        props: {
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
            selectFoods: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
                dropBalls: [],
                shopcartShow: false
            }
        },
        watch: {
            'selectFoods': function () {
                this.shopcartShow = this.selectFoods.length == 0 ? false : true;
            }
        },
        methods: {
            drop(el) {
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return
                    }
                }
            },
            listShow() {
                if (this.selectFoods.length > 0) {
                    this.shopcartShow = !this.shopcartShow;
                }
            },
            empty() {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                })
                this.shopcartShow = false;
            }
        },
        computed: {
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                })
                return total;
            },
            totalCount() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                })
                return count;
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}元起送`;
                }
                if (0 < this.totalPrice && this.totalPrice < this.minPrice) {
                    return `还差￥${this.minPrice - this.totalPrice}元起送`;
                }
                if (this.totalPrice >= this.minPrice) {
                    return '结算';
                }
            }
        },
        transaction: {
            drop: {
                beforeEnter(el) {
                    console.log('beforeEnter...')
                    let count = this.balls.length;
                    while (count--) {
                        let ball = this.balls[count];
                        if (ball.show) {
                            let rect = this.el.getBoundingClientRect();
                            let x = rect.left - 32;
                            let y = -(window.innerHeight - rect.top - 22);
                            el.style.display = '';
                            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                            el.style.transform = `translate3d(0,${y}px,0)`;
                            let inner = el.getElementsByClassName('inner-hook')[0];
                            inner.style.webkitTransform = `translate3d(${x},0,0)`;
                            inner.style.transform = `translate3d(${x},0,0)`;
                        }
                    }
                },
                enter(el) {
                    let rf = el.offsetHeight;
                    this.$nextTick(() => {
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,0,0)`;
                        el.style.transform = `translate3d(0,0,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(0,0,0)`;
                        inner.style.transform = `translate3d(0,0,0)`;

                    });
                },
                afterEnter(el) {
                    let ball = this.dropBalls.shift();
                    if (ball) {
                        ball.show = false;
                        el.style.display = 'none';
                    }
                }
            }
        },
        components: {Cartcontrol, Scroll}
    }
</script>

<style scoped>
    .shopcart {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        height: 48px;
        width: 100%;
    }

    .content {
        display: flex;
        background: #141d27;
    }

    .content-left {
        flex: 1;
    }

    .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #141d27;
        text-align: center;
    }

    .logo {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #2b343c;
    }

    .highlight {
        background: rgb(0, 160, 220);
    }

    .highlight > .icon-shopping_cart {
        color: #fff;
    }

    .icon-shopping_cart {
        line-height: 44px;
        font-size: 24px;
        color: #80858a;
    }

    .num {
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        background: rgb(240, 20, 20);
        box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.4);
    }

    .price {
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin-top: 12px;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
    }

    .desc {
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin: 12px 0 0 12px;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.4);
    }

    .content-right {
        flex: 0 0 105px;
        width: 105px;
        background: #2b333b;
    }

    .pay {
        text-align: center;
        height: 48px;
        line-height: 48px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
    }

    .enough {
        color: #fff;
        background: #00b43c;
    }

    .ball-container {

    }

    .balll {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
    }

    .balll-transition {
        transition: all 0.4s;
    }

    .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s;
    }

    .shopcart-list {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: -1;
        transform: translate3d(0, -100%, 0);
    }

    .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .list-header > .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }

    .list-header > .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
    }

    .list-content {
        padding: 0 18px;
        max-height: 217px;
        background: #fff;
        overflow: hidden;
    }

    .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .food > .name {
        line-height: 24px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }

    .food > .price {
        position: absolute;
        right: 90px;
        bottom: 12px;
    }

    .food > .price span {
        line-height: 24px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);

    }

    .cartcontol-wrapper {
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    .list-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 40;
        background: rgba(7, 17, 27, 0.6);
        -webkit-filter: blur(15px);
        -moz-filter: blur(15px);
        -o-filter: blur(15px);
        -ms-filter: blur(15px);
        filter: blur(15px);
    }

    .fade-enter-active, .fade-leave-active {
        opacity: 1;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
        background: rgba(7, 17, 27, 0);
    }

    .fold-enter-active, .fold-leave-active {
        transition: all 0.5s;
    }

    .fold-enter, .fold-leave-to {
        transform: translate3d(0, 0, 0);
    }

</style>