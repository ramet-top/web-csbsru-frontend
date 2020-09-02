<template>
  <div>
    <v-card-title class="align-end fill-height">
      หัวข้อโครงงาน
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-text-field
          :value="projectData.title"
          label="ชื่อ"
          outlined
          disabled
        ></v-text-field>
      </v-container>

      <span class="text--primary">
        <strong>เนื้อหาเกี่ยวกับโครงงาน</strong>
      </span>
      <v-container>
        <v-textarea
          disabled
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
  props: ["projectData"],
}
</script>

<style lang="scss" scoped></style>
