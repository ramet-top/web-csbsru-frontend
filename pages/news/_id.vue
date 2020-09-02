<template>
  <section>
    <v-parallax src="https://unsplash.it/1920/1920/?image=1067" height="80">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-1 black--text">ข่าวประกาศ</h1>
      </v-card-title>
    </v-parallax>

    <v-progress-circular
      v-if="loading"
      :size="50"
      color="primary"
      indeterminate
    />

    <v-container class="mx-auto">
      <v-card class="mx-auto" max-width="800px">
        <v-img
          height="500px"
          contain
          :src="post.imageUrl ? post.imageUrl.url : defaultImage"
          :lazy-src="lazyImage"
        ></v-img>

        <v-card-text>
          <v-divider></v-divider>
          <span v-if="post.user" class="text--primary">
            <strong>ผู้แต่ง :</strong>
            {{ post.user.firstName }}
          </span>
          <br />
          <span class="text--primary">
            <strong>(โพสเมื่อ) วันที่ :</strong>
            {{ $moment(post.createdAt).format('Do MMMM YYYY, h:mm:ss a') }}
          </span>
          <br />
          <span class="text--primary">
            <strong>(อัปเดตล่าสุด) วันที่ :</strong>
            {{ $moment(post.updatedAt).format('Do MMMM YYYY, h:mm:ss a') }}
          </span>
          <br />
          <v-divider></v-divider>
          <span class="text--primary">
            <strong>หัวข้อ :</strong>
            {{ post.title }}
          </span>
          <br />
          <span class="text--primary">
            <strong>เนื้อหา :</strong>
          </span>
          <v-container>
            <p>{{ post.detail }}</p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="goback">
            <v-icon left small>fas fa-chevron-left</v-icon>Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loading: false,
    }
  },

  computed: {
    post() {
      return this.$store.getters['news/post']
    },
    defaultImage() {
      return this.$store.getters.defaultImage
    },
    lazyImage() {
      return this.$store.getters.lazyImage
    },
  },

  mounted() {
    this.fetchPost()
  },

  methods: {
    fetchPost() {
      this.loading = true
      this.$store.dispatch('news/requestPosts', this.$route.params.id)
      this.loading = false
    },
    goback() {
      this.$router.go(-1)
    },
  },
}
</script>
