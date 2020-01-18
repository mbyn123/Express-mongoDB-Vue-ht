import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 统一变量,便于测试
const types = {
        SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // token是否认证通过
        SET_USER: 'SET_USER' // 用户信息
    }
    //1.状态信息，存储之地
const state = {
    isAutnenticated: false, // 是否认证
    user: {} // 存储用户信息
};
//2.获取状态信息
const getters = {
    isAutnenticated: state => state.isAutnenticated,//登录状态
    user: state => state.user//用户的信息
};
//3.直接更改state状态信息，方法，方法，方法！
const mutations = {
    // [types.SET_IS_AUTNENTIATED]方法名
    [types.SET_IS_AUTNENTIATED](state, isAutnenticated) { //判断是否验证通过方法
        if (isAutnenticated) //判断用户是否登录,是否为true
            state.isAutnenticated = isAutnenticated
        else
            state.isAutnenticated = false
    },
    [types.SET_USER](state, user) { //存储用户信息方法
        if (user)
            state.user = user
        else
            state.user = {}
    }
};
//4.间接地更改state状态信息，异步操作，无非就是调用mutations。 
const actions = {
    setIsAutnenticated: (context, isAutnenticated) => {
        // context.commit(mutations里面的函数方法名称，更改的数据)
        context.commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
    },
    setUser: ({
        commit
    }, user) => {
        commit(types.SET_USER, user)
    },
    //退出时,清除token
    clearCurrentState: ({
        commit
    }) => {
        commit(types.SET_IS_AUTNENTIATED, false)//登录状态为flase
        commit(types.SET_USER, null)//清空用户数据
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});
