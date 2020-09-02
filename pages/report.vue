<template>
  <div>
    <Logo />
    <Report />
  </div>
</template>

<script>
import Report from '~/components/report/AppDashboardAndReport'
import Logo from '~/components/AppLogoCsbsru'

export default {
  components: {
    Report,
    Logo,
  },
  head() {
    return {
      title: 'แดชบอร์ดและรายงาน',
    }
  },
  middleware: ['isNotAuth', 'isProfessor'],
}
</script>

<style lang="scss" scoped></style>
