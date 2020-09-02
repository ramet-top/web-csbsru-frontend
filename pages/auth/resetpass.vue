<template>
  <div>
    <!-- password reset start -->
    <v-container>
      <v-row>
        <h3 class="mx-auto">
          <v-icon>fas fa-lock</v-icon> รีเซ็ตรหัสผ่าน
          <v-btn
            color="red darken-3"
            dark
            icon
            small
            @click="isEditingResetpass = !isEditingResetpass"
          >
            <v-icon v-if="isEditingResetpass">far fa-window-close</v-icon>
            <v-icon v-else>far fa-edit</v-icon>
          </v-btn>
        </h3>
      </v-row>

      <!-- pass old, new -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="userData.username"
            :disabled="!isEditingResetpass"
            color="red"
            outlined
            dense
            label="Username"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="userData.email"
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

      <!-- <h1>{{ chUser }}</h1> -->
    </v-container>
  </div>
</template>

<script>
import Strapi from 'strapi-sdk-javascript'
const strapi = new Strapi(process.env.BASE_URL || 'http://localhost:1337')

export default {
  data() {
    return {
      isEditingResetpass: null,
      userData: {
        username: '5821207010',
        email: 'rames01top@gmail.com',
      },
    }
  },

  methods: {
    async checkAlertResetPass() {
      if (this.userData.username && this.userData.email) {
        await strapi
          .getEntries('users', {
            username: this.userData.username,
          })
          .then((res) => {
            console.log(res[0].username)

            if (this.userData.email === res[0].email) {
              this.$Swal
                .fire({
                  title: 'คุณแน่ใจหรือไม่ที่จะ Reset รหัสผ่าน?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Ok!',
                })
                .then((result) => {
                  this.$axios
                    .$post(process.env.BASE_URL + '/auth/forgot-password', {
                      email: this.userData.email,
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
                    this.$router.push('/login')
                    this.isEditingResetpass = null
                  }
                })
            } else {
              this.$Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณากรอก username และ email ให้ตรงกับที่ใช้สมัคร!',
                footer: '<a href>Why do I have this issue?</a>',
              })
            }
          })
          .catch((error) => {
            this.$Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'ไม่มีชื่อผู้ใช้นี้!',
              footer: 'ERROR CODE: ' + error,
            })
          })
      } else {
        return this.$Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ!',
          footer: '<a href>Why do I have this issue?</a>',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
