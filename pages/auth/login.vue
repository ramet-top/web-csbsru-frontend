<template>
  <div>
    <AppLogoCsbsru class="py-0" />

    <v-card class="mx-auto" max-width="800" raised>
      <div class="container mb-5 px-5">
        <h3 class="text-center">
          <em>
            <v-icon left>fas fa-sign-in-alt</v-icon>
            กรุณาเข้าสู่ระบบ
          </em>
        </h3>
        <clientOnly>
          <v-form @submit.prevent="login">
            <v-card-text>
              <v-text-field
                v-model.trim="credentials.identifier"
                label="อีเมล | รหัส นศ."
                prepend-icon="fas fa-user-lock"
                type="text"
                :rules="[rules.required, rules.min]"
                autofocus
              ></v-text-field>
              <v-text-field
                v-model.trim="credentials.password"
                label="รหัสผ่าน"
                prepend-icon="fas fa-key"
                :append-icon="show1 ? 'far fa-eye' : 'far fa-eye-slash'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                hint="มากกว่า 8 ตัวอักษร"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>

              <a @click="snackbar = true">รายละเอียด</a>
              <v-divider class="mx-4" inset vertical></v-divider>
              <nuxt-link to="/auth/resetpass">ลืมรหัสผ่าน</nuxt-link>

              <v-snackbar v-model="snackbar" :vertical="vertical">
                {{ text }}
                <v-btn color="indigo" text @click="snackbar = false">
                  Close
                </v-btn>
              </v-snackbar>

              <div class="text-center">
                <v-row>
                  <v-col col="12">
                    <v-btn
                      type="submit"
                      rounded
                      color="primary"
                      large
                      block
                      @keyup.enter="submit"
                    >
                      <v-icon left>fas fa-sign-in-alt</v-icon>
                      Login
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>

            <div v-if="submitting" class="text-center">
              <v-progress-circular
                :size="30"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
          </v-form>
        </clientOnly>

        <div v-if="error" style="color: red">
          Username หรือ Password ไม่ถูกต้อง กรุณาลงชื่อเข้าใช้ใหม่
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import AppLogoCsbsru from '~/components/AppLogoCsbsru'

export default {
  layout: 'login',

  components: {
    AppLogoCsbsru,
  },

  data() {
    return {
      btnDis: false,
      submitting: false,
      error: null,
      credentials: {
        identifier: '5821207010',
        password: '1234567890',
      },

      // snackbar
      snackbar: false,
      text: 'สำหรับการเข้าใช้งาน สามารถเข้าใช้งานได้ทั้งรหัสนักศึกษาและอีเมล์',
      vertical: true,

      show1: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => "The email and password you entered don't match",
      },
    }
  },

  computed: {
    drawer: {
      get() {
        return this.$store.getters['navigations/drawer']
      },
      set(val) {
        return this.$store.dispatch('navigations/setDrawer', val)
      },
    },
  },

  methods: {
    async login() {
      try {
        await this.$auth
          .loginWith('local', {
            data: this.credentials,
          })
          .then(async (res) => {
            await this.$apolloHelpers.onLogin(res.data.jwt)
          })
        await this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    },
  },
  head() {
    return {
      title: 'เข้าสู่ระบบ',
    }
  },
  middleware: 'guest',
}
</script>
