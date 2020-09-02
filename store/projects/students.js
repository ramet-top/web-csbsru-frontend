export const state = () => ({
  users: [],
})

export const getters = {
  users: (state) => state.users,
}

export const mutations = {
  SET_USERS: (state, data) => {
    state.users = [...data]
  },
}

export const actions = {
  requestUsersRoleAny({ commit }, payload) {
    const roleName = payload || 'AuthStudent'
    return new Promise((resolve, reject) => {
      try {
        const response = this.$axios.$get(`/users?role.name=${roleName}`)
        resolve(response)
      } catch (e) {
        reject(e)
      }
    })
  },
  setUsers({ commit }, payload) {
    commit('SET_USERS', payload)
  },
}
