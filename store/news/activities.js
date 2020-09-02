export const state = () => ({
  activity: {},
  activities: [],
})

export const getters = {
  activity: (state) => state.activity,
  activities: (state) => state.activities,
}

export const mutations = {
  SET_ACTIVITY(state, data) {
    state.activity = data
  },
  SET_ACTIVITIES(state, data) {
    state.activities = data
  },
}

export const actions = {
  requestActivities({ commit }, payload) {
    const id = payload || 0
    try {
      if (payload) {
        this.$axios
          .$get(`/activities/${id}`)
          .then((result) => commit('SET_ACTIVITY', result))
      } else {
        this.$axios
          .$get(`/activities?_sort=createdAt:desc&_start=0`)
          .then((result) => commit('SET_ACTIVITIES', result))
      }
    } catch (error) {
      console.log(error)
    }
  },
}
