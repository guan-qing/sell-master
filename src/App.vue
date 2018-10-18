<template>
    <div id="app">
        <Header :seller="seller"></Header>
        <div class="tab">
            <div class="tab-item">
                <router-link to="goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="seller">商家</router-link>
            </div>
        </div>
        <div>

            <router-view :seller="seller"></router-view>
        </div>
    </div>
</template>

<script>
    import Header from 'components/header/header'

    export default {
        name: 'App',
        data() {
            return {
                seller: {}
            }
        },
        created() {
            this._getSeller()
        },
        methods: {
            _getSeller: function () {
                this.$http.get('http://localhost:3000/seller').then((res) => {
                    if (res.ok) {
                        this.seller = res.data;

                    }
                }, (e) => {
                    console.log("请求商家信息失败,错误信息:" + e)
                });
            }
        },
        components: {Header}
    }
</script>

<style>
    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        justify-content: center;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .tab-item {
        flex: 1;
        text-align: center;
    }

    .router-link-active {
        color: rgb(240, 20, 20);
    }
</style>
