<template>
  <div>
    <AppTitleParallax :title="titleParallax" />
    <v-progress-circular
      v-if="loading"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>

    <div v-else class="container">
      <div v-if="activity.imageUrl" id="banner">
        <h1>{{ activity.title }}</h1>
      </div>

      <v-container>{{ activity.detail }}</v-container>

      <v-row>
        <v-col v-for="item in activity.images" :key="item.id" cols="12" md="4">
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              @click="toggleImageClick(item)"
            >
              <v-img
                :src="item.url"
                :lazy-src="lazyImage"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$router.push('/news')">
          <v-icon left small>fas fa-chevron-left</v-icon>
          Back
        </v-btn>
      </v-card-actions>
    </div>

    <v-dialog v-model="dialog" width="960px">
      <v-card>
        <v-img :src="itemSelected ? itemSelected.url : ''"> </v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AppTitleParallax from '~/components/parallax/AppTitleParallax'

export default {
  components: {
    AppTitleParallax,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      itemSelected: null,
    }
  },

  computed: {
    activity() {
      return this.$store.getters['news/activities/activity']
    },
    lazyImage() {
      return this.$store.getters.lazyImage
    },
    titleParallax() {
      return 'รายละเอียดกิจกรรม'
    },
  },

  mounted() {
    this.requestActivity()
  },

  methods: {
    requestActivity() {
      this.loading = true
      this.$store.dispatch(
        'news/activities/requestActivities',
        this.$route.params.id
      )
      this.loading = false
    },
    toggleImageClick(value) {
      this.itemSelected = value
      this.dialog = true
    },
  },
}
</script>
<style lang="scss" scoped></style>
