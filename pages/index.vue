<template>
  <div>
    <ParallaxInfo />
    <ParallaxWelcome />
    <!-- <Vision /> -->

    <NewsUpdateAndActivity :items-per-page="newsPerPage" />
    <Course />
    <RoomInformation />
    <!--    <Personnel :items-per-page="personalPerPage" />-->
    <Contact />
    <!--    <DownloadFile />-->
  </div>
</template>

<script>
import ParallaxInfo from '~/components/parallax/AppParallaxInfo'
import NewsUpdateAndActivity from '~/components/news/updateNewsActivity/All'
import Course from '~/components/course/AppCourse'
import RoomInformation from '~/components/history/AppRoomInformation'
// import Personnel from '~/components/personnel/AppPersonnel'
// import Vision from '~/components/vison/AppVision'
import ParallaxWelcome from '~/components/parallax/AppParallaxWelcome'
// import DownloadFile from '~/components/download/AppDownloadFile'
import Contact from '~/components/contact/AppContact'

export default {
  components: {
    ParallaxInfo,
    NewsUpdateAndActivity,
    Course,
    RoomInformation,
    // Personnel,
    // Vision,
    ParallaxWelcome,
    // DownloadFile,
    Contact,
  },

  data: () => ({
    newsPerPage: 4,
    personalPerPage: 4,
  }),
  head() {
    return {
      title: 'หน้าหลัก',
    }
  },
}
</script>
