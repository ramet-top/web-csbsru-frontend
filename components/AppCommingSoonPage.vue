<template>
  <div>
    <v-card>
      <v-responsive :aspect-ratio="16 / 9" class="bgimg"> </v-responsive>
    </v-card>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.bgimg {
  /* Background image */
  background-image: url('../../assets/images/commingSoon.jpg');
  /* Full-screen */
  height: 100%;
  /* Center the background image */
  background-position: center;
  /* Scale and zoom in the image */
  background-size: cover;
  /* Add position: relative to enable absolutely positioned elements inside the image (place text) */
  position: relative;
  /* Add a white text color to all elements inside the .bgimg container */
}
</style>
