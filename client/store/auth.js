import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'


export const state = () => ({
    
      token: null,
      messageCreated: '',
      messageSuccess:'',
      messageBadRequest: ''
  
  })

  export const mutations = {
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = null
    },
    messageSuccess(state, message) {
      state.messageBadRequest = ''
      state.messageSuccess = message
    },
    messageCreated(state, message) {
      state.messageBadRequest = ''
      state.messageCreated = message
    },
    messageBadRequest(state, dataObject) {
      state.messageCreated = ''
      state.messageSuccess = ''
      state.messageBadRequest = dataObject
    }
  }

  export const actions = {
 
    async login({ commit, dispatch }, formData) {
      try {
        const {message, token} = await this.$axios.$post('/api/admin/signIn', formData)
        dispatch('setToken', token)
        commit('messageSuccess', message)
      } catch (e) {
        const dataObject = e.response.data;
        commit('messageBadRequest', dataObject)
      }
    },

    setToken({commit}, token) {
      this.$axios.setToken(token)
      commit('setToken', token)
      Cookies.set('jwt-token', token)
    },

    logout({ commit }) {
      this.$axios.setToken(false)
      commit('clearToken')
      Cookies.remove('jwt-token')
    },

    async createUser({ commit }, formData) {
      try {
        const {message} = await this.$axios.$post('/api/admin/signUp', formData)
        commit('messageCreated', message)
      } catch (e) {
        const dataObject = e.response.data;
        commit('messageBadRequest', dataObject)
      }
    },

    autoLogin({dispatch}){
      const cookieStr = process.browser
        ? document.cookie
        : this.app.context.req.headers.cookie

        const cookies = Cookie.parse(cookieStr || '') || {}
        const token = cookies['jwt-token']

       if(isJWTValid(token)) {
         dispatch('setToken', token)
       }else{
         dispatch('logout')
       }
    }


  }

  export const getters = {
    isAuthenticated(state) {
      return Boolean(state.token)
    },
    token: store => store.token,
    messageSuccess({ messageSuccess }) {
      return { messageSuccess }
    },
    messageCreated({ messageCreated }) {
      return { messageCreated }
    },
    messageBadRequest({ messageBadRequest }) {
      return { messageBadRequest }
    }
  }

function isJWTValid(token) {
  if(!token)
    return false

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}
