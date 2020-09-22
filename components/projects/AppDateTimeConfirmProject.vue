<template>
  <div>
    <span class="text--primary">
      <strong>{{ title }}</strong>
    </span>
    <v-row>
      <v-date-picker
        v-model="project.finalDate"
        full-width
        :landscape="$vuetify.breakpoint.smAndUp"
        class="mt-4"
        type="date"
        locale="th"
      ></v-date-picker>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <p>
          <strong>วันที่ปัจจุบัน :</strong>
          {{ $moment(new Date()).format('dddd LL') }}
        </p>
        <p>
          <strong>วันที่ ที่เลือกขึ้นสอบหัวข้อ :</strong>
          {{ $moment(project.finalDate).format('dddd LL') }}
        </p>
      </v-col>
      <v-col cols="12" sm="6">
        <v-radio-group v-model="project.finalTime">
          <template v-slot:label>
            <div>
              <strong>กรุณาเลือกเวลาสอบหัวข้อโครงงาน CSBSRU Project.</strong>
            </div>
          </template>
          <v-radio value="MORNING">
            <template v-slot:label>
              <div>
                <strong class="dark--text">ช่วงเช้า 10.00 น</strong>
              </div>
            </template>
          </v-radio>
          <v-radio value="AFTERNOON">
            <template v-slot:label>
              <div>
                <strong class="dark--text">ช่วงบ่าย 13.30 น</strong>
              </div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title name',
    },
    project: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
}
</script>
