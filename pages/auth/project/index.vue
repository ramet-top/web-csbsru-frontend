<template>
  <div>
    <Logo />
    <client-only>
      <v-card class="container mb-3">
        <v-responsive>
          <template v-if="isPermission">
            <div v-if="projectData">
              <!-- <h2>showState</h2> -->
              <AppShowState :project-data="projectData" />
            </div>
            <div v-else>
              <!-- AppSentReqProject -->
              <AppSentReqProject />
            </div>
          </template>

          <template v-else>
            <v-card flat class="mx-auto">
              <v-responsive>
                <v-card-title>
                  <v-icon left>fas fa-tasks</v-icon>
                  ระบบจัดการบัณฑิตนิพนธ์
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="red--text">
                  *เฉพาะนักศึกษาชั่นปีที่ 3 ขึ้นไป
                  <ul>
                    <li>
                      นักศึกษาปีที่ 3 ขึ้นไป สามารถส่งคำขอสอบหัวข้อโครงงานได้
                    </li>
                    <li>หลังจากที่ยื่นขอสอบ สามารถตรวจสอบผลได้ที่หน้านี้</li>
                  </ul>
                </v-card-text>
              </v-responsive>
            </v-card>
          </template>
        </v-responsive>
      </v-card>
    </client-only>
  </div>
</template>

<script>
import AppSentReqProject from '~/components/form/AppSentReqProject'
import Logo from '~/components/AppLogoCsbsru'
import AppShowState from '~/components/projects/confirm/AppShowState'

export default {
  components: {
    Logo,
    AppSentReqProject,
    AppShowState,
  },

  data() {
    return {
      yearNow: parseInt(this.$moment().format('Y')),
      yearCal: null,
      projectData: null,
      projectUser: [],
    }
  },

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
    isPermission: {
      get() {
        return this.$store.getters['projects/isPermission']
      },
      set(val) {
        return this.$store.dispatch('projects/setIsPermission', val)
      },
    },
  },

  async mounted() {
    await this.projectOfUser()
    await this.userPermissionSentForm()
  },

  methods: {
    userPermissionSentForm() {
      // eslint-disable-next-line no-prototype-builtins
      if (this.user.hasOwnProperty('yearIn')) {
        this.yearCal = parseInt(this.user.yearIn.substr(0, 4)) + 3

        if (this.projectUser) {
          this.projectData = this.projectUser[0]
          // console.log('this.projectData', this.projectData)
        } else {
          this.projectData = []
        }

        if (this.yearNow >= this.yearCal) {
          this.isPermission = true
        }
      }
    },

    async projectOfUser() {
      const res = await this.$axios.$get(`/projects?user.id=${this.user.id}`)
      this.projectUser = res || []
    },
  },

  head() {
    return {
      title: 'จัดการโครงงาน',
    }
  },

  middleware: ['auth'],
}
</script>
