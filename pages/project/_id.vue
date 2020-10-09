<template>
  <section>
    <AppTitleParallax :title="titleParallax" />
    <Logo />

    <v-container class="mx-auto">
      <template v-if="loading">
        <AppLoadingProgressCircular :loading="loading" />
      </template>

      <v-card v-else class="mx-auto">
        <v-flex>
          <!--          ข้อมูลหัวข้อ และรายละเอียดโครงงาน-->
          <AppProjectTitleDetail
            :project-data="projectData"
            :typeof-disabled="typeofDisabled"
          />

          <template>
            <v-card-text>
              <!--              แสดงข้อมูลของเจ้าของหัวข้อโครงงาน-->
              <div class="container">
                <AppProjectDetailOfUsers
                  :project="project"
                  :professor-of-user="pro_adUser"
                />
              </div>
              <v-divider></v-divider>

              <!--Step 1  init project after => professor confirm/cancel-->
              <!--      Status DEFAULT-->
              <template v-if="project.status === 'DEFAULT'">
                <!--      แสดงข้อมูลวันที่ที่ขอขึ้นสอบ-->
                <v-container>
                  <AppDateTimeConfirmProject
                    :title="`วันที่ส่งคำขอขึ้นสอบหัวข้อ`"
                    :project="project"
                    :type="dateTimeConfirmShowOnly"
                  />

                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-btn
                        block
                        dark
                        rounded
                        outlined
                        color="red"
                        @click="onUpdateNotConfirmProject()"
                      >
                        <v-icon left>fas fa-times</v-icon>
                        ไม่อนุมัติการเป็นที่ปรึกษาโครงงานนนี้
                      </v-btn>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-dialog
                        v-model="dialogProfessorUpdate"
                        persistent
                        max-width="1024px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn
                            rounded
                            block
                            color="primary"
                            outlined
                            dark
                            v-on="on"
                          >
                            <v-icon left>fas fa-calendar-check</v-icon>
                            แก้ไข / อนุมัติการเป็นที่ปรึกษาโครงงานนี้
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-text>
                            <AppProjectTitleDetail
                              :project-data="projectData"
                            />

                            <AppDateTimeConfirmProject
                              :title="`วันที่ส่งคำขอขึ้นสอบหัวข้อ`"
                              :project="project"
                            />
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="red darken-1"
                              text
                              @click="dialogProfessorUpdate = false"
                            >
                              <v-icon left>fas fa-times</v-icon>
                              ปิด
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="onUpdateAndConfirmProject()"
                            >
                              <v-icon left>far fa-save</v-icon>
                              บันทึกข้อมูลและอนุมัติ
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
              </template>

              <!--Step 2  => professor confirm/cancel-->
              <!--      Status OPERATION-->
              <template v-else-if="project.status === 'OPERATION'">
                <v-container>
                  <AppDateTimeConfirmProject
                    title="`กำหนดวันขึ้นสอบหัวข้อ`"
                    :project="project"
                  />
                  <v-divider></v-divider>

                  <!-- for comment permission -->
                  <!-- {{ user.id === project.pro_ad }} -->
                  <div
                    v-if="user.id === project.pro_ad"
                    class="red--text text-center mt-7"
                  >
                    *อาจารย์ที่ปรึกษาโปรเจคไม่สามารถ comment หรือ
                    อนุมัติการสอบของ นศ.ได้
                  </div>

                  <div v-else>
                    <!--                    comments project-->
                    <AppProjectComments :project="project"></AppProjectComments>

                    <v-divider></v-divider>
                    <!-- ofUser: {{this.scoreState.ofUser.length}} -->
                    <clientOnly>
                      <v-card-actions>
                        เกณท์คะแนนการผ่านสอบ 4 ท่านขึ้นไป :
                        <v-chip
                          v-if="project.scores.length"
                          class="ma-2"
                          outlined
                          color="green"
                        >
                          <v-avatar left>
                            <v-icon>fas fa-user-circle</v-icon>
                          </v-avatar>
                          <div v-show="false">{{ checkScorePass }}</div>
                          ผ่าน +{{ scoreState.pass }}
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
                      </v-card-actions>
                    </clientOnly>
                    <!-- End -->

                    <clientOnly>
                      <!-- <v-divider></v-divider>
                    <h3>อนุมัติการสอบ</h3>-->
                      <v-row v-if="scores[0] ? scores[0].status : ''">
                        <v-divider></v-divider>
                        <!-- state:: {{  }} -->
                        <h2>อนุมัติแล้ว</h2>
                        <v-divider></v-divider>
                      </v-row>

                      <v-row v-else-if="!scores.length">
                        <!-- <h2>ยังไม่มีการยืนยัน{{scores.length}}</h2> -->
                        <v-col>
                          <div class="text-center">
                            <v-row>
                              <v-col col="12">
                                <v-btn
                                  rounded
                                  color="green"
                                  dark
                                  block
                                  @click="ConfirmBeforeSuccess"
                                >
                                  <v-icon left>fas fa-check</v-icon>
                                  ผ่านการสอบหัวข้อ
                                </v-btn>
                              </v-col>
                            </v-row>
                          </div>
                        </v-col>

                        <v-col>
                          <div class="text-center">
                            <v-row>
                              <v-col col="12">
                                <v-btn
                                  rounded
                                  color="red darken-2"
                                  dark
                                  block
                                  @click="ConfirmBeforeNotSuccess()"
                                >
                                  <v-icon left>fas fa-times</v-icon>
                                  ไม่ผ่านการสอบหัวข้อ
                                  <!-- {{ scoreState.noPass }} -->
                                </v-btn>
                              </v-col>
                            </v-row>
                          </div>
                        </v-col>
                      </v-row>

                      <v-row v-else>
                        <v-col v-if="scores[0].status === false">
                          <div class="text-center">
                            <v-row>
                              <v-col col="12">
                                <v-btn
                                  rounded
                                  color="green"
                                  dark
                                  block
                                  @click="ConfirmBeforeSuccess"
                                >
                                  <v-icon left>fas fa-check</v-icon>
                                  ผ่านการสอบหัวข้อ(กรณี นศ.แก้ไขถูกต้องแล้ว)
                                </v-btn>
                              </v-col>
                            </v-row>
                          </div>
                        </v-col>
                      </v-row>
                    </clientOnly>
                  </div>
                </v-container>
              </template>

              <!--Step 3 after => professor confirm-->
              <!--      Status SUCCESS-->
              <template v-else-if="project.status === 'SUCCESS'">
                <AppDateTimeConfirmProject
                  :title="`วันที่ส่งคำขอขึ้นสอบหัวข้อ`"
                  :project="project"
                  :type="dateTimeConfirmShowOnly"
                />
                <v-divider></v-divider>
                <div
                  v-if="project.pro_ad === user.id"
                  class="red--text my-5 text-center"
                >
                  *อาจารย์ที่ปรึกษาโปรเจคไม่สามารถ comment หรือ อนุมัติการสอบของ
                  นศ.ได้
                </div>

                <div v-else>
                  <!--                    comments project-->
                  <AppProjectComments :project="project"></AppProjectComments>

                  <v-divider></v-divider>
                  <!-- ofUser: {{this.scoreState.ofUser.length}} -->
                  <clientOnly>
                    <v-card-actions>
                      <h3>เกณท์คะแนนการผ่านสอบ 4 ท่านขึ้นไป :</h3>

                      <v-chip
                        v-if="project.scores.length"
                        class="ma-2"
                        outlined
                        color="green"
                      >
                        <v-avatar left>
                          <v-icon>fas fa-user-circle</v-icon>
                        </v-avatar>
                        <div v-show="false">{{ checkScorePass }}</div>
                        ผ่าน +{{ scoreState.pass }}
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
                    </v-card-actions>
                  </clientOnly>
                  <!-- End -->

                  <clientOnly>
                    <v-row v-if="scores[0] ? scores[0].status : ''">
                      <v-divider></v-divider>
                      <!-- state:: {{  }} -->
                      <h2>อนุมัติแล้ว</h2>
                      <v-divider></v-divider>
                    </v-row>

                    <v-row v-else-if="!scores.length">
                      <!-- <h2>ยังไม่มีการยืนยัน{{scores.length}}</h2> -->
                      <v-col>
                        <div class="text-center">
                          <v-row>
                            <v-col col="12">
                              <v-btn
                                rounded
                                color="green"
                                dark
                                block
                                @click="ConfirmBeforeSuccess"
                              >
                                <v-icon left>fas fa-check</v-icon>
                                ผ่านการสอบหัวข้อ
                              </v-btn>
                            </v-col>
                          </v-row>
                        </div>
                      </v-col>

                      <v-col>
                        <div class="text-center">
                          <v-row>
                            <v-col col="12">
                              <v-btn
                                rounded
                                color="red darken-2"
                                dark
                                block
                                @click="ConfirmBeforeNotSuccess"
                              >
                                <v-icon left>fas fa-times</v-icon>
                                ไม่ผ่านการสอบหัวข้อ
                                <!-- {{ scoreState.noPass }} -->
                              </v-btn>
                            </v-col>
                          </v-row>
                        </div>
                      </v-col>
                    </v-row>

                    <v-row v-else>
                      <v-col v-if="!scoreState.ofUser.status">
                        <div class="text-center">
                          <v-row>
                            <v-col col="12">
                              <v-btn
                                rounded
                                color="green"
                                dark
                                block
                                @click="ConfirmBeforeSuccess"
                              >
                                <v-icon left>fas fa-check</v-icon>
                                ผ่านการสอบหัวข้อ
                              </v-btn>
                            </v-col>
                          </v-row>
                        </div>
                      </v-col>
                    </v-row>
                  </clientOnly>
                </div>
              </template>

              <br />
              <v-divider></v-divider>
              <strong>สถานะ::</strong>

              <div>
                <v-row
                  v-if="project.status === 'DEFAULT'"
                  justify="center"
                  align="start"
                >
                  <v-chip large draggable color="blue">
                    <v-icon left>fas fa-check-circle</v-icon>
                    กำลังรอการอนุมัติ
                  </v-chip>
                </v-row>
                <v-row
                  v-if="project.status === 'OPERATION'"
                  justify="center"
                  align="start"
                >
                  <v-chip large draggable color="yellow">
                    <v-icon left>fas fa-check-circle</v-icon>
                    กำลังดำเนินการ
                  </v-chip>
                </v-row>
                <v-row
                  v-if="project.status === 'SUCCESS'"
                  justify="center"
                  align="start"
                >
                  <v-chip large draggable color="green">
                    <v-icon left>fas fa-check-circle</v-icon>
                    สอบหัวข้อผ่านแล้ว
                  </v-chip>
                </v-row>
              </div>
            </v-card-text>
          </template>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="$router.go(-1)">
              <v-icon left dark>fas fa-arrow-left</v-icon>
              Back
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-card>
    </v-container>

    <v-container>
      <!--   dialogConfirmProject-->
      <v-row justify="center">
        <v-dialog v-model="dialogConfirmProject" persistent max-width="350">
          <v-card>
            <v-card-title class="headline d-flex justify-center">
              คุณแน่ใจหรือไม่?
            </v-card-title>
            <v-card-text>
              Let Google help apps determine location. This means sending
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="dialogConfirmProject = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="dialogConfirmProject = false"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!--      -->
    </v-container>
  </section>
