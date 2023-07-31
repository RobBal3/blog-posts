export default {
    namespaced: true,
    state() {
        return {
            activeUser: null,
        }
    },
    mutations: {
        setActiveUser(state, user) {
            state.activeUser = user;
        },
        logout(state) {
            state.activeUser = null;
        }
    },
    getters: {
        getActiveUser(state) {
            return state.activeUser;
        }
    }
}