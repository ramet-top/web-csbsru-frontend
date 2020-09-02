<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn rounded block color="teal" outlined large dark v-on="on">
            <v-icon left>fas fa-user-plus</v-icon>สมัครสมาชิก
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">สมัครสมาชิก(สำหรับ นศ.)</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <!-- valit:: {{valit}} -->
                  <v-select
                    v-model="valItem"
                    :items="['ชาย', 'หญิง']"
                    label="คำนำหน้า*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="ชื่อ*"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="นามสกุล*"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="รหัส นศ.(ใช้สำหรับ Login Username)*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email (ใช้สำหรับ Reset Password)*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password (ใช้สำหรับ Login)*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // data edit
      isEditProfile: false,
      userCreated: {
        id: '',
        email: '',
        username: '',
        prefix: '',
        gender: '',
        firstName: '',
        lastName: '',

        tel: '',
        lineID: '',
        facebook: '',
        parents: '',
        addr: '',

        professor_Expert: '',
        professor_Education: '',
        professor_Research: '',

        status_Study: '',
      },
      genderDefault: ['ชาย', 'หญิง'],
      dialog: false,
      valItem: '',
    }
  },

  computed: {
    userAuth() {
      return this.$store.getters['auth/user']
    },
    getUserId() {
      return this.$store.state.auth.user.id
    },
  },

  methods: {
    // async updateProfile() {
    //   const userCreated = this.userCreated
    //   try {
    //     this.user = await this.$apollo
    //       .mutate({
    //         mutation: updateUser,
    //         variables: userCreated,
    //       })
    //       .then((data) => {
    //         // data && data.user
    //       })

    //     this.$router.push('/secureUser/edit')

    //     this.showAlertSuccess()
    //     this.isEditProfile = null
    //     this.$vuetify.goTo(0)
    //   } catch (e) {
    //     console.error(e)
    //     alert('error message : ' + e)
    //   }
    // },

    showAlertSuccess() {
      let timerInterval
      this.$Swal
        .fire({
          title: 'Update Profile Success Now!',
          html: 'I will close in <b></b> milliseconds.',
          timer: 2500,
          timerProgressBar: true,
          onBeforeOpen: () => {
            // this.success = true;
            this.$Swal.showLoading()
            timerInterval = setInterval(() => {
              this.$Swal
                .getContent()
                .querySelector('b').textContent = this.$Swal.getTimerLeft()
            }, 100)
          },
          onClose: () => {
            // this.success = false;
            clearInterval(timerInterval)
          },
        })
        .then((result) => {
          if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$Swal.DismissReason.timer
          ) {
          console.log("I was closed by the timer"); // eslint-disable-line
          }
        })
    },
  },
}
</script>
