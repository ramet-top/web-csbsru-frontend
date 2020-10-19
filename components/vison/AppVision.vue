<template>
  <section>
    <AppTitleParallax :title="titleParallax" :sub-title="subTitleParallax" />
    <!--    <v-layout column wrap class="my-12" align-center>-->
    <!--      <v-flex xs12>-->
    <!--        <v-container grid-list-xl>-->
    <!--          <v-row>-->
    <!--            <v-card-title primary-title class="layout justify-center">-->
    <!--              <div class="headline text-center">พันธกิจ ( Mission )</div>-->
    <!--            </v-card-title>-->
    <!--          </v-row>-->

    <!--          <v-row justify="center">-->
    <!--            <v-expansion-panels inset>-->
    <!--              <v-expansion-panel>-->
    <!--                <v-expansion-panel-header>รายละเอียด</v-expansion-panel-header>-->
    <!--                <v-expansion-panel-content>-->
    <!--                  <p>-->
    <!--                    1. ด้านการจัดการศึกษา ผลิตบัณฑิตสาขาวิทยาศาสตร์-->
    <!--                    โปรแกรมวิชาวิทยาการคอมพิวเตอร์ ให้มีความรู้ ทักษะ จริยธรรม-->
    <!--                    และคุณภาพในวิชาชีพ-->
    <!--                  </p>-->
    <!--                  <p>-->
    <!--                    2. ด้านงานวิจัย ส่งเสริมและสนับสนุนให้นิสิต-->
    <!--                    และนักศึกษาได้จัดทำงานวิจัยทางสาขาวิทยาการคอมพิวเตอร์-->
    <!--                    โดยนำองค์ความรู้ที่ได้ศึกษามาพัฒนางานเพื่อตอบสนองต่อความต้องการของท้องถิ่น-->
    <!--                    และประเทศชาติ-->
    <!--                  </p>-->
    <!--                  <p>-->
    <!--                    3. ด้านการบริการท้องถิ่น เป็นแหล่งให้บริการวิชาการ-->
    <!--                    ความรู้ทางด้านของคอมพิวเตอร์-->
    <!--                    และมีส่วนร่วมในการนำเอาความรู้ทางสาขาวิทยาการคอมพิวเตอร์ไปใช้ในการพัฒนา-->
    <!--                    และบริการแก่ท้องถิ่น-->
    <!--                  </p>-->
    <!--                  <p>-->
    <!--                    4. ด้านศิลปวัฒนธรรม-->
    <!--                    ส่งเสริมและสนับสนุนการจัดกิจกรรมทางด้านศิลปวัฒนธรรมอันดีงามของประเทศ-->
    <!--                    และร่วมสนับสนุนทางด้านการทำนุบำรุงศิลปวัฒนธรรม-->
    <!--                    และภูมิปัญญาไทย-->
    <!--                  </p>-->
    <!--                </v-expansion-panel-content>-->
    <!--              </v-expansion-panel>-->
    <!--            </v-expansion-panels>-->
    <!--          </v-row>-->

    <!--          <v-layout row wrap align-center>-->
    <!--            <v-flex xs12 md4>-->
    <!--              <v-card flat class="transparent">-->
    <!--                &lt;!&ndash;                <v-card-text class="text-center">&ndash;&gt;-->
    <!--                &lt;!&ndash;                  <v-icon x-large class="purple&#45;&#45;text text&#45;&#45;lighten-3"&ndash;&gt;-->
    <!--                &lt;!&ndash;                    >fab fa-sketch</v-icon&ndash;&gt;-->
    <!--                &lt;!&ndash;                  >&ndash;&gt;-->
    <!--                &lt;!&ndash;                </v-card-text>&ndash;&gt;-->
    <!--                <v-card-title primary-title class="layout justify-center">-->
    <!--                  <div class="headline text-center">ปรัชญา ( Philosophy )</div>-->
    <!--                </v-card-title>-->
    <!--                <v-card-text class="text-center"-->
    <!--                  >"ความรู้ดี มีทักษะ มานะเยี่ยม เปี่ยมคุณธรรม-->
    <!--                  สร้างสรรค์งานวิจัย ชำนาญในวิชาชีพ"</v-card-text-->
    <!--                >-->
    <!--              </v-card>-->
    <!--            </v-flex>-->
    <!--            <v-flex xs12 md4>-->
    <!--              <v-card flat class="transparent">-->
    <!--                <v-card-text class="text-center">-->
    <!--                  <v-icon x-large class="purple&#45;&#45;text text&#45;&#45;lighten-3"-->
    <!--                    >fas fa-code</v-icon-->
    <!--                  >-->
    <!--                </v-card-text>-->
    <!--              </v-card>-->
    <!--            </v-flex>-->
    <!--            <v-flex xs12 md4>-->
    <!--              <v-card flat class="transparent">-->
    <!--                &lt;!&ndash;                <v-card-text class="text-center">&ndash;&gt;-->
    <!--                &lt;!&ndash;                  <v-icon x-large class="purple&#45;&#45;text text&#45;&#45;lighten-3"&ndash;&gt;-->
    <!--                &lt;!&ndash;                    >fas fa-globe-europe</v-icon&ndash;&gt;-->
    <!--                &lt;!&ndash;                  >&ndash;&gt;-->
    <!--                &lt;!&ndash;                </v-card-text>&ndash;&gt;-->
    <!--                <v-card-title primary-title class="layout justify-center">-->
    <!--                  <div class="headline">วิสัยทัศน์ ( Vision )</div>-->
    <!--                </v-card-title>-->
    <!--                <v-card-text class="text-center"-->
    <!--                  >ผลิตบัณฑิตในสาขาวิทยาการคอมพิวเตอร์ที่มีคุณธรรม จริยธรรม-->
    <!--                  จรรยาบรรณที่ดี และมีคุณภาพที่เป็นไปตามมาตรฐานสากล-->
    <!--                  และตอบสนองต่อตลาดแรงงานในปัจจุบัน</v-card-text-->
    <!--                >-->
    <!--              </v-card>-->
    <!--            </v-flex>-->
    <!--          </v-layout>-->
    <!--        </v-container>-->
    <!--      </v-flex>-->
    <!--    </v-layout>-->

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
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card-text class="text-center"
              >"ความรู้ดี มีทักษะ มานะเยี่ยม เปี่ยมคุณธรรม สร้างสรรค์งานวิจัย
              ชำนาญในวิชาชีพ"</v-card-text
            >
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="text-center"
              >ผลิตบัณฑิตในสาขาวิทยาการคอมพิวเตอร์ที่มีคุณธรรม จริยธรรม
              จรรยาบรรณที่ดี และมีคุณภาพที่เป็นไปตามมาตรฐานสากล
              และตอบสนองต่อตลาดแรงงานในปัจจุบัน</v-card-text
            >
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
