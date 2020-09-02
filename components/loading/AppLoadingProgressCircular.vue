<template>
  <div v-if="loading" class="text-center mb-5 conatiner">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>

    <v-sheet
      :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
      class="px-3 pt-3 pb-12"
    >
      <v-skeleton-loader
        ref="skeleton"
        :boilerplate="boilerplate"
        :type="type"
        :tile="tile"
        class="mx-auto"
      ></v-skeleton-loader>
    </v-sheet>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ["loading"],

  data() {
    return {
      boilerplate: false,
      tile: false,
      type: 'list-item-avatar-three-line',
    }
  },
}
</script>
