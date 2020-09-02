<template>
  <v-card>
    <v-responsive>
      <br />
      <v-card-title class="text-center justify-center py-6">
        <v-divider />
        <h1 class="font-weight-bold display-1">
          ข้อมูลห้องเรียนและเครื่องคอมพิวเตอร์
        </h1>
        <v-divider />
      </v-card-title>
      <v-container>
        <v-layout justify-center align-center>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/YhRMjLhYmpc"
            frameborder="1"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-item-group class="mx-5">
          <v-row>
            <v-col v-for="c in 1" :key="c" cols="12" md="12">
              <v-item v-slot:default="{ active, toggle }">
                <v-card
                  :color="active ? 'primary' : ''"
                  class="d-flex align-center"
                  dark
                  height="600"
                  :img="ImageUrl"
                  @click="toggle"
                >
                  <v-scroll-y-transition>
                    <div
                      v-if="active"
                      class="display-1 flex-grow-1 text-center black"
                    >
                      <v-cart-text>CSBSRU</v-cart-text>
                      <h5>Computer Science BSRU</h5>
                    </div>
                  </v-scroll-y-transition>
                </v-card>
              </v-item>
            </v-col>
          </v-row>

          <!-- prombrem -->
          <v-row>
            <v-col v-for="(n, i) in items" :key="i" cols="12" md="6">
              <v-item v-slot:default="{ active, toggle }">
                <v-card
                  :color="active ? 'primary' : ''"
                  class="d-flex align-center"
                  dark
                  height="300"
                  :img="n.src"
                  @click="toggle"
                >
                  <v-scroll-y-transition>
                    <div
                      v-if="active"
                      class="display-3 flex-grow-1 text-center"
                    >
                      Active
                    </div>
                  </v-scroll-y-transition>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-container>
    </v-responsive>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      ImageUrl: require('~/assets/images/history/0_cover.jpg'),
    }
  },

  computed: {
    items() {
      return [
        {
          src: require('~/assets/images/history/1_cover.jpg'),
        },
        {
          src: require('~/assets/images/history/2_cover.jpg'),
        },
        {
          src: require('~/assets/images/history/3_cover.jpg'),
        },
        {
          src: require('~/assets/images/history/4_cover.jpeg'),
        },
      ]
    },
  },
}
</script>
