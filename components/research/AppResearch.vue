<template>
  <div>
    <client-only>
      <v-card v-if="professorResearches.length > 0">
        <v-card-title>
          ค้นหางานวิจัย
          <v-spacer></v-spacer>
          <!--          <p class="mr-2">Search(ชื่องานวิจัย)</p>-->
          <v-text-field
            v-model="search"
            append-icon="fas fa-search"
            label="Search (งานวิจัย)"
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="professorResearches"
          :search="search"
        >
          <div v-if="loading" class="text-center mb-5 container">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>

            <v-sheet
              :color="`grey ${$vuetify.theme.dark ? 'darken-2' : 'lighten-4'}`"
              class="px-3 pt-3 pb-12"
            >
              <v-skeleton-loader
                ref="skeleton"
                class="mx-auto"
              ></v-skeleton-loader>
            </v-sheet>
          </div>
          <template v-slot:item.title="{ item }">
            <p class="d-inline-block text-truncate" style="max-width: 150px;">
              {{ item.title }}
            </p>
          </template>

          <template v-slot:item.name="{ item }">
            <p class="d-inline-block text-truncate" style="max-width: 150px;">
              {{ item.name }}
            </p>
          </template>

          <template v-slot:item.updatedAt="{ item }">{{
            $moment(item.updatedAt).format('llll')
          }}</template>

          <!--        <template v-slot:item.status="{ item }">-->
          <!--          <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>-->
          <!--        </template>-->

          <template v-slot:item.action="{ item }">
            <v-card-actions class="d-flex justify-center">
              <nuxt-link
                :to="{
                  name: 'research-id',
                  params: { id: item.id },
                }"
                tag="a"
              >
                <v-btn text color="gray">
                  <v-icon small>fas fa-eye</v-icon>
                </v-btn>
              </nuxt-link>
            </v-card-actions>
          </template>
        </v-data-table>
      </v-card>
    </client-only>
  </div>
</template>
<script>
import { QUERY_ALL_PROFESSOR_RESEARCHES } from '@/graphql/queries/researches'

export default {
  data() {
    return {
      search: '',

      professorResearches: [],
      // professor_researches: [],
      loading: false,
    }
  },

  computed: {
    headers() {
      return [
        {
          text: 'ชื่องานวิจัย',
          align: 'left',
          sortable: false,
          value: 'title',
        },
        { text: 'เจ้าของ', value: 'name' },
        // { text: "อาจาย์ที่ปรึกษาโครงาน", value: "pro_ad" },
        { text: 'วันที่แก้ไขล่าสุด', value: 'updatedAt' },
        // { text: 'สถานะ', value: 'status' },
        // { text: "view", value: "more" },
        {
          text: 'เพิ่มเติม',
          value: 'action',
          sortable: false,
          align: 'center',
        },
      ]
    },
  },

  apollo: {
    professorResearches: {
      query: QUERY_ALL_PROFESSOR_RESEARCHES,
      prefetch: true,
      result({ data, loading, networkStatus }) {},
      error(data) {
        console.log(data)
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
