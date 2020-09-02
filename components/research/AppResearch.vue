<template>
  <client-only>
    <v-card>
      <v-card-title>
        ค้นหางานวิจัย
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

        <template v-slot:item.updatedAt="{ item }">{{
          $moment(item.updatedAt).format('llll')
        }}</template>

        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
        </template>

        <template v-slot:item.action="{ item }">
          <v-card-actions>
            <nuxt-link
              :to="{
                name: 'research-id',
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
  </client-only>
</template>
<script>
import { QUERY_ALL_PROJECTS_SUCCESS } from '@/graphql/queries/projects.js'

export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'ชื่อ (หัวข้อโครงงาน)',
          align: 'left',
          sortable: false,
          value: 'title',
        },
        { text: 'ชื่อผู้ใช้งาน', value: 'user' },
        // { text: "อาจาย์ที่ปรึกษาโครงาน", value: "pro_ad" },
        { text: 'วันที่แก้ไขล่าสุด', value: 'updatedAt' },
        { text: 'สถานะ', value: 'status' },
        // { text: "view", value: "more" },
        {
          text: 'เพิ่มเติม',
          value: 'action',
          sortable: false,
          align: 'center',
        },
      ],

      projects: [],
      loading: false,
    }
  },

  apollo: {
    projects: {
      query: QUERY_ALL_PROJECTS_SUCCESS,
      prefetch: true,
      variables() {
        return {
          where: {
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

  methods: {
    getColor(col) {
      if (col === 'DEFAULT') return 'blue'
      else if (col === 'OPERATION') return 'orange'
      else return 'green'
    },
  },

  inject: ['theme'],
}
</script>