</template>

<script>
import Swal from 'sweetalert2'
import { QUERY_SINGLE_PROJECT } from '@/graphql/queries/projects.js'
import { QUERY_WHERE_USERID_AND_PROJECTID } from '@/graphql/queries/scores.js'
import Logo from '~/components/AppLogoCsbsru'
import AppTitleParallax from '~/components/parallax/AppTitleParallax'
import AppProjectTitleDetail from '~/components/projects/AppProjectTitleDetail'
import AppLoadingProgressCircular from '~/components/loading/AppLoadingProgressCircular'
import AppProjectDetailOfUsers from '~/components/projects/AppProjectDetailOfUsers'
import AppDateTimeConfirmProject from '~/components/projects/AppDateTimeConfirmProject'
import AppProjectComments from '~/components/projects/AppProjectComments'

export default {
  middleware: ['isNotAuth'],

  components: {
    Logo,
    AppTitleParallax,
    AppProjectTitleDetail,
    AppLoadingProgressCircular,
    AppProjectDetailOfUsers,
    AppDateTimeConfirmProject,
    AppProjectComments,
  },

  data() {
    return {
      error: null,
      project: {},
      scores: {},
      date: '',
      radios: 'MORNING',
      fileDow: '',
      dialogConfirmProject: false,
      dateTimeConfirmShowOnly: true,
      valid: false,
      dialogProfessorUpdate: false,
      pro_adUser: {},
      scoreState: {
        all: '',
        pass: '',
      },
      // for update Project
      projectData: {
        id: '',
        title: '',
        detail: '',
        status: 'NONE',
        pro_ad: '',
        confirm: false,
      },
      showUserDetail: {
        prefix: '',
        firstName: '',
        lastName: '',
        imageUrl: {
          url: '',
        },
      },
      typeofDisabled: {
        btnTitleDisabled: true,
        textArea: true,
      },
    }
  },

  apollo: {
    project: {
      query: QUERY_SINGLE_PROJECT,
      prefetch: true,
      fetchPolicy: 'network-only',
      variables() {
        const params = this.$route.params
        return { id: params.id }
      },
      result({ data, loading, networkStatus }) {
        this.loading = loading
        this.projectData = data.project
        this.showUserDetail = data.project.user
        this.findProAd()
        this.checkScorePass()
      },
      error(e) {
        console.log(e)
      },
    },

    scores: {
      query: QUERY_WHERE_USERID_AND_PROJECTID,
      variables() {
        return {
          where: {
            user: this.user ? this.user.id : '',
            project: this.project.id,
          },
        }
      },
      result({ data, loading, networkStatus }) {
        this.loading = loading
      },
      error(data) {
        this.error = data
      },
    },
  },

  computed: {
    titleParallax() {
      return ' รายละเอียดโครงงาน'
    },
    user() {
      return this.$store.getters.loggedInUser
    },
    rules() {
      return [
        (v) => !!v || 'Item is required',
        (v) => v.length <= 200 || 'Max 200 characters',
      ]
    },
    dialog: {
      get() {
        return this.$store.getters.dialog
      },
      set(val) {
        return this.$store.dispatch('projects/setDialog', val)
      },
    },
    loading: {
      get() {
        return this.$store.getters.loading
      },
      set(val) {
        return this.$store.dispatch('projects/setLoading', val)
      },
    },
    isActive: {
      get() {
        return this.$store.getters.isActive
      },
      set(val) {
        this.$store.dispatch('projects/setIsActive', val)
      },
    },
  },

  methods: {
    checkScorePass() {
      const urlPass = `/scores?project=${this.project.id}&status=true`
      const urlNoPass = `/scores?project=${this.project.id}&status=false`

      this.$axios.$get(urlPass).then((response) => {
        this.scoreState.pass = response.length
        // console.log('pass response::', response)
      })
      this.$axios.$get(urlNoPass).then((response) => {
        this.scoreState.noPass = response.length
      })
    },
    findProAd() {
      try {
        this.$axios.$get('/users/' + this.projectData.pro_ad).then((result) => {
          this.pro_adUser = result
          // console.log('pro_adUser', this.pro_adUser)
        })
      } catch (error) {
        console.log(error)
      }
    },
    ConfirmBeforeNotSuccess() {
      Swal.fire({
        title: 'แน่ใจหรือไม่ที่จะยืนยืนข้อมูล?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, ฉันแน่ใจ!',
      }).then(async (result) => {
        if (result.value) {
          try {
            if (this.scores.length) {
              // console.log("มีอยู่แล้ว");
            } else {
              this.$axios.$post(
                '/scores',
                {
                  status: false,
                  project: this.project.id,
                  user: this.user.id,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
                  },
                }
              )
              await this.$apollo.queries.project.refresh()
              await this.$apollo.queries.scores.refresh()
              Swal.fire('Success!', 'ยืนยันข้อมูลสำเร็จ.', 'success')
            }
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    ConfirmBeforeSuccess() {
      Swal.fire({
        title: 'แน่ใจหรือไม่ที่จะยืนยืนข้อมูล?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, ฉันแน่ใจ!',
      }).then(async (result) => {
        if (result.value) {
          try {
            if (this.scoreState.pass >= 0) {
              console.log('state >= 3 => ' + this.scoreState.pass)
              this.$axios.$put('/projects/' + this.projectData.id, {
                status: 'SUCCESS',
              })
            }

            if (this.scores.length) {
              console.log('update ที่มีอยู่แล้ว')

              this.$axios.$put('/scores/' + this.scores[0].id, {
                status: true,
              })
              await this.$apollo.queries.project.refresh()
              await this.$apollo.queries.scores.refresh()
              Swal.fire('Success!', 'ยืนยันข้อมูลสำเร็จ.', 'success')
            } else {
              this.$axios.$post('/scores', {
                status: true,
                project: this.project.id,
                user: this.user.id,
              })
              await this.$apollo.queries.project.refresh()
              await this.$apollo.queries.scores.refresh()
              Swal.fire('Success!', 'ยืนยันข้อมูลสำเร็จ.', 'success')
            }
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    onUpdateNotConfirmProject() {
      return Swal.fire({
        title: 'คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, confirm it!',
      }).then((result) => {
        if (result.value) {
          this.$axios
            .$put('/projects/' + this.projectData.id, {
              status: 'NONE',
            })
            .then((data) => {
              let timerInterval
              Swal.fire({
                title: 'Cancel Success!',
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
                  console.log('I was closed by the timer') // eslint-disable-line
                }
              })
            })
          this.$router.push('/auth/project/professor')
        }
      })
    },
    onUpdateAndConfirmProject() {
      try {
        this.loading = true
        if (!this.projectData.finalDate) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณาเลือกวันที่และช่วงเวลา!',
            footer: '<a href>Why do I have this issue?</a>',
          })
          return (this.loading = false)
        }

        // validate form
        // this.$refs.form.validate()

        const choosDate = this.$moment(this.projectData.finalDate).format('L')
        const newDateNow = this.$moment(new Date()).format('L')

        if (choosDate <= newDateNow) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:
              'กรุณาเลือกวันที่และช่วงเวลา ที่ต้องการขึ้นสอบหัวข้อ ให้มากกว่าวันที่ปัจจุบัน!',
            footer: '<a href>Why do I have this issue?</a>',
          })
        } else {
          Swal.fire({
            title: 'แน่ใจหรือไม่ที่จะยืนยืนข้อมูล?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, ฉันแน่ใจ!',
          }).then((result) => {
            this.$axios.$put('/projects/' + this.projectData.id, {
              title: this.projectData.title,
              detail: this.projectData.detail,
              finalDate: this.projectData.finalDate,
              finalTime: this.radios,

              status: 'OPERATION',
            })

            if (result.value) {
              this.dialogProfessorUpdate = false
              Swal.fire('Success!', 'ยืนยันข้อมูลสำเร็จ.', 'success')
              // this.$router.replace('/project/' + this.projectData.id)
              this.$router.push('/auth/project/professor')
            }
          })
        }
        this.loading = false
      } catch (error) {
        console.log(error)
      }

      // this.dialogConfirmProject = true
    },
  },

  inject: ['theme'],
}
</script>

<style scoped></style>
