<template>
  <v-parallax src=" https://unsplash.it/1920/1920/?image=1067" height="100">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1 black--text">
        {{ title }}
      </h1>
    </v-card-title>
    <h5 v-if="subTitle" class="text-center font-weight-bold black--text pb-5">
      สาขาวิชาคอมพิวเตอร์ศึกษา มหาวิทยาลัยราชภัฎบ้านสมเด็จเจ้าพระยา
    </h5>
  </v-parallax>
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ['title', 'subTitle'],
}
</script>
