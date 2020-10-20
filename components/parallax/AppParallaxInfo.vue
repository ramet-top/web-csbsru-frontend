<template>
  <div>
    <v-responsive :aspect-ratio="16 / 9">
      <v-row class="text-center custom-container">
        <v-col>
          <v-flex class="text-center">
            <v-img :src="defaultLogo" contain height="200px" />
          </v-flex>

          <v-card-text class="green--text">
            #วิทยาการคอมพิวเตอร์ | Computer Science
          </v-card-text>
          <h1 class="custom-font font-weight-bold">
            <!-- The most loved news app -->
            Computer Science (CS-BSRU)
          </h1>
          <h3>มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา.</h3>
          <blockquote class="blockquote">
            คณะวิทยาศาสตร์และเทคโนโลยี | Faculty of Science and Technology
            <br />
            วิทยาการคอมพิวเตอร์ | Computer Science
          </blockquote>
          <br />
          <v-btn
            v-if="!user"
            class="px-10 mr-2"
            dark
            large
            rounded
            color="black"
            to="/auth/login"
          >
            <v-icon left>fas fa-sign-in-alt</v-icon>
            เข้าสู่ระบบ
          </v-btn>
          <v-btn large rounded color="success" to="/history">Learn More</v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </div>
</template>

<script>
// import Logo from '~/components/AppLogoCsbsru'

export default {
  components: {
    // Logo,
  },
  data() {
    return {
      ImageUrl: require('~/assets/images/pr.jpeg'),
    }
  },

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
    defaultLogo() {
      return this.$store.getters.defaultLogo
    },
  },
}
</script>
<style lang="scss" scoped>
.custom-container {
  height: 100%;
  margin-top: 6%;
  margin-bottom: 5%;
  // align-items: center;
  // background: url(https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80);
  background-size: cover;
  background-position: center;
  // opacity: 0.9;
}
.custom-font {
  font: 3rem sans-serif;
}
</style>
