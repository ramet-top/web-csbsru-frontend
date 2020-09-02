<template>
  <div>
    <v-card>
      <v-responsive>
        <div>
          <v-parallax :src="ImageUrl" height="100">
            <v-card-title class="text-center justify-center py-6">
              <h1 class="font-weight-bold display-1 black--text">
                หลักสูตร
              </h1>
            </v-card-title>
            <h5 class="text-center font-weight-bold black--text">
              สาขาวิชาคอมพิวเตอร์ศึกษา มหาวิทยาลัยราชภัฎบ้านสมเด็จเจ้าพระยา
            </h5>
          </v-parallax>
          <!--          <v-card-title class="text-center justify-center py-6">-->
          <!--            <h1 class="font-weight-bold display-1">หลักสูตร</h1>-->
          <!--          </v-card-title>-->
          <!--          <h5 class="text-center">-->
          <!--            สาขาวิชาคอมพิวเตอร์ศึกษา มหาวิทยาลัยราชภัฎบ้านสมเด็จเจ้าพระยา-->
          <!--          </h5>-->
          <br />
          <v-divider />
          <v-container>
            <v-layout align-center justify-center wrap>
              <v-flex xs12 md5>
                <v-timeline>
                  <v-timeline-item
                    v-for="n in items"
                    :key="n.title"
                    color="red lighten-2"
                  >
                    <template v-slot:opposite>{{ n.level }}</template>

                    <v-card class="elevation-5">
                      <v-card-title>{{ n.title }}</v-card-title>
                      <v-card-text>{{ n.detail }}</v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-flex>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-flex xs12 md5>
                <v-card flat class="transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">
                      รายละเอียดหลักสูตร
                      <v-icon color="orange" right
                        >fas fa-graduation-cap</v-icon
                      >
                    </div>
                  </v-card-title>
                  <v-card-text>
                    จำนวนหน่วยกิตรวมตลอดหลักสูตร ไม่น้อยกว่า 135 หน่วยกิต
                    โดยมีสัดส่วนหน่วยกิต แต่ละหมวดวิชา และกลุ่มวิชา ดังนี้
                    <br />1. หมวดวิชาศึกษาทั่วไป จำนวน 30 หน่วยกิต <br />2.
                    หมวดวิชาเฉพาะ ไม่น้อยกว่า จำนวน 99 หน่วยกิต <br />3.
                    หมวดวิชาเลือกเสรี จำนวน 6 หน่วยกิต
                  </v-card-text>
                  <v-list class="transparent">
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon>fas fa-graduation-cap</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <p>ชื่อหลักสูตร :</p>
                        <v-card-text
                          >วิทยาศาสตรบัณฑิต สาขาวิชา วิทยาการคอมพิวเตอร์(
                          Bachelor of Science Program in Computer Science
                          )</v-card-text
                        >
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-action>
                        <v-icon class="green--text text--lighten-2"
                          >fas fa-signature</v-icon
                        >
                      </v-list-item-action>
                      <v-list-item-content>
                        <p>ภาษาไทย (ชื่อเต็ม) :</p>
                        <v-card-text
                          >วิทยาศาสตรบัณฑิต (วิทยาการคอมพิวเตอร์)</v-card-text
                        >
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-action>
                        <v-icon class="black--text text--lighten-2"
                          >fas fa-signature</v-icon
                        >
                      </v-list-item-action>
                      <v-list-item-content>
                        <p>ภาษาอังกฤษ (ชื่อเต็ม) :</p>
                        <v-card-text
                          >Bachelor of Science (Computer Science)</v-card-text
                        >
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-action>
                        <v-icon class="green--text text--lighten-2"
                          >fas fa-pencil-alt</v-icon
                        >
                      </v-list-item-action>
                      <v-list-item-content>
                        <p>ภาษาไทย (ชื่อย่อ) :</p>
                        <v-card-text>วท.บ. (วิทยาการคอมพิวเตอร์)</v-card-text>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-action>
                        <v-icon class="black--text text--lighten-2"
                          >fas fa-pencil-alt</v-icon
                        >
                      </v-list-item-action>
                      <v-list-item-content>
                        ภาษาอังกฤษ (ชื่อย่อ) :
                        <v-card-text>B.Sc. (Computer Science)</v-card-text>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-responsive>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'ปริญญาตรี',
          detail:
            'ปริญญาตรี หรือ ปริญญาบัณฑิต เป็นระดับการศึกษาย่อยในการอุดมศึกษา ต่อเนื่องจากชั้นมัธยมศึกษา',
          level: 'ปริญญาบัณฑิต ',
        },
        {
          title: 'ปริญญาโท',
          detail:
            'เป็นปริญญาที่ให้แก่บุคคลซึ่งผ่านการศึกษาซึ่งแสดงความชำนาญหรือภาพรวมระดับสูง (high-order overview) ',
          level: 'ปริญญามหาบัณฑิต',
        },
        {
          title: 'ปริญญาเอก',
          detail:
            'เป็นปริญญาวิชาการหรือวิชาชีพซึ่งในประเทศส่วนใหญ่ให้ผู้ถือมีคุณสมบัติสอนในระดับมหาวิทยาลัยในสาขาเฉพาะของปริญญานั้น หรือทำงานในวิชาชีพเฉพาะ',
          level: 'ปริญญาดุษฎีบัณฑิต',
        },
      ],

      length: 3,
      window: 0,
    }
  },

  computed: {
    ImageUrl() {
      return require('~/assets/images/pr.jpeg')
    },
  },
}
</script>
