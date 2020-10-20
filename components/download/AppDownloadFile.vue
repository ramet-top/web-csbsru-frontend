<template>
  <div>
    <v-card>
      <AppTitleParallax :title="titleParallax" />

      <clientOnly>
        <v-tabs v-model="tab" centered icons-and-text>
          <v-tab>
            ไฟล์ดาวน์คู่มือ
            <v-icon>fas fa-arrow-alt-circle-down</v-icon>
          </v-tab>
          <v-tab>ดาวน์โหลดไฟล์ CP<v-icon>fas fa-project-diagram</v-icon></v-tab>
          <v-tab>(สำหรับอาจารย์)<v-icon>fas fa-user-tie</v-icon></v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card>
              <v-container>
                <v-layout align-center justify-center wrap>
                  <v-flex xs12 md8>
                    <v-responsive
                      class="mx-auto"
                      elevation="12"
                      max-width="100%"
                    >
                      <div>
                        <v-expansion-panels v-model="panel" multiple>
                          <v-expansion-panel
                            v-for="(item, i) in fileItemsGUIDE"
                            :key="i"
                          >
                            <v-icon class="my-2">fas fa-book-open</v-icon>
                            <v-expansion-panel-header>
                              ไฟล์ {{ item.name }}
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              {{ item.detail }}
                              <br />
                              <div class="my-2">
                                <v-btn
                                  color="success"
                                  target="_blank"
                                  :href="item.src.url"
                                >
                                  Download Now
                                  <v-icon right
                                    >fas fa-cloud-download-alt</v-icon
                                  >
                                </v-btn>
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                    </v-responsive>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card>
              <v-container>
                <v-layout align-center justify-center wrap>
                  <v-flex xs12 md8>
                    <v-responsive
                      class="mx-auto"
                      elevation="12"
                      max-width="100%"
                    >
                      <div>
                        <v-expansion-panels v-model="panel" multiple>
                          <v-expansion-panel
                            v-for="(item, i) in fileItemsCP"
                            :key="i"
                          >
                            <v-icon class="my-2">fas fa-file-download</v-icon>
                            <v-expansion-panel-header
                              >ไฟล์ {{ item.name }}</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                              {{ item.detail }}
                              <br />
                              <div class="my-2">
                                <v-btn target="_blank" :href="item.src.url">
                                  Download Now
                                  <v-icon right
                                    >fas fa-cloud-download-alt</v-icon
                                  >
                                </v-btn>
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                    </v-responsive>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card v-if="user">
              <v-container>
                <v-layout
                  v-if="user.role.name === 'AuthProfessor' || ''"
                  align-center
                  justify-center
                  wrap
                >
                  <v-flex xs12 md8>
                    <v-responsive
                      class="mx-auto"
                      elevation="12"
                      max-width="100%"
                    >
                      <div>
                        <v-expansion-panels v-model="panel" multiple>
                          <v-expansion-panel
                            v-for="(item, i) in fileItemsSECURE"
                            :key="i"
                          >
                            <!--                            <v-icon class="my-2">{{ item.icon }}</v-icon>-->
                            <v-icon class="my-2">fas fa-file-download</v-icon>
                            <v-expansion-panel-header
                              >ไฟล์ {{ item.name }}</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                              {{ item.detail }}
                              <br />
                              <div class="my-2">
                                <v-btn target="_blank" :href="item.src.url">
                                  Download Now
                                  <v-icon right
                                    >fas fa-cloud-download-alt</v-icon
                                  >
                                </v-btn>
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                    </v-responsive>
                  </v-flex>
                </v-layout>

                <v-layout v-else align-center justify-center wrap>
                  <h5>สำหรับอาจารย์</h5>
                </v-layout>
              </v-container>
            </v-card>

            <v-card v-else>
              <v-container>
                <v-layout align-center justify-center wrap>
                  <h5>สำหรับอาจารย์</h5>
                </v-layout>
              </v-container>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </clientOnly>
    </v-card>
  </div>
</template>

<script>
import AppTitleParallax from '~/components/parallax/AppTitleParallax'
export default {
  components: {
    AppTitleParallax,
  },
  data() {
    return {
      tab: null,
      loading: false,
      selection: 1,
      model: null,
      page: 1,
      // ImageUrl: require('~/assets/images/pr.jpeg'),
      panel: [],
      items: [],
    }
  },

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
    fileItemsGUIDE() {
      return this.items.filter((v) => v.type === 'GUIDE')
    },
    fileItemsCP() {
      return this.items.filter((v) => v.type === 'CP')
    },
    fileItemsSECURE() {
      return this.items.filter((v) => v.type === 'SECURE')
    },
    ImageUrl() {
      return require('~/assets/images/pr.jpeg')
    },
    titleParallax() {
      return 'ดาวน์โหลดไฟล์'
    },
  },

  mounted() {
    this.requestFileDownloads()
  },

  methods: {
    reserve() {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },

    async requestFileDownloads() {
      try {
        this.items = await this.$store.dispatch(
          'downloadfiles/requestFileDownloads'
        )
        // console.log(this.items)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
