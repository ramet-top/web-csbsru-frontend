<template>
  <clientOnly>
    <!-- อนุมัติเป็นอาจารย์ที่ปรึกษาโปรเจค -->
    <v-tabs centered>
      <v-tab> <v-icon left>fas fa-tint</v-icon>รออนุมัติ </v-tab>
      <v-tab> <v-icon left>fas fa-code-branch</v-icon>กำลังดำเนินการ </v-tab>
      <v-tab> <v-icon left>far fa-check-square</v-icon>สำเร็จ </v-tab>

      <!-- รอการอนุมัติการสอบหัวข้อ(โครงงาน) -->
      <v-tab-item>
        <v-card flat>
          <v-container>
            <v-card>
              <v-card-title>
                รายชื่อผู้ขอสิทธ์ให้เป็นที่ปรึกษาโครงงาน
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="fas fa-search"
                  label="Search (หัวข้อโครงงาน)"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="projects"
                :search="search"
              >
                <div v-if="loading" class="text-center mb-5 container">
                  <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
                </div>

                <template v-slot:item.user="{ item }">
                  <v-avatar size="30">
                    <v-img
                      class="mb-1"
                      contain
                      :src="
                        item.user.imageUrl
                          ? item.user.imageUrl.url
                          : defaultImage
                      "
                    ></v-img>
                  </v-avatar>
                  {{ item.user.username }}
                </template>

                <!-- firstName and lastName show -->
                <template v-slot:item.fullName="{ item }">
                  {{ item.user.prefix }}{{ item.user.firstName }}
                  {{ item.user.lastName }}
                </template>

                <template v-slot:item.createdAt="{ item }">{{
                  $moment(item.createdAt).format('llll')
                }}</template>

                <template v-slot:item.status="{ item }">
                  <v-chip :color="getColor(item.status)" dark>{{
                    item.status === 'DEFAULT' ? 'รออนุมัติ' : item.status
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
      </v-tab-item>

      <!-- ตรวจสอบรายชื่อหัวข้อ(โครงงาน) -->
      <v-tab-item>
        <AppListComponent />
      </v-tab-item>

      <!-- สำเร็จ/รอสอบ -->
      <v-tab-item>
        <AppSuccessComponent />
      </v-tab-item>
    </v-tabs>
  </clientOnly>
</template>

<script>
// import { QUERY_ALL_PROJECTS_CONFIRM } from '@/graphql/queries/projects.js'
import AppListComponent from '~/components/projects/AppListComponent'
import AppSuccessComponent from '~/components/projects/AppSuccessComponent'

export default {
  components: {
    AppListComponent,
    AppSuccessComponent,
  },

  data() {
    return {
      loading: false,
      search: '',
      projects: [],
    }
  },

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
    headers() {
      return [
        {
          text: 'หัวข้อโครงงาน',
          align: 'left',
          sortable: false,
          value: 'title',
        },
        { text: 'รหัส นศ.', value: 'user' },
        { text: 'ชื่อ-นามสกุล', value: 'fullName' },
        { text: 'วันที่ส่งคำขอ', value: 'createdAt' },
        { text: 'สถานะการสอบ', value: 'status' },
        {
          text: 'เพิ่มเติม',
          value: 'action',
          sortable: false,
          align: 'center',
        },
      ]
    },
    defaultImage() {
      return this.$store.getters.defaultImage
    },
  },

  mounted() {
    this.requestProjectUser()
  },

  methods: {
    getColor(col) {
      if (col === 'DEFAULT') return 'blue'
      else if (col === 'OPERATION') return 'orange'
      else return 'green'
    },
    async requestProjectUser() {
      try {
        this.loading = true
        const query = `?pro_ad_eq=${this.user.id}&status_eq=DEFAULT`
        const res = await this.$store.dispatch(
          'projects/professors/requestProjectUser',
          query
        )
        if (res) {
          this.projects = res
        }
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
  },

  // apollo: {
  //   projects: {
  //     query: QUERY_ALL_PROJECTS_CONFIRM,
  //     prefetch: true,
  //     fetchPolicy: 'network-only',
  //     variables() {
  //       return {
  //         where: {
  //           pro_ad: this.user.id,
  //           // confirm: this.confirm,
  //           status: 'DEFAULT',
  //         },
  //       }
  //     },
  //     result({ data, loading, networkStatus }) {
  //       this.loading = loading
  //     },
  //     error(data) {
  //       this.error = data
  //     },
  //   },
  // },
  inject: ['theme'],
}
</script>
