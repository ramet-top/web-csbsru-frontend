<template>
  <div>
    <v-app app>
      <Header />
      <v-main>
        <nuxt />
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Header from '~/components/navigations/AppHeader'
import Footer from '~/components/navigations/AppButtomFooter'

export default {
  name: 'Default',
  components: {
    Header,
    Footer,
  },
}
</script>
