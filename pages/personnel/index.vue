<template>
  <div>
    <Logo />
    <Personnel />
  </div>
</template>

<script>
import Personnel from '~/components/personnel/AppPersonnel'
import Logo from '~/components/AppLogoCsbsru'
export default {
  components: {
    Personnel,
    Logo,
  },
  head() {
    return {
      title: 'บุคลากรในสาขา',
    }
  },
}
</script>

<style lang="scss" scoped></style>
