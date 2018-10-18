<template>
    <div class="star" :class="starType">
        <span v-for="item in  itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';

    export default {
        name: "",
        props: {
            size: {
                type: Number,
                default: 0
            },
            score: {
                type: Number,
                default: 0
            },
            itemClasses: {
                type: Array,
                default: []
            }
        },
        data() {
            return {}
        },
        computed: {
            starType() {
                return 'star-' + this.size
            },
            itemClasses() {
                let result = [];
                let score = Math.floor(this.score * 2) / 2;
                let hasDecimal = score % 1 !== 0;
                let integer = Math.floor(score);
                for (let i = 0; i < integer; i++) {
                    result.push(CLS_ON);
                }
                if (hasDecimal) {
                    result.push(CLS_HALF);
                }
                while (result.length < LENGTH) {
                    result.push(CLS_OFF);
                }
                return result;

            }
        },
        methods: {}
    }
</script>

<style scoped>
    .star-48 > .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
    }

    .star-48 > .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
    }

    .star-36 {

    }

    .star-24 {

    }

    .star-item {
        display: inline-block;
        background-repeat: no-repeat;
    }
</style>