<template>
  <div>
    <v-parallax src="https://unsplash.it/1920/1920/?image=1067" height="80">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-1 black--text">ข้อมูลบุคลากร</h1>
      </v-card-title>
    </v-parallax>

    <v-card class="mx-auto" width="800">
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
        <v-btn color="green darken-1" text @click="goback">
          <v-icon left small>fas fa-chevron-left</v-icon>Back
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
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

    goback() {
      this.$router.push('/')
    },
  },
}
</script>
