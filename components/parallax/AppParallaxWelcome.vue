<template>
  <v-parallax :src="ImageUrl">
    <v-layout align-center column justify-center>
      <h1 class="display-2 font-weight-bold mb-4 black--text">Welcome</h1>
    </v-layout>
  </v-parallax>
</template>

<script>
export default {
  data() {
    return {
      ImageUrl: require('~/assets/images/pr.jpeg'),
    }
  },
}
</script>
