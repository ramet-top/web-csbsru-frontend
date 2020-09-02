export const state = () => ({
  defaultImage: require('~/assets/images/default-profile.jpg'),
})

export const getters = {
  defaultImage: (state) => state.defaultImage,
}

export const mutations = {}

export const actions = {
  requestProjectUser({ commit }, payload) {
    const query = payload || ''
    return new Promise((resolve, reject) => {
      try {
        const response = this.$axios.$get(`/projects${query}`)
        resolve(response)
      } catch (e) {
        reject(e)
      }
    })
  },
}
