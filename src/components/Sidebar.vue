<template>
  <div>
    <!-- Hamburger menu -Simeon -->
    <svg
      viewBox="0 0 100 80"
      width="40"
      height="40"
      v-b-toggle.navbar
      id="hamburger"
    >
      <rect width="100" height="5"></rect>
      <rect y="30" width="100" height="5"></rect>
      <rect y="60" width="100" height="5"></rect>
    </svg>

    <b-sidebar
      class="w-25"
      id="navbar"
      title="New Hope"
      shadow
      backdrop
      backdrop-variant="blue"
    >
      <ul class="nav-list">
        <li><router-link to="/" class="nav-link">Home</router-link></li>
        <li><router-link to="/week" class="nav-link">Week</router-link></li>
        <li><router-link to="/month" class="nav-link">Month</router-link></li>
        <li><router-link to="/year" class="nav-link">Year</router-link></li>
      </ul>
    </b-sidebar>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  mounted() {
    if (this.$store.state.userName) {
      Vue.axios
        .get(`${this.$store.state.serverAddress}${this.$store.state.userName}`)
        .then((events) => {
          this.$store.commit('setEvents', events.data)
        })
    }
  },
  name: 'Sidebar'
}
</script>

<style lang="scss">
#hamburger {
  margin-right: 30px;
}

#navbar {
  width: 50%;
}
.nav-list {
  list-style: none;
  padding: 0;
  li {
    .nav-link {
      font-size: 20px;
      font-weight: 400;
      text-align: center;
      padding-top: 40px;
      padding-bottom: 15px;
      color: rgb(49, 49, 49);
      position: relative;
    }
    .nav-link::before {
      content: '';
      width: 80%;
      height: 2px;
      bottom: 0;
      left: 10%;
      background: rgba(0, 0, 0, 0.6);
      position: absolute;
    }
  }
}

@media only screen and (max-width: 900px) {
  .nav-link::before {
    transform-origin: center;
    animation: 1.2s ease-out 100ms 1 linesMobile;
  }
  @keyframes linesMobile {
    from {
      opacity: 0;
      transform: scaleX(0);
    }
    to {
      opacity: 1;
      transform: scaleX(1);
    }
  }
}

@media only screen and (min-width: 900px) {
  .nav-link::after {
    content: '';
    position: absolute;
    width: 80%;
    height: 2px;
    top: 22px;
    left: 10%;
    background: rgba(0, 0, 0, 0.6);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 400ms 250ms ease-in;
  }
  .nav-link::before {
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 400ms 250ms ease-in;
    animation: none;
  }
  .nav-link:hover::before,
  .nav-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
}
</style>
