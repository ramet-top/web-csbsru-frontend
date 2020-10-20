<template>
  <div>
    <Logo />
    <NewsUpdateAndActivity />
  </div>
</template>

<script>
import NewsUpdateAndActivity from '~/components/news/updateNewsActivity/All'
import Logo from '~/components/AppLogoCsbsru'

export default {
  components: {
    NewsUpdateAndActivity,
    Logo,
  },
  head() {
    return {
      title: 'ข่าวประกาศ',
    }
  },
}
</script>
