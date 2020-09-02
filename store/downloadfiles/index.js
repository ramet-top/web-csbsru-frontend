export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  requestFileDownloads({ commit }, payload) {
    // const query = payload
    return new Promise((resolve, reject) => {
      try {
        const response = this.$axios.$get(`/downloads`)
        resolve(response)
      } catch (e) {
        reject(e)
      }
    })
  },
}
