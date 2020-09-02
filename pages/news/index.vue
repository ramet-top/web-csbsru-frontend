<template>
  <div>
    <NewsUpdateAndActivity />
  </div>
</template>

<script>
import NewsUpdateAndActivity from '~/components/news/updateNewsActivity/All'

export default {
  components: {
    NewsUpdateAndActivity,
  },
  head() {
    return {
      title: 'ข่าวประกาศ',
    }
  },
}
</script>
