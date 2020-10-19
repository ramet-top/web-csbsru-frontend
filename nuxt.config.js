import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

export default {
  // mode: "spa",

  // default
  mode: 'universal',

  render: {
    resourceHints: false,
  },

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],

    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
    script: [
      // sweetAlert2
      // {
      // src: 'https://cdn.jsdelivr.net/npm/sweetalert2@9',
      // },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FFFF' },
  /*
   ** Global CSS
   */

  css: ['~/assets/css/main.css'],
  /*
   ** Plugins to load before mounting the App
   */

  plugins: [
    // { src: "@/plugins/aos", mode: "client" }
    // { src: "@/plugins/sweetalert2" }
    { src: '@/plugins/chart', ssr: false },
    // { src: '~/plugins/vue-image-upload.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */

  buildModules: ['@nuxtjs/eslint-module'],
  /*
   ** Nuxt.js modules
   */

  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    ['@nuxtjs/pwa', { icon: true }],
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-socket-io',
  ],

  io: {
    // module options
    sockets: [
      {
        name: 'main',
        url: 'http://localhost:1338',
      },
    ],
  },

  axios: {
    // proxy: true,
    baseURL: process.env.BASE_URL || 'http://localhost:1337',
  },

  auth: {
    redirect: {
      login: '/auth/login',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/local',
            method: 'post',
            propertyName: 'jwt',
          },
          user: { url: '/users/me', method: 'get', propertyName: null },
          logout: false,
        },
      },
    },
  },

  moment: {
    locales: ['th'],
    timezone: true,
    // defaultTimezone: 'Bangkok/Los_Angeles'
  },

  apollo: {
    tokenName: 'apollo-token-jwt', // optional, default: apollo-token
    cookieAttributes: {
      expires: 30, // optional, default: 7 (days)
    },
    authenticationType: 'Bearer', // optional, default: 'Bearer'
    includeNodeModules: true,
    errorHandler: '~/plugins/apollo-error-handler.js',
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    clientConfigs: {
      default: {
        // required
        httpEndpoint:
          process.env.GRAPHQL_SERVER_HTTP || 'http://localhost:1337/graphql',
      },
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    },
    defaultAssets: {
      font: false,
      icons: 'fa',
    },
  },

  build: {
    // vendor: ['chart'],
    extend(config, ctx) {},
  },

  router: {
    // ***for generate file only
    // base: "/nuxt-csbsru-test/"
    // for mode spa only
    // mode:'hash'
  },
}
