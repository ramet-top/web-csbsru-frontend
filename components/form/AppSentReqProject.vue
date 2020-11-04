<template>
  <v-card>
    <v-container>
      <v-card-title>
        <v-icon left>fas fa-tasks</v-icon>
        ระบบจัดการบัณฑิตนิพนธ์
      </v-card-title>
      <v-divider></v-divider>

      <v-tabs centered>
        <v-tab>1.ลงทะเบียนสอบหัวข้อ/อัปโหลดไฟล์บทที่ 1</v-tab>
        <v-tab disabled>2.รออนุมัติการสอบหัวข้อ(โครงงาน)</v-tab>

        <v-tab-item>
          <v-card flat>
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="projectCreate.title"
                  required
                  :rules="rules"
                  counter="150"
                  label="หัวข้อโครงงาน *"
                  autofocus
                ></v-text-field>

                <v-textarea
                  v-model="projectCreate.detail"
                  counter
                  required
                  label="รายละเอียด *"
                  rows="4"
                  row-height="40"
                  filled
                  auto-grow
                  :rules="rules"
                ></v-textarea>

                <v-row>
                  <v-col cols="12" class="text-center container" sm="6">
                    <h3>อัปโหลดไฟล์เอกสารบทที่ 1 (.doc, .docx)</h3>
                    <v-file-input
                      v-model="file"
                      label="File input"
                      outlined
                      accept=".doc, .docx"
                      dense
                      show-size
                      counter
                      required
                      clear-icon
                      :rules="rulesFile"
                    ></v-file-input>

                    <v-btn v-show="false" @click="onSubmitFile">submit</v-btn>
                  </v-col>
                </v-row>

                <v-divider></v-divider>
                <!--                <pre>{{ users }}</pre>-->

                <v-row justify="center" align="start">
                  <v-card-text>
                    <div class="title">
                      <v-icon left small>fas fa-user-plus</v-icon>
                      อาจารย์ที่ปรึกษาโครงงาน
                    </div>
                  </v-card-text>
                </v-row>
                <v-select
                  v-model="projectCreate.pro_ad"
                  label="อาจารย์สำหรับให้คำปรึกษา(โครงงาน) *"
                  :item-text="
                    (item) =>
                      `${item.prefix}${item.firstName}  ${item.lastName}`
                  "
                  item-value="id"
                  append-icon="fas fa-check-double"
                  :items="users"
                  :rules="[(v) => !!v || 'กรุณาเลือกอาจารย์ที่ปรึกษาโครงงาน']"
                  required
                >
                  <template slot="item" slot-scope="data">
                    <v-list>
                      <v-list-item-avatar>
                        <v-img
                          :src="
                            data.item.imageUrl
                              ? data.item.imageUrl.url
                              : defaultImage
                          "
                        ></v-img>
                      </v-list-item-avatar>
                    </v-list>

                    <p>
                      {{ data.item.prefix }}&nbsp;
                      {{ data.item.firstName }}&nbsp;
                      {{ data.item.lastName }}
                    </p>
                  </template>
                </v-select>

                <div class="text-center">
                  <v-btn
                    :disabled="!valid"
                    block
                    rounded
                    class="ma-2"
                    color="primary"
                    @click="onSubmitData"
                  >
                    ส่งข้อมูล
                  </v-btn>

                  <!-- {{ users }} -->
                </div>

                <div v-if="loading" class="text-center container">
                  <v-progress-circular
                    :rotate="360"
                    :size="100"
                    :width="15"
                    :value="uploadPercentage"
                    color="primary"
                    >{{ uploadPercentage }}
                  </v-progress-circular>
                </div>
              </v-form>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-card>
</template>

<script>
import Swal from 'sweetalert2'
import { QUERY_USERS_PROFESSOR_ALL } from '@/graphql/queries/users'

export default {
  data() {
    return {
      roleName: 'AuthProfessor',
      userRoleAuthProfessor: [],
      users: [],
      projectCreate: {
        title: '',
        detail: '',
        status: 'DEFAULT',
        pro_ad: '',
      },
      valid: false,
      loading: false,
      file: [],
      fileUploadId: '',
      uploadPercentage: 0,
    }
  },

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
    defaultImage() {
      return this.$store.getters.defaultImage
    },
    rulesFile() {
      return [
        (value) =>
          !value ||
          value.size < 25000000 ||
          'กรุณาอัปโหลดไฟล์เอกสารบทที่ 1 ของโครงงาน ขนาดไม่เกิน 25 MB! (File Word)',
      ]
    },
    rules() {
      return [
        (v) => !!v || 'กรุณากรอกข้อมูล!',
        (v) => v.length <= 200 || 'Max 200 characters',
      ]
    },
  },

  apollo: {
    users: {
      query: QUERY_USERS_PROFESSOR_ALL,
      prefetch: true,
      variables() {
        return {
          where: {
            role: {
              name: this.roleName,
            },
          },
        }
      },
      result({ data, loading, networkStatus }) {
        this.loading = loading
      },
      error(data) {
        this.error = data
        console.log(data)
      },
    },
  },

  mounted() {
    // this.reqUserRoleAuthProfessor()
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
          },
        }

        const form = new FormData()
        form.append('files', this.file)
        const res = await this.$axios.$post('/upload', form, config)
        console.log(res[0].id)
        this.fileUploadId = await res[0].id
      } catch (error) {
        console.log(error)
      }
    },
    async onSubmitData() {
      if (this.$refs.form.validate()) {
        const checkMatchData = await this.$axios.$get(
          `projects/?title=${this.projectCreate.title}`
        )

        // checkMatchData;
        if (checkMatchData.length) {
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'มีหัวข้อชื่อนี้แล้ว!',
          })
        }
        this.loading = true

        await this.onSubmitFile()

        this.loading = false

        await this.$axios
          .$post('/projects', {
            user: this.user.id,
            title: this.projectCreate.title,
            detail: this.projectCreate.detail,
            status: this.projectCreate.status || 'DEFAULT',
            confirm: true,
            fileUrl: {
              id: this.fileUploadId,
            },
            pro_ad: this.projectCreate.pro_ad,
          })
          .then(async (response) => {
            console.log('res data create success: ' + response.id)
            await Swal.fire(
              'คุณได้ส่งคำขอแล้ว กรุณารออาจารย์ตรวจสอบข้อมูล!',
              'You clicked the button!',
              'success'
            )
            await this.$router.go()
            // this.$auth.fetchUser()
          })
          .catch((error) => {
            throw error
          })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ!',
        })
      }
    },
    reqUserRoleAuthProfessor() {
      // this.$store
      //   .dispatch('projects/students/userRoleAuthProfessor', this.roleName)
      //   .then(() => {})

      this.$axios.$get(`/users?role.name=${this.roleName}`).then((result) => {
        console.log()
        this.userRoleAuthProfessor = result
      })
      // if (res) {
      //   this.users.dispatch('projects/students/setUsers', res)
      // }
    },
  },
}
</script>
