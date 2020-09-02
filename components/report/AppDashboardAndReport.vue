<template>
  <div>
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-1">แดชบอร์ดและรายงาน</h1>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab> <v-icon left>fas fa-search</v-icon>ค้นหาข้อมูลนักศึกษา </v-tab>
        <v-tab>
          <v-icon left>far fa-chart-bar</v-icon>สถิติการจบการศึกษา
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="searchByUsername"
                    label="ค้นหาข้อมูลนักศึกษา(รหัสนักศึกษา)"
                    outlined
                    prepend-icon="fas fa-search"
                    dense
                    autofocus
                    hint="58212070xx"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mx-auto">
                <v-spacer></v-spacer>

                <v-btn
                  rounded
                  color="primary"
                  :disabled="!searchByUsername"
                  :loading="btnLoading"
                  @click="searchNow"
                >
                  <v-icon left>fas fa-search</v-icon>ค้นหา</v-btn
                >
              </v-row>

              <v-row v-if="searchResult.length" justify="center" class="mt-5">
                <v-dialog v-model="dialog" width="600px">
                  <template v-slot:activator="{ on }">
                    <v-hover v-slot:default="{ hover }">
                      <v-card
                        :elevation="hover ? 12 : 2"
                        class="mx-auto"
                        max-width="100%"
                        tile
                        v-on="on"
                      >
                        <v-img
                          height="100%"
                          src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
                        >
                          <v-row align="end" class="fill-height">
                            <v-col align-self="start" class="pa-0" cols="12">
                              <v-avatar
                                class="profile"
                                color="grey"
                                size="164"
                                tile
                              >
                                <v-img
                                  v-if="searchResult[0].imageUrl"
                                  :src="searchResult[0].imageUrl.url"
                                ></v-img>
                                <v-img v-else :src="ImageUrl" />
                              </v-avatar>
                            </v-col>
                            <v-col class="py-0">
                              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                                <v-list-item-content>
                                  <v-list-item-title class="title">
                                    {{ searchResult[0].prefix }}
                                    {{ searchResult[0].firstName }}
                                    {{ searchResult[0].lastName }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle
                                    >รหัสนักศึกษา :
                                    {{
                                      searchResult[0].username
                                    }}</v-list-item-subtitle
                                  >
                                </v-list-item-content>
                              </v-list-item>
                            </v-col>
                          </v-row>
                        </v-img>
                      </v-card>
                    </v-hover>
                  </template>
                  <v-card>
                    <v-container fluid>
                      <v-card
                        v-if="searchResult"
                        class="mx-auto"
                        max-width="600"
                      >
                        <v-img
                          v-if="searchResult[0].imageUrl"
                          class="white--text align-end"
                          height="50%"
                          :src="searchResult[0].imageUrl.url"
                          lazy-src="https://picsum.photos/id/11/100/60"
                        >
                        </v-img>
                        <v-img v-else :src="ImageUrl"> </v-img>
                        <v-card-title>
                          <span class="headline">รายละเอียด</span>
                        </v-card-title>
                        <v-card-text>
                          <strong>ชื่อ :</strong>
                          {{ searchResult[0].prefix }}
                          {{ searchResult[0].firstName }}
                          {{ searchResult[0].lastName }}
                          <br />
                          <strong>ติดต่อ(email) :</strong>
                          {{ searchResult[0].email }}
                          <br />
                          <strong>โทรศัพท์ :</strong>
                          {{ searchResult[0].tel }} -
                          <strong>Facebook :</strong>
                          {{ searchResult[0].addr }} -
                          <strong>Line :</strong>
                          {{ searchResult[0].lineID }} -
                          <strong>ติดต่อผู้ปกครอง :</strong>
                          {{ searchResult[0].parents }}
                          <br />
                          <strong>สถานะการศึกษา :</strong>
                          {{ searchResult[0].status_Study.toLowerCase() }}
                          <br />

                          <strong>ปีที่เข้าศึกษา :</strong>
                          {{ $moment(searchResult[0].yearIn).format('LL') }}
                          <br />
                          <strong>วันเดือนปีเกิด :</strong>
                          {{
                            searchResult[0].birthDate
                              ? $moment(searchResult[0].birthDate).format('LL')
                              : 'ไม่มี'
                          }}
                          <br />

                          <v-row
                            ><v-col cols="12">
                              <v-textarea
                                v-model="searchResult[0].addr"
                                filled
                                auto-grow
                                label="ที่อยู่"
                                rows="2"
                                row-height="30"
                                shaped
                                disabled
                              ></v-textarea>
                            </v-col>
                          </v-row>

                          <br />
                        </v-card-text>
                      </v-card>
                    </v-container>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="dialog = false"
                        >Ok.</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <h2 v-else>
                <p
                  class="font-weight-light text-uppercase text-center red--text"
                >
                  No result.
                </p>
              </h2>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card>
            <v-container>
              <v-layout align-center justify-center wrap>
                <v-flex xs12 md8>
                  <v-responsive class="mx-auto" elevation="12" max-width="100%">
                    <!-- <CommingSoonPage /> -->

                    <ChartDoughnut />
                  </v-responsive>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import ChartDoughnut from '../chartjs/AppChartDoughnut'
const imageUrl = require('~/assets/images/default-profile.jpg')

export default {
  components: {
    ChartDoughnut,
  },

  data() {
    return {
      tab: null,
      ImageUrl: imageUrl,

      model: null,

      dialog: false,
      searchByUsername: '5821207010',
      searchResult: [],
      btnLoading: false,
    }
  },

  methods: {
    searchNow() {
      this.btnLoading = true
      this.$axios
        .$get('/users/?username=' + this.searchByUsername)
        .then((result) => {
          this.searchResult = result
          this.btnLoading = false
        })
    },
  },
}
</script>
