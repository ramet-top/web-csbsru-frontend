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
                    style="opacity: 0.7;"
                    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
                  >
                    <v-row align="center" justify="center">
                      <v-col class="text-center" cols="12">
                        <v-col class="text-center" cols="12">
                          <div
                            v-if="projectData.status === 'NONE'"
                            class="mb-4"
                          >
                            <h3 class="red">
                              คำขอของคุณ ไม่ผ่าน! การอนุมัติ
                            </h3>
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
                      <div v-if="true">
                        <!--                        <div>-->
                        <!--                          <h3>Latest Comments</h3>-->
                        <!--                          <v-row>-->
                        <!--                            <v-responsive-->
                        <!--                              class="overflow-y-auto"-->
                        <!--                              max-height="400"-->
                        <!--                            >-->
                        <!--                              <v-responsive height="200vh" class="pa-2">-->
                        <!--                                <div>-->
                        <!--                                  <v-list three-line subheader>-->
                        <!--                                    <v-subheader inset>ล่าสุด</v-subheader>-->

                        <!--                                    <v-list-item-->
                        <!--                                      v-for="item in project.comments"-->
                        <!--                                      :key="item.title"-->
                        <!--                                    >-->
                        <!--                                      <v-list-item-avatar-->
                        <!--                                        v-if="item.user.imageUrl"-->
                        <!--                                      >-->
                        <!--                                        <v-img-->
                        <!--                                          :src="item.user.imageUrl.url"-->
                        <!--                                        ></v-img>-->
                        <!--                                      </v-list-item-avatar>-->
                        <!--                                      <v-list-item-avatar v-else>-->
                        <!--                                        <v-img-->
                        <!--                                          :src="defaultImage"-->
                        <!--                                          alt="defaultImage"-->
                        <!--                                        ></v-img>-->
                        <!--                                      </v-list-item-avatar>-->

                        <!--                                      <v-list-item-content>-->
                        <!--                                        <v-list-item-title>-->
                        <!--                                          {{ item.user.prefix }}-->
                        <!--                                          {{ item.user.firstName }}-->
                        <!--                                          {{ item.user.lastName }}-->
                        <!--                                        </v-list-item-title>-->
                        <!--                                        <v-list-item-subtitle>-->
                        <!--                                          {{-->
                        <!--                                            $moment(item.updaedAt).format('LLL')-->
                        <!--                                          }}-->
                        <!--                                          น.-->
                        <!--                                        </v-list-item-subtitle>-->
                        <!--                                        <v-list-item-subtitle>-->
                        <!--                                          comment:-->
                        <!--                                          {{ item.detail }}-->
                        <!--                                        </v-list-item-subtitle>-->
                        <!--                                      </v-list-item-content>-->

                        <!--                                      <v-list-item-action-->
                        <!--                                        v-if="item.user.id == user.id"-->
                        <!--                                      >-->
                        <!--                                        <v-row>-->
                        <!--                                          <v-btn-->
                        <!--                                            text-->
                        <!--                                            @click="delComment(item.id)"-->
                        <!--                                          >-->
                        <!--                                            <v-icon>fas fa-trash</v-icon>-->
                        <!--                                          </v-btn>-->

                        <!--                                          <v-dialog-->
                        <!--                                            v-model="dialog"-->
                        <!--                                            persistent-->
                        <!--                                            max-width="600px"-->
                        <!--                                          >-->
                        <!--                                            <template v-slot:activator="{ on }">-->
                        <!--                                              <v-btn text v-on="on">-->
                        <!--                                                <v-icon>fas fa-edit</v-icon>-->
                        <!--                                              </v-btn>-->
                        <!--                                            </template>-->
                        <!--                                            <v-card>-->
                        <!--                                              <v-card-title>-->
                        <!--                                                <span class="headline"-->
                        <!--                                                  >Edit Comment</span-->
                        <!--                                                >-->
                        <!--                                              </v-card-title>-->
                        <!--                                              <v-card-text>-->
                        <!--                                                <v-container>-->
                        <!--                                                  <v-row>-->
                        <!--                                                    <v-col cols="12">-->
                        <!--                                                      <v-textarea-->
                        <!--                                                        v-model="item.detail"-->
                        <!--                                                        name="input-7-1"-->
                        <!--                                                        label="แก้ไข Comment"-->
                        <!--                                                        :rules="rules"-->
                        <!--                                                        hint="Hint text 200 characters"-->
                        <!--                                                        counter-->
                        <!--                                                        outlined-->
                        <!--                                                      ></v-textarea>-->
                        <!--                                                    </v-col>-->
                        <!--                                                  </v-row>-->
                        <!--                                                </v-container>-->
                        <!--                                              </v-card-text>-->
                        <!--                                              <v-card-actions>-->
                        <!--                                                <v-spacer></v-spacer>-->
                        <!--                                                <v-btn-->
                        <!--                                                  color="blue darken-1"-->
                        <!--                                                  text-->
                        <!--                                                  @click="dialog = false"-->
                        <!--                                                  >Close-->
                        <!--                                                </v-btn>-->
                        <!--                                                <v-btn-->
                        <!--                                                  color="blue darken-1"-->
                        <!--                                                  text-->
                        <!--                                                  @click="-->
                        <!--                                                    editComment(-->
                        <!--                                                      item.id,-->
                        <!--                                                      item.detail-->
                        <!--                                                    )-->
                        <!--                                                  "-->
                        <!--                                                  >Save-->
                        <!--                                                </v-btn>-->
                        <!--                                              </v-card-actions>-->
                        <!--                                            </v-card>-->
                        <!--                                          </v-dialog>-->
                        <!--                                        </v-row>-->
                        <!--                                      </v-list-item-action>-->

                        <!--                                      <div v-else></div>-->
                        <!--                                    </v-list-item>-->

                        <!--                                    <v-divider inset></v-divider>-->
                        <!--                                  </v-list>-->

                        <!--                                  <p class="subtitle-2 text-center">End.</p>-->
                        <!--                                </div>-->
                        <!--                              </v-responsive>-->
                        <!--                            </v-responsive>-->
                        <!--                          </v-row>-->

                        <!--                          <v-divider></v-divider>-->
                        <!--                          <v-row>-->
                        <!--                            <v-container fluid>-->
                        <!--                              <v-row>-->
                        <!--                                <v-col cols="12">-->
                        <!--                                  <v-textarea-->
                        <!--                                    v-model="commentData.detail"-->
                        <!--                                    name="input-7-1"-->
                        <!--                                    label="เพิ่ม Comment"-->
                        <!--                                    :rules="rulesOptionnal"-->
                        <!--                                    hint="Hint text 200 characters"-->
                        <!--                                    counter-->
                        <!--                                    outlined-->
                        <!--                                  ></v-textarea>-->
                        <!--                                </v-col>-->
                        <!--                                <v-col>-->
                        <!--                                  <v-snackbar-->
                        <!--                                    v-model="snackbar"-->
                        <!--                                    :timeout="timeout"-->
                        <!--                                  >-->
                        <!--                                    add complete-->
                        <!--                                    <v-btn-->
                        <!--                                      color="blue"-->
                        <!--                                      text-->
                        <!--                                      @click="snackbar = false"-->
                        <!--                                      >Close-->
                        <!--                                    </v-btn>-->
                        <!--                                  </v-snackbar>-->
                        <!--                                </v-col>-->
                        <!--                              </v-row>-->
                        <!--                            </v-container>-->
                        <!--                          </v-row>-->

                        <!--                          <v-card-actions>-->
                        <!--                            <v-spacer></v-spacer>-->

                        <!--                            <v-btn color="black" dark @click="addComment">-->
                        <!--                              <v-icon left dark>fas fa-comment</v-icon>-->
                        <!--                              Comment-->
                        <!--                            </v-btn>-->
                        <!--                          </v-card-actions>-->

                        <!--                          <v-divider></v-divider>-->
                        <!--                        </div>-->
                      </div>

                      <div>
                        เกณท์คะแนนการผ่านสอบ 4 ท่านขึ้นไป :
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

