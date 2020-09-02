<template>
  <section>
    <AppTitleParallax :title="titleParallax" />
    <Logo />

    <v-container class="mx-auto">
      <template v-if="loading">
        <AppLoadingProgressCircular :loading="loading" />
      </template>

      <v-card v-else class="mx-auto">
        <v-flex>
          <template>
            <AppProjectTitleDetail :project-data="projectData" />
          </template>

          <template>
            <v-card-text>
              <span class="text--primary">
                <strong>รายละเอียด</strong>
              </span>
              <br />
              <v-container>
                <v-row>
                  <v-col col="12" md="4" align="center" justify="center">
                    <v-avatar size="150">
                      <img
                        :src="
                          showUserDetail.imageUrl
                            ? showUserDetail.imageUrl.url
                            : defaultImage
                        "
                      />
                    </v-avatar>
                  </v-col>

                  <v-col col="12" md="8">
                    <v-row no-gutters>
                      <v-col col="12" md="3">
                        <strong>ชื่อเจ้าของหัวข้อ :</strong>
                      </v-col>
                      <v-col col="12" md="6">
                        <p>
                          {{ showUserDetail.prefix }}
                          {{ showUserDetail.firstName }}
                          {{ showUserDetail.lastName }}
                        </p>
                      </v-col>
                    </v-row>

                    <v-row no-gutters>
                      <v-col col="12" md="3">
                        <strong>ที่ปรึกษาโครงงาน :</strong>
                      </v-col>
                      <v-col col="12" md="6">
                        <p>
                          {{ pro_adUser.prefix }}{{ pro_adUser.firstName }}
                          {{ pro_adUser.lastName }}
                        </p>
                      </v-col>
                    </v-row>

                    <v-row no-gutters>
                      <v-col col="12" md="3">
                        <strong>วันที่(อัปเดตล่าสุด) :</strong>
                      </v-col>
                      <v-col col="12" md="6">
                        <p>
                          {{ $moment(project.updatedAt).format('llll') }} น.
                        </p>
                      </v-col>
                    </v-row>

                    <v-row no-gutters>
                      <v-col col="12" md="3">
                        <strong>วันที่(สร้าง) :</strong>
                      </v-col>
                      <v-col col="12" md="6"
                        >{{
                          $moment(project.updatedAt).format('llll')
                        }}
                        น.</v-col
                      >
                    </v-row>

                    <v-card-actions>
                      <v-row>
                        <v-col col="12" md="6">
                          <v-btn
                            v-if="project.fileUrl"
                            rounded
                            block
                            color="green"
                            target="blank"
                            :href="project.fileUrl.url"
                          >
                            ดาวน์โหลดเอกสารบทที่ 1
                            <v-icon right>fas fa-cloud-download-alt</v-icon>
                          </v-btn>
                          <v-btn v-else rounded block color="green" disabled>
                            ดาวน์โหลดเอกสารบทที่ 1
                            <v-icon right>fas fa-cloud-download-alt</v-icon>
                          </v-btn>
                        </v-col>

                        <v-col col="12" md="6">
                          <v-btn
                            v-if="project.fileFull"
                            rounded
                            block
                            color="green"
                            target="blank"
                            :href="project.fileFull.url"
                          >
                            ดาวน์โหลดเอกสารตัวเต็ม .PDF
                            <v-icon right>fas fa-cloud-download-alt</v-icon>
                          </v-btn>

                          <v-btn v-else rounded block color="green" disabled>
                            ดาวน์โหลดเอกสารตัวเต็ม .PDF
                            <v-icon right>fas fa-cloud-download-alt</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-container>
              <v-divider></v-divider>

              <template v-if="project.status === 'DEFAULT'">
                <span class="text--primary">
                  <strong>คำขอขึ้นสอบหัวข้อ :</strong>
                </span>
                <v-container>
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
                        {{ $moment(dateNow).format('dddd LL') }}
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
                            <strong
                              >กรุณาเลือกเวลาสอบหัวข้อโครงงาน CSBSRU
                              Project.</strong
                            >
                          </div>
                        </template>
                        <v-radio value="MORNING">
                          <template v-slot:label>
                            <div>
                              <strong class="dark--text"
                                >ช่วงเช้า 10.00 น</strong
                              >
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="AFTERNOON">
                          <template v-slot:label>
                            <div>
                              <strong class="dark--text"
                                >ช่วงบ่าย 13.30 น</strong
                              >
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row>
                    <!-- <v-spacer></v-spacer> -->
                    <v-col cols="12" sm="6">
                      <v-btn
                        block
                        dark
                        rounded
                        outlined
                        color="red"
                        @click="onUpdateNotConfirmProject"
                      >
                        <v-icon left>fas fa-times</v-icon
                        >ไม่อนุมัติการเป็นที่ปรึกษาโครงงานนนี้
                      </v-btn>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-dialog
                        v-model="dialogProfessorUpdate"
                        persistent
                        max-width="80%"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn rounded block color="primary" dark v-on="on">
                            <v-icon left>fas fa-calendar-check</v-icon>แก้ไข /
                            อนุมัติการเป็นที่ปรึกษาโครงงานนี้
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">
                              แก้ไขข้อมูลโครงงาน :
                              {{ project.user.prefix }}
                              {{ project.user.firstName }}
                              {{ project.user.lastName }} (รหัส นศ.
                              {{ project.user.username }})
                            </span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                              >
                                <v-text-field
                                  v-model="projectData.title"
                                  outlined
                                  required
                                  :rules="rules"
                                  counter="150"
                                  hint="แก้ไขหัวข้อใหม่"
                                  label="* หัวข้อ : "
                                ></v-text-field>

                                <v-textarea
                                  v-model="projectData.detail"
                                  required
                                  label="* รายละเอียด"
                                  rows="6"
                                  row-height="40"
                                  outlined
                                  auto-grow
                                  :rules="rules"
                                  counter="250"
                                  hint="แก้ไขรายละเอียดใหม่"
                                ></v-textarea>

                                <v-divider></v-divider>

                                <!-- create date -->
                                <div>
                                  <span class="text--primary">
                                    <strong>กำหนดวันขึ้นสอบหัวข้อ :</strong>
                                  </span>
                                  <ul>
                                    <li class="red--text">
                                      ***สามารถขึ้นสอบได้ทุกๆวันพฤหัสบดี
                                      ถ้าเลือกวันที่ผิดระบบจะเลื่อนไปเป็นวันพฤหัสบดีถัดไป
                                    </li>
                                  </ul>
                                  <v-container>
                                    <v-row>
                                      <v-date-picker
                                        v-model="projectData.finalDate"
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
                                          {{
                                            $moment(dateNow).format('dddd LL')
                                          }}
                                        </p>
                                        <p>
                                          <strong
                                            >วันที่ ที่เลือกขึ้นสอบหัวข้อ
                                            :</strong
                                          >
                                          {{
                                            $moment(
                                              projectData.finalDate
                                            ).format('dddd LL')
                                          }}
                                        </p>
                                      </v-col>
                                      <v-col cols="12" sm="6">
                                        <v-radio-group v-model="radios">
                                          <template v-slot:label>
                                            <div>
                                              <strong>
                                                กรุณาเลือกเวลาสอบหัวข้อโครงงาน
                                                CSBSRU Project.
                                              </strong>
                                            </div>
                                          </template>
                                          <v-radio value="MORNING">
                                            <template v-slot:label>
                                              <div>
                                                <strong class="dark--text"
                                                  >ช่วงเช้า 10.00 น</strong
                                                >
                                              </div>
                                            </template>
                                          </v-radio>
                                          <v-radio value="AFTERNOON">
                                            <template v-slot:label>
                                              <div>
                                                <strong class="dark--text"
                                                  >ช่วงบ่าย 13.30 น</strong
                                                >
                                              </div>
                                            </template>
                                          </v-radio>
                                        </v-radio-group>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </div>
                              </v-form>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="red darken-1"
                              text
                              @click="dialogProfessorUpdate = false"
                            >
                              <v-icon left>fas fa-times</v-icon>ปิด
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="onUpdateAndConfirmData"
                            >
                              <v-icon left>far fa-save</v-icon
                              >บันทึกข้อมูลและอนุมัติ
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <!--  -->
                </v-container>
              </template>

              <template v-else-if="project.status === 'OPERATION'">
                <span class="text--primary">กำหนดวันขึ้นสอบหัวข้อ :</span>
                <v-container>
                  <v-row>
                    <v-date-picker
                      v-model="project.finalDate"
                      full-width
                      :landscape="$vuetify.breakpoint.smAndUp"
                      class="mt-4"
                      type="date"
                      locale="th"
                      disabled
                    ></v-date-picker>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6">
                      <h3>
                        {{ $moment(project.finalDate).format('dddd LL') }}
                      </h3>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-radio-group v-model="project.finalTime" disabled>
                        <template v-slot:label>
                          <div>
                            <strong
                              >เวลาสอบหัวข้อโครงงาน CSBSRU Project.</strong
                            >
                          </div>
                        </template>
                        <v-radio value="MORNING">
                          <template v-slot:label>
                            <div>
                              <strong class="dark--text"
                                >ช่วงเช้า 10.00 น</strong
                              >
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="AFTERNOON">
                          <template v-slot:label>
                            <div>
                              <strong class="dark--text"
                                >ช่วงบ่าย 13.30 น</strong
                              >
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>

                  <!-- for comment permission -->
                  <!-- {{ user.id === project.pro_ad }} -->
                  <div v-if="user.id == project.pro_ad" class="red--text">
                    *อาจารย์ที่ปรึกษาโปรเจคไม่สามารถ comment หรือ
                    อนุมัติการสอบของ นศ.ได้
                  </div>

                  <div v-else>
                    <h3>Latast Comments</h3>
                    <v-row>
                      <v-responsive class="overflow-y-auto" max-height="400">
                        <v-responsive height="200vh" class="pa-2">
                          <div>
                            <v-list three-line subheader>
                              <v-subheader inset>ล่าสด</v-subheader>

                              <v-list-item
                                v-for="item in project.comments"
                                :key="item.title"
                              >
                                <v-list-item-avatar>
                                  <v-img
                                    :src="
                                      item.user.imageUrl
                                        ? item.user.imageUrl.url
                                        : defaultImage
                                    "
                                  ></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{ item.user.prefix }}
                                    {{ item.user.firstName }}
                                    {{ item.user.lastName }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    {{ $moment(item.updaedAt).format('LLL') }}
                                    น.
                                  </v-list-item-subtitle>
                                  <v-list-item-subtitle>
                                    comment:
                                    {{ item.detail }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action
                                  v-if="item.user.id == user.id"
                                >
                                  <!-- {{item.user.id == user.id}} -->
                                  <v-row>
                                    <v-btn text @click="delComment(item.id)">
                                      <v-icon>fas fa-trash</v-icon>
                                    </v-btn>

                                    <v-dialog
                                      v-model="dialog"
                                      persistent
                                      max-width="600px"
                                    >
                                      <template v-slot:activator="{ on }">
                                        <v-btn text v-on="on">
                                          <v-icon>fas fa-edit</v-icon>
                                        </v-btn>
                                      </template>
                                      <v-card>
                                        <v-card-title>
                                          <span class="headline"
                                            >Edit Comment</span
                                          >
                                        </v-card-title>
                                        <v-card-text>
                                          <v-container>
                                            <v-row>
                                              <v-col cols="12">
                                                <v-textarea
                                                  v-model="item.detail"
                                                  name="input-7-1"
                                                  label="แก้ไข Comment กรรมการสอบหัวข้อ"
                                                  :rules="rules"
                                                  hint="Hint text 150 characters"
                                                  counter
                                                  outlined
                                                ></v-textarea>
                                              </v-col>
                                            </v-row>
                                          </v-container>
                                        </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialog = false"
                                            >Close</v-btn
                                          >
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="
                                              editComment(item.id, item.detail)
                                            "
                                            >Save</v-btn
                                          >
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>
                                  </v-row>
                                </v-list-item-action>

                                <div v-else></div>
                              </v-list-item>

                              <v-divider inset></v-divider>
                            </v-list>

                            <p class="subtitle-2 text-center">End.</p>
                          </div>
                        </v-responsive>
                      </v-responsive>
                    </v-row>

                    <!-- for add comments form -->
                    <v-divider></v-divider>
                    <v-row>
                      <v-container fluid>
                        <v-row>
                          <v-col cols="12">
                            <v-textarea
                              v-model="commentData.detail"
                              name="input-7-1"
                              label="เพิ่ม Comment กรรมการสอบหัวข้อ"
                              :rules="rulesOptionnal"
                              hint="Hint text 200 characters"
                              counter
                              outlined
                            ></v-textarea>
                          </v-col>
                          <v-col>
                            <v-snackbar v-model="snackbar" :timeout="timeout">
                              add compleate
                              <v-btn color="blue" text @click="snackbar = false"
                                >Close</v-btn
                              >
                            </v-snackbar>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-row>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="black" dark @click="addComment">
                        <v-icon left dark>fas fa-comment</v-icon>Comment
                      </v-btn>
                    </v-card-actions>

                    <v-divider></v-divider>
                    <!-- ofUser: {{this.scoreState.ofUser.length}} -->
                    <clientOnly>
                      <v-card-actions>
                        เกณท์คะแนนการผ่านสอบ 4 ท่านขึ้นไป :
                        <v-chip
                          v-if="project.scores.length"
                          class="ma-2"
                          outlined
                          color="green"
                        >
                          <v-avatar left>
                            <v-icon>fas fa-user-circle</v-icon>
                          </v-avatar>
                          <div v-show="false">{{ checkScorePass }}</div>
                          ผ่าน +{{ scoreState.pass }}
                        </v-chip>

                        <v-chip
                          v-else
                          class="ma-2"
                          outlined
                          color="blue darken-1"
                        >
                          <v-avatar left>
                            <v-icon>fas fa-user-circle</v-icon> </v-avatar
                          >ยังไม่โหวต
                        </v-chip>
                      </v-card-actions>
                    </clientOnly>
                    <!-- End -->

                    <clientOnly>
                      <!-- <v-divider></v-divider>
                    <h3>อนุมัติการสอบ</h3>-->
                      <v-row v-if="scores[0] ? scores[0].status : ''">
                        <v-divider></v-divider>
                        <!-- state:: {{  }} -->
                        <h2>อนุมัติแล้ว</h2>
                        <v-divider></v-divider>
                      </v-row>

                      <v-row v-else-if="!scores.length">
                        <!-- <h2>ยังไม่มีการยืนยัน{{scores.length}}</h2> -->
                        <v-col>
                          <div class="text-center">
                            <v-row>
                              <v-col col="12">
                                <v-btn
                                  rounded
                                  color="green"
                                  dark
                                  block
                                  @click="ConfirmBeforSuccess"
                                >
                                  <v-icon left>fas fa-check</v-icon
                                  >ผ่านการสอบหัวข้อ
                                </v-btn>
                              </v-col>
                            </v-row>
                          </div>
                        </v-col>

                        <v-col>
                          <div class="text-center">
                            <v-row>
                              <v-col col="12">
                                <v-btn
                                  rounded
                                  color="red darken-2"
                                  dark
                                  block
                                  @click="ConfirmBeforNotSuccess"
                                >
                                  <v-icon left>fas fa-times</v-icon
                                  >ไม่ผ่านการสอบหัวข้อ
                                  <!-- {{ scoreState.noPass }} -->
                                </v-btn>
                              </v-col>
                            </v-row>
                          </div>
                        </v-col>
                      </v-row>

                      <v-row v-else>
                        <v-col v-if="scores[0].status == false">
                          <div class="text-center">
                            <v-row>
                              <v-col col="12">
                                <v-btn
                                  rounded
                                  color="green"
                                  dark
                                  block
                                  @click="ConfirmBeforSuccess"
                                >
                                  <v-icon left>fas fa-check</v-icon
                                  >ผ่านการสอบหัวข้อ(กรณี นศ.แก้ไขถูกต้องแล้ว)
                                </v-btn>
                              </v-col>
                            </v-row>
                          </div>
                        </v-col>
                      </v-row>
                    </clientOnly>
                  </div>
                </v-container>
              </template>

              <template v-else-if="project.status === 'SUCCESS'">
                <span class="text--primary">กำหนดวันขึ้นสอบหัวข้อ :</span>
                <v-container>
                  <v-row>
                    <v-date-picker
                      v-model="project.finalDate"
                      full-width
                      :landscape="$vuetify.breakpoint.smAndUp"
                      class="mt-4"
                      type="date"
                      locale="th"
                      disabled
                    ></v-date-picker>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6">
                      <p>
                        <strong>วันที่ปัจจุบัน :</strong>
                        {{ $moment(dateNow).format('dddd LL') }}
                      </p>
                      <p>
                        <strong>วันที่ ที่เลือกขึ้นสอบหัวข้อ :</strong>
                        {{ $moment(project.finalDate).format('dddd LL') }}
                      </p>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-radio-group v-model="project.finalTime" disabled>
                        <template v-slot:label>
                          <div>
                            <strong
                              >เวลาสอบหัวข้อโครงงาน CSBSRU Project.</strong
                            >
                          </div>
                        </template>
                        <v-radio value="MORNING">
                          <template v-slot:label>
                            <div>
                              <strong class="dark--text"
                                >ช่วงเช้า 10.00 น</strong
                              >
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="AFTERNOON">
                          <template v-slot:label>
                            <div>
                              <strong class="dark--text"
                                >ช่วงบ่าย 13.30 น</strong
                              >
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-container>
                <v-divider></v-divider>

                <div v-if="project.pro_ad == user.id" class="red--text">
                  *อาจารย์ที่ปรึกษาโปรเจคไม่สามารถ comment หรือ อนุมัติการสอบของ
                  นศ.ได้
                </div>

                <div v-else>
                  <h3>Latast Comments</h3>
                  <v-row>
                    <v-responsive class="overflow-y-auto" max-height="400">
                      <v-responsive height="200vh" class="pa-2">
                        <div>
                          <v-list three-line subheader>
                            <v-subheader inset>ล่าสด</v-subheader>

                            <v-list-item
                              v-for="item in project.comments"
                              :key="item.title"
                            >
                              <v-list-item-avatar>
                                <v-img
                                  :src="
                                    item.user.imageUrl
                                      ? item.user.imageUrl.url
                                      : defaultImage
                                  "
                                ></v-img>
                              </v-list-item-avatar>

                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ item.user.prefix }}
                                  {{ item.user.firstName }}
                                  {{ item.user.lastName }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                  {{ $moment(item.updaedAt).format('LLL') }}
                                  น.
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                  comment:
                                  {{ item.detail }}
                                </v-list-item-subtitle>
                              </v-list-item-content>

                              <v-list-item-action
                                v-if="item.user.id == user.id"
                              >
                                <!-- {{item.user.id == user.id}} -->
                                <v-row>
                                  <v-btn text @click="delComment(item.id)">
                                    <v-icon>fas fa-trash</v-icon>
                                  </v-btn>

                                  <v-dialog
                                    v-model="dialog"
                                    persistent
                                    max-width="600px"
                                  >
                                    <template v-slot:activator="{ on }">
                                      <v-btn text v-on="on">
                                        <v-icon>fas fa-edit</v-icon>
                                      </v-btn>
                                    </template>
                                    <v-card>
                                      <v-card-title>
                                        <span class="headline"
                                          >Edit Comment</span
                                        >
                                      </v-card-title>
                                      <v-card-text>
                                        <v-container>
                                          <v-row>
                                            <v-col cols="12">
                                              <v-textarea
                                                v-model="item.detail"
                                                name="input-7-1"
                                                label="แก้ไข Comment กรรมการสอบหัวข้อ"
                                                :rules="rules"
                                                hint="Hint text 150 characters"
                                                counter
                                                outlined
                                              ></v-textarea>
                                            </v-col>
                                          </v-row>
                                        </v-container>
                                      </v-card-text>
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                          color="blue darken-1"
                                          text
                                          @click="dialog = false"
                                          >Close</v-btn
                                        >
                                        <v-btn
                                          color="blue darken-1"
                                          text
                                          @click="
                                            editComment(item.id, item.detail)
                                          "
                                          >Save</v-btn
                                        >
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
                                </v-row>
                              </v-list-item-action>

                              <div v-else></div>
                            </v-list-item>

                            <v-divider inset></v-divider>
                          </v-list>

                          <p class="subtitle-2 text-center">End.</p>
                        </div>
                      </v-responsive>
                    </v-responsive>
                  </v-row>

                  <!-- for add comments form -->
                  <v-divider></v-divider>
                  <v-row>
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12">
                          <v-textarea
                            v-model="commentData.detail"
                            name="input-7-1"
                            label="เพิ่ม Comment กรรมการสอบหัวข้อ"
                            :rules="rulesOptionnal"
                            hint="Hint text 200 characters"
                            counter
                            outlined
                          ></v-textarea>
                        </v-col>
                        <v-col>
                          <v-snackbar v-model="snackbar" :timeout="timeout">
                            add compleate
                            <v-btn color="blue" text @click="snackbar = false"
                              >Close</v-btn
                            >
                          </v-snackbar>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-row>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="black" dark @click="addComment">
                      <v-icon left dark>fas fa-comment</v-icon>Comment
                    </v-btn>
                  </v-card-actions>

                  <v-divider></v-divider>
                  <!-- ofUser: {{this.scoreState.ofUser.length}} -->
                  <clientOnly>
                    <v-card-actions>
                      เกณท์คะแนนการผ่านสอบ 4 ท่านขึ้นไป :
                      <v-chip
                        v-if="project.scores.length"
                        class="ma-2"
                        outlined
                        color="green"
                      >
                        <v-avatar left>
                          <v-icon>fas fa-user-circle</v-icon>
                        </v-avatar>
                        <div v-show="false">{{ checkScorePass }}</div>
                        ผ่าน +{{ scoreState.pass }}
                      </v-chip>

                      <v-chip
                        v-else
                        class="ma-2"
                        outlined
                        color="blue darken-1"
                      >
                        <v-avatar left>
                          <v-icon>fas fa-user-circle</v-icon> </v-avatar
                        >ยังไม่โหวต
                      </v-chip>
                    </v-card-actions>
                  </clientOnly>
                  <!-- End -->

                  <clientOnly>
                    <v-row v-if="scores[0] ? scores[0].status : ''">
                      <v-divider></v-divider>
                      <!-- state:: {{  }} -->
                      <h2>อนุมัติแล้ว</h2>
                      <v-divider></v-divider>
                    </v-row>

                    <v-row v-else-if="!scores.length">
                      <!-- <h2>ยังไม่มีการยืนยัน{{scores.length}}</h2> -->
                      <v-col>
                        <div class="text-center">
                          <v-row>
                            <v-col col="12">
                              <v-btn
                                rounded
                                color="green"
                                dark
                                block
                                @click="ConfirmBeforSuccess"
                              >
                                <v-icon left>fas fa-check</v-icon
                                >ผ่านการสอบหัวข้อ
                              </v-btn>
                            </v-col>
                          </v-row>
                        </div>
                      </v-col>

                      <v-col>
                        <div class="text-center">
                          <v-row>
                            <v-col col="12">
                              <v-btn
                                rounded
                                color="red darken-2"
                                dark
                                block
                                @click="ConfirmBeforNotSuccess"
                              >
                                <v-icon left>fas fa-times</v-icon
                                >ไม่ผ่านการสอบหัวข้อ
                                <!-- {{ scoreState.noPass }} -->
                              </v-btn>
                            </v-col>
                          </v-row>
                        </div>
                      </v-col>
                    </v-row>

                    <v-row v-else>
                      <v-col v-if="scoreState.ofUser.status == false">
                        <div class="text-center">
                          <v-row>
                            <v-col col="12">
                              <v-btn
                                rounded
                                color="green"
                                dark
                                block
                                @click="ConfirmBeforSuccess"
                              >
                                <v-icon left>fas fa-check</v-icon
                                >ผ่านการสอบหัวข้อ
                              </v-btn>
                            </v-col>
                          </v-row>
                        </div>
                      </v-col>
                    </v-row>
                  </clientOnly>
                </div>

                <strong>สถานะ::</strong>

                <div>
                  <v-row
                    v-if="project.status == 'SUCCESS'"
                    justify="center"
                    align="start"
                  >
                    <v-chip large draggable color="green">
                      <v-icon left>fas fa-check-circle</v-icon>สอบหัวข้อผ่านแล้ว
                    </v-chip>
                  </v-row>
                </div>
              </template>

              <template v-else>status None (not work)</template>
              <br />
              <v-divider></v-divider>
            </v-card-text>
          </template>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="goback">
              <v-icon left dark>fas fa-arrow-left</v-icon>Back
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import Swal from 'sweetalert2'
import { QUERY_SINGLE_PROJECT } from '@/graphql/queries/projects.js'
import { QUERY_WHERE_USERID_AND_PROJECTID } from '@/graphql/queries/scores.js'

import Logo from '~/components/AppLogoCsbsru'
import AppTitleParallax from '~/components/parallax/AppTitleParallax'
import AppProjectTitleDetail from '~/components/projects/AppProjectTitleDetail'
import AppLoadingProgressCircular from '~/components/loading/AppLoadingProgressCircular'

export default {
  middleware: ['isNotAuth'],

  components: {
    Logo,
    AppTitleParallax,
    AppProjectTitleDetail,
    AppLoadingProgressCircular,
  },

  data() {
    return {
      error: null,
      project: {},
      scores: {},
      date: '',
      radios: 'MORNING',
      fileDow: '',
      commentData: {
        detail: '',
      },
      scoreState: {
        all: '',
        pass: '',
      },
      valid: false,
      dialogProfessorUpdate: false,
      // for update Porject
      projectData: {
        id: '',
        title: '',
        detail: '',
        status: 'NONE',
        pro_ad: '',
        confirm: false,
      },
      showUserDetail: {
        prefix: '',
        firstName: '',
        lastName: '',
        imageUrl: {
          url: '',
        },
      },
      timeout: 1500,
      pro_adUser: '',
    }
  },

  apollo: {
    project: {
      query: QUERY_SINGLE_PROJECT,
      prefetch: true,
      fetchPolicy: 'network-only',
      variables() {
        const params = this.$route.params
        return { id: params.id }
      },
      result({ data, loading, networkStatus }) {
        this.loading = loading
        this.projectData = data.project
        this.showUserDetail = data.project.user
      },
      error(data) {
        this.error = data
      },
    },

    scores: {
      query: QUERY_WHERE_USERID_AND_PROJECTID,
      variables() {
        return {
          where: {
            user: this.user ? this.user.id : '',
            project: this.project.id,
          },
        }
      },
      result({ data, loading, networkStatus }) {
        this.loading = loading
      },
      error(data) {
        this.error = data
      },
    },
  },

  computed: {
    titleParallax() {
      return ' รายละเอียดโครงงาน'
    },
    user() {
      return this.$store.getters.loggedInUser
    },
    defaultImage() {
      return this.$store.getters.defaultImage
    },
    rules() {
      return [
        (v) => !!v || 'Item is required',
        (v) => v.length <= 200 || 'Max 200 characters',
      ]
    },
    rulesOptionnal() {
      return [(v) => v.length <= 200 || 'Max 200 characters']
    },
    dialog: {
      get() {
        return this.$store.getters.dialog
      },
      set(val) {
        return this.$store.dispatch('projects/setDialog', val)
      },
    },
    loading: {
      get() {
        return this.$store.getters.loading
      },
      set(val) {
        return this.$store.dispatch('projects/setLoading', val)
      },
    },
    isActive: {
      get() {
        return this.$store.getters.isActive
      },
      set(val) {
        this.$store.dispatch('projects/setIsActive', val)
      },
    },
    snackbar: {
      get() {
        return this.$store.getters.snackbar
      },
      set(val) {
        this.$store.dispatch('projects/setSnackbar', val)
      },
    },
    dateNow() {
      return new Date()
    },
  },

  updated() {
    this.findProAd()
  },

  mounted() {
    // this.requestSinggleProject()
  },

  methods: {
    // async requestSinggleProject() {
    //   try {
    //     const id = this.$route.params.id
    //     this.loading = true
    //     this.project = await this.$store.dispatch(
    //       'projects/requestSinggleProject',
    //       id
    //     )
    //     if (this.project) {
    //       this.projectData = this.project
    //       this.showUserDetail = this.project.user
    //     }
    //     this.loading = false
    //   } catch (error) {
    //     this.error = error
    //   }
    // },

    // async requestScoresWithAuthor() {
    //   // const query = `?users=${this.user.id}`
    //   this.loading = true
    //   const res = await this.$store.dispatch('projects/requestScoresWithAuthor')
    //   // console.log(query)
    //   console.log(res)
    //   if (res) {
    //   }
    //   this.loading = false
    // },

    goback() {
      this.$router.go(-1)
    },

    checkScorePass() {
      const urlPass = `/scores?project=${this.project.id}&status=true`
      const urlNoPass = `/scores?project=${this.project.id}&status=false`

      this.$axios.$get(urlPass).then((response) => {
        this.scoreState.pass = response.length
      })
      this.$axios.$get(urlNoPass).then((response) => {
        this.scoreState.noPass = response.length
      })
    },

    findProAd() {
      try {
        this.$axios.$get('/users/' + this.projectData.pro_ad).then((result) => {
          this.pro_adUser = result
        })
      } catch (error) {
        console.log(error)
      }
    },

    ConfirmBeforNotSuccess() {
      Swal.fire({
        title: 'แน่ใจหรือไม่ที่จะยืนยืนข้อมูล?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, ฉันแน่ใจ!',
      }).then(async (result) => {
        if (result.value) {
          try {
            if (this.scores.length) {
              // console.log("มีอยู่แล้ว");
            } else {
              this.$axios.$post(
                '/scores',
                {
                  status: false,
                  project: this.project.id,
                  user: this.user.id,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
                  },
                }
              )
              await this.$apollo.queries.project.refresh()
              await this.$apollo.queries.scores.refresh()
              Swal.fire('Success!', 'ยืนยันข้อมูลสำเร็จ.', 'success')
            }
          } catch (error) {
            console.log(error)
          }
        }
      })
    },

    ConfirmBeforSuccess() {
      Swal.fire({
        title: 'แน่ใจหรือไม่ที่จะยืนยืนข้อมูล?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, ฉันแน่ใจ!',
      }).then(async (result) => {
        if (result.value) {
          try {
            if (this.scoreState.pass >= 3) {
              console.log('state >= 3 => ' + this.scoreState.pass)
              this.$axios.$put(
                '/projects/' + this.projectData.id,
                {
                  status: 'SUCCESS',
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
                  },
                }
              )
            }

            if (this.scores.length) {
              console.log('update ที่มีอยู่แล้ว')

              this.$axios.$put(
                '/scores/' + this.scores[0].id,
                {
                  status: true,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
                  },
                }
              )
              await this.$apollo.queries.project.refresh()
              await this.$apollo.queries.scores.refresh()
              Swal.fire('Success!', 'ยืนยันข้อมูลสำเร็จ.', 'success')
            } else {
              this.$axios.$post(
                '/scores',
                {
                  status: true,
                  project: this.project.id,
                  user: this.user.id,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
                  },
                }
              )
              await this.$apollo.queries.project.refresh()
              await this.$apollo.queries.scores.refresh()
              Swal.fire('Success!', 'ยืนยันข้อมูลสำเร็จ.', 'success')
            }
          } catch (error) {
            console.log(error)
          }
        }
      })
    },

    async addComment() {
      try {
        if (!this.commentData.detail) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณากรอก ข้อความที่ต้องการคอมเมนต์!',
            footer: '<a href>Why do I have this issue?</a>',
          })
        } else {
          this.$axios
            .$post(
              '/comments',
              {
                user: this.user.id,
                project: this.project.id,
                detail: this.commentData.detail,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
                },
              }
            )
            .then((r) => (this.snackbar = true))

          await this.$apollo.queries.project.refresh()
          this.commentData.detail = ''
        }
      } catch (error) {
        console.log(error)
      }
    },

    async editComment(id, detail) {
      try {
        if (!detail) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณากรอก ข้อความที่ต้องการคอมเมนต์!',
            footer: '<a href>Why do I have this issue?</a>',
          })
        } else {
          const res = await this.$axios.$put(
            '/comments/' + id,
            {
              detail,
            },
            {
              headers: {
                Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
              },
            }
          )
          if (res) {
            await this.$apollo.queries.project.refresh()
            this.dialog = false
          }
        }
      } catch (error) {
        console.log(error)
      }

      // console.log(detail);
    },

    delComment(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.value) {
          try {
            const res = await this.$axios.$delete('/comments/' + id, {
              headers: {
                Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
              },
            })
            if (res) {
              this.$apollo.queries.project.refresh()
              this.commentData.detail = ''
            }
          } catch (error) {
            console.log(error)
          }
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        }
      })
    },

    onUpdateNotConfirmProject() {
      return Swal.fire({
        title: 'คุณแน่ใจหรือไม่ที่จะยืนยันข้อมูล?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, confirm it!',
      }).then((result) => {
        if (result.value) {
          this.$axios
            .$put(
              '/projects/' + this.projectData.id,
              {
                confirm: false,
                status: 'NONE',
              },
              {
                headers: {
                  Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
                },
              }
            )
            .then((data) => {
              let timerInterval
              Swal.fire({
                title: 'Cancel Success!',
                html: 'I will close in <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                onBeforeOpen: () => {
                  Swal.showLoading()
                  timerInterval = setInterval(() => {
                    Swal.getContent().querySelector(
                      'b'
                    ).textContent = Swal.getTimerLeft()
                  }, 100)
                },
                onClose: () => {
                  clearInterval(timerInterval)
                },
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                      console.log('I was closed by the timer') // eslint-disable-line
                }
              })
            })
          this.$router.go(-1)
        }
      })
    },

    onUpdateAndConfirmData() {
      try {
        this.loading = true
        if (!this.projectData.finalDate) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณาเลือกวันที่และช่วงเวลา!',
            footer: '<a href>Why do I have this issue?</a>',
          })
          return (this.loading = false)
        }

        // validate form
        this.$refs.form.validate()

        const choosDate = this.$moment(this.projectData.finalDate).format('L')
        const dateNow = this.$moment(this.dateNow).format('L')

        if (choosDate <= dateNow) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:
              'กรุณาเลือกวันที่และช่วงเวลา ที่ต้องการขึ้นสอบหัวข้อ ให้มากกว่าวันที่ปัจจุบัน!',
            footer: '<a href>Why do I have this issue?</a>',
          })
        } else {
          Swal.fire({
            title: 'แน่ใจหรือไม่ที่จะยืนยืนข้อมูล?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, ฉันแน่ใจ!',
          }).then((result) => {
            this.$axios.$put(
              '/projects/' + this.projectData.id,
              {
                title: this.projectData.title,
                detail: this.projectData.detail,
                finalDate: this.projectData.finalDate,
                finalTime: this.radios,

                status: 'OPERATION',
              },
              {
                headers: {
                  Authorization: 'Bearer ' + this.$apolloHelpers.getToken(),
                },
              }
            )

            if (result.value) {
              this.dialogProfessorUpdate = false
              Swal.fire('Success!', 'ยืนยันข้อมูลสำเร็จ.', 'success')
              this.$router.replace('/secureUser/projectManage/manage-professor')
            }
          })
        }
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
  },

  inject: ['theme'],
}
</script>
