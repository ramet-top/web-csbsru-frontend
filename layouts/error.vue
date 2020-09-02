<template>
  <v-app dark>
    <v-card>
      <v-responsive :aspect-ratio="16 / 9">
        <v-card-text>
          This card will always be 16:9 (unless you put more stuff in it)
          <h1 v-if="error.statusCode === 404">{{ pageNotFound }}</h1>
          <h1 v-else>{{ otherError }}</h1>
          <NuxtLink to="/">Home page</NuxtLink>
        </v-card-text>
      </v-responsive>
    </v-card>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
