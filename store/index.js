export const state = () => ({
  auth: {
    user: null,
  },
  base_url_route: process.env.BASE_URL,
  defaultLogo: require('~/assets/images/CSBSRULogo.png'),
  defaultImage: require('~/assets/images/default-profile.jpg'),
  lazyImage: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
})

export const getters = {
  base_url_route: (state) => state.base_url_route,
  defaultImage: (state) => state.defaultImage,
  lazyImage: (state) => state.lazyImage,
  defaultLogo: (state) => state.defaultLogo,
  isAuthenticated: (state) => state.auth.loggedIn,
  loggedInUser: (state) => state.auth.user,
}

export const mutations = {}
export const actions = {}
