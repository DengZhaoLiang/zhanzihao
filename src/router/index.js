import Vue from 'vue'
import Router from 'vue-router'
import home from '@pages/api/home/home.vue'
import cart from '@pages/api/cart/cart'
import detail from '@pages/api/detail/product'
import my from '@pages/api/user/user'
import order from '@pages/api/order/order'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/cart',
            name: 'cart',
            component: cart
        },
        {
            path: '/detail',
            name: 'detail',
            component: detail
        },
        {
            path: '/order',
            name: 'order',
            component: order
        },
        {
            path: '/my',
            name: 'my',
            component: my
        }
    ]
})
