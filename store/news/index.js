export const state = () => ({
  post: {},
  posts: [],

  work: {},
  works: [],
})

export const getters = {
  post: (state) => state.post,
  posts: (state) => state.posts,
  work: (state) => state.work,
  works: (state) => state.works,
}

export const mutations = {
  SET_POST(state, data) {
    state.post = data
  },
  SET_POSTS(state, data) {
    state.posts = data
  },
  SET_SINGLE_WORKS_POSTS(state, data) {
    state.work = data
  },
  SET_WORKS_POSTS(state, data) {
    state.works = data
  },
}

export const actions = {
  setPost({ commit }, payload) {
    commit('SET_POST', payload)
  },
  setPosts({ commit }, payload) {
    commit('SET_POSTS', payload)
  },
  setSingleWorksPosts({ commit }, payload) {
    commit('SET_SINGLE_WORKS_POSTS', payload)
  },
  setWorksPosts({ commit }, payload) {
    commit('SET_WORKS_POSTS', payload)
  },
  requestPosts({ commit }, payload) {
    const id = payload || 0
    try {
      if (payload) {
        this.$axios
          .$get(`/posts/${id}`)
          .then((result) => commit('SET_POST', result))
      } else {
        this.$axios
          .$get(
            `/posts?publish=true&category=POST&_sort=createdAt:desc&_start=0&_limit=6`
          )
          .then((result) => commit('SET_POSTS', result))
      }
    } catch (error) {
      console.log(error)
    }
  },
  requestWorksPosts({ commit }, payload) {
    const id = payload || 0
    try {
      if (payload) {
        this.$axios
          .$get(`/posts/${id}`)
          .then((result) => commit('SET_SINGLE_WORKS_POSTS', result))
      } else {
        this.$axios
          .$get(
            `/posts?publish=true&category=WORK&_sort=createdAt:desc&_start=0&_limit=6`
          )
          .then((result) => commit('SET_WORKS_POSTS', result))
      }
    } catch (error) {
      console.log(error)
    }
  },
}
