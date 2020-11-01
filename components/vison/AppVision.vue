<template>
  <section>
    <AppTitleParallax :title="titleParallax" :sub-title="subTitleParallax" />
    <v-card class="py-15">
      <v-tabs v-model="tab" class="mt-2" centered icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab>
          ปรัชญา (Philosophy)
          <v-icon>fab fa-sketch</v-icon>
        </v-tab>

        <v-tab>
          วิสัยทัศน์ (Vision)
          <v-icon>fas fa-globe-europe</v-icon>
        </v-tab>

        <v-tab>
          พันธกิจ (Mission)
          <v-icon>fas fa-code</v-icon>
        </v-tab>

        <v-tab>
          วัตถุประสงค์
          <v-icon>fas fa-bullseye</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card-text class="text-center"
              >"ความรู้ดี มีทักษะ มานะเยี่ยม เปี่ยมคุณธรรม สร้างสรรค์งานวิจัย
              ชำนาญในวิชาชีพ"
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="text-center"
              >ผลิตบัณฑิตในสาขาวิทยาการคอมพิวเตอร์ที่มีคุณธรรม จริยธรรม
              จรรยาบรรณที่ดี และมีคุณภาพที่เป็นไปตามมาตรฐานสากล
              และตอบสนองต่อตลาดแรงงานในปัจจุบัน
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="text-center">
              <p>
                1. ด้านการจัดการศึกษา ผลิตบัณฑิตสาขาวิทยาศาสตร์
                โปรแกรมวิชาวิทยาการคอมพิวเตอร์ ให้มีความรู้ ทักษะ จริยธรรม
                และคุณภาพในวิชาชีพ
              </p>
              <p>
                2. ด้านงานวิจัย ส่งเสริมและสนับสนุนให้นิสิต
                และนักศึกษาได้จัดทำงานวิจัยทางสาขาวิทยาการคอมพิวเตอร์
                โดยนำองค์ความรู้ที่ได้ศึกษามาพัฒนางานเพื่อตอบสนองต่อความต้องการของท้องถิ่น
                และประเทศชาติ
              </p>
              <p>
                3. ด้านการบริการท้องถิ่น เป็นแหล่งให้บริการวิชาการ
                ความรู้ทางด้านของคอมพิวเตอร์
                และมีส่วนร่วมในการนำเอาความรู้ทางสาขาวิทยาการคอมพิวเตอร์ไปใช้ในการพัฒนา
                และบริการแก่ท้องถิ่น
              </p>
              <p>
                4. ด้านศิลปวัฒนธรรม
                ส่งเสริมและสนับสนุนการจัดกิจกรรมทางด้านศิลปวัฒนธรรมอันดีงามของประเทศ
                และร่วมสนับสนุนทางด้านการทำนุบำรุงศิลปวัฒนธรรม และภูมิปัญญาไทย
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="text-center">
              <p>
                1.เพื่อผลิตบัณฑิตทางด้านวิทยาการคอมพิวเตอร์ที่มีความรู้ความสามารถ
                ทั้งทางด้านวิชาการและวิชาชีพ
              </p>
              <p>
                2.เพื่อผลิตกำลังคนด้านวิทยาการคอมพิวเตอร์
                ให้สามารถคิดวิเคราะห์และประยุกต์ใช้ทักษะทางด้านวิทยาการคอมพิวเตอร์
                ในการแก้ปัญหาการทำงานทั้งภาครัฐและภาคเอกชนได้อย่างมีประสิทธิภาพ
              </p>
              <p>
                3.เพื่อผลิตบัณฑิตที่สามารถทำการวิจัย และพัฒนาองค์ความรู้
                ทางด้านวิทยาการคอมพิวเตอร์ เพื่อผลิตบัณฑิตที่มีเจตคติที่ดี
                เป็นผู้มีคุณธรรมและจรรยาบรรณในวิชาชีพ
              </p>
              <p>
                4.เพื่อผลิตบัณฑิตที่สามารถนำความรู้สากลไปปรับประยุกต์ใช้กับท้องถิ่น
              </p>
              <p>
                5.เพื่อผลิตบัณฑิตที่มีความสามารถในการสืบค้นและค้นคว้าหาความรู้ทั้งภาษาไทย
                และภาษาอังกฤษมาปรับประยุกต์ใช้ในการแก้ปัญหาตามสถานการณ์ได้อย่างเหมาะสม
              </p>
              <p>6.เพื่อผลิตบัณฑิตที่มีทักษะด้านการทำงานเป็นทีม</p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </section>
</template>

<script>
import AppTitleParallax from '@/components/parallax/AppTitleParallax'

export default {
  components: {
    AppTitleParallax,
  },
  data() {
    return {
      tab: null,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
        ' ut aliquip ex ea commodo consequat.',
    }
  },

  computed: {
    titleParallax() {
      return 'สาขาวิทยาการคอมพิวเตอร์'
    },
    subTitleParallax() {
      return 'เริ่มต้นเส้นทางที่ดีที่สุดสำหรับ Developer'
    },
  },
}
</script>

<style lang="scss" scoped></style>
