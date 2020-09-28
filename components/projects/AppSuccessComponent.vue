<template>
  <v-card flat>
    <v-container>
      <v-card>
        <v-card-title>
          รายชื่อผู้ผ่านการสอบหัวข้อโครงงาน(ในที่ปรึกษาโครงงาน)
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="fas fa-search"
            label="Search (หัวข้อโครงงาน)"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="projects" :search="search">
          <div v-if="loading" class="text-center mb-5 conatiner">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>

            <v-sheet
              :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
              class="px-3 pt-3 pb-12"
            >
              <v-skeleton-loader
                ref="skeleton"
                :boilerplate="boilerplate"
                :type="type"
                :tile="tile"
                class="mx-auto"
              ></v-skeleton-loader>
            </v-sheet>
          </div>

          <template v-slot:item.user="{ item }">
            <v-avatar v-if="item.user.imageUrl" size="25">
              <v-img :src="item.user.imageUrl.url"></v-img>
            </v-avatar>
            <v-avatar v-else color="indigo" size="25">
              <v-icon dark>fas fa-user-circle</v-icon>
            </v-avatar>
            {{ item.user.username }}
          </template>

          <!-- firstName and lastName show -->
          <template v-slot:item.fullName="{ item }"
            >{{ item.user.prefix }}{{ item.user.firstName }}
            {{ item.user.lastName }}</template
          >
          <!-- send -->
          <template v-slot:item.createdAt="{ item }">{{
            $moment(item.createdAt).format('LL')
          }}</template>
          <!-- end -->

          <!-- final -->
          <template v-slot:item.dateTime="{ item }"
            >{{ $moment(item.finalDate).format('LL') }} :
            {{ getFinalTime(item.finalTime) }}</template
          >

          <!-- end -->

          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)" dark>{{
              item.status
            }}</v-chip>
          </template>

          <template v-slot:item.action="{ item }">
            <v-card-actions>
              <nuxt-link
                :to="{
                  name: 'project-id',
                  params: { id: item.id },
                }"
                tag="a"
              >
                <v-btn text color="gray">
                  <v-icon small class="mr-2">fas fa-eye</v-icon>เพิ่มเติม
                </v-btn>
              </nuxt-link>
            </v-card-actions>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
import { QUERY_ALL_PROJECTS_CONFIRM } from '@/graphql/queries/projects.js'

export default {
  middleware: ['isNotAuth'],

  components: {},
  data() {
    return {
      loading: false,
      search: '',
      headers: [
        {
          text: 'หัวข้อโครงงาน',
          align: 'left',
          sortable: false,
          value: 'title',
        },
        { text: 'รหัส นศ.', value: 'user' },
        { text: 'ชื่อ-นามสกุล', value: 'fullName' },
        { text: 'วันที่ส่งคำขอ', value: 'createdAt' },
        { text: 'วันที่สอบ', value: 'dateTime' },
        { text: 'สถานะการสอบ', value: 'status' },
        {
          text: 'เพิ่มเติม',
          value: 'action',
          sortable: false,
          align: 'center',
        },
      ],

      projects: [],
    }
  },

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
  },

  methods: {
    getColor(col) {
      if (col === 'DEFAULT') return 'blue'
      else if (col === 'OPERATION') return 'orange'
      else return 'green'
    },

    getFinalTime(time) {
      if (time === 'MORNING') return 'เช้า'
      else return 'บ่าย'
    },
  },

  apollo: {
    projects: {
      query: QUERY_ALL_PROJECTS_CONFIRM,
      prefetch: true,
      fetchPolicy: 'network-only',
      variables() {
        return {
          where: {
            pro_ad: this.user.id,
            status: 'SUCCESS',
          },
        }
      },
      result({ data, loading, networkStatus }) {
        this.loading = loading
      },
      error(data) {
        this.error = data
      },
    },
  },
  inject: ['theme'],
}
</script>
