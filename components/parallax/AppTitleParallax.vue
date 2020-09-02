<template>
  <v-parallax src=" https://unsplash.it/1920/1920/?image=1067" height="100">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1 black--text">
        {{ title }}
      </h1>
    </v-card-title>
  </v-parallax>
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ['title'],
}
</script>
