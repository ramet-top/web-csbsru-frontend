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

        <div v-else>
          <v-tabs centered color="black">
            <v-tab>
              <v-icon left>fas fa-rss-square</v-icon>
              ข่าวทั่วไป
            </v-tab>
            <v-tab>
              <v-icon left>fas fa-mail-bulk</v-icon>
              ประกาศรับสมัครงาน
            </v-tab>

            <!-- ข่าวทั่วไป -->
            <v-tab-item>
              <v-container fluid>
                <v-data-iterator
                  :items="posts"
                  :items-per-page.sync="itemsPerPage"
                  :footer-props="{ itemsPerPageOptions }"
                >
                  <template v-slot:default="props">
                    <v-row>
                      <template v-for="item in props.items">
                        <AppCardNewLists :key="item.id" :item="item" />
                      </template>
                    </v-row>
                  </template>
                </v-data-iterator>
              </v-container>
            </v-tab-item>

            <!-- ประกาศรับสมัครงาน -->
            <v-tab-item>
              <WorkPosts />
            </v-tab-item>
          </v-tabs>
        </div>
      </v-card>
    </v-tab-item>
  </div>
</template>

<script>
import AppCardNewLists from '~/components/news/AppCardNewLists'
import WorkPosts from '~/components/news/updateNewsActivity/WorkPost'

export default {
  components: {
    AppCardNewLists,
    WorkPosts,
  },
  props: {
    itemsPerPage: {
      type: Number,
      default: 12,
    },
    statusTab: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      itemsPerPageOptions: [4, 8, 10, 20],
      loading: false,
      networkStatus: '',
    }
  },

  computed: {
    posts() {
      return this.$store.getters['news/posts']
    },
  },
  mounted() {
    this.requestPosts()
  },

  methods: {
    async requestPosts() {
      this.loading = true
      await this.$store.dispatch('news/requestPosts')
      this.loading = false
    },
  },

  inject: {
    theme: {
      default: { isDark: false },
    },
  },
}
</script>
