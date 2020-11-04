<template>
  <div>
    <v-card flat class="mx-auto">
      <v-responsive>
        <v-card-title>
          <v-icon left>fas fa-tasks</v-icon>
          ระบบจัดการบัณฑิตนิพนธ์
        </v-card-title>
        <v-divider></v-divider>

        <clientOnly>
          <v-tabs centered>
            <v-tab>3.อนุมัติการสอบหัวข้อ(โครงงาน)</v-tab>

            <v-tab-item>
              <v-card flat>
                <v-container
                  v-if="
                    projectData.status === 'NONE' ||
                    projectData.status === 'DEFAULT'
                  "
                >
                  <v-parallax
                    style="opacity: 0.7"
                    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
                  >
                    <v-row align="center" justify="center">
                      <v-col class="text-center" cols="12">
                        <v-col class="text-center" cols="12">
                          <div
                            v-if="projectData.status === 'NONE'"
                            class="mb-4"
                          >
                            <h3 class="red">คำขอของคุณ ไม่ผ่าน! การอนุมัติ</h3>
                          </div>
                          <h1 class="display-1 font-weight-thin mb-4">
                            สถานะการส่งคำขอของคุณ!
                          </h1>
                          <h4 class="subheading">
                            - รอการอนุมัติจากอาจารย์ที่ปรึกษาโครงงาน -
                          </h4>
                          <h4>
                            วันที่ส่งคำขอ |
                            {{
                              $moment(projectData.createdAt).format(
                                'Do MMMM YYYY'
                              )
                            }}
                          </h4>
                          <p>
                            หมายเหตุ! สามารถยกเลิกคำขอได้หลัง 14 วัน
                            ถ้าหากอาจารย์ยังไม่ตอบรับ
                          </p>
                          <div class="my-2">
                            <v-btn
                              color="warning"
                              dark
                              @click="cancelFormRequestFromStudent()"
                            >
                              ยกเลิก
                            </v-btn>
                          </div>
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-parallax>
                </v-container>

                <v-container v-else class="mx-auto">
                  <v-flex>
                    <div>
                      <!--          ข้อมูลหัวข้อ และรายละเอียดโครงงาน-->
                      <AppProjectTitleDetail
                        :project-data="projectData"
                        :typeof-disabled="typeofDisabled"
                      />
                    </div>

                    <v-card-text>
                      <div class="container">
                        <AppProjectDetailOfUsers
                          :project="project"
                          :professor-of-user="pro_adUser"
                        />
                      </div>
                    </v-card-text>

                    <div>
                      <AppDateTimeConfirmProject
                        :title="`กำหนดวันขึ้นสอบหัวข้อ`"
                        :project="project"
                        :type="dateTimeConfirmShowOnly"
                      />
                    </div>

                    <div>
                      <!--                        for process comment-->
                      <AppProjectComments
                        v-if="true"
                        :project="projectData"
                      ></AppProjectComments>

                      <div>
                        เกณท์คะแนนการผ่านสอบ(กรรมการสอบจะประชุมแล้วอนุมัติ) :
                        <v-chip
                          v-if="scores.length"
                          class="ma-2"
                          outlined
                          color="green"
                        >
                          <v-avatar left>
                            <v-icon>fas fa-user-circle</v-icon>
                          </v-avatar>
                          ผ่าน +{{ scores.length }}
                        </v-chip>

                        <v-chip
                          v-else
                          class="ma-2"
                          outlined
                          color="blue darken-1"
                        >
                          <v-avatar left>
                            <v-icon>fas fa-user-circle</v-icon>
                          </v-avatar>
                          ยังไม่โหวต
                        </v-chip>
                      </div>

                      <v-divider></v-divider>

                      <p><strong>สถานะ : </strong></p>

                      <v-row
                        v-if="checkDateShowStatus"
                        justify="center"
                        align="start"
                      >
                        <v-chip color="primary" large draggable class="px-8">
                          <v-icon left>fas fa-poll</v-icon>
                          รอผลสอบ
                        </v-chip>
                      </v-row>

                      <v-row v-else justify="center" align="start">
                        <v-chip
                          v-if="projectData.status === 'SUCCESS'"
                          large
                          draggable
                          class="px-8"
                          color="green"
                          text-color="white"
                        >
                          <v-avatar left>
                            <v-icon>far fa-check-circle</v-icon>
                          </v-avatar>
                          ผ่านการสอบ
                        </v-chip>

                        <v-chip
                          v-else
                          color="orange"
                          large
                          draggable
                          class="px-8"
                        >
                          <v-icon left>far fa-calendar-alt</v-icon>
                          รอขึ้นสอบตามวันเวลาที่กำหนด
                        </v-chip>
                      </v-row>

                      <!--                        upload file project full-->
                      <!--                      <v-row v-if="projectData.status === 'SUCCESS'">-->
                      <!--                        <v-col cols="12" class="text-center container" sm="6">-->
                      <!--                          <v-form ref="form" v-model="valid" lazy-validation>-->
                      <!--                            <h3>อัปโหลดไฟล์เอกสารตัวเต็ม .PDF</h3>-->
                      <!--                            <p>-->
                      <!--                              ชื่อไฟล์ในระบบ :-->
                      <!--                              {{-->
                      <!--                                project.fileFull-->
                      <!--                                  ? project.fileFull.name-->
                      <!--                                  : 'ไม่มีไฟล์'-->
                      <!--                              }}-->
                      <!--                              ( size :-->
                      <!--                              {{-->
                      <!--                                project.fileFull-->
                      <!--                                  ? bytesToSize(project.fileFull.size)-->
                      <!--                                  : 'N/A'-->
                      <!--                              }}-->
                      <!--                              )-->
                      <!--                            </p>-->

                      <!--                            <v-file-input-->
                      <!--                              v-if="isEditing"-->
                      <!--                              v-model="file"-->
                      <!--                              label="File input"-->
                      <!--                              :disabled="!isEditing"-->
                      <!--                              outlined-->
                      <!--                              accept=".pdf"-->
                      <!--                              dense-->
                      <!--                              show-size-->
                      <!--                              counter-->
                      <!--                              clear-icon-->
                      <!--                              color="white"-->
                      <!--                              :rules="rulesFile"-->
                      <!--                            ></v-file-input>-->

                      <!--                            <v-file-input-->
                      <!--                              v-else-->
                      <!--                              v-model="file"-->
                      <!--                              label="File input"-->
                      <!--                              :disabled="!isEditing"-->
                      <!--                              outlined-->
                      <!--                              accept=".pdf"-->
                      <!--                              dense-->
                      <!--                              show-size-->
                      <!--                              counter-->
                      <!--                              clear-icon-->
                      <!--                            ></v-file-input>-->

                      <!--                            <div-->
                      <!--                              v-if="loadingUpLoadFile"-->
                      <!--                              class="text-center container"-->
                      <!--                            >-->
                      <!--                              <v-progress-circular-->
                      <!--                                :size="50"-->
                      <!--                                color="primary"-->
                      <!--                                indeterminate-->
                      <!--                              ></v-progress-circular>-->
                      <!--                            </div>-->

                      <!--                            <div v-else>-->
                      <!--                              <v-btn-->
                      <!--                                v-if="isEditing"-->
                      <!--                                :disabled="!file['name']"-->
                      <!--                                tile-->
                      <!--                                outlined-->
                      <!--                                color="success"-->
                      <!--                                @click="onSubmitFile"-->
                      <!--                              >-->
                      <!--                                <v-icon left>fas fa-file-word</v-icon>-->
                      <!--                                อัปโหลดไฟล์ / อัปเดตไฟล์-->
                      <!--                              </v-btn>-->

                      <!--                              <v-btn-->
                      <!--                                dark-->
                      <!--                                outlined-->
                      <!--                                color="indigo"-->
                      <!--                                @click="clearState"-->
                      <!--                              >-->
                      <!--                                <v-icon v-if="isEditing"-->
                      <!--                                  >far fa-window-close-->
                      <!--                                </v-icon>-->
                      <!--                                <v-icon v-else>fas fa-file-pdf</v-icon>-->
                      <!--                              </v-btn>-->
                      <!--                            </div>-->
                      <!--                          </v-form>-->
                      <!--                          <v-snackbar v-model="hasSaved" :timeout="timeout"-->
                      <!--                            >อัปเดตไฟล์สำเร็จ-->
                      <!--                          </v-snackbar>-->
                      <!--                        </v-col>-->
                      <!--                      </v-row>-->

                      <br />
                    </div>
                  </v-flex>
                </v-container>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </clientOnly>
      </v-responsive>
    </v-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { QUERY_SINGLE_PROJECT_FOR_COMMENTS } from '@/graphql/queries/projects.js'
