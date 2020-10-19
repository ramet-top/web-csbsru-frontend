<template>
  <div>
    <v-tab-item>
      <v-card>
        <div v-if="loading" class="text-center container">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
          <v-row>
            <v-col cols="12" xl="3" lg="4" md="4" sm="6">
              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class="px-3 pt-3 pb-3"
              >
                <v-skeleton-loader
                  class="mx-auto"
                  max-width="300"
                  type="card"
                ></v-skeleton-loader>
              </v-sheet>
            </v-col>
            <v-col cols="12" xl="3" lg="4" md="4" sm="6">
              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class="px-3 pt-3 pb-3"
              >
                <v-skeleton-loader
                  class="mx-auto"
                  max-width="300"
                  type="card"
                ></v-skeleton-loader>
              </v-sheet>
            </v-col>
            <v-col cols="12" xl="3" lg="4" md="4" sm="6">
              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class="px-3 pt-3 pb-3"
              >
                <v-skeleton-loader
                  class="mx-auto"
                  max-width="300"
                  type="card"
                ></v-skeleton-loader>
              </v-sheet>
            </v-col>
          </v-row>
        </div>

        <v-container v-else>
          <v-tabs centered color="black">
            <v-tab><v-icon left>fas fa-photo-video</v-icon>กิจกรรม</v-tab>

            <v-tab-item>
              <v-container fluid>
                <v-data-iterator
                  :items="activities"
                  :items-per-page.sync="itemsPerPage"
                  :footer-props="{ itemsPerPageOptions }"
                >
                  <template v-slot:default="props">
                    <v-row>
                      <template v-for="item in props.items">
                        <AppCardActivitiesLists :key="item.id" :item="item" />
                      </template>
                    </v-row>
                  </template>
                </v-data-iterator>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-container>
      </v-card>
    </v-tab-item>
  </div>
</template>

<script>
import AppCardActivitiesLists from '~/components/news/AppCardActivitiesLists'
export default {
  components: {
    AppCardActivitiesLists,
  },
  props: {
    itemsPerPage: {
      type: Number,
      default: 12,
    },
  },

  data() {
    return {
      loading: false,
      itemsPerPageOptions: [3, 6, 9, 12],
    }
  },

  computed: {
    activities() {
      console.log(
        'activities',
        this.$store.getters['news/activities/activities']
      )
      return this.$store.getters['news/activities/activities']
    },
  },

  mounted() {
    // this.requestActivities()
  },

  methods: {
    requestActivities() {
      this.loading = true
      this.$store.dispatch('news/activities/requestActivities')
      this.loading = false
    },
  },

  inject: ['theme'],
}
</script>
<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  /* width: 100%; */
}
</style>
