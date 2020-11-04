<template>
  <div>
    <!--    <Logo />-->
    <v-toolbar>
      <v-icon left>fas fa-tasks</v-icon>
      ระบบจัดการบัณฑิตนิพนธ์(สำหรับอาจารย์)
      <p>{{ mainTab }}</p>
    </v-toolbar>
    <v-divider></v-divider>

    <clientOnly>
      <v-tabs v-model="mainTab" centered icons-and-text fixed-tabs>
        <v-tab>
          ที่ปรึกษาโครงงาน
          <v-icon>fas fa-marker</v-icon>
        </v-tab>
        <v-tab>
          กรรมการสอบโครงงาน
          <v-icon>far fa-check-circle</v-icon>
        </v-tab>

        <!--  before confirm with professor-->
        <v-tab-item>
          <AppConfirmProfes />
        </v-tab-item>

        <!--  After confirm professor-->
        <v-tab-item>
          <AppConfirmFinal />
        </v-tab-item>
      </v-tabs>
    </clientOnly>
  </div>
</template>

<script>
// import Logo from '~/components/AppLogoCsbsru'
import AppConfirmProfes from '~/components/projects/managesProfessor/AppConfirmProfes'
import AppConfirmFinal from '~/components/projects/managesProfessor/AppConfirmFinal'

export default {
  middleware: ['auth'],

  components: {
    AppConfirmProfes,
    AppConfirmFinal,
    // Logo,
  },

  data() {
    return {
      // mainTab: null,
    }
  },

  computed: {
    mainTab: {
      get() {
        return this.$store.getters['projects/mainTab']
      },
      set(value) {
        return this.$store.dispatch('projects/setMainTab', value)
      },
    },
  },
  head() {
    return {
      title: 'จัดการโครงงาน(สำหรับอาจารย์)',
    }
  },
}
</script>
