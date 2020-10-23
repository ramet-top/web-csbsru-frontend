<template>
  <v-container>
    <v-data-iterator
      :items="posts"
      :items-per-page.sync="$props.itemsPerPage"
      :footer-props="{ itemsPerPageOptions }"
    >
      <template v-slot:default="props">
        <div v-if="loading" class="text-center">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
          <v-row>
            <v-col cols="12" xl="3" lg="4" md="4" sm="6">
              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class="px-3 pt-3 pb-3"
              >
                <v-skeleton-loader
                  class="mx-auto"
                  max-width="300"
                  type="card"
                ></v-skeleton-loader>
              </v-sheet>
            </v-col>
            <v-col cols="12" xl="3" lg="4" md="4" sm="6">
              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class="px-3 pt-3 pb-3"
              >
                <v-skeleton-loader
                  class="mx-auto"
                  max-width="300"
                  type="card"
                ></v-skeleton-loader>
              </v-sheet>
            </v-col>
            <v-col cols="12" xl="3" lg="4" md="4" sm="6">
              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class="px-3 pt-3 pb-3"
              >
                <v-skeleton-loader
                  class="mx-auto"
                  max-width="300"
                  type="card"
                ></v-skeleton-loader>
              </v-sheet>
            </v-col>
          </v-row>
        </div>

        <v-row v-else>
          <v-col
            v-for="item in props.items"
            :key="item.title"
            cols="12"
            xl="4"
            lg="4"
            md="4"
            sm="6"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card
                max-width="344"
                class="mx-auto"
                height="500"
                :elevation="hover ? 12 : 2"
              >
                <v-list-item>
                  <v-list-item-avatar color="grey">
                    <img
                      :src="
                        item.user && item.user.imageUrl
                          ? item.user.imageUrl.url
                          : defaultImage
                      "
                      :lazy-src="lazyImage"
                      alt="John"
                      height="300"
                    />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle v-if="item.user"
                      >โพสโดย : {{ item.user.firstName }}
                      {{ item.user.lastName }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-if="item.user">
                      <span class="text--grey"
                        >(อัปเดตล่าสุด) วันที่ :
                        {{
                          $moment(item.updatedAt).format('Do MMMM YYYY')
                        }}</span
                      >
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <nuxt-link
                  :to="{
                    name: 'blog-id',
                    params: { id: item.id },
                  }"
                  tag="a"
                >
                  <v-img
                    :src="item.imageUrl ? item.imageUrl.url : lazyImage"
                    :lazy-src="lazyImage"
                    height="300"
                  ></v-img>

                  <v-card-text class="black--text">
                    {{ item.title.slice(0, 80) + '...' }}
                  </v-card-text>
                </nuxt-link>

                <v-row>
                  <v-col>
                    <v-btn
                      :to="{
                        name: 'blog-id',
                        params: { id: item.id || '' },
                      }"
                      text
                      color="orange"
                      >เพิ่มเติม
                      <v-icon right small>fab fa-readme</v-icon>
                    </v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-switch
                    v-model="item.publish"
                    class="mr-5"
                    disabled
                    label="Active"
                  ></v-switch>
                </v-row>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  props: {
    itemsPerPage: {
      type: Number,
      default: 4,
    },
  },

  data() {
    return {
      itemsPerPageOptions: [4, 8, 12, 24],
      loading: false,
      posts: [],
      // defaultImage: require('~/assets/images/commingSoon.jpg'),
    }
  },

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
    defaultImage() {
      return this.$store.getters.defaultImage
    },
    lazyImage() {
      return this.$store.getters.lazyImage
    },
  },
  mounted() {
    this.fetchPosts()
  },

  methods: {
    async fetchPosts() {
      this.posts = await this.$axios.$get(
        `/posts?&category=POST&_sort=createdAt:desc`
      )
    },
  },
  inject: ['theme'],
}
</script>
