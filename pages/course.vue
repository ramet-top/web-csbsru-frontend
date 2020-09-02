<template>
  <div>
    <Course />
  </div>
</template>

<script>
import Course from '~/components/course/AppCourse'

export default {
  components: {
    Course,
  },
  head() {
    return {
      title: 'หลักสูตร',
    }
  },
}
</script>

<style lang="scss" scoped></style>
