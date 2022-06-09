<template>

<NavBar/>
  <router-view/>

</template>

<script>

import NavBar from "@/components/NavBar";

export default {
  name: 'MainMainContent',
  components: {
    NavBar
  },
  props: {
    msg: String,
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>