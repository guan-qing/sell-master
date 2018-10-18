<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2)" class="block positive " :class="{'active':selectType==2}">{{desc.all}}<span
                    class="count">{{ratings.length}}</span></span>
            <span @click="select(0)" class="block positive " :class="{'active':selectType==0}">{{desc.positive}}<span
                    class="count">{{positives.length}}</span></span>
            <span @click="select(1)" class="block negative " :class="{'active':selectType==1}">{{desc.negative}}<span
                    class="count">{{negative.length}}</span></span>
        </div>
        <div class="switch" @click="toggleContent" :class="{'on':onlyContent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评论</span>
        </div>
    </div>
</template>

<script>
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        name: "ratingSelect",
        props: {
            ratings: {
                type: Array,
                default: []
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default: {all: '全部', positive: '满意', negative: '不满意'}
            }
        },
        data() {
            return {}
        },
        computed: {
            positives() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === POSITIVE;
                })
            },
            negative() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE;
                })
            }
        },
        methods: {
            select(type) {
                // this.selectType = type;
                this.$emit('update:selectType', type);
            },
            toggleContent() {
                this.$emit('update:onlyContent', !this.onlyContent)
            }
        }

    }
</script>

<style scoped>
    .ratingselect {

    }

    .rating-type {
        padding: 18px;
        /*margin: 0 18px;*/
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        color: rgb(77, 85, 93);
        font-size: 12px;
        line-height: 16px;
    }

    .block.active {
        color: #fff;
    }

    .positive {
        background: rgba(0, 160, 220, 0.2);
    }

    .positive.active {
        background: rgb(0, 160, 220);
    }

    .negative {
        background: rgba(77, 85, 92, 0.2);
    }

    .negative.active {
        background: rgb(77, 85, 92);
    }

    .count {
        font-size: 8px;
        margin-left: 2px;
    }

    .switch {
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: rgb(147, 153, 159);
    }

    .icon-check_circle {
        font-size: 24px;
        margin-right: 4px;
        display: inline-block;
        vertical-align: top;
    }

    .text {
        font-size: 12px;
    }

    .on {
        color: #00c850;
    }
</style>