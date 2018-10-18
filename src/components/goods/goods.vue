<template>
    <div class="goods">
        <srcoll :data="goods" class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex==index}"
                    @click.stop="selectMeun(index)">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="ClassMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </srcoll>
        <srcoll :data="goods" @scroll="scroll" :probeType="3" :listenScroll="true" class="foods-wrapper"
                ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook" ref="foodList">
                    <h1 class="title">{{item.name}}</h1>
                    <ul class="wrapper">
                        <li @click="selectFood(food)" v-for="food in item.foods" class="food-item">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extre">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">{{food.price|currency}}</span>
                                    <span class="old" v-show="food.oldPrice">{{food.oldPrice|currency}}</span>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol @events="events" :food="food"></cartcontrol>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <h1 ref="fixed" v-show="topTitle" class="topTitle">{{topTitle}}</h1>
        </srcoll>
        <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                  :minPrice="seller.minPrice"></shopcart>
        <food ref="food" :food="selFood"></food>
    </div>
</template>

<script>
    //import BScroll from 'better-scroll';
    import Srcoll from './../scroll/scroll'
    import Shopcart from './../shopcart/shopcart'
    import Cartcontrol from './../cartcontrol/cartcontrol'
    import Food from './../food/food'

    const TITLE_HEIGHT = 26;
    export default {
        name: "Goods",
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                Index: 0,
                diff: -1,
                currentIndex: 0,
                selFood: null
            }
        },
        created() {
            this.$http.get('http://localhost:3000/goods').then((res) => {
                this.goods = res.data;
                this.$nextTick(() => {
                    this._calculateHeight();
                })
            }, (e) => {
                console.log("请求商品信息失败,错误信息:" + e)
            });
            this.ClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

        },
        computed: {
            topTitle() {
                if (this.scrollY > 0) {
                    return '';
                }
                return this.goods[this.currentIndex] ? this.goods[this.currentIndex].name : '';
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    })
                })
                return foods;
            },

        },
        methods: {
            scroll(pos) {
                this.scrollY = pos.y;
            },
            selectMeun(index) {
                this.$refs.foodsWrapper.scrollToElement(this.$refs.foodList[index], 1000);
            },
            events(event) {
                this.$refs.shopcart.drop(event);
            },
            selectFood(food, e) {
                this.selFood = food;
                this.$refs.food.show();
            },
            _calculateHeight() {
                this.listHeight = [];
                const list = this.$refs.foodList;
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    height += item.clientHeight + 16;
                    this.listHeight.push(height);
                }
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this._calculateHeight();
                }, 20)
            },
            scrollY(newY) {
                const listHeight = this.listHeight;
                // 当滚动到顶部,newY>0
                if (newY > 0) {
                    this.currentIndex = 0;
                    return;
                }
                // 当在中间部分滚动
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i];
                    let height2 = listHeight[i + 1];
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i;
                        this.diff = height2 + newY;
                        return;
                    }
                }
                // 当滚动到低部,且-newY大于最后一个元素的上限
                this.currentIndex = listHeight.length - 2;
            },
            diff(newVal) {
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
                if (this.fixedTop == fixedTop) return;
                this.fixedTop = fixedTop;
                this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
            }
        },
        filters: {
            currency: function (value) {
                if (!value) return ''
                return '￥' + value
            }
        },
        components: {Srcoll, Shopcart, Cartcontrol, Food}
    }
</script>

<style scoped>
    .goods {
        display: flex;
        position: absolute;
        top: 174px;
        width: 100%;
        bottom: 64px;
        overflow: hidden;
    }

    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
    }

    .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
    }

    .current {
        position: relative;
        line-height: 14px;
        margin-top: -1px;
        z-index: 10;
        background: #ddd;
    }

    .content .text {
        font-weight: 700;
        border: none;
    }

    .foods-wrapper {
        flex: 1;
        position: relative;
    }

    .menu-item > .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px !important;
        background-repeat: no-repeat;
        vertical-align: top !important;
    }

    .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .food-list > .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #2196F3;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
    }

    .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .food-item > .icon {
        flex: 0 0 57px;
        margin-right: 10px;
    }

    .food-item > .content {
        flex: 1;
    }

    .content > .name {
        margin: 2px 0 8px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }

    .content > .desc {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    .content > .extre {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    .extre > .count {
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
        right: 0;
        bottom: -4px;
    }

    .topTitle {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #2196F3;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
        width: 100%;
        position: absolute;
        top: 0;
    }

    .decrease {
        background: url("./decrease_3@2x.png");
    }

    .discount {
        background: url("./discount_3@2x.png");
    }

    .special {
        background: url("./special_3@2x.png");
    }

    .guarantee {
        background: url("./guarantee_3@2x.png");
    }

    .invoice {
        background: url("./invoice_3@2x.png");
    }
</style>