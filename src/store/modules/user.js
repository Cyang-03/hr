import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user.js'
// 状态
const state = {
  token: getToken() // 设置token的初始状态，token持久化=> 放到缓存中

}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token // 修改state的数据
    // 修改数据后，缓存数据
    setToken(token) // vuex和缓存数据同步
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 清vuex，在清缓存vuex和缓存数据的同步
  }
}
// 执行异步
const actions = {
  async login(context, data) { // 定义login action
    const result = await login(data) // 调用登录接口,获得一个promis对象
    context.commit('setToken', result) // 用户密码校验成功，则通过mutations修改state
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
