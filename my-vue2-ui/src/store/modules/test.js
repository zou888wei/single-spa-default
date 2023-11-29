export const namespaced = true

export const state = () => ({
  // 用户名称
  userName: '张三'
})

export const getters = {
  userName: state => state.userName
}

export const mutations = {
  SET_USER_NAME: (state, userName) => {
    state.userName = userName
  }
}

export const actions = {
  // 设置总行数据
  setUserName({ commit }, data) {
    commit('SET_USER_NAME', data)
  }
}
