<template>
  <div>
    <v-card>
      <template v-slot:progress>
        <v-progress-linear
          absolute
          color="green lighten-3"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
    </v-card>

    <EditUserImage />

    <div class="container">
      <v-card class="mx-12 px-5 my-5">
        <EditProfile />
        <v-divider></v-divider>
        <PassResetAndChangPass />
      </v-card>
    </div>
  </div>
</template>
<script>
import EditUserImage from '~/components/auth/EditUserImage'
import EditProfile from '~/components/auth/EditProfile'
import PassResetAndChangPass from '~/components/auth/PassResetAndChangPass'

export default {
  components: {
    EditUserImage,
    EditProfile,
    PassResetAndChangPass,
  },
  head() {
    return {
      title: 'แก้ไขโปรไฟล์',
    }
  },

  middleware: ['auth'],
}
</script>
