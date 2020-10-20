<template>
  <div v-if="!!project">
    <clientOnly>
      <span class="text--primary">
        <strong>รายละเอียด</strong>
      </span>
      <br />
      <v-row v-if="project">
        <v-col col="12" md="4" align="center" justify="center">
          <v-avatar size="150">
            <v-img
              :src="project.imageUrl ? project.imageUrl.url : defaultImage"
            />
          </v-avatar>
        </v-col>

        <v-col col="12" md="8">
          <v-row no-gutters>
            <v-col col="12" md="3">
              <strong>ชื่อเจ้าของหัวข้อ :</strong>
            </v-col>
            <v-col v-if="project.user" col="12" md="6">
              <p>
                {{ project.user.prefix }}
                {{ project.user.firstName }}
                {{ project.user.lastName }}
              </p>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col col="12" md="3">
              <strong>ที่ปรึกษาโครงงาน :</strong>
            </v-col>
            <v-col v-if="professorOfUser" col="12" md="6">
              <p>
                {{ professorOfUser.prefix }}{{ professorOfUser.firstName }}
                {{ professorOfUser.lastName }}
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
            <v-col col="12" md="6">
              {{ $moment(project.updatedAt).format('llll') }} น.
            </v-col>
          </v-row>

          <v-card-actions v-if="project">
            <v-row>
              <v-col col="12" md="6">
                <!--                {{ project.fileUrl.url }}-->
                <v-btn
                  v-if="project.fileUrl ? project.fileUrl.url : false"
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
                  v-if="project.fileFull ? project.fileFull.url : false"
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
    </clientOnly>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: null,
    },
    professorOfUser: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {}
  },

  computed: {
    defaultImage() {
      return this.$store.getters.defaultImage
    },
  },

  methods: {},
}
</script>

<style lang="scss" scoped></style>
