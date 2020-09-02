export const state = () => ({
  advisor: {},
  advisors: [],
  loading: false,
})

export const getters = {
  advisor: (state) => state.advisor,
  advisors: (state) => state.advisors,
  loading: (state) => state.loading,
}

export const mutations = {
  SET_ADVISOR(state, data) {
    state.advisor = data
  },
  SET_ADVISORS(state, data) {
    state.advisors = data
  },
  SET_LOADING(state, data) {
    state.loading = data
  },
}

export const actions = {
  setAdvisor({ commit }, payload) {
    commit('SET_ADVISOR', payload)
  },
  setAdvisors({ commit }, payload) {
    commit('SET_ADVISORS', payload)
  },

  requestAdvisors({ commit }, payload) {
    const id = payload || 0
    try {
      if (payload) {
        this.$axios
          .$get(`/advisors/${id}?_sort=createdAt:desc`)
          .then((result) => {
            commit('SET_ADVISOR', result)
          })
      } else {
        this.$axios.$get(`/advisors?_sort=createdAt:desc`).then((result) => {
          commit('SET_ADVISORS', result)
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  setLoading({ commit }, payload) {
    commit('SET_LOADING', payload)
  },
}
