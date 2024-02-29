import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import authStore from './module/auth.js'

export default createStore({
  plugins: [createPersistedState({
    paths: ['authStore'],           // Module
    key: 'store',                   // KeyName
    storage: window.sessionStorage  // Store Location
  })],
  state: {
    requestConut: 0  // example
  },
  getters: {
    GetRequestCount: state => state.requestConut
  },
  mutations: {
    MutRequestCount: (state, payload) => {
      state.role = payload.roles
    }
  },
  actions: {
    SetRequestCount: ({ commit, state }) => {
      commit('MutRequestCount', state.requestConut++)
    }
  },
  modules: {
    authStore: authStore
  }
})
