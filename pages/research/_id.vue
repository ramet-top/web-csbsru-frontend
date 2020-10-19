<template>
  <section>
    <AppTitleParallax :title="titleParallax" />

    <v-container class="mx-auto">
      <v-card class="mx-auto" max-width="100%">
        <v-flex>
          <Logo />

          <v-divider></v-divider>
          <!--          <v-card-title class="align-end fill-height"-->
          <!--            >หัวข้องานวิจัย-->
          <!--          </v-card-title>-->

          <v-card-text>
            <span class="text--primary">
              <strong>หัวข้องานวิจัย</strong>
            </span>
            <br />
            <p class="text-justify ml-5">{{ professorResearch.title }}</p>
          </v-card-text>

          <v-card-text>
            <span class="text--primary">
              <strong>รายละเอียด</strong>
            </span>
            <br />
            <p class="text-justify ml-5">
              {{ professorResearch.detail || '' }}
            </p>
            <v-divider></v-divider>

            <span class="text--primary">
              <strong>Download</strong>
            </span>
            <br />
            <br />
            <v-btn
              rounded
              block
              color="green"
              target="blank"
              :disabled="
                professorResearch.file ? professorResearch.file : 'true'
              "
              :href="
                professorResearch.fileUrl ? professorResearch.fileUrl.url : '#'
              "
            >
              ดาวน์โหลดเอกสารงานวิจัย
              <v-icon right>fas fa-cloud-download-alt</v-icon>
            </v-btn>

            <!--            <v-container>-->
            <!--              <v-row>-->
            <!--                <v-col col="12" md="4" align="center" justify="center">-->
            <!--                  <v-avatar v-if="showUserDetail.imageUrl" size="150">-->
            <!--                    <img :src="showUserDetail.imageUrl.url" alt="user image" />-->
            <!--                  </v-avatar>-->

            <!--                  <v-avatar v-else size="150">-->
            <!--                    <img src="DefaultImage" alt="DefaultImage" />-->
            <!--                  </v-avatar>-->
            <!--                </v-col>-->

            <!--                <v-col col="12" md="8">-->
            <!--                  <v-row no-gutters>-->
            <!--                    <v-col col="12" md="3">-->
            <!--                      <strong>ชื่อเจ้าของหัวข้อ :</strong>-->
            <!--                    </v-col>-->
            <!--                    <v-col col="12" md="6">-->
            <!--                      <p>-->
            <!--                        {{ showUserDetail.prefix }}-->
            <!--                        {{ showUserDetail.firstName }}-->
            <!--                        {{ showUserDetail.lastName }}-->
            <!--                      </p>-->
            <!--                    </v-col>-->
            <!--                  </v-row>-->

            <!--                  <v-row no-gutters>-->
            <!--                    <v-col col="12" md="3">-->
            <!--                      <strong>ที่ปรึกษาโครงงาน :</strong>-->
            <!--                    </v-col>-->
            <!--                    <v-col col="12" md="6">-->
            <!--                      <p>-->
            <!--                        {{ pro_adUser.prefix }}{{ pro_adUser.firstName }}-->
            <!--                        {{ pro_adUser.lastName }}-->
            <!--                      </p>-->
            <!--                    </v-col>-->
            <!--                  </v-row>-->

            <!--                  <v-row no-gutters>-->
            <!--                    <v-col col="12" md="3">-->
            <!--                      <strong>วันที่(อัปเดตล่าสุด) :</strong>-->
            <!--                    </v-col>-->
            <!--                    <v-col col="12" md="6">-->
            <!--                      <p>{{ $moment(project.updatedAt).format('llll') }} น.</p>-->
            <!--                    </v-col>-->
            <!--                  </v-row>-->

            <!--                  <v-row no-gutters>-->
            <!--                    <v-col col="12" md="3">-->
            <!--                      <strong>วันที่(สร้าง) :</strong>-->
            <!--                    </v-col>-->
            <!--                    <v-col col="12" md="6"-->
            <!--                      >{{ $moment(project.updatedAt).format('llll') }} น.</v-col-->
            <!--                    >-->
            <!--                  </v-row>-->

            <!--                  <v-card-actions>-->
            <!--                    <v-row>-->
            <!--                      <v-col col="12" md="6">-->
            <!--                        <v-btn-->
            <!--                          v-if="project.fileUrl"-->
            <!--                          rounded-->
            <!--                          block-->
            <!--                          color="green"-->
            <!--                          target="blank"-->
            <!--                          :href="project.fileUrl.url"-->
            <!--                        >-->
            <!--                          ดาวน์โหลดเอกสารบทที่ 1-->
            <!--                          <v-icon right>fas fa-cloud-download-alt</v-icon>-->
            <!--                        </v-btn>-->
            <!--                        <v-btn v-else rounded block color="green" disabled>-->
            <!--                          ดาวน์โหลดเอกสารบทที่ 1-->
            <!--                          <v-icon right>fas fa-cloud-download-alt</v-icon>-->
            <!--                        </v-btn>-->
            <!--                      </v-col>-->

            <!--                      <v-col col="12" md="6">-->
            <!--                        <v-btn-->
            <!--                          v-if="project.fileFull"-->
            <!--                          rounded-->
            <!--                          block-->
            <!--                          color="green"-->
            <!--                          target="blank"-->
            <!--                          :href="project.fileFull.url"-->
            <!--                        >-->
            <!--                          ดาวน์โหลดเอกสารตัวเต็ม .PDF-->
            <!--                          <v-icon right>fas fa-cloud-download-alt</v-icon>-->
            <!--                        </v-btn>-->

            <!--                        <v-btn v-else rounded block color="green" disabled>-->
            <!--                          ดาวน์โหลดเอกสารตัวเต็ม .PDF-->
            <!--                          <v-icon right>fas fa-cloud-download-alt</v-icon>-->
            <!--                        </v-btn>-->
            <!--                      </v-col>-->
            <!--                    </v-row>-->
            <!--                  </v-card-actions>-->
            <!--                </v-col>-->
            <!--              </v-row>-->
            <!--            </v-container>-->
            <v-divider></v-divider>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="$router.push('/research')"
            >
              <v-icon left dark>fas fa-arrow-left</v-icon>
              Back
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import Logo from '~/components/AppLogoCsbsru'
import AppTitleParallax from '~/components/parallax/AppTitleParallax'
import { QUERY_SINGLE_PROFESSOR_RESEARCH } from '@/graphql/queries/researches'

export default {
  components: {
    Logo,
    AppTitleParallax,
  },
  data() {
    return {
      professorResearch: {},
    }
  },

  computed: {
    titleParallax() {
      return 'รายละเอียด'
    },
    // getProfessorResearch() {
    //   return this.professorResearch[0]
    // },
  },

  apollo: {
    professorResearch: {
      query: QUERY_SINGLE_PROFESSOR_RESEARCH,
      prefetch: false,
      variables() {
        const param = this.$route.params
        return { id: param.id }
      },
      result({ data, loading, networkStatus }) {
        // console.log(data)
      },
      error(data) {
        console.log(data)
      },
    },
  },

  inject: ['theme'],
}
</script>
