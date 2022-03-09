 
export default {
  state() {
    return {
      token: true 
    }
  },

  mutations: {
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = null
    }
  },

  actions: {
    async login({commit}, formData) {
    const token = await new Promise(resolve => {
        setTimeout(() => resolve('mock-token'), 2000)
      })
      commit('setToken', token)
    },
    logout({commit}) {
      commit('clearToken')
    },
    createUser({commit}, formData) {
      try {
        console.log('createUser', formData)
      } catch (e) {
        console.log(e);
      }
    }
  },

  getters: {
    isAuthenticated(state) {
      return Boolean(state.token)
    } 
  }
}
