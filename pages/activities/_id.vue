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
          <v-img :src="item.url" :lazy-src="lazyImage" aspect-ratio="1"></v-img>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$router.push('/news')">
          <v-icon left small>fas fa-chevron-left</v-icon>Back</v-btn
        >
      </v-card-actions>
    </div>
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
  },
}
</script>
<style lang="scss" scoped></style>
