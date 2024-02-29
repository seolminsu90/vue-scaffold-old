const authStore = {
    namespaced: true,
    state: {
        role: ["USER"]
    },
    getters: {
        GET_AUTH: state => state.role
    },
    mutations: {
        MU_AUTH: (state, payload) => {
            state.role = payload.roles
        }
    },
    actions: {
        AC_AUTH: ({ commit }, payload) => {
            commit('MU_AUTH', payload)
        }
    }
}

export default authStore