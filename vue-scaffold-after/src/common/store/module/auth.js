
const authStore = {
    namespaced: true,
    state: {
        role: ["USER", "ADMIN"]
    },
    getters: {
        GetAuth: state => state.role
    },
    mutations: {
        MutAuth: (state, payload) => {
            state.role = payload.roles
        }
    },
    actions: {
        SetAuth: ({ commit }, payload) => {
            commit('MutAuth', payload)
        }
    }
}

export default authStore