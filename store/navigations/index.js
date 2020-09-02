export const state = () => ({
  drawer: false,
})

export const getters = {
  drawer: (state) => state.drawer,
}

export const mutations = {
  SET_DRAWER(state, data) {
    state.drawer = data
  },
}

export const actions = {
  setDrawer({ commit }, payload) {
    commit('SET_DRAWER', payload)
  },
}
