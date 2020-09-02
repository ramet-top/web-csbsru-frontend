<template>
  <client-only class="card">
    <div class="card-body">
      <v-container>
        <v-row align="center">
          <v-col class="d-flex" cols="12">
            <v-select :items="items" label="ปีการศึกษา"></v-select>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="card-img-bottom">
      <chartjs-doughnut
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option"
      />
    </div>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      datasets: [
        {
          data: [],
          backgroundColor: ['#f36e60', '#ffdb3b', '#185190'],
          hoverBackgroundColor: ['#fbd2cd', '#fef5c9', '#d1e3f7'],
        },
      ],
      labels: ['ทั้งหมด', 'กำลังศึกษา', 'จบ'],
      option: {},

      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }
  },

  mounted() {
    this.fetchAllStd()
    this.fetchStdStuddy()
    this.fetchStdSuccess()
  },
  methods: {
    fetchAllStd() {
      this.$axios.$get('/users?role.name=AuthStudent').then((data) => {
        console.log(data.length)
        // this.datasets.data.push(data.length);

        this.datasets.forEach((e) => {
          e.data.push(data.length)
        })
      })
    },

    fetchStdStuddy() {
      this.$axios.$get('/users?role.name=AuthStudent').then((data) => {
        console.log(data.length)
        // this.datasets.data.push(data.length);

        this.datasets.forEach((e) => {
          e.data.push(data.length)
        })
      })
    },

    fetchStdSuccess() {
      this.$axios.$get('/users?role.name=AuthStudent').then((data) => {
        console.log(data.length)
        // this.datasets.data.push(data.length);

        this.datasets.forEach((e) => {
          e.data.push(data.length)
        })
      })
    },
  },
}
</script>
