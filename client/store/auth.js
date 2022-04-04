import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null
})

export const mutations = {
  setToken(state, payload) {
    state.token = payload
  },
  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  async login({ dispatch }, payload) {
    try {
      const data = await this.$axios.$post('/api/admin/signIn', payload)
      if(data.token)
        dispatch('setToken', data.token)
      return data
    } catch (e) {
      console.log(e.response)
      return e.response
    }
  },

  setToken({ commit }, payload) {
    this.$axios.setToken(payload)
    commit('setToken', payload)
    Cookies.set('jwt-token', payload)
  },

  logout({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    Cookies.remove('jwt-token')
  },

  async createUser({}, payload) {
    try {
      return await this.$axios.$post('/api/admin/signUp', payload)
    } catch (e) { 
      console.log(e.response)
    }
  },

  autoLogin({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']

    if (isJWTValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  }


}

export const getters = {
  isAuthenticated(state) {
    return Boolean(state.token)
  },
  token: state => state.token,
}

function isJWTValid(token) {
  if (!token)
    return false

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}
