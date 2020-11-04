<template>
  <div>
    <AppTitleParallax :title="titleParallax" />

    <v-card class="mx-auto my-2" width="800">
      <v-progress-circular
        v-if="loading"
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <v-img
        class="white--text align-end"
        height="400px"
        contain
        :src="advisor.imageUrl ? advisor.imageUrl.url : ''"
        :lazy-src="advisor.imageUrl ? advisor.imageUrl.url : ''"
      >
        <v-card-title class="font-italic body-2 deep-purple lighten-1">
          {{ advisor.nameTH }}
        </v-card-title>
      </v-img>
      <v-card-title>
        <span class="headline">รายละเอียด</span>
      </v-card-title>
      <v-card-text>
        <strong>ภาษาอังกฤษ (ชื่อเต็ม) :</strong>
        {{ advisor.nameEN }}
        <br />
        <strong>ตำแหน่ง :</strong>
        {{ advisor.position }}
        <br />
        <strong>ติดต่อ :</strong>
        {{ advisor.email }}
        <br />
        <strong>โทรศัพท์ :</strong>
        {{ advisor.phone_one }}
        <br />
        <br />
        <strong>วุฒิการศึกษา :</strong>
        {{ advisor.education }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$router.push('/personnel')">
          <v-icon left small>fas fa-chevron-left</v-icon>
          Back
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import AppTitleParallax from '~/components/parallax/AppTitleParallax'

export default {
  components: {
    AppTitleParallax,
  },

  computed: {
    advisor() {
      return this.$store.getters['advisors/advisor']
    },
    loading: {
      get() {
        return this.$store.getters.loading
      },
      set(val) {
        return this.$store.dispatch('advisors/setLoading', val)
      },
    },
    titleParallax() {
      return 'ข้อมูลบุคลากร'
    },
  },

  mounted() {
    this.fetchAdvisor()
  },

  methods: {
    fetchAdvisor() {
      this.loading = true
      this.$store.dispatch('advisors/requestAdvisors', this.$route.params.id)
      this.loading = false
    },
  },
}
</script>
