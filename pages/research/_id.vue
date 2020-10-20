<template>
  <section>
    <AppTitleParallax :title="titleParallax" />

    <v-container class="mx-auto">
      <v-card class="mx-auto" max-width="100%">
        <v-flex>
          <Logo />

          <v-divider></v-divider>
          <v-card-text>
            <span class="text--primary">
              <strong>หัวข้องานวิจัย</strong>
            </span>
            <br />
            <p class="text-justify ml-5">{{ professorResearch.title }}</p>
          </v-card-text>

          <v-card-text>
            <span class="text--primary">
              <strong>เจ้าของงานวิจัย</strong>
            </span>
            <br />
            <p class="text-justify ml-5">
              {{ professorResearch.name || '' }}
            </p>
            <v-divider></v-divider>

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
                professorResearch.file ? professorResearch.file.url : true
              "
              :href="
                professorResearch.fileUrl ? professorResearch.fileUrl.url : '#'
              "
            >
              ดาวน์โหลดเอกสารงานวิจัย
              <v-icon right>fas fa-cloud-download-alt</v-icon>
            </v-btn>
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
import { QUERY_SINGLE_PROFESSOR_RESEARCH } from '@/graphql/queries/researches'
import Logo from '~/components/AppLogoCsbsru'
import AppTitleParallax from '~/components/parallax/AppTitleParallax'

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
