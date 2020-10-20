<template>
  <div>
    <v-card>
      <AppTitleParallax :title="titleParallax" />
      <v-container>
        <v-divider class="my-5"></v-divider>

        <v-layout align-center justify-center wrap>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-flex xs12 md5>
            <v-responsive class="mx-auto" elevation="12" max-width="100%">
              <v-row justify="center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d290.854251326678!2d100.48929135469228!3d13.732958067337332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298fe8dcd0d13%3A0x8166225c8081ce3a!2z4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lij4Liy4LiK4Lig4Lix4LiP4Lia4LmJ4Liy4LiZ4Liq4Lih4LmA4LiU4LmH4LiI4LmA4LiI4LmJ4Liy4Lie4Lij4Liw4Lii4Liy!5e0!3m2!1sth!2sth!4v1565933108821!5m2!1sth!2sth"
                  width="600"
                  height="450"
                  frameborder="0"
                  style="border: 0"
                  allowfullscreen
                ></iframe>
              </v-row>
            </v-responsive>
          </v-flex>

          <v-divider class="mx-4" inset vertical></v-divider>

          <v-flex xs12 md5>
            <v-responsive class="mx-auto" elevation="12" max-width="100%">
              <v-row justify="center">
                <v-card flat class="transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">
                      รายละเอียด
                      <v-icon color="orange" right
                        >fas fa-map-marker-alt
                      </v-icon>
                    </div>
                  </v-card-title>
                  <v-card-text
                    >วิทยาการคอมพิวเตอร์ | Computer Science ::
                    คณะวิทยาศาสตร์และเทคโนโลยี | Faculty of Science and
                    Technology
                  </v-card-text>
                  <v-list class="transparent">
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon class="green--text text--lighten-2"
                          >fas fa-phone
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title
                          >02-473-7000 ต่อ 3120
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon class="green--text text--lighten-2"
                          >fas fa-map-marked
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title
                          >ห้อง 412 อาคาร 4 ชั้น 1
                          มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon class="green--text text--lighten-2"
                          >fas fa-envelope
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>john@example.com</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-row>
            </v-responsive>
          </v-flex>

          <v-divider class="mx-4" inset vertical></v-divider>
        </v-layout>

        <v-divider class="my-5"></v-divider>
      </v-container>
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
    titleParallax() {
      return 'ข้อมูลการติดต่อ'
    },
  },
}
</script>

<style lang="scss" scoped></style>
