import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import '@/common/style.css';
import '@/common/css/reset.css';
import ElementUI from 'element-ui';


import * as filters from "./common/js/filters";

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});//注册全局过滤器
Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
