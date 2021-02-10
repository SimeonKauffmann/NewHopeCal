<template>
  <div id="app">
    <div class="navbar-mobile"><Sidebar /></div>

    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  margin: 0;
  font-family: 'Cabin', sans-serif;
  font-size: 15px;
}

h1 {
  font-size: 40px;
  font-weight: 900;
}
h2 {
  font-size: 30px;
  font-weight: 700;
}
h3 {
  font-size: 20px;
  font-weight: 400;
}

.navbar-mobile {
  z-index: 3;
  position: absolute;
  right: 0;
  top: 40px;
}
</style>
<script>
import Sidebar from '@/components/Sidebar.vue';
export default {
  components: {
    Sidebar
  }
};
</script>
