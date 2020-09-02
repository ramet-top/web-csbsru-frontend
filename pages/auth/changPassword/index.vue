<template>
  <div>
    <v-container class="my-5">
      <v-row>
        <h3 class="mx-auto">
          <v-icon>fas fa-key</v-icon> เปลี่ยนรหัสผ่าน

          <v-icon>far fa-edit</v-icon>
        </h3>
      </v-row>

      <!-- pass new -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="PasswordNew"
            color="red"
            outlined
            dense
            label="Password New"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="PasswordConfirm"
            color="red"
            outlined
            dense
            label="Password Confirm"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" color="success" dark @click="checkAlertPassChang"
          >Send
          <v-icon dark right>fas fa-save</v-icon>
        </v-btn>
      </v-row>
    </v-container>

    <div>SECURE CODE</div>
    <!-- <div> SECURE CODE ? {{ queryParamsCode }}</div> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  // middleware: ["isNotAuth"],
  data() {
    return {
      queryParamsCode: '',
      isEditingChengpass: null,
      PasswordNew: '',
      PasswordConfirm: '',
    }
  },

  mounted() {
    this.queryParamsCode = this.$route.query.code
  },

  methods: {
    ...mapMutations({
      logoutStore: 'auth/logout',
    }),

    checkAlertPassChang() {
      this.$Swal
        .fire({
          title: 'คุณแน่ใจหรือไม่ที่จะเปลี่ยนรหัสผ่าน?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok!',
        })
        .then((result) => {
          this.$axios
            .$post(process.env.BASE_URL + '/auth/reset-password', {
              code: this.queryParamsCode,
              password: this.PasswordNew,
              passwordConfirmation: this.PasswordConfirm,
            })
            .then((response) => {
              console.log("Your user's password has been changed.")
              this.logout()
            })
            .catch((error) => {
              console.log('An error occurred:', error)
            })
          if (result.value) {
            this.$Swal.fire('success!', 'เปลี่ยนรหัสผ่านเรียบร้อย.', 'success')
            this.isEditingChengpass = null
            this.$router.push('/login')
          }
        })
    },

    logout() {
      this.logoutStore()
    },
  },
}
</script>

<style lang="scss" scoped></style>
