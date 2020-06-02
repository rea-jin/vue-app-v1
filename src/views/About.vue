<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Date/>
  </div>
</template>
<script>
import Date from './../components/Date'

  export default {
     components:{
    Date
  },
    data: () => ({
      date: null,
      menu: true,
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    },
  }
</script>