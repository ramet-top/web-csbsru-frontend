<template>
  <v-container fluid>
    <v-data-iterator
      :items="workPosts"
      :items-per-page.sync="itemsPerPage"
      :footer-props="{ itemsPerPageOptions }"
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.title"
            cols="12"
            xl="3"
            lg="4"
            md="4"
            sm="6"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card
                max-width="300"
                class="mx-auto"
                height="470"
                :elevation="hover ? 12 : 2"
              >
                <v-list-item>
                  <v-list-item-avatar color="grey">
                    <img
                      :src="
                        item.user.imageUrl
                          ? item.user.imageUrl.url
                          : defaultImage
                      "
                      :lazy-src="lazyImage"
                      alt="John"
                    />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle v-if="item.user"
                      >โพสโดย : {{ item.user.firstName }}
                      {{ item.user.lastName }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle v-if="item.user">
                      <span class="text--grey"
                        >(อัปเดต) วันที่ :
                        {{
                          $moment(item.updatedAt).format('Do MMMM YYYY')
                        }}</span
                      ></v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <nuxt-link
                  :to="{
                    name: 'news-id',
                    params: { id: item.id },
                  }"
                  tag="a"
                >
                  <v-img
                    :src="item.imageUrl ? item.imageUrl.url : lazyImage"
                    :lazy-src="lazyImage"
                    height="260"
                  ></v-img>

                  <v-card-text class="black--text">
                    {{ item.title.slice(0, 80) + '...' }}
                  </v-card-text>
                </nuxt-link>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <nuxt-link
                    :to="{
                      name: 'news-id',
                      params: { id: item.id },
                    }"
                    tag="a"
                  >
                    <v-btn text color="orange"
                      >เพิ่มเติม
                      <v-icon right small>fab fa-readme</v-icon></v-btn
                    >
                  </nuxt-link>
                </v-card-actions>
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
      default: 12,
    },
  },

  data: () => ({
    itemsPerPageOptions: [3, 6, 9, 12],
    posts: [],
  }),

  computed: {
    workPosts() {
      return this.$store.getters['news/works']
    },
    defaultImage() {
      return this.$store.getters.defaultImage
    },
    lazyImage() {
      return this.$store.getters.lazyImage
    },
  },

  mounted() {
    this.requestWorksPosts()
  },

  methods: {
    requestWorksPosts() {
      this.$store.dispatch('news/requestWorksPosts')
    },
  },
}
</script>

<style lang="scss" scoped></style>