export default {
  middleware: ['isNotAuth'],

  components: {
    AppProjectTitleDetail,
    AppProjectDetailOfUsers,
    AppDateTimeConfirmProject,
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
    async addComment() {
      try {
        if (!this.commentData.detail) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณากรอก ข้อความที่ต้องการคอมเมนต์!',
            footer: '<a href>Why do I have this issue?</a>',
          })
        } else {
          this.$axios
            .$post('/comments', {
              user: this.user.id,
              project: this.project.id,
              detail: this.commentData.detail,
            })
            .then((r) => (this.snackbar = true))

          await this.$apollo.queries.project.refresh()
          this.commentData.detail = ''
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editComment(id, detail) {
      try {
        if (!detail) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณากรอก ข้อความที่ต้องการคอมเมนต์!',
            footer: '<a href>Why do I have this issue?</a>',
          })
        } else {
          const res = await this.$axios.$put(
            '/projects/' + this.projectData.id,
            {
              headers: {
                Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
              },
            }
          )
          if (res) {
            await this.$apollo.queries.project.refresh()
            this.dialog = false
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    delComment(id) {
      this.$Swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })
        .then(async (result) => {
          if (result.value) {
            try {
              const res = await this.$axios.$delete('/comments/' + id, {
                headers: {
                  Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
                },
              })
              if (res) {
                this.$apollo.queries.project.refresh()
                this.commentData.detail = ''
              }
            } catch (error) {
              console.log(error)
            }
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
          }
        })
    },
    clearState() {
      this.isEditing = !this.isEditing
      if (this.file) {
        this.file = []
      }
    },
    bytesToSize(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes === 0) return 'n/a'
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      if (i === 0) return bytes + ' ' + sizes[i]
      return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
    },
    onSubmitFile() {
      try {
        if (this.project.fileFull) {
          this.loadingUploadFile = true
          this.$axios
            .delete('/upload/files/' + this.project.fileFull.id)
            .then(function (response) {
              console.log('delete file success')
            })
            .catch(function (error) {
              console.log('ไม่สามารถลบไฟล์ก่อนหน้าได้' + error)
            })

          const form = new FormData()
          form.append('files', this.file)
          this.$axios.$post('/upload', form).then((r) => {
            this.fileUploadId = r[0].id
          })

          const fileId = this.fileUploadId || this.project.fileFull.id
          this.$axios
            .$put('/projects/' + this.project.id, {
              fileFull: {
                id: fileId,
              },
            })
            .then((r) => (this.project.fileFull = r.fileFull))
          this.isEditing = !this.isEditing
          this.hasSaved = true
          this.loadingUploadFile = false
        } else {
          this.loadingUploadFile = true
          const form = new FormData()
          form.append('files', this.file)

          this.$axios.$post('/upload', form).then((r) => {
            this.fileUploadId = r[0].id
          })

          const fileId = this.fileUploadId || this.project.fileFull.id
          this.$axios
            .$put('/projects/' + this.project.id, {
              fileFull: {
                id: fileId,
              },
            })
            .then((r) => (this.project.fileFull = r.fileFull))

          this.isEditing = !this.isEditing
          this.hasSaved = true
          this.loadingUploadFile = false
        }
      } catch (error) {
        console.log(error)
      }
    },
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
