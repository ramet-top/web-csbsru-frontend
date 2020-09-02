<template>
  <div>
    <v-container>
      <Logo />
      <Research />
    </v-container>
  </div>
</template>

<script>
import Research from '~/components/research/AppResearch'
import Logo from '~/components/AppLogoCsbsru'

export default {
  components: {
    Research,
    Logo,
  },
  head() {
    return {
      title: 'ค้นหางานวิจัย',
    }
  },
}
</script>

<style lang="scss" scoped></style>
