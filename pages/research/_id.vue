<template>
  <section>
    <v-parallax src=" https://unsplash.it/1920/1920/?image=1067" height="100">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-1 black--text">รายละเอียด</h1>
      </v-card-title>
    </v-parallax>

    <v-container class="mx-auto">
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
      <v-card v-else class="mx-auto" max-width="100%">
        <v-flex>
          <Logo />

          <v-divider></v-divider>
          <v-card-title class="align-end fill-height"
            >หัวข้อโครงงาน</v-card-title
          >
          <v-card-text>
            <v-container>
              <p class="text-justify">{{ projectData.title }}</p>
            </v-container>
          </v-card-text>

          <v-card-text>
            <!-- <br /> -->
            <span class="text--primary">
              <strong>เนื้อหาเกี่ยวกับโครงงาน</strong>
            </span>
            <v-container>
              <p class="text-justify">{{ projectData.detail }}</p>
            </v-container>
            <v-divider></v-divider>

            <span class="text--primary">
              <strong>รายละเอียด</strong>
            </span>
            <br />
            <v-container>
              <v-row>
                <v-col col="12" md="4" align="center" justify="center">
                  <v-avatar v-if="showUserDetail.imageUrl" size="150">
                    <img :src="showUserDetail.imageUrl.url" alt="user image" />
                  </v-avatar>

                  <v-avatar v-else size="150">
                    <img src="DefaultImage" alt="DefaultImage" />
                  </v-avatar>
                </v-col>

                <v-col col="12" md="8">
                  <v-row no-gutters>
                    <v-col col="12" md="3">
                      <strong>ชื่อเจ้าของหัวข้อ :</strong>
                    </v-col>
                    <v-col col="12" md="6">
                      <p>
                        {{ showUserDetail.prefix }}
                        {{ showUserDetail.firstName }}
                        {{ showUserDetail.lastName }}
                      </p>
                    </v-col>
                  </v-row>

                  <v-row no-gutters>
                    <v-col col="12" md="3">
                      <strong>ที่ปรึกษาโครงงาน :</strong>
                    </v-col>
                    <v-col col="12" md="6">
                      <p>
                        {{ pro_adUser.prefix }}{{ pro_adUser.firstName }}
                        {{ pro_adUser.lastName }}
                      </p>
                    </v-col>
                  </v-row>

                  <v-row no-gutters>
                    <v-col col="12" md="3">
                      <strong>วันที่(อัปเดตล่าสุด) :</strong>
                    </v-col>
                    <v-col col="12" md="6">
                      <p>{{ $moment(project.updatedAt).format('llll') }} น.</p>
                    </v-col>
                  </v-row>

                  <v-row no-gutters>
                    <v-col col="12" md="3">
                      <strong>วันที่(สร้าง) :</strong>
                    </v-col>
                    <v-col col="12" md="6"
                      >{{ $moment(project.updatedAt).format('llll') }} น.</v-col
                    >
                  </v-row>

                  <v-card-actions>
                    <v-row>
                      <v-col col="12" md="6">
                        <v-btn
                          v-if="project.fileUrl"
                          rounded
                          block
                          color="green"
                          target="blank"
                          :href="project.fileUrl.url"
                        >
                          ดาวน์โหลดเอกสารบทที่ 1
                          <v-icon right>fas fa-cloud-download-alt</v-icon>
                        </v-btn>
                        <v-btn v-else rounded block color="green" disabled>
                          ดาวน์โหลดเอกสารบทที่ 1
                          <v-icon right>fas fa-cloud-download-alt</v-icon>
                        </v-btn>
                      </v-col>

                      <v-col col="12" md="6">
                        <v-btn
                          v-if="project.fileFull"
                          rounded
                          block
                          color="green"
                          target="blank"
                          :href="project.fileFull.url"
                        >
                          ดาวน์โหลดเอกสารตัวเต็ม .PDF
                          <v-icon right>fas fa-cloud-download-alt</v-icon>
                        </v-btn>

                        <v-btn v-else rounded block color="green" disabled>
                          ดาวน์โหลดเอกสารตัวเต็ม .PDF
                          <v-icon right>fas fa-cloud-download-alt</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-container>
            <v-divider></v-divider>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="goback">
              <v-icon left dark>fas fa-arrow-left</v-icon>Back
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import { QUERY_SINGLE_PROJECT } from '@/graphql/queries/projects.js'
import Logo from '~/components/AppLogoCsbsru'
const DefaultImage = require('~/assets/images/default-profile.jpg')

export default {
  components: {
    Logo,
  },
  data() {
    return {
      error: null,
      project: [],
      loading: false,

      projectData: {
        id: '',
        title: '',
        detail: '',
        status: 'NONE',
        pro_ad: '',
        confirm: false,
      },

      showUserDetail: {
        prefix: '',
        firstName: '',
        lastName: '',
        imageUrl: {
          url: '',
        },
      },
      pro_adUser: '',

      defaultImage: DefaultImage,
    }
  },

  mounted() {
    this.findProAd()
  },

  apollo: {
    project: {
      query: QUERY_SINGLE_PROJECT,
      // refreshes the query everytime
      prefetch: true,
      fetchPolicy: 'network-only',
      variables() {
        const params = this.$route.params
        return { id: params.id }
      },
      result({ data, loading, networkStatus }) {
        this.loading = loading
        this.projectData = data.project
        this.showUserDetail = data.project.user
      },
      error(data) {
        this.error = data
      },
    },
  },

  methods: {
    goback() {
      this.$router.go(-1)
    },

    findProAd() {
      try {
        this.$axios.$get('/users/' + this.projectData.pro_ad).then((result) => {
          this.pro_adUser = result
        })
      } catch (error) {
        console.log(error)
      }
    },
  },

  inject: ['theme'],
}
</script>
