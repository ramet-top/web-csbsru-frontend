<template>
  <div>
    <v-parallax src=" https://unsplash.it/1920/1920/?image=1067" height="100">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-1 black--text">
          รายละเอียดกิจกรรม
        </h1>
      </v-card-title>
    </v-parallax>
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
        <v-col v-for="album in activity.album" :key="album.id" cols="12" md="4">
          <v-img
            :src="album.url"
            lazy-src="https://picsum.photos/id/11/100/60"
            aspect-ratio="1"
          ></v-img>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="goback">
          <v-icon left small>fas fa-chevron-left</v-icon>Back</v-btn
        >
      </v-card-actions>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    }
  },

  computed: {
    activity() {
      return this.$store.getters['news/activities/activity']
    },
  },

  created() {
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

    goback() {
      this.$router.push('/')
    },
  },
}
</script>
<style lang="scss" scoped></style>
