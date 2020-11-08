<template>
  <div>
    <!--    <v-btn @click="initSocket">TEST INIT SOCKET</v-btn>-->
    <v-row>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="commentData.detail"
              name="input-7-1"
              label="เพิ่ม Comment"
              :rules="rulesOption"
              hint="Hint text 200 characters"
              counter
              outlined
            ></v-textarea>
          </v-col>
          <v-col v-if="snackbar">
            <v-snackbar v-model="snackbar" :timeout="timeout">
              add completed
              <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn color="black" dark @click="onSendComment()">
        <v-icon left dark>fas fa-comment</v-icon>
        Comment
      </v-btn>
    </v-row>
    <h3>{{ title }}</h3>

    <v-row>
      <v-responsive class="overflow-y-auto" max-height="400">
        <v-responsive height="250vh" class="pa-2">
          <div v-for="(item, i) in comments" :key="i" class="row mr-5 pa-1">
            <div class="col-1 text-right">
              <v-avatar>
                <v-img
                  :src="
                    item.user.imageUrl ? item.user.imageUrl.url : defaultImage
                  "
                ></v-img>
              </v-avatar>
            </div>
            <div
              class="col-11 card"
              :class="
                item.user.id === user.id
                  ? 'custom-owner-comment'
                  : 'custom-other-comment'
              "
            >
              <div class="font-weight-bold">
                {{ item.user.prefix }} {{ item.user.firstName }}
                {{ item.user.lastName }} :
                <span class="font-weight-thin">
                  {{ $moment(item.updatedAt).fromNow() }}
                </span>
              </div>
              <p class="mr-5 font-weight-thin">
                {{ item.detail }}
                <!--                Lorem ipsum dolor sit amet, consectetur adipisicing elit.-->
                <!--                Asperiores, facilis nam non officiis quod quos sit. Ad assumenda-->
                <!--                iusto libero magnam nam praesentium quasi quidem. Accusamus-->
                <!--                deserunt excepturi quidem veritatis!-->
              </p>

              <div v-if="item.user.id === user.id">
                <!-- {{item.user.id == user.id}} -->
                <v-row class="mr-1 float-right">
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn text v-on="on">
                        <v-icon size="15">fas fa-edit</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Edit Comment</span>
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
                          >Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="editComment(item.id, item.detail)"
                          >Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-btn text @click="delComment(item.id)">
                    <v-icon size="15">fas fa-trash</v-icon>
                  </v-btn>
                </v-row>
              </div>
            </div>
          </div>
          <hr class="mt-4" />
          <p class="subtitle-2 text-center mt-4">End.</p>
        </v-responsive>
      </v-responsive>
    </v-row>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
// import io from 'socket.io-client'

export default {
  props: {
    type: {
      type: String,
      default: () => 'professor',
    },
    title: {
      type: String,
      default: () => 'Latest Comments',
    },
    subTitle: {
      type: String,
      default: () => 'ล่าสุด',
    },
    project: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      commentData: {
        detail: '',
      },
      timeout: 1500,
      comments: [],
      socket: null,
    }
  },

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
    defaultImage() {
      return this.$store.getters.defaultImage
    },
    rulesOption() {
      return [(v) => v.length <= 200 || 'Max 200 characters']
    },
    rules() {
      return [
        (v) => !!v || 'Item is required',
        (v) => v.length <= 200 || 'Max 200 characters',
      ]
    },
    dialog: {
      get() {
        return this.$store.getters['projects/dialog']
      },
      set(val) {
        return this.$store.dispatch('projects/setDialog', val)
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
  },

  async mounted() {
    console.log('this.project.id', this.project.id)
    // init chat
    await this.initSocket()

    // first req get
    await this.fetchHistoryMsg()

    // listen message
    this.listenRoomChat()
  },

  methods: {
    async addComment() {
      try {
        if (!this.commentData.detail) {
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณากรอก ข้อความที่ต้องการคอมเมนต์!',
            footer: '<a href>Why do I have this issue?</a>',
          })
        } else {
          await this.onSendComment()
          this.commentData.detail = ''
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editComment(id, detail) {
      try {
        if (!detail) {
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณากรอก ข้อความที่ต้องการคอมเมนต์!',
            footer: '<a href>Why do I have this issue?</a>',
          })
        } else {
          const res = await this.$axios.$put('/comments/' + id, {
            detail,
          })
          if (res) {
            this.dialog = false
          }
        }
      } catch (error) {
        console.log(error)
      }
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
            const res = await this.$axios.$delete('/comments/' + id)
            if (res) {
              this.fetchHistoryMsg()
              this.commentData.detail = ''
            }
          } catch (error) {
            console.log(error)
          }
          await Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        }
      })
    },
    fetchHistoryMsg() {
      this.$axios
        .$get(`/comments?room_in=${this.project.id}`)
        .then((result) => {
          this.comments = result
          console.log('fetchHistoryMsg result::', result)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async onSendComment() {
      console.log('onSendComment')
      await this.socket.emit(this.project.id, {
        project: this.project.id,
        detail: this.commentData.detail,
      })

      this.commentData.detail = ''
    },

    initSocket() {
      this.socket = this.$nuxtSocket({
        // options
        name: 'main',
        reconnection: false,
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: this.$apolloHelpers.getToken(),
            },
          },
        },
        query: {
          room: this.project.id,
        },
      })
    },

    listenRoomChat() {
      this.socket.on(this.project.id, (messageCallback) => {
        // console.log('messageCallback::', messageCallback)

        let result = {
          reqMessage: {},
        }
        result = JSON.parse(messageCallback)
        // console.log('result JSON::', result.reqMessage)

        this.comments.push({
          id: result.reqMessage.id,
          room: result.reqMessage.room,
          detail: result.reqMessage.detail,
          user: result.reqMessage.user,
          createdAt: result.reqMessage.createdAt,
          updatedAt: result.reqMessage.updatedAt,
        })
        // console.log('push success! ::', this.project.comments)
      })
    },
  },
}
</script>
<style scoped>
.custom-owner-comment {
  background-color: #e3f2fd;
  border-radius: 12px;
  border-bottom: 1px solid gray;
  /*padding-right: 5px;*/
}

.custom-other-comment {
  /*background-color: #ffebee;*/
  border-radius: 12px;
  border-bottom: 1px solid gray;
  /*padding-right: 5px;*/
}
</style>
