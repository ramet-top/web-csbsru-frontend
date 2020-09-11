<template>
  <div>
    <v-card>
      <v-responsive>
        <div>
          <br />
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-1">ข้อมูลอาจารย์และบุคลากร</h1>
          </v-card-title>
          <h5 class="text-center">
            สาขาวิชาคอมพิวเตอร์ศึกษา มหาวิทยาลัยราชภัฎบ้านสมเด็จเจ้าพระยา
          </h5>
          <br />

          <v-divider />
          <div v-if="loading" class="text-center container">
            <v-row>
              <v-col cols="12" xl="3" lg="3" md="3" sm="6">
                <v-sheet
                  :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                  class="px-3 pt-3 pb-3"
                >
                  <v-skeleton-loader
                    class="mx-auto"
                    max-width="300"
                    type="card"
                  ></v-skeleton-loader>
                </v-sheet>
              </v-col>
              <v-col cols="12" xl="3" lg="3" md="3" sm="6">
                <v-sheet
                  :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                  class="px-3 pt-3 pb-3"
                >
                  <v-skeleton-loader
                    class="mx-auto"
                    max-width="300"
                    type="card"
                  ></v-skeleton-loader>
                </v-sheet>
              </v-col>
              <v-col cols="12" xl="3" lg="3" md="3" sm="6">
                <v-sheet
                  :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                  class="px-3 pt-3 pb-3"
                >
                  <v-skeleton-loader
                    class="mx-auto"
                    max-width="300"
                    type="card"
                  ></v-skeleton-loader>
                </v-sheet>
              </v-col>
              <v-col cols="12" xl="3" lg="3" md="3" sm="6">
                <v-sheet
                  :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                  class="px-3 pt-3 pb-3"
                >
                  <v-skeleton-loader
                    class="mx-auto"
                    max-width="300"
                    type="card"
                  ></v-skeleton-loader>
                </v-sheet>
              </v-col>
            </v-row>
          </div>
          <v-container v-else>
            <v-data-iterator
              :items="advisors"
              :items-per-page.sync="$props.itemsPerPage"
              :footer-props="{ itemsPerPageOptions }"
            >
              <template v-slot:default="props">
                <!-- custom -->
                <v-row>
                  <v-col
                    v-for="item in props.items"
                    :key="item.title"
                    cols="12"
                    xl="3"
                    lg="3"
                    md="3"
                    sm="6"
                  >
                    <v-hover v-slot:default="{ hover }">
                      <v-card
                        :to="{
                          name: 'personnel-id',
                          params: { id: item.id },
                        }"
                        class="mx-auto custom-card-image"
                        width="200"
                        :elevation="hover ? 12 : 2"
                      >
                        <div class="text-center pt-12">
                          <v-avatar size="100px">
                            <v-img
                              alt="advisor images"
                              contain
                              height="100"
                              :src="
                                item.imageUrl ? item.imageUrl.url : defaultImage
                              "
                            />
                          </v-avatar>

                          <h5 class="mt-12">
                            <strong>
                              {{ item.nameTH }}
                            </strong>
                          </h5>

                          <h6 class="mt-2 mb-4 pb-10">
                            ตำแหน่ง : {{ item.position }}
                          </h6>
                        </div>
                      </v-card>
                    </v-hover>
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-container>
        </div>
      </v-responsive>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    itemsPerPage: {
      type: Number,
      default: 12,
    },
  },

  data() {
    return {
      itemsPerPageOptions: [4, 8, 10, 12],
    }
  },

  computed: {
    advisors() {
      return this.$store.getters['advisors/advisors']
    },

    loading: {
      get() {
        return this.$store.getters.loading
      },
      set(val) {
        return this.$store.dispatch('advisors/setLoading', val)
      },
    },

    defaultImage() {
      return this.$store.getters.defaultImage
    },
  },

  mounted() {
    this.fetchAdvisors()
  },

  methods: {
    fetchAdvisors() {
      this.loading = true
      this.$store.dispatch('advisors/requestAdvisors')
      this.loading = false
    },
  },

  inject: ['theme'],
}
</script>

<style scoped>
.custom-card-image {
  background-color: ghostwhite;
}
</style>
