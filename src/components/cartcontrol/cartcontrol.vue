<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop="delCart()">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
    </div>
</template>

<script>
    import Vue from 'vue';


    export default {
        name: "",
        props: {
            food: {
                type: Object
            }
        },
        created() {
        },
        methods: {
            addCart(event) {
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                this.$emit('events', event);
            },
            delCart() {
                this.food.count--;
            }
        }
    }
</script>

<style scoped>
    .cartcontrol {

    }

    .cart-decrease {
        display: inline-block;

        line-height: 20px;
        font-size: 20px;
        color: rgb(0, 160, 220);
    }

    .cart-count {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 20px;
        text-align: center;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    .cart-add {
        display: inline-block;
        line-height: 20px;
        font-size: 20px;
        padding: 6px;
        color: rgb(0, 160, 220);
    }

    .icon-remove_circle_outline {
        padding: 6px;
    }

    .move-enter-active, .move-leave-active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: all 0.4s linear;
    }

    .move-enter, .move-leave-to {
        opacity: 0;
        transform: translate3d(18px, 0, 0);

    }

    .move-enter-active .inner, .move-leave-active .inner {
        transition: all .5s;
        transform: rotate(0deg);

    }

    .move-enter .inner, .move-leave-to .inner {
        transform: rotate(180deg);
    }
</style>