<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1">ข่าวประชาสัมพันธ์</h1>
    </v-card-title>

    <!--    <pre>-->
    <!--    tab::  {{ tab }}-->
    <!--    </pre>-->

    <clientOnly>
      <v-tabs v-model="tab" centered fixed-tabs>
        <v-tabs-slider></v-tabs-slider>
        <v-tab>ข่าว<v-icon right>fas fa-blog</v-icon></v-tab>
        <v-tab>ภาพกิจกรรม<v-icon right>fas fa-images</v-icon></v-tab>

        <v-tabs-items v-model="tab">
          <template>
            <NewsUpdate :status-tab="tab" :items-per-page="itemsPerPage" />
          </template>

          <template>
            <ActivityPhotos :items-per-page="itemsPerPage" />
          </template>
        </v-tabs-items>
      </v-tabs>
    </clientOnly>
  </v-card>
</template>
<script>
import NewsUpdate from '~/components/news/updateNewsActivity/NewsUpdate'
import ActivityPhotos from '~/components/news/updateNewsActivity/ActivityPhotos'

export default {
  components: {
    NewsUpdate,
    ActivityPhotos,
  },

  props: {
    itemsPerPage: {
      type: Number,
      default: 12,
    },
  },

  data() {
    return {
      tab: null,
      loading: false,
    }
  },

  methods: {
    reserve() {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>
<style>
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}

.custom-card {
  align-items: center;
  background: url(https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80);
  background-size: cover;
  background-position: center;
  opacity: 0.9;
}
</style>
