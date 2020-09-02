<template>
  <div>
    <DownloadFile />
  </div>
</template>

<script>
import DownloadFile from '~/components/download/AppDownloadFile'

export default {
  components: {
    DownloadFile,
  },
  head() {
    return {
      title: 'ดาวน์โหลด',
    }
  },
}
</script>
