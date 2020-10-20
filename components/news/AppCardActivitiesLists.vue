<template>
  <v-col cols="12" sm="6" xl="3" lg="3" md="4">
    <v-hover v-slot:default="{ hover }">
      <nuxt-link
        :to="{
          name: 'activities-id',
          params: { id: item.id },
        }"
        class="text-decoration-none"
        tag="a"
      >
        <v-card
          height="100%"
          max-width="344"
          class="mx-auto"
          :elevation="hover ? 12 : 2"
        >
          <v-list-item>
            <v-list-item-avatar color="grey">
              <v-img :src="defaultImage" :lazy-src="lazyImage" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-subtitle>โพสโดย : Admin </v-list-item-subtitle>
              <v-list-item-subtitle>
                <span class="text--grey"
                  >(อัปเดต) วันที่ :
                  {{ $moment(item.updatedAt).format('Do MMMM YYYY') }}</span
                ></v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-img
            :src="item.imageFirst ? item.imageFirst.url : lazyImage"
            :lazy-src="lazyImage"
            height="300px"
            width="344px"
          ></v-img>
          <v-card-subtitle class="black--text">
            {{ item.title.slice(0, 80) + '...' }}
          </v-card-subtitle>
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
