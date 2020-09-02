<template>
  <div>
    <Logo />
    <v-toolbar dark>
      <v-icon left>fas fa-tasks</v-icon>ระบบจัดการบัณฑิตนิพนธ์(สำหรับอาจารย์)
    </v-toolbar>
    <v-divider></v-divider>

    <clientOnly>
      <v-tabs centered icons-and-text fixed-tabs>
        <v-tab>
          ที่ปรึกษาโครงงาน
          <v-icon>fas fa-marker</v-icon>
        </v-tab>
        <v-tab>
          กรรมการสอบโครงงาน
          <v-icon>far fa-check-circle</v-icon>
        </v-tab>

        <v-tab-item>
          <AppConfirmProfes />
          <!-- AppConfirmProfes -->
        </v-tab-item>

        <v-tab-item>
          <AppConfirmFinal />
        </v-tab-item> </v-tabs
    ></clientOnly>
  </div>
</template>

<script>
import Logo from '~/components/AppLogoCsbsru'
import AppConfirmProfes from '~/components/projects/managesProfessor/AppConfirmProfes'
import AppConfirmFinal from '~/components/projects/managesProfessor/AppConfirmFinal'

export default {
  middleware: ['auth'],

  components: {
    AppConfirmProfes,
    AppConfirmFinal,
    Logo,
  },
  head() {
    return {
      title: 'จัดการโครงงาน(สำหรับอาจารย์)',
    }
  },
}
</script>