import { QUERY_WHERE_USERID_AND_PROJECTID } from '@/graphql/queries/scores.js'

import AppProjectTitleDetail from '~/components/projects/AppProjectTitleDetail'
import AppProjectDetailOfUsers from '~/components/projects/AppProjectDetailOfUsers'
import AppDateTimeConfirmProject from '~/components/projects/AppDateTimeConfirmProject'
import AppProjectComments from '~/components/projects/AppProjectComments'

export default {
  middleware: ['isNotAuth'],

  components: {
    AppProjectTitleDetail,
    AppProjectDetailOfUsers,
    AppDateTimeConfirmProject,
    AppProjectComments,
  },

  // eslint-disable-next-line
  props: ['projectData'],

  data: () => ({
    snackbar: false,
    timeout: 1500,
    scores: {},
    project: {},
    commentData: {
      detail: '',
    },
    dateNow: new Date(),
    date: '',
    rulesOptionnal: [(v) => v.length <= 200 || 'Max 200 characters'],
    rules: [
      (v) => !!v || 'Item is required',
      (v) => v.length <= 200 || 'Max 200 characters',
    ],
    dialog: false,
    // success state
    loadingUpLoadFile: false,
    hasSaved: false,
    valid: false,

    // for file upload
    file: [],
    fileUploadId: '',
    isEditing: null,
    showUserDetail: {
      prefix: '',
      firstName: '',
      lastName: '',
      imageUrl: {
        url: '',
      },
    },
    pro_adUser: {},
    typeofDisabled: {
      btnTitleDisabled: true,
      textArea: true,
    },
    dateTimeConfirmShowOnly: true,
  }),

  computed: {
    checkDateShowStatus() {
      const dateN = this.$moment(this.dateNow).format('LL')
      const dateInProject = this.$moment(this.projectData.finalDate).format(
        'LL'
      )
      return dateN >= dateInProject
    },
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
          value.size < 1500000000 ||
          'File size should be less than 150 MB!',
      ]
    },
  },

  methods: {
    findProAd() {
      try {
        const url = `/users/${this.projectData.pro_ad}`
        this.$axios.$get(url).then((result) => {
          this.pro_adUser = result
          // console.log('test', result)
        })
      } catch (error) {
        console.log('findProAd permission', error)
      }
    },
    cancelFormRequestFromStudent() {
      Swal.fire({
        title: 'คุณต้องการยกเลิกคำขอหรือไม่?',
        text: 'คุณสามารถส่งฟอร์มได้อีกครั้ง ในภายหลัง!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes !',
      }).then((result) => {
        if (result.value) {
          // before delete image
          if (this.projectData.fileUrl) {
            this.$axios
              .$delete('/upload/files/' + this.projectData.fileUrl.id)
              .then((response) => {
                console.log('file delete now: ', response.id)
              })
              .catch((error) => {
                console.log(error)
              })
          }

          // after delete project form
          this.$axios
            .$delete('/projects/' + this.projectData.id)
            .then(async (response) => {
              await Swal.fire('Success!', 'ยกเลิกการส่งเรียบร้อย', 'success')
              this.$router.go('.')
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
    },
  },
  apollo: {
    project: {
      query: QUERY_SINGLE_PROJECT_FOR_COMMENTS,
      prefetch: true,
      fetchPolicy: 'network-only',
      variables() {
        return { id: this.projectData.id }
      },
      result({ data, loading, networkStatus }) {
        this.loading = loading
        this.showUserDetail = data.project.user
        this.findProAd()
        // console.log('test', data)
      },
      error(data) {
        this.error = data
      },
    },
    // for score of project
    scores: {
      query: QUERY_WHERE_USERID_AND_PROJECTID,
      prefetch: true,
      fetchPolicy: 'network-only',
      variables() {
        return {
          where: {
            // user: this.user.id,
            project: this.projectData.id,
            status: true,
          },
        }
      },
      result({ data, loading, networkStatus }) {},
      error(data) {
        this.error = data
      },
    },
  },
}
</script>
