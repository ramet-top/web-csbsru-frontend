<template>
  <div>
    <v-app app>
      <Header />
      <v-main>
        <nuxt />
      </v-main>

      <v-footer class="py-4" dark height="auto">
        <v-container mx-auto>
          <v-layout wrap>
            <v-flex xs9>
              <div class="white--text ml-4">
                <p>
                  <v-icon class="red--text" left small>fab fa-vuejs</v-icon
                  >Create By
                  <a
                    class="white--text"
                    href="https://www.facebook.com/TopRamet.Akh"
                    >Top RametAKH</a
                  >
                  <v-icon right small>fab fa-facebook</v-icon>
                </p>

                <a class="white--text" :href="`${adminPage}`" target="_blank">
                  <p>
                    <v-icon class="red--text" left small
                      >fas fa-user-shield</v-icon
                    >For Admin Login
                  </p>
                </a>
              </div>
            </v-flex>
            <v-spacer />
            <v-btn
              class="mr-0 green"
              small
              square
              title="Go to top"
              @click="$vuetify.goTo(0)"
            >
              <v-icon>fas fa-angle-up</v-icon>
            </v-btn>
          </v-layout>
        </v-container>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Header from '~/components/navigations/AppHeader'

export default {
  name: 'Login',
  components: {
    Header,
  },

  computed: {
    adminPage() {
      return `${this.$store.getters.base_url_route}/admin`
    },
  },
}
</script>
