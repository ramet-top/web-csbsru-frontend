<template>
  <div>
    <v-card>
      <v-responsive>
        <br />
        <v-card-title class="text-center justify-center py-6">
          <v-divider />
          <h1 class="font-weight-bold display-1">
            ข้อมูลห้องเรียนและเครื่องคอมพิวเตอร์
          </h1>
          <v-divider />
        </v-card-title>
        <v-container>
          <v-layout justify-center align-center>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/YhRMjLhYmpc"
              frameborder="1"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-container>
          <v-item-group class="mx-5">
            <v-row>
              <template v-for="(item, i) in photos">
                <v-col :key="i" cols="12" md="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card
                      :elevation="hover ? 12 : 2"
                      :class="{ 'on-hover': hover }"
                      dark
                      height="300"
                      :img="item.imageUrl ? item.imageUrl.url : defaultImage"
                      :lazy-src="lazyImage"
                      @click="toggleImageClick(item)"
                    >
                    </v-card>
                  </v-hover>
                </v-col>
              </template>
            </v-row>
          </v-item-group>
        </v-container>
      </v-responsive>
    </v-card>

    <v-dialog v-model="dialog" width="960px">
      <v-card>
        <v-img :src="itemSelected ? itemSelected.imageUrl.url : ''"> </v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { QUERY_ALL_PHOTOS } from '@/graphql/queries/photos'

export default {
  data() {
    return {
      dialog: false,
      photos: [],
      itemSelected: null,
    }
  },

  computed: {
    ImageUrl() {
      return require('~/assets/images/history/0_cover.jpg')
    },
    defaultImage() {
      return this.$store.getters.defaultImage
    },
    lazyImage() {
      return this.$store.getters.lazyImage
    },
  },

  methods: {
    toggleImageClick(value) {
      console.log('toggleImageClick::', value)
      this.itemSelected = value
      this.dialog = true
    },
  },

  apollo: {
    photos: {
      query: QUERY_ALL_PHOTOS,
      prefetch: true,
      result({ data, loading, networkStatus }) {
        this.loading = loading
      },
      error(data) {
        this.error = data
        console.log(data)
      },
    },
  },
}
</script>
