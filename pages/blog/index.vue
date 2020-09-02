<template>
  <div>
    <Logo />

    <v-toolbar dark>
      <v-toolbar-title>
        <v-icon left>fas fa-blog</v-icon>ระบบข่าวประกาศ
      </v-toolbar-title>
      <br />
    </v-toolbar>
    <clientOnly>
      <v-tabs centered icons-and-text fixed-tabs>
        <v-tab>
          ข่าว
          <v-icon>fas fa-blog</v-icon>
        </v-tab>
        <v-tab>
          สมัครงาน
          <v-icon>fas fa-chart-line</v-icon>
        </v-tab>
        <v-tab>
          เพิ่มประกาศฯ
          <v-icon>fas fa-plus</v-icon>
        </v-tab>

        <!-- for all post -->
        <v-tab-item>
          <LatestPostAll />
        </v-tab-item>

        <!-- for all activity -->
        <v-tab-item>
          <LatestActivityAll />
        </v-tab-item>

        <!-- for all add -->
        <v-tab-item>
          <AddPost />
        </v-tab-item> </v-tabs
    ></clientOnly>
  </div>
</template>

<script>
import Logo from '~/components/AppLogoCsbsru'
import LatestPostAll from '~/components/activities/LatestPostAll'
import LatestActivityAll from '~/components/activities/LatestActivityAll'
import AddPost from '~/components/activities/AddPost'

export default {
  middleware: ['isProfessor'],
  components: {
    Logo,
    LatestPostAll,
    LatestActivityAll,
    AddPost,
  },
}
</script>
