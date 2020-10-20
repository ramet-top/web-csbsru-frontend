<template>
  <div>
    <!--    <Logo />-->
    <Vision />
    <RoomInformation />
  </div>
</template>

<script>
import RoomInformation from '~/components/history/AppRoomInformation'
// import Logo from '~/components/AppLogoCsbsru'
import Vision from '~/components/vison/AppVision'

export default {
  components: {
    RoomInformation,
    // Logo,
    Vision,
  },
  head() {
    return {
      title: 'ประวัติความเป็นมา',
    }
  },
}
</script>

<style lang="scss" scoped></style>
