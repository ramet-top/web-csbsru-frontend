<template>
  <div>
    <!-- password reset start -->
    <v-container>
      <v-row>
        <h3 class="mx-auto">
          <v-icon>fas fa-lock</v-icon> รีเซ็ตรหัสผ่าน

          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn
                color="red darken-3"
                dark
                icon
                v-on="on"
                @click="isEditingResetpass = !isEditingResetpass"
              >
                <v-icon v-if="isEditingResetpass">far fa-window-close</v-icon>
                <v-icon v-else>far fa-edit</v-icon>
              </v-btn>
            </template>
            <span>แก้ไขรหัสผ่าน</span>
          </v-tooltip>
        </h3>
      </v-row>

      <!-- pass old, new -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :disabled="!isEditingResetpass"
            color="red"
            outlined
            dense
            label="Email"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2"
          color="success"
          :disabled="!isEditingResetpass"
          dark
          @click="checkAlertResetPass"
          >Submit
          <v-icon dark right>fas fa-save</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import Strapi from 'strapi-sdk-javascript'
// const strapi = new Strapi(process.env.BASE_URL || 'http://localhost:1337')

export default {
  data() {
    return {
      isEditingResetpass: null,
      email: '',
      userEmail: '',
    }
  },

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
  },

  //   getUser() {
  //     const rs = strapi
  //       .getEntries('users', {
  //         _id: this.user.id,
  //       })
  //       .then((res) => {
  //         this.userEmail = res[0].email
  //       })
  //   },
  // },

  mounted() {
    // this.getUser()
  },

  methods: {
    checkAlertResetPass() {
      if (this.email) {
        if (this.email === this.userEmail) {
          this.$Swal
            .fire({
              title: 'คุณแน่ใจหรือไม่ที่จะ Reset รหัสผ่าน?',
              // text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok!',
            })
            .then((result) => {
              this.$axios
                .$post(process.env.BASE_URL + '/auth/forgot-password', {
                  email: this.email,
                })
                .then((response) => {
                  console.log('Your user received an email')
                })
                .catch((error) => {
                  console.log('An error occurred:', error)
                })

              if (result.value) {
                this.$Swal.fire(
                  'success!',
                  'กรุณาเช็ค email หลังจากนั้นให้ลงชื่อเข้าใช้ระบบใหม่เพื่อเข้าใช้งาน.',
                  'success'
                )
                this.$router.push('/secureUser/profile')
                this.isEditingResetpass = null
              }
            })
        } else {
          this.$Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณากรอก email ให้ตรงกับที่ใช้สมัคร!',
            footer: '<a href>Why do I have this issue?</a>',
          })
        }
      } else {
        return this.$Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'กรุณากรอก email!',
          footer: '<a href>Why do I have this issue?</a>',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
