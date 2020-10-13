<template>
  <div>
    <v-btn @click="initSocket">TEST INIT SOCKET</v-btn>
    <h3>{{ title }}</h3>
    <v-row>
      <v-responsive class="overflow-y-auto" max-height="400">
        <v-responsive height="200vh" class="pa-2">
          <div>
            <v-list three-line subheader>
              <v-subheader inset>{{ subTitle }}</v-subheader>

              <v-list-item v-for="item in comments" :key="item.title">
                <v-list-item-avatar>
                  <v-img
                    :src="
                      item.user.imageUrl ? item.user.imageUrl.url : defaultImage
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

                <v-list-item-action v-if="item.user.id === user.id">
                  <!-- {{item.user.id == user.id}} -->
                  <v-row>
                    <v-btn text @click="delComment(item.id)">
                      <v-icon>fas fa-trash</v-icon>
                    </v-btn>

                    <v-dialog v-model="dialog" persistent max-width="600px">
                      <template v-slot:activator="{ on }">
                        <v-btn text v-on="on">
                          <v-icon>fas fa-edit</v-icon>
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
              :rules="rulesOption"
              hint="Hint text 200 characters"
              counter
              outlined
            ></v-textarea>
          </v-col>
          <v-col>
            <v-snackbar v-model="snackbar" :timeout="timeout">
              add completed
              <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="black" dark @click="onSendComment">
        <v-icon left dark>fas fa-comment</v-icon>
        Comment
      </v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import io from 'socket.io-client'
// io.set('origins', 'http://localhost:3001')

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
      message: 'test msg',
      messageRxd: '',
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
        return this.$store.getters.dialog
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

  mounted() {
    // await this.fetchHistoryMsg()
    // console.log(
    //   'this.$apolloHelpers.getToken::',
    //   this.$apolloHelpers.getToken()
    // )
  },

  methods: {
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
          // this.$axios
          //   .$post('/comments', {
          //     user: this.user.id,
          //     project: this.project.id,
          //     detail: this.commentData.detail,
          //   })
          //   .then((r) => (this.snackbar = true))
          //
          // await this.$apollo.queries.project.refresh()
          // await this.$store.dispatch('/projects/')

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
          Swal.fire({
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
    fetchHistoryMsg() {
      this.$axios
        .$get(`/comments/?room=${this.user.username}`)
        .then((result) => {
          this.comments = result
          // console.log('fetchHistoryMsg result::', result)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onSendComment() {
      console.log('onSendComment')
      this.socket.emit('message', { detail: 'test comment' })
    },

    initSocket() {
      this.socket = io('http://localhost:1338/', {
        path: '/',
        transports: ['polling'],
        reconnection: false,
        // reconnectionDelayMax: 5000,
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${this.$apolloHelpers.getToken()}`,
            },
            origin: '*:*',
            // credentials: 'include',
          },
        },
        query: {
          room: 'professor1',
        },
      })
    },
  },
}
</script>
