<template>
  <v-col cols="12" sm="6" xl="3" lg="3" md="4">
    <v-hover v-slot:default="{ hover }">
      <nuxt-link
        :to="{
          name: 'news-id',
          params: { id: item.id },
        }"
        class="text-decoration-none"
        tag="a"
      >
        <v-card
          max-width="300"
          class="mx-auto"
          height="470"
          :elevation="hover ? 12 : 2"
        >
          <v-list-item>
            <v-list-item-avatar color="grey">
              <v-img
                :src="
                  item.user && item.user.imageUrl
                    ? item.user.imageUrl.url
                    : defaultImage
                "
                :lazy-src="defaultImage"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-subtitle
                >โพสโดย : {{ item.use ? item.user.firstName : 'Admin' }}
                {{ item.use ? item.user.lastName : '' }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <span class="text--grey"
                  >(อัปเดต) วันที่ :
                  {{
                    item.use
                      ? $moment(item.updatedAt).format('Do MMMM YYYY')
                      : 'ว/ด/ป ไม่ระบุ'
                  }}</span
                ></v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-img
            :src="item.imageUrl ? item.imageUrl.url : lazyImage"
            :lazy-src="item.imageUrl ? item.imageUrl.url : lazyImage"
            height="260"
            contain
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card-text class="black--text">
            {{ item.title.slice(0, 80) + '...' }}
          </v-card-text>

          <v-row>
            <v-col>
              <v-btn
                :to="{
                  name: 'news-id',
                  params: { id: item.id || '' },
                }"
                text
                color="orange"
                >เพิ่มเติม
                <v-icon right small>fab fa-readme</v-icon>
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-card>
      </nuxt-link>
    </v-hover>
  </v-col>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      show: false,
    }
  },

  computed: {
    defaultImage() {
      return this.$store.getters.defaultImage
    },
    lazyImage() {
      return this.$store.getters.lazyImage
    },
  },
}
</script>

<style lang="scss" scoped></style>
