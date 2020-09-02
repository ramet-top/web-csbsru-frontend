<template>
  <v-container fluid>
    <v-data-iterator
      :items="posts"
      :items-per-page.sync="$props.itemsPerPage"
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
                max-width="344"
                class="mx-auto"
                :elevation="hover ? 12 : 2"
              >
                <v-list-item>
                  <v-list-item-avatar v-if="item.user.imageUrl" color="grey">
                    <img
                      :src="item.user.imageUrl.url"
                      lazy-src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    />
                  </v-list-item-avatar>
                  <v-list-item-avatar v-else color="grey">
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      lazy-src="https://cdn.vuetifyjs.com/images/john.jpg"
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
                        >(อัปเดตล่าสุด) วันที่ :
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
                    v-if="item.imageUrl"
                    :src="item.imageUrl.url"
                    :lazy-src="item.imageUrl.url"
                    height="300"
                  ></v-img>

                  <v-card-text>{{ item.title }}</v-card-text>
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
