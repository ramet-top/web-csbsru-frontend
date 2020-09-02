<template>
  <div>
    <form @submit.prevent="onSubmit">
      <!-- Can be multiple files -->
      <v-text-field type="file" name="files" @change="onChangFile" />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BASE_URL: process.env.BASE_URL || '',
      file: '',
    }
  },

  methods: {
    async onSubmit() {
      const form = new FormData()
      form.append('files', this.file)

      const res = await this.$axios({
        method: 'post',
        url: this.BASE_URL + '/upload',
        data: form,
      })
    },

    onChangFile(e) {
      this.file = e.target.files[0]

      console.log('select file now' + this.file)
    },
  },
}
</script>
