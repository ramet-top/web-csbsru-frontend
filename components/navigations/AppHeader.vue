<template>
  <div>
    <!--    left side bar-->
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-toolbar-items class="hidden-md-and-up justify-center align-center">
            <v-flex @click="toHome">
              <div class="text-center custom-image">
                <v-img :src="defaultLogo" contain height="200px" />

                <v-container>
                  <v-btn disabled rounded block outlined color="success">
                    <v-avatar
                      v-if="user && user.imageUrl"
                      size="30"
                      class="mx-2"
                    >
                      <v-img :src="user.imageUrl.url"></v-img>
                    </v-avatar>
                    <v-icon v-else left>fas fa-user-circle</v-icon>
                    {{ user ? user.username : 'ยังไม่ได้ล็อกอิน' }}
                  </v-btn>
                </v-container>
                <v-divider></v-divider>
              </div>
            </v-flex>
          </v-toolbar-items>

          <template v-if="user">
            <v-list
              v-if="user.role.name === 'AuthStudent' || ''"
              dense
              nav
              shaped
            >
              <v-list-item
                v-for="(item, i) in itemsSecureStudent"
                :key="i"
                :to="item.to"
                router
                exact
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-list
              v-else-if="user.role.name === 'AuthProfessor' || ''"
              dense
              nav
              shaped
            >
              <v-list-item
                v-for="(item, i) in itemsSecureProfessor"
                :key="i"
                :to="item.to"
                router
                exact
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </template>

          <v-divider></v-divider>

          <v-list dense nav shaped>
            <v-list-item to="/" router exact>
              <v-list-item-action>
                <v-icon>fas fa-home</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="'หน้าหลัก'" />
              </v-list-item-content>
            </v-list-item>

            <v-list-item to="/news" router exact>
              <v-list-item-action>
                <v-icon>far fa-newspaper</v-icon>
                <!-- <i class=" fa-newspaper"></i> -->
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="'ข่าวประชาสัมพันธ์'" />
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-list dense nav shaped>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.to"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-item-group>
      </v-list>

      <template v-if="user" v-slot:append>
        <div class="pa-2">
          <v-btn block color="red" dark @click="logout">ออกจากระบบ</v-btn>
        </div>
      </template>

      <template v-else v-slot:append>
        <div class="pa-2">
          <v-btn block color="green" @click="routeLogin()">เข้าสู่ระบบ</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!--    end-->

    <!--   main-->
    <v-app-bar app dark>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="justify-start hidden-sm-and-down" @click="toHome">
        <v-icon left size="40">fab fa-accusoft</v-icon>
        Computer Science - มบส.
      </v-toolbar-title>

      <v-spacer>
        <v-toolbar-items class="hidden-md-and-up justify-center align-center">
          <v-icon size="25" @click="toHome">fab fa-accusoft</v-icon>
        </v-toolbar-items>
      </v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text to="/" router exact>
          <v-icon left>fas fa-home</v-icon>
          หน้าหลัก
        </v-btn>
        <v-btn text to="/news" router exact>
          <v-icon left>far fa-newspaper</v-icon>
          ข่าวประชาสัมพันธ์
        </v-btn>

        <v-menu
          open-on-hover
          buttom
          offset-y
          bottom
          transition="scale-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <v-icon left>fab fa-sketch</v-icon>
              เกี่ยวกับเรา
              <v-icon right>fas fa-angle-down</v-icon>
            </v-btn>
          </template>
          <v-list v-for="(item, i) in items" :key="i" router exact>
            <v-list-item :to="item.to">
              <v-icon left size="20">{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu
          v-if="user"
          open-on-hover
          buttom
          offset-y
          transition="scale-transition"
          bottom
        >
          <template v-if="user" v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <v-avatar v-if="user && user.imageUrl" size="30" class="mr-2">
                <v-img :src="user.imageUrl.url"></v-img>
                <!-- <h1>{{usersById}}</h1> -->
              </v-avatar>
              <v-icon v-else left>fas fa-user-circle</v-icon>
              welcome : {{ user.username }}
              <v-icon right>fas fa-angle-down</v-icon>
            </v-btn>
          </template>

          <!-- mode student obj -->
          <template v-if="user">
            <v-list v-if="user.role.name === 'AuthStudent' || ''">
              <v-list-item
                v-for="(item, i) in itemsSecureStudent"
                :key="i"
                :to="item.to"
                exact
                router
              >
                <v-list-item-title>
                  <v-icon left size="20">{{ item.icon }}</v-icon>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>
              <v-list-item @click="logout">ออกจากระบบ</v-list-item>
            </v-list>

            <v-list v-if="user.role.name === 'AuthProfessor' || ''">
              <v-list-item
                v-for="(item, i) in itemsSecureProfessor"
                :key="i"
                :to="item.to"
                exact
                router
              >
                <v-list-item-title>
                  <v-icon left size="20">{{ item.icon }}</v-icon>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>
              <v-list-item class="red lighten-4" @click="logout"
                >ออกจากระบบ
              </v-list-item>
            </v-list>
          </template>
        </v-menu>

        <div v-else class="text-center mt-3">
          <v-btn to="/auth/login" rounded color="green lighten-2" dark>
            <v-icon left>fas fa-sign-in-alt</v-icon>
            เข้าสู่ระบบ
          </v-btn>
        </div>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-md-and-up justify-center align-center">
        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon small>fas fa-ellipsis-v</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              target="_blank"
              href="http://www.facebook.com/ComputerScienceBsru/"
            >
              <v-list-item-title>
                <v-icon left>fab fa-facebook</v-icon>
                เพจ : Computer Science BSRU
              </v-list-item-title>
            </v-list-item>
            <v-list-item target="_blank" href="http://www.bsru.ac.th">
              <v-list-item-title>
                <v-icon left>fas fa-blog</v-icon>
                เว็บไซต์ มบส : BSRU
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <!--    end-->
  </div>
</template>

<script>
export default {
  data: () => ({
    group: null,
  }),

  computed: {
    drawer: {
      get() {
        return this.$store.getters['navigations/drawer']
      },
      set(val) {
        return this.$store.dispatch('navigations/setDrawer', val)
      },
    },
    defaultLogo() {
      return this.$store.getters.defaultLogo
    },
    user() {
      return this.$store.getters.loggedInUser
    },
    items() {
      return [
        {
          icon: 'fas fa-landmark',
          title: 'ประวัติความเป็นมา',
          to: '/history',
        },
        {
          icon: 'fas fa-user-friends',
          title: 'บุคลากร',
          to: '/personnel',
        },
        {
          icon: 'fas fa-book-open',
          title: 'หลักสูตร',
          to: '/course',
        },
        {
          icon: 'fab fa-researchgate',
          title: 'งานวิจัย',
          to: '/research',
        },
        {
          icon: 'far fa-address-card',
          title: 'ติดต่อ',
          to: '/contact',
        },
        {
          icon: 'fas fa-file-download',
          title: 'ดาวน์โหลด',
          to: '/download',
        },
      ]
    },
    itemsSecureProfessor() {
      return [
        {
          icon: 'fas fa-id-badge',
          title: 'โปรไฟล์',
          to: '/auth/profile',
        },
        {
          icon: 'fas fa-tasks',
          title: 'ระบบสอบโครงงาน นศ.',
          to: '/auth/project/professor',
        },
        {
          icon: 'fas fa-blog',
          title: 'ระบบข่าวประกาศ',
          to: '/blog',
        },
        {
          icon: 'fas fa-chart-line',
          title: 'Dashboard และ รายงาน',
          to: '/report',
        },
      ]
    },
    itemsSecureStudent() {
      return [
        {
          icon: 'fas fa-id-badge',
          title: 'โปรไฟล์',
          to: '/auth/profile',
        },
        {
          icon: 'fas fa-tasks',
          title: 'จัดการโครงงาน นศ.',
          to: '/auth/project',
        },
      ]
    },
  },

  watch: {
    group() {
      this.drawer = false
    },
  },

  methods: {
    async routeLogin() {
      try {
        await this.$router.push('/auth/login')
        this.drawer = false
      } catch (e) {
        console.log(e)
      }
    },

    async logout() {
      try {
        await this.$auth.logout()
        await this.$apolloHelpers.onLogout()
        this.drawer = false
      } catch (e) {
        console.log(e)
      }
    },

    toHome() {
      return this.$router.push('/')
    },
  },
}
</script>
<style lang="scss" scoped>
.custom-image {
  align-self: center !important;
}
</style>
