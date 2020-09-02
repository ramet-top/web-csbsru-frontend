<template>
  <div>
    <form @submit.prevent="onSubmit">
      <!-- Can be multiple files -->
      <div v-if="image">
        <v-img width="200px" :src="image"></v-img>
        <input type="submit" value="Submit" />
        <v-btn @click="btnRemove">Remove</v-btn>
      </div>
      <input v-else type="file" name="files" @change="onChangFile" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BASE_URL: process.env.BASE_URL || '',
      file: '',
      image: '',
    }
  },

  methods: {
    onChangFile(e) {
      const fileChang = e.target.files
      this.file = fileChang[0]
      this.createImage(fileChang[0])
      console.log('select file now')
    },

    createImage(file) {
      const image = new Image()
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
      console.log('createImage now')
    },

    async onSubmit() {
      const form = new FormData()
      form.append('files', this.file)

      const res = await this.$axios({
        method: 'post',
        url: this.BASE_URL + '/upload',
        data: form,
      }).then(this.$router.push('/'))
    },

    btnRemove() {
      this.file = ''
      this.image = ''
    },
  },
}
</script>
