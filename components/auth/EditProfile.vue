<template>
  <div>
    <v-form>
      <v-container>
        <br />
        <h3 v-if="user.role ? user.role.name === 'AuthStudent' : ''">
          <v-icon left>fas fa-user</v-icon>โปรไฟล์ : นักศึกษา
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn
                color="red darken-3"
                dark
                icon
                v-on="on"
                @click="isEditProfile = !isEditProfile"
              >
                <v-icon v-if="isEditProfile">far fa-window-close</v-icon>
                <v-icon v-else>far fa-edit</v-icon>
              </v-btn>
            </template>
            <span>แก้ไขโปรไฟล์</span>
          </v-tooltip>
        </h3>

        <h3 v-if="user.role ? user.role.name === 'AuthProfessor' : ''">
          <v-icon left>far fa-user</v-icon>โปรไฟล์ : อาจารย์
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn
                color="red darken-3"
                dark
                icon
                v-on="on"
                @click="isEditProfile = !isEditProfile"
              >
                <v-icon v-if="isEditProfile">far fa-window-close</v-icon>
                <v-icon v-else>far fa-edit</v-icon>
              </v-btn>
            </template>
            <span>แก้ไขโปรไฟล์๋</span>
          </v-tooltip>
        </h3>

        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="userEdit.email"
              :disabled="!isEditProfile"
              label="email"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="userEdit.birthDate"
                  label="วันเดือนปีเกิด"
                  prepend-icon="fas fa-calendar-day"
                  :disabled="!isEditProfile"
                  outlined
                  dense
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="userEdit.birthDate"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <!-- input prefix -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userEdit.prefix"
              :disabled="!isEditProfile"
              label="คำนำหน้า"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userEdit.firstName"
              :disabled="!isEditProfile"
              outlined
              dense
              label="ชื่อ"
            ></v-text-field>
          </v-col>

          <!-- input lastName -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userEdit.lastName"
              :disabled="!isEditProfile"
              outlined
              dense
              label="นามสกุล"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- <v-row v-if="user.role ? user.role.name === 'AuthProfessor' : ''">
          <v-col cols="12" md="6">
            <v-textarea
              v-model="userEdit.professor_Expert"
              outlined
              user-edit="input-7-4"
              label="ความเชี่ยวชาญ"
              :disabled="!isEditProfile"
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="6">
            <v-textarea
              v-model="userEdit.professor_Education"
              outlined
              user-edit="input-7-4"
              label="การศึกษา"
              :disabled="!isEditProfile"
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="6">
            <v-textarea
              v-model="userEdit.professor_Research"
              outlined
              user-edit="input-7-4"
              label="ผลงานวิจัย"
              :disabled="!isEditProfile"
            ></v-textarea>
          </v-col>
        </v-row> -->

        <h3><v-icon left>fas fa-map-marked</v-icon>ที่อยู่</h3>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userEdit.tel"
              disable
              outlined
              :disabled="!isEditProfile"
              dense
              label="เบอร์ติดต่อ"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userEdit.lineID"
              disable
              outlined
              dense
              :disabled="!isEditProfile"
              label="lineID"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userEdit.facebook"
              :disabled="!isEditProfile"
              outlined
              dense
              label="facebook"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userEdit.parents"
              :disabled="!isEditProfile"
              outlined
              dense
              label="ติดต่อผู้ปกครอง"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-textarea
              v-model="userEdit.addr"
              outlined
              user-edit="input-7-4"
              label="ที่อยู่"
              :disabled="!isEditProfile"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            color="primary"
            dark
            :disabled="!isEditProfile"
            @click="updateProfile"
          >
            บันทึกข้อมูล
            <v-icon dark right>fas fa-save</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-form>

    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="grey" dark>
        <v-card-text>
          กำลังอัปเดตข้อมูล
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],

  data() {
    return {
      dialog: false,
      isEditProfile: false,
      userEdit: {
        id: '',
        email: '',
        useruserEdit: '',
        prefix: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        tel: '',
        lineID: '',
        facebook: '',
        parents: '',
        addr: '',
        status_Study: '',
      },
      date: new Date().toISOString().substr(0, 10),
      menu: false,
    }
  },

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    dialog(val) {
      if (!val) return
      setTimeout(() => (this.dialog = false), 3000)
    },
  },

  mounted() {
    this.fetchUserEdit()
  },

  methods: {
    fetchUserEdit() {
      this.$axios
        .$get('/users/me')
        .then((response) => {
          this.userEdit = response
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async updateProfile() {
      try {
        await this.$axios
          .$put(`/users/${this.user.id}`, this.userEdit)
          .then((res) => {
            this.$auth.fetchUser()
          })
          .catch((error) => {
            console.log(error)
          })

        this.dialog = true
        this.isEditProfile = null
      } catch (e) {
        console.error(e)
      }
    },

    save(date) {
      this.$refs.menu.save(date)
    },
  },
}
</script>
