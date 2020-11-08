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
        :disabled="type"
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
        <p class="green--text">
          <strong>วันที่ส่งคำขอขึ้นสอบหัวข้อ :</strong>
          {{ $moment(project.finalDate).format('dddd LL') || null }}
        </p>
        <p v-if="!type" class="red--text">
          <strong>วันที่ส่งคำขอขึ้นสอบหัวข้อ(แก้ไขใหม่) :</strong>
          {{ $moment(project.finalDate).format('dddd LL') || null }}
        </p>
      </v-col>
      <v-col cols="12" sm="6">
        <template v-if="!type">
          <template v-if="statusProject === 'OPERATION'">
            <v-radio-group v-model="project.finalTime" disabled>
              <template v-slot:label>
                <div>
                  <strong>กรุณาเลือกเวลาสอบหัวข้อโครงงาน</strong>
                </div>
              </template>
              <v-radio value="MORNING">
                <template v-slot:label>
                  <div>
                    <strong class="dark--text">ช่วงเช้า</strong>
                  </div>
                </template>
              </v-radio>
              <v-radio value="AFTERNOON">
                <template v-slot:label>
                  <div>
                    <strong class="dark--text">ช่วงบ่าย</strong>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </template>
          <template v-else>
            <v-radio-group v-model="project.finalTime">
              <template v-slot:label>
                <div>
                  <strong>กรุณาเลือกเวลาสอบหัวข้อโครงงาน</strong>
                </div>
              </template>
              <v-radio value="MORNING">
                <template v-slot:label>
                  <div>
                    <strong class="dark--text">ช่วงเช้า</strong>
                  </div>
                </template>
              </v-radio>
              <v-radio value="AFTERNOON">
                <template v-slot:label>
                  <div>
                    <strong class="dark--text">ช่วงบ่าย</strong>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </template>
        </template>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title name',
    },
    statusProject: {
      type: String,
      default: 'DEFAULT',
    },
    project: {
      type: Object,
      default: null,
    },
    type: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
}
</script>
