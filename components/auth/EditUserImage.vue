<template>
  <div>
    <div class="text-center">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>

    <v-img
      height="300"
      src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"
    >
      <v-row>
        <v-row class="pa-4" align="center" justify="center">
          <v-col class="text-center">
            <v-avatar width="150" height="150">
              <v-img :src="user.imageUrl ? user.imageUrl.url : defaultImage" />
            </v-avatar>

            <br />

            <div class="upload-btn-wrapper">
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                    <v-btn dark text v-on="on">
                      <v-icon left>fas fa-camera</v-icon>แก้ไข
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Update Photo Profile</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row class="align-center">
                          <v-col class="text-center">
                            <img
                              v-if="url"
                              width="200"
                              height="200"
                              :src="url"
                              alt="avatar"
                            />
                            <img
                              v-else
                              width="200"
                              height="200"
                              :src="
                                user.imageUrl ? user.imageUrl.url : defaultImage
                              "
                              alt="avatar"
                            />
                          </v-col>

                          <v-col v-show="true" cols="12" md="6">
                            <h5>อัปเดตรูป profile</h5>
                            <v-file-input
                              v-model="file"
                              :rules="rules"
                              show-size
                              accept="image/png, image/jpeg, image/png"
                              placeholder="Pick an avatar"
                              prepend-icon="fas fa-camera"
                              label="Avatar"
                              clear-icon
                              @change="file ? showImageBeforUpload() : ``"
                            ></v-file-input>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="btnClose"
                        >Close</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="ShowAlertConfirmMessege()"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </div>
            <br />
            <span class="grey--text text--lighten-1"
              >Username : {{ user.username ? user.username : '' }}</span
            >
          </v-col>
        </v-row>
      </v-row>
    </v-img>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      defaultImage: require('~/assets/images/default-profile.jpg'),
      overlay: false,
      dialog: false,
      file: [],
      fileUploadId: '',
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
      ],
      url: null,
    }
  },

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
  },

  methods: {
    showImageBeforUpload() {
      this.url = URL.createObjectURL(this.file)
    },

    btnClose() {
      this.file = []
      this.dialog = false
      this.url = null
    },

    async onSubmitFile() {
      try {
        if (this.user.imageUrl) {
          await this.$axios.$delete(`/upload/files/${this.user.imageUrl.id}`)
        }

        const config = {
          onUploadProgress(progressEvent) {
            _this.uploadPercentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            // console.log(_this.uploadPercentage);
          },
        }

        const _this = this
        const form = new FormData()
        form.append('files', this.file)

        const res = await this.$axios.$post('/upload', form, config)
        console.log(res[0].id)
        this.fileUploadId = await res[0].id

        await this.linkImageUploadToUser()
      } catch (error) {
        console.log(error)
      }
    },

    linkImageUploadToUser() {
      this.$axios
        .$put(`/users/${this.user.id}`, {
          imageUrl: {
            id: this.fileUploadId,
          },
        })
        .then((data) => {
          this.$auth.fetchUser()
        })
    },

    ShowAlertConfirmMessege() {
      if (!this.file.name) {
        this.$Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'กรุณาเลือกรูปที่ต้องการอัปเดต!',
          footer: '<a href>Why do I have this issue?</a>',
        })
      } else {
        this.$Swal
          .fire({
            title: 'คุณต้องการเปลี่ยนรูปโปรไฟล์ ใช่หรือไม่',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
          })
          .then(async (result) => {
            if (result.value) {
              if (this.file && this.url) {
                try {
                  this.dialog = false
                  this.overlay = true
                  await this.onSubmitFile()
                } catch (error) {
                  console.log(error)
                }
              }
              this.overlay = false
              this.$Swal.fire(
                'Updated!',
                'Your file has been deleted.',
                'success'
              )
              // this.$router.go(-1)
            }
          })
      }
    },
  },
}
</script>
<style scoped></style>
