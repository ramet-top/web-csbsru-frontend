<template>
  <div>
    <v-card-title class="align-end fill-height">
      หัวข้อโครงงาน
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-text-field
          dense
          :value="projectData.title"
          label="ชื่อ"
          outlined
          :disabled="typeofDisabled.btnTitleDisabled"
        ></v-text-field>
      </v-container>

      <span class="text--primary">
        <strong>เนื้อหาเกี่ยวกับโครงงาน</strong>
      </span>
      <v-container>
        <v-textarea
          dense
          :disabled="typeofDisabled.textArea"
          outlined
          name="input-7-4"
          label="รายละเอียด"
          :value="projectData.detail"
        ></v-textarea>
      </v-container>
      <v-divider></v-divider>
    </v-card-text>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  // props: ["projectData", "typeofDisabled" ],
  props: {
    projectData: {
      type: Object,
      default: null,
    },
    typeofDisabled: {
      type: Object,
      default: () => ({
        btnTitleDisabled: false,
        textArea: false,
      }),
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
