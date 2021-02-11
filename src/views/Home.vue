<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <VueXStore />
    <p> Erik S </p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import BasicFetch from "@/components/BasicFetch.vue"
import VueXStore from "@/components/VuexStore.vue"

export default {
  name: 'Home',
  components: {
    HelloWorld,
    VueXStore
  }
}
</script>
