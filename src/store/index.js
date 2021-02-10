import Vue from 'vue'
import Vuex from 'vuex'
import dataStore from '@utils/dataStore'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        Carts: []
    },
    mutations: {
        saveUserInfo(state, data) {
            // 用了微信的setData，这样子设置值的时候不必再传整个对象进来
            // 没有数据时则是清空对象
            if (!data) {
                state.userInfo = {}
            } else {
                state.userInfo = {
                    ...state.userInfo,
                    ...data
                }
            }
            dataStore.saveUserInfo(state.userInfo)
        },
        setCarts(state, Carts) {
            state.Carts = Carts
            dataStore.saveCarts(state.Carts)
        }
    },
    getters: {
        getUserInfo: state => {
            return state.userInfo
        },
        getCarts: state => {
            return state.Carts
        }
    },
    actions: {
        saveUserInfo(context, data) {
            context.commit('saveUserInfo', data)
        },
        setCarts(context, Carts) {
            console.log(Carts)
            context.commit('setCarts', Carts)
        }
    }
})
