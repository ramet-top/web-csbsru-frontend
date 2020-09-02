<template>
  <div>
    <v-card flat class="mx-auto">
      <v-responsive>
        <v-card-title>
          <v-icon left>fas fa-tasks</v-icon>ระบบจัดการบัณฑิตนิพนธ์
        </v-card-title>
        <v-divider></v-divider>

        <clientOnly>
          <v-tabs centered>
            <v-tab>3.อนุมัติการสอบหัวข้อ(โครงงาน)</v-tab>

            <v-tab-item>
              <v-card flat>
                <v-container v-if="projectData.status === 'DEFAULT'">
                  <v-parallax
                    style="opacity: 0.7;"
                    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
                  >
                    <v-row align="center" justify="center">
                      <v-col class="text-center" cols="12">
                        <v-col class="text-center" cols="12">
                          <h1 class="display-1 font-weight-thin mb-4">
                            สถานะการส่งคำขอของคุณ!
                          </h1>
                          <h4 class="subheading">
                            - รอการอนุมัติจากอาจารย์ที่ปรึกษาโครงงาน -
                          </h4>
                          <p>
                            หมายเหตุ! สามารถยกเลิกคำขอได้หลัง 14 วัน
                            ถ้าหากอาจารย์ยังไม่ตอบรับ
                          </p>
                          <div class="my-2">
                            <v-btn color="warning" dark @click="cancelForm()"
                              >ยกเลิก</v-btn
                            >
                          </div>
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-parallax>
                </v-container>

                <div v-else>
                  <v-container class="mx-auto">
                    <v-flex>
                      <div>
                        <v-card-title>หัวข้อโครงงาน</v-card-title>
                        <v-card-text>
                          <v-container>
                            <!-- <p class="text-justify">{{ projectData.title }}</p> -->
                            <v-text-field
                              :value="projectData.title"
                              label="ชื่อ"
                              outlined
                              disabled
                            ></v-text-field>
                          </v-container>
                        </v-card-text>

                        <v-card-text>
                          <span class="text--primary">
                            <strong>เนื้อหาเกี่ยวกับโครงงาน</strong>
                          </span>
                          <v-container>
                            <v-textarea
                              disabled
                              outlined
                              name="input-7-4"
                              label="รายละเอียด"
                              :value="projectData.detail"
                            ></v-textarea>
                          </v-container>
                          <v-divider></v-divider>

                          <span class="text--primary">
                            <strong>รายละเอียด</strong>
                          </span>
                          <br />
                          <v-container>
                            <v-row>
                              <v-col
                                col="12"
                                md="4"
                                align="center"
                                justify="center"
                              >
                                <v-avatar size="150">
                                  <img
                                    :src="
                                      showUserDetail.imageUrl
                                        ? showUserDetail.imageUrl.url
                                        : defaultImage
                                    "
                                    alt="user image"
                                  />
                                </v-avatar>
                              </v-col>

                              <v-col col="12" md="8">
                                <v-row no-gutters>
                                  <v-col col="12" md="3">
                                    <strong>ชื่อเจ้าของหัวข้อ :</strong>
                                  </v-col>
                                  <v-col col="12" md="6">
                                    <p>
                                      {{ showUserDetail.prefix }}
                                      {{ showUserDetail.firstName }}
                                      {{ showUserDetail.lastName }}
                                    </p>
                                  </v-col>
                                </v-row>

                                <v-row no-gutters>
                                  <v-col col="12" md="3">
                                    <strong>ที่ปรึกษาโครงงาน :</strong>
                                  </v-col>
                                  <v-col col="12" md="6">
                                    <p>
                                      {{ pro_adUser.prefix
                                      }}{{ pro_adUser.firstName }}
                                      {{ pro_adUser.lastName }}
                                    </p>
                                  </v-col>
                                </v-row>

                                <v-row no-gutters>
                                  <v-col col="12" md="3">
                                    <strong>วันที่(อัปเดตล่าสุด) :</strong>
                                  </v-col>
                                  <v-col col="12" md="6">
                                    <p>
                                      {{
                                        $moment(project.updatedAt).format(
                                          'llll'
                                        )
                                      }}
                                      น.
                                    </p>
                                  </v-col>
                                </v-row>

                                <v-row no-gutters>
                                  <v-col col="12" md="3">
                                    <strong>วันที่(สร้าง) :</strong>
                                  </v-col>
                                  <v-col col="12" md="6">
                                    {{
                                      $moment(project.updatedAt).format('llll')
                                    }}
                                    น.
                                  </v-col>
                                </v-row>

                                <v-card-actions>
                                  <v-row>
                                    <v-col col="12" md="6">
                                      <v-btn
                                        v-if="project.fileUrl"
                                        rounded
                                        block
                                        color="green"
                                        target="blank"
                                        :href="project.fileUrl.url"
                                      >
                                        ดาวน์โหลดเอกสารบทที่ 1
                                        <v-icon right
                                          >fas fa-cloud-download-alt</v-icon
                                        >
                                      </v-btn>
                                      <v-btn
                                        v-else
                                        rounded
                                        block
                                        color="green"
                                        disabled
                                      >
                                        ดาวน์โหลดเอกสารบทที่ 1
                                        <v-icon right
                                          >fas fa-cloud-download-alt</v-icon
                                        >
                                      </v-btn>
                                    </v-col>

                                    <v-col col="12" md="6">
                                      <v-btn
                                        v-if="project.fileFull"
                                        rounded
                                        block
                                        color="green"
                                        target="blank"
                                        :href="project.fileFull.url"
                                      >
                                        ดาวน์โหลดเอกสารตัวเต็ม .PDF
                                        <v-icon right
                                          >fas fa-cloud-download-alt</v-icon
                                        >
                                      </v-btn>

                                      <v-btn
                                        v-else
                                        rounded
                                        block
                                        color="green"
                                        disabled
                                      >
                                        ดาวน์โหลดเอกสารตัวเต็ม .PDF
                                        <v-icon right
                                          >fas fa-cloud-download-alt</v-icon
                                        >
                                      </v-btn>
                                    </v-col>
                                  </v-row>
                                </v-card-actions>
                              </v-col>
                            </v-row>
                          </v-container>
                          <v-divider></v-divider>
                        </v-card-text>
                      </div>

                      <div class="container">
                        <span class="text--primary"
                          >กำหนดวันขึ้นสอบหัวข้อ :</span
                        >
                      </div>

                      <v-container>
                        <v-row>
                          <v-date-picker
                            v-model="projectData.finalDate"
                            full-width
                            :landscape="$vuetify.breakpoint.smAndUp"
                            class="mt-4"
                            type="date"
                            locale="th"
                            disabled
                          ></v-date-picker>
                        </v-row>

                        <v-row>
                          <v-col cols="12" sm="6">
                            <p>
                              <strong>วันที่ปัจจุบัน :</strong>
                              {{ $moment(dateNow).format('dddd LL') }}
                            </p>
                            <p>
                              <strong>กำหนดการขึ้นสอบหัวข้อ :</strong>
                              {{
                                $moment(projectData.finalDate).format('dddd LL')
                              }}
                            </p>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-radio-group
                              v-model="projectData.finalTime"
                              disabled
                            >
                              <template v-slot:label>
                                <div>
                                  <strong
                                    >เวลาสอบหัวข้อโครงงาน CSBSRU
                                    Project.</strong
                                  >
                                </div>
                              </template>
                              <v-radio value="MORNING">
                                <template v-slot:label>
                                  <div>
                                    <strong class="dark--text"
                                      >ช่วงเช้า 10.00 น</strong
                                    >
                                  </div>
                                </template>
                              </v-radio>
                              <v-radio value="AFTERNOON">
                                <template v-slot:label>
                                  <div>
                                    <strong class="dark--text"
                                      >ช่วงบ่าย 13.30 น</strong
                                    >
                                  </div>
                                </template>
                              </v-radio>
                            </v-radio-group>
                          </v-col>
                        </v-row>
                      </v-container>

                      <v-divider></v-divider>
                      <div>
                        <div v-if="true">
                          <div>
                            <h3>Latast Comments</h3>
                            <v-row>
                              <v-responsive
                                class="overflow-y-auto"
                                max-height="400"
                              >
                                <v-responsive height="200vh" class="pa-2">
                                  <div>
                                    <v-list three-line subheader>
                                      <v-subheader inset>ล่าสุด</v-subheader>

                                      <v-list-item
                                        v-for="item in project.comments"
                                        :key="item.title"
                                      >
                                        <v-list-item-avatar
                                          v-if="item.user.imageUrl"
                                        >
                                          <v-img
                                            :src="item.user.imageUrl.url"
                                          ></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-avatar v-else>
                                          <v-img
                                            :src="defaultImage"
                                            alt="defaultImage"
                                          ></v-img>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                          <v-list-item-title>
                                            {{ item.user.prefix }}
                                            {{ item.user.firstName }}
                                            {{ item.user.lastName }}
                                          </v-list-item-title>
                                          <v-list-item-subtitle>
                                            {{
                                              $moment(item.updaedAt).format(
                                                'LLL'
                                              )
                                            }}
                                            น.
                                          </v-list-item-subtitle>
                                          <v-list-item-subtitle>
                                            comment:
                                            {{ item.detail }}
                                          </v-list-item-subtitle>
                                        </v-list-item-content>

                                        <v-list-item-action
                                          v-if="item.user.id == user.id"
                                        >
                                          <v-row>
                                            <v-btn
                                              text
                                              @click="delComment(item.id)"
                                            >
                                              <v-icon>fas fa-trash</v-icon>
                                            </v-btn>

                                            <v-dialog
                                              v-model="dialog"
                                              persistent
                                              max-width="600px"
                                            >
                                              <template
                                                v-slot:activator="{ on }"
                                              >
                                                <v-btn text v-on="on">
                                                  <v-icon>fas fa-edit</v-icon>
                                                </v-btn>
                                              </template>
                                              <v-card>
                                                <v-card-title>
                                                  <span class="headline"
                                                    >Edit Comment</span
                                                  >
                                                </v-card-title>
                                                <v-card-text>
                                                  <v-container>
                                                    <v-row>
                                                      <v-col cols="12">
                                                        <v-textarea
                                                          v-model="item.detail"
                                                          name="input-7-1"
                                                          label="แก้ไข Comment"
                                                          :rules="rules"
                                                          hint="Hint text 200 characters"
                                                          counter
                                                          outlined
                                                        ></v-textarea>
                                                      </v-col>
                                                    </v-row>
                                                  </v-container>
                                                </v-card-text>
                                                <v-card-actions>
                                                  <v-spacer></v-spacer>
                                                  <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="dialog = false"
                                                    >Close</v-btn
                                                  >
                                                  <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="
                                                      editComment(
                                                        item.id,
                                                        item.detail
                                                      )
                                                    "
                                                    >Save</v-btn
                                                  >
                                                </v-card-actions>
                                              </v-card>
                                            </v-dialog>
                                          </v-row>
                                        </v-list-item-action>

                                        <div v-else></div>
                                      </v-list-item>

                                      <v-divider inset></v-divider>
                                    </v-list>

                                    <p class="subtitle-2 text-center">End.</p>
                                  </div>
                                </v-responsive>
                              </v-responsive>
                            </v-row>

                            <v-divider></v-divider>
                            <v-row>
                              <v-container fluid>
                                <v-row>
                                  <v-col cols="12">
                                    <v-textarea
                                      v-model="commentData.detail"
                                      name="input-7-1"
                                      label="เพิ่ม Comment"
                                      :rules="rulesOptionnal"
                                      hint="Hint text 200 characters"
                                      counter
                                      outlined
                                    ></v-textarea>
                                  </v-col>
                                  <v-col>
                                    <v-snackbar
                                      v-model="snackbar"
                                      :timeout="timeout"
                                    >
                                      add compleate
                                      <v-btn
                                        color="blue"
                                        text
                                        @click="snackbar = false"
                                        >Close</v-btn
                                      >
                                    </v-snackbar>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-row>

                            <v-card-actions>
                              <v-spacer></v-spacer>

                              <v-btn color="black" dark @click="addComment">
                                <v-icon left dark>fas fa-comment</v-icon>Comment
                              </v-btn>
                            </v-card-actions>

                            <v-divider></v-divider>
                          </div>
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
                              <v-icon>fas fa-user-circle</v-icon> </v-avatar
                            >ยังไม่โหวต
                          </v-chip>
                        </div>

                        <v-divider></v-divider>
                        <strong>
                          <p>สถานะ :</p>
                        </strong>

                        <v-row
                          v-if="checkDateShowStatus"
                          justify="center"
                          align="start"
                        >
                          <v-chip color="primary" large draggable>
                            <v-icon left>fas fa-poll</v-icon>รอผลสอบ
                          </v-chip>
                        </v-row>

                        <v-row v-else justify="center" align="start">
                          <v-chip
                            v-if="projectData.status === 'SUCCESS'"
                            large
                            draggable
                            color="green"
                            text-color="white"
                          >
                            <v-avatar left>
                              <v-icon>far fa-check-circle</v-icon> </v-avatar
                            >ผ่านการสอบ
                          </v-chip>

                          <v-chip v-else color="orange" large draggable>
                            <v-icon left>far fa-calendar-alt</v-icon
                            >รอขึ้นสอบตามวันเวลาที่กำหนด
                          </v-chip>

                          <!-- <v-chip large draggable >
                            <v-icon left>far fa-calendar-alt</v-icon>รอผลการสอบ
                          </v-chip>-->
                        </v-row>

                        <v-row v-if="projectData.status === 'SUCCESS'">
                          <v-col cols="12" class="text-center container" sm="6">
                            <v-form ref="form" v-model="valid" lazy-validation>
                              <h3>อัปโหลดไฟล์เอกสารตัวเต็ม .PDF</h3>
                              <p>
                                ชื่อไฟล์ในระบบ :
                                {{
                                  project.fileFull
                                    ? project.fileFull.name.substring(0, 12)
                                    : 'ไม่มีไฟล์'
                                }}
                                ( size :
                                {{
                                  project.fileFull
                                    ? bytesToSize(project.fileFull.size)
                                    : 'N/A'
                                }}
                                )
                              </p>

                              <v-file-input
                                v-if="isEditing"
                                v-model="file"
                                label="File input"
                                :disabled="!isEditing"
                                outlined
                                accept=".pdf"
                                dense
                                show-size
                                counter
                                clear-icon
                                color="white"
                                :rules="rulesFile"
                              ></v-file-input>

                              <v-file-input
                                v-else
                                v-model="file"
                                label="File input"
                                :disabled="!isEditing"
                                outlined
                                accept=".pdf"
                                dense
                                show-size
                                counter
                                clear-icon
                              ></v-file-input>

                              <div
                                v-if="loadingUpLoadFile"
                                class="text-center container"
                              >
                                <v-progress-circular
                                  :size="50"
                                  color="primary"
                                  indeterminate
                                ></v-progress-circular>
                              </div>

                              <div v-else>
                                <v-btn
                                  v-if="isEditing"
                                  :disabled="!file['name']"
                                  tile
                                  outlined
                                  color="success"
                                  @click="onSubmitFile"
                                >
                                  <v-icon left>fas fa-file-word</v-icon
                                  >อัปโหลดไฟล์ / อัปเดตไฟล์
                                </v-btn>

                                <v-btn
                                  dark
                                  outlined
                                  color="indigo"
                                  @click="clearState"
                                >
                                  <v-icon v-if="isEditing"
                                    >far fa-window-close</v-icon
                                  >
                                  <v-icon v-else>fas fa-file-pdf</v-icon>
                                </v-btn>
                              </div>
                            </v-form>
                            <v-snackbar v-model="hasSaved" :timeout="timeout"
                              >อัปเดตไฟล์สำเร็จ</v-snackbar
                            >
                          </v-col>
                        </v-row>

                        <br />
                        <v-divider></v-divider>
                      </div>
                    </v-flex>
                  </v-container>
                </div>
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

export default {
  middleware: ['isNotAuth'],

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
    pro_adUser: '',
  }),

  computed: {
    checkDateShowStatus() {
      const dateN = this.$moment(this.dateNow).format('LL')
      const dateInProject = this.$moment(this.projectData.finalDate).format(
        'LL'
      )
      if (dateN >= dateInProject) {
        return true
      } else return false
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

  mounted() {
    this.findProAd()
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
        this.$axios.$get('/users/' + this.projectData.pro_ad).then((result) => {
          this.pro_adUser = result
        })
      } catch (error) {
        console.log(error)
      }
    },

    cancelForm() {
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
          if (this.projectData.fileUrl) {
            this.$axios
              .$delete('/upload/files/' + this.projectData.fileUrl.id, {
                headers: {
                  Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
                },
              })
              .then((response) => {
                console.log('file delete now: ', response.id)
              })
              .catch((error) => {
                console.log(error)
              })
          }

          this.$axios
            .$delete('/projects/' + this.projectData.id, {
              headers: {
                Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
              },
            })
            .then(async (response) => {
              await this.$Swal.fire(
                'Success!',
                'ยกเลิกการส่งเรียบร้อย',
                'success'
              )
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
    // for comments project
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
