<template>
  <div>
    <v-divider></v-divider>
    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-auto">
          <v-flex xs12 sm4>
            <v-card flat class="transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">ข้อมูลเพิ่มเติม</div>
              </v-card-title>
              <v-card-text>
                มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา (อังกฤษ: Bansomdejchaopraya
                Rajabhat University) เป็นมหาวิทยาลัยในกลุ่มมหาวิทยาลัยราชภัฏ
                ตั้งอยู่ในเขตธนบุรี กรุงเทพมหานคร
              </v-card-text>
              <v-row align="center" justify="center">
                <v-img
                  :src="ImageUrl"
                  :lazy-src="ImageUrl"
                  aspect-ratio="0"
                  class="grey darken-1"
                  max-width="70%"
                  max-height="250"
                ></v-img>
              </v-row>
            </v-card>
            <v-container class="align-center justify-center">
              <v-btn
                v-for="(ic, i) in items"
                :key="i"
                icon
                target="blank"
                :href="ic.to"
              >
                <v-icon>{{ ic.icon }}</v-icon>
              </v-btn>
            </v-container>
          </v-flex>

          <v-flex xs12 sm4 offset-sm1>
            <v-card flat class="transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">ติดต่อเรา</div>
              </v-card-title>
              <v-card-text>
                วิทยาการคอมพิวเตอร์ | Computer Science ::
                คณะวิทยาศาสตร์และเทคโนโลยี | Faclty of Science and Technology
              </v-card-text>
              <v-list class="transparent">
                <v-list-item>
                  <v-list-item-action>
                    <v-icon class="blue--text text--lighten-2"
                      >fas fa-phone</v-icon
                    >
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-card-text>02-473-7000 ต่อ 3120</v-card-text>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon class="blue--text text--lighten-2"
                      >fas fa-map-marked</v-icon
                    >
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-card-text>
                      1061 ซอย อิสรภาพ 15 แขวง หิรัญรูจี เขตธนบุรี กรุงเทพมหานคร
                      10600
                    </v-card-text>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon class="blue--text text--lighten-2"
                      >fas fa-envelope</v-icon
                    >
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-card-text>john@example.com</v-card-text>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <v-footer class="py-4" dark height="auto">
      <v-container mx-auto>
        <v-layout wrap>
          <v-flex xs9>
            <div class="white--text ml-4">
              <p>
                <v-icon class="red--text" left small>fab fa-vuejs</v-icon>Create
                By
                <a
                  class="white--text"
                  href="https://www.facebook.com/TopRamet.Akh"
                  >Top RametAKH</a
                >
                <v-icon right small>fab fa-facebook</v-icon>
              </p>

              <a
                class="white--text"
                :href="`${BASE_URL || '#'}`"
                target="_blank"
              >
                <p>
                  <v-icon class="red--text" left small
                    >fas fa-user-shield</v-icon
                  >For Admin Login
                </p>
              </a>
            </div>
          </v-flex>
          <v-spacer />
          <v-btn
            class="mr-0 green"
            small
            square
            title="Go to top"
            @click="$vuetify.goTo(0)"
          >
            <v-icon>fas fa-angle-up</v-icon>
          </v-btn>
        </v-layout>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      ImageUrl: require('~/assets/images/logoText.png'),
      BASE_URL: process.env.BASE_URL + '/admin',
    }
  },
  computed: {
    items() {
      return [
        {
          icon: 'fab fa-facebook',
          to: 'http://www.facebook.com/ComputerScienceBsru/',
        },
        {
          icon: 'fab fa-twitter',
          to: '#',
        },
        {
          icon: 'fab fa-google-plus',
          to: '#',
        },
        {
          icon: 'fab fa-linkedin',
          to: '#',
        },
        {
          icon: 'fab fa-instagram',
          to: '#',
        },
        {
          icon: 'fab fa-line',
          to: '#',
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped></style>
