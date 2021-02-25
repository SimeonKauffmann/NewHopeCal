<template>
  <div id="app">
    <div class="navbar-mobile"><Sidebar /></div>
    <div class="navbar-desktop"><Navbar /></div>

    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
  components: {
    Sidebar,
    Navbar
  }
}
</script>

<style lang="scss">
html {
  background-color: #608b96;
}
#app {
  background-color: #608b96;
  margin: 0;
  font-family: 'Cabin', Arial, sans-serif;
  font-size: 15px;
  color: rgb(49, 49, 49);
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
  top: 25px;
}

//Default mode mobil /desktop
.navbar-mobile {
  display: none;
}
.navbar-desktop {
  display: block;
}

@media only screen and (max-width: 768px) {
  .navbar-mobile {
    display: block;
  }
  .navbar-desktop {
    display: none;
  }
}
</style>
