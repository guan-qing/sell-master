import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Goods from 'components/goods/goods';
import Ratings from 'components/ratings/ratings';
import Seller from 'components/seller/seller';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'App',
            redirect: '/goods'// 设置默认为商品页
        },
        {
            path: '/goods',
            name: 'Good',
            component: Goods
        },
        {
            path: '/ratings',
            name: 'Ratings',
            component: Ratings
        },
        {
            path: '/seller',
            name: 'Seller',
            component: Seller
        }
    ]
})
