<template>
  <v-container fluid class="mx-auto">
    <Logo />

    <div class="text-center">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>

    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>
          ระบบข่าวประกาศ :
          <v-btn @click="$router.push('/blog')">
            <v-icon left>fas fa-arrow-left</v-icon>
            ก่อนหน้า
          </v-btn>
        </v-toolbar-title>
        <br />
      </v-toolbar>
      <v-tabs centered icons-and-text>
        <v-tab>
          แก้ไข
          <v-icon>far fa-edit</v-icon>
        </v-tab>

        <v-tab-item>
          <v-container>
            <v-text-field
              v-model="postData.title"
              required
              autofocus
              counter="150"
              hint="This field uses counter prop"
              label="* หัวข้อ : "
            ></v-text-field>

            <v-textarea
              v-model="postData.detail"
              counter
              required
              label="* รายละเอียด"
              rows="6"
              row-height="40"
              filled
              auto-grow
            ></v-textarea>

            <v-row>
              <v-col class="d-flex" cols="12" sm="6">
                หมวดหมู่
              </v-col>
            </v-row>

            <v-row>
              <v-col class="d-flex" cols="12" sm="6">
                <v-select
                  v-model="postData.category"
                  :items="items"
                  item-text="text"
                  item-value="state"
                  persistent-hint
                  return-object
                  single-line
                ></v-select>

                <div>state chang:: {{ postData.category.state }}</div>
              </v-col>

              <v-col class="d-flex justify-center" cols="12" sm="6">
                <v-switch
                  v-model="postData.publish"
                  label="เผยแพร่เป็นสาธารณะ"
                ></v-switch>
              </v-col>
            </v-row>
            <v-divider></v-divider>

            <div v-if="!url">
              <v-card class="mx-auto my-5" max-width="200">
                <v-img
                  v-if="postData.imageUrl"
                  class="white--text"
                  :alt="postData.title"
                  :src="postData.imageUrl.url"
                >
                </v-img>
              </v-card>
            </div>

            <v-row>
              <v-col cols="12" class="text-center container" sm="6">
                <form @submit.prevent="onSubmitFile">
                  <v-card v-if="url" class="mx-auto my-5" max-width="200">
                    <v-img :src="url">
                      <v-btn color="red" dark @click="btnRemoveImage">
                        <v-icon left>far fa-times-circle</v-icon>
                        Remove
                      </v-btn>
                    </v-img>
                  </v-card>

                  <h5>อัปเดตรูป</h5>

                  <v-file-input
                    v-model="file"
                    label="File input"
                    outlined
                    accept="image/png, image/jpeg, image/jpg"
                    show-size
                    counter
                    dense
                    required
                    clear-icon
                    prepend-icon="fas fa-camera"
                    :rules="rulesFile"
                    @change="showImageBeforeUpload()"
                  ></v-file-input>
                  <input v-show="true" type="submit" value="Submit" />
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
              <v-row>
                <v-col>
                  <v-btn
                    block
                    rounded
                    color="red darken-1"
                    dark
                    @click="onDeleteData"
                  >
                    <v-icon left>fas fa-trash-alt</v-icon>
                    Delete
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    block
                    rounded
                    color="teal lighten-1"
                    dark
                    @click="onSubmitData"
                  >
                    <v-icon left>fas fa-edit</v-icon>
                    Update
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <div v-if="loading" class="text-center container">
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import Logo from '~/components/AppLogoCsbsru'

export default {
  middleware: ['auth'],
  components: {
    Logo,
  },

  data: () => ({
    overlay: false,
    loading: false,
    uploadPercentage: 0,
    url: null,
    file: [],
    image: '',
    fileUploadId: '',
    imageDeleteId: '',
    result: '',
    items: [
      { state: 'POST', text: 'โพส' },
      { state: 'WORK', text: 'ประกาศสมัครงาน' },
    ],
    postData: {
      id: '',
      title: '',
      detail: '',
      publish: false,
      imageUrl: {
        id: '',
      },
      category: 'POST',
    },
  }),

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
    rules() {
      return [(v) => v.length <= 2000 || 'Max 2000 characters']
    },
    rulesFile() {
      return [
        (value) =>
          !value ||
          value.size < 200000000 ||
          'File size should be less than 200 MB!',
      ]
    },
  },

  mounted() {
    this.fetchPost()
  },

  methods: {
    fetchPost() {
      this.loading = true
      this.$axios.$get(`/posts/${this.$route.params.id}`).then((res) => {
        this.postData = res
        this.loading = false
      })
    },
    showImageBeforeUpload() {
      this.url = URL.createObjectURL(this.file)
    },
    async onSubmitFile() {
      try {
        if (this.postData.imageUrl) {
          await this.$axios
            .$delete('/upload/files/' + this.postData.imageUrl.id)
            .then(function (response) {
              console.log('deleted', response.id)
            })

            .catch(function (error) {
              throw error
            })
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
      } catch (error) {
        console.log(error)
      }
    },
    linkImageUploadToUser() {
      this.$axios
        .$put(`/posts/${this.postData.id}`, {
          imageUrl: {
            id: this.fileUploadId,
          },
        })
        .then((data) => {
          // refresh user state
          this.$auth.fetchUser()
        })
    },
    async onSubmitData() {
      this.overlay = true
      try {
        if (this.file.name) {
          await this.onSubmitFile()
          await this.linkImageUploadToUser()
        }
        this.$axios
          .put(`/posts/${this.postData.id}`, {
            user: this.user.id,
            title: this.postData.title,
            detail: this.postData.detail,
            publish: this.postData.publish,
            // imageUrl: {
            //   id: this.fileUploadId || this.postData.imageUrl.id
            // },
            category: this.postData.category.state,
          })
          .then((data) => {
            let timerInterval
            Swal.fire({
              title: 'Update Success',
              html: 'I will close in <b></b> milliseconds.',
              timer: 2000,
              timerProgressBar: true,
              onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                  Swal.getContent().querySelector(
                    'b'
                  ).textContent = Swal.getTimerLeft()
                }, 100)
              },
              onClose: () => {
                clearInterval(timerInterval)
              },
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                // console.log('I was closed by the timer') // eslint-disable-line
                this.$router.push('/blog')
              }
            })
          })

        this.overlay = false
      } catch (error) {
        console.log(error)
      }
    },
    onDeleteData() {
      return Swal.fire({
        title: 'คุณแน่ใจหรือไม่ที่จะลบโพส?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.value) {
          this.overlay = true
          const delPhoto = await this.$axios.$delete(
            `/upload/files/${this.postData.imageUrl.id}`
          )

          if (delPhoto) {
            await this.$axios.$delete(`/posts/${this.postData.id}`)

            this.overlay = false
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            // this.goBack()
            this.$router.go('/blog')
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'ไม่สามารถลบข้อมูลได้ ',
              footer: 'กรุณาลองใหม่ภายหลัง!',
            })
          }
        }
      })
    },
    btnRemoveImage() {
      this.url = null
      this.file = []
    },
  },
}
</script>
