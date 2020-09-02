<template>
  <v-container fluid class="mx-auto">
    <Logo />

    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>ระบบภาพกิจกรรม </v-toolbar-title><br />
      </v-toolbar>
      <v-tabs centered icons-and-text>
        <v-tab>ภาพกิจกรรม<v-icon>fas fa-blog</v-icon> </v-tab>
        <v-tab>เพิ่มกิจกรรม<v-icon>fas fa-plus</v-icon></v-tab>

        <!-- for all post -->
        <v-tab-item>
          <LatestPostAll />
        </v-tab-item>

        <!-- for all add -->
        <v-tab-item>
          <AddPost />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import Logo from '~/components/AppLogoCsbsru'
import LatestPostAll from '~/components/activities/LatestPostAll'
import AddPost from '~/components/activities/AddPost'

export default {
  middleware: ['isNotAuth'],
  components: {
    Logo,
    LatestPostAll,
    AddPost,
  },

  data: () => ({}),
}
</script>
