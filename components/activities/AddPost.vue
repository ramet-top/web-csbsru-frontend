<template>
  <div>
    <v-container>
      <v-text-field
        v-model.trim="title"
        required
        autofocus
        :rules="rules"
        counter="150"
        hint="This field uses counter prop"
        label="* หัวข้อ : "
      ></v-text-field>

      <v-textarea
        v-model.trim="detail"
        counter
        required
        label="* รายละเอียด"
        rows="6"
        row-height="40"
        filled
        auto-grow
        :rules="rules"
      ></v-textarea>

      <!-- for category -->
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">หมวดหมู่</v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            v-model="select"
            :items="items"
            item-text="text"
            item-value="state"
            persistent-hint
            return-object
            single-line
          ></v-select>
        </v-col>

        <v-col class="d-flex justify-center" cols="12" sm="6">
          <v-switch v-model="publicPost" label="เผยแพร่เป็นสาธารณะ"></v-switch>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <!-- for file upload  -->
      <v-row>
        <v-col cols="12" class="text-center container" sm="6">
          <form @submit.prevent="onSubmitFile">
            <h5>อัปโหลดไฟล์</h5>

            <v-file-input
              v-model="file"
              label="File input"
              outlined
              accept="image/png, image/jpeg, image/jpg"
              dense
              show-size
              counter
              required
              clear-icon
              prepend-icon="fas fa-camera"
              :rules="rulesFile"
            ></v-file-input>
            <input v-show="false" type="submit" value="Submit file" />
          </form>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <div v-if="loading" class="text-center container">
        <v-progress-circular
          :rotate="360"
          :size="100"
          :width="15"
          :value="uploadPercentage"
          color="primary"
        >
          {{ uploadPercentage }}
        </v-progress-circular>
      </div>

      <div class="text-center">
        <v-btn block rounded color="primary" dark @click="onSubmitData"
          >submit</v-btn
        >
      </div>
      <div v-if="loading" class="text-center container">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data: () => ({
    publicPost: true,
    loading: false,
    title: '',
    detail: '',

    file: [],
    fileUploadId: '',
    rulesFile: [
      (value) =>
        !value ||
        value.size < 200000000 ||
        'File size should be less than 200 MB!',
    ],

    rules: [(v) => v.length <= 200 || 'Max 200 characters'],
    result: '',

    select: {
      state: 'POST',
    },
    items: [
      { state: 'POST', text: 'โพส' },
      { state: 'WORK', text: 'ประกาศสมัครงาน' },
    ],

    uploadPercentage: 0,
  }),

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
  },

  methods: {
    async onSubmitFile() {
      const _this = this
      try {
        const config = {
          onUploadProgress(progressEvent) {
            _this.uploadPercentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            // console.log(_this.uploadPercentage);
          },
        }

        const form = new FormData()
        form.append('files', this.file)

        const res = await this.$axios.$post('/upload', form, config)
        this.fileUploadId = await res[0].id
      } catch (error) {
        console.log(error)
      }
    },

    async onSubmitData() {
      if (this.title && this.detail) {
        const checkMatchData = await this.$axios.$get(
          `/posts?title=${this.title}`
        )

        if (checkMatchData.length) {
          return this.$Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'มีหัวข้อชื่อนี้แล้ว!',
          })
        }
        this.loading = true
        if (this.file.name) {
          await this.onSubmitFile()
        }

        this.$axios
          .$post('/posts', {
            title: this.title,
            detail: this.detail,
            category: this.select.state,
            publish: this.publicPost,
            user: this.user.id || '',
            imageUrl: this.fileUploadId ? this.fileUploadId : '',
          })
          .then((response) => {
            this.$router.go('/blog')
          })
          .catch((error) => {
            throw error
          })

        this.loading = false
      } else {
        this.$Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ!',
        })
      }
    },
  },
}
</script>
