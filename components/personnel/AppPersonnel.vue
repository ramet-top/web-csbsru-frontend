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
                      <!--                      <v-card-->
                      <!--                        class="mx-auto"-->
                      <!--                        max-width="344"-->
                      <!--                        :elevation="hover ? 12 : 2"-->
                      <!--                      >-->
                      <!--                        <nuxt-link-->
                      <!--                          :to="{-->
                      <!--                            name: 'personnel-id',-->
                      <!--                            params: { id: item.id },-->
                      <!--                          }"-->
                      <!--                          tag="a"-->
                      <!--                        >-->
                      <!--                          <v-img-->
                      <!--                            class="white&#45;&#45;text align-end"-->
                      <!--                            height="200px"-->
                      <!--                            contain-->
                      <!--                            :src="-->
                      <!--                              item.imageUrl ? item.imageUrl.url : defaultImage-->
                      <!--                            "-->
                      <!--                          >-->
                      <!--                            <v-card-title-->
                      <!--                              class="font-italic body-2 deep-purple lighten-1"-->
                      <!--                            >-->
                      <!--                              {{ item ? item.nameTH : '' }}-->
                      <!--                            </v-card-title>-->
                      <!--                          </v-img>-->

                      <!--                          <v-card-subtitle class="pb-0"-->
                      <!--                            >Number 10</v-card-subtitle-->
                      <!--                          >-->
                      <!--                        </nuxt-link>-->

                      <!--                        &lt;!&ndash;                        <v-list-item>&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                          <v-list-item-content>&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                            <p>ภาษาอังกฤษ (ชื่อเต็ม) :</p>&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                            <v-card-text>{{ item.nameEN }}</v-card-text>&ndash;&gt;-->

                      <!--                        &lt;!&ndash;                            <p>ตำแหน่ง :</p>&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                            <v-card-text>{{ item.position }}</v-card-text>&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                          </v-list-item-content>&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                        </v-list-item>&ndash;&gt;-->

                      <!--                        &lt;!&ndash;                        <nuxt-link&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                          :to="{&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                            name: 'personnel-id',&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                            params: { id: item.id },&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                          }"&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                          tag="a"&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                        >&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                          <v-btn text color="orange"&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                            >ข้อมูลเพิ่มเติม&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                            <v-icon right small&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                              >fas fa-angle-double-right</v-icon&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                            ></v-btn&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                          >&ndash;&gt;-->
                      <!--                        &lt;!&ndash;                        </nuxt-link>&ndash;&gt;-->
                      <!--                      </v-card>-->
                      <v-card :elevation="hover ? 12 : 2">
                        <v-avatar>
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            alt="John"
                          /> </v-avatar
                      ></v-card>
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
