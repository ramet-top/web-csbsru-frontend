export const state = () => ({
  dialog: false,
  loading: false,
  isActive: false,
  snackbar: false,
  isPermission: false,
  mainTab: 0,
})

export const getters = {
  dialog: (state) => state.dialog,
  loading: (state) => state.loading,
  isActive: (state) => state.isActive,
  snackbar: (state) => state.snackbar,
  isPermission: (state) => state.isPermission,
  mainTab: (state) => state.mainTab,
}

export const mutations = {
  SET_DIALOG(state, data) {
    state.dialog = data
  },
  SET_LOADING(state, data) {
    state.loading = data
  },
  SET_IS_ACTIVE(state, data) {
    state.isActive = data
  },
  SET_SNACKBAR(state, data) {
    state.snackbar = data
  },
  SET_IS_PERMISSION(state, data) {
    state.isPermission = data
  },

  SET_MAIN_TAB(state, data) {
    state.mainTab = data
  },
}

export const actions = {
  setDialog({ commit }, payload) {
    commit('SET_DIALOG', payload)
  },
  setLoading({ commit }, payload) {
    commit('SET_LOADING', payload)
  },
  setIsActive({ commit }, payload) {
    commit('SET_IS_ACTIVE', payload)
  },
  setSnackbar({ commit }, payload) {
    commit('SET_SNACKBAR', payload)
  },

  setIsPermission({ commit }, payload) {
    commit('SET_IS_PERMISSION', payload)
  },

  setMainTab({ commit }, payload) {
    commit('SET_MAIN_TAB', payload)
  },

  requestSinggleProject({ commit }, payload) {
    const id = payload || 0
    return new Promise((resolve, reject) => {
      try {
        const response = this.$axios.$get(`/projects/${id}`)
        resolve(response)
      } catch (e) {
        reject(e)
      }
    })
  },
  requestScoresWithAuthor({ commit }, payload) {
    const query = payload
    return new Promise((resolve, reject) => {
      try {
        const response = this.$axios.$get(`/scores/${query}`)
        resolve(response)
      } catch (e) {
        reject(e)
      }
    })
  },
}
