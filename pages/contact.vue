<template>
  <div>
    <Contact />
  </div>
</template>

<script>
import Contact from '~/components/contact/AppContact'

export default {
  components: {
    Contact,
  },
  head() {
    return {
      title: 'ติดต่อ',
    }
  },
}
</script>

<style lang="scss" scoped></style>
