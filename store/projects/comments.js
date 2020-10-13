export const state = () => ({
  req: false,
})

export const getters = {
  req: (state) => state.req,
}

export const mutations = {
  SET_REQ(state, data) {
    state.req = data
  },
}

export const actions = {
  setNewReq({ commit }, payload) {
    commit('SET_REQ', payload)
  },
}
