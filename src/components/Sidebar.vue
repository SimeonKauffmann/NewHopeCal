<template>
  <div>
    <svg
      viewBox="0 0 100 80"
      width="40"
      height="40"
      v-b-toggle.navbar
      id="hamburger"
    >
      <rect width="100" height="7"></rect>
      <rect y="30" width="100" height="7"></rect>
      <rect y="60" width="100" height="7"></rect>
    </svg>

    <b-sidebar class="w-25" id="navbar" title="Sidebar" shadow>
      <ul class="nav-list">
        <li><router-link to="/" class="nav-link">Home</router-link></li>
        <!--li><router-link>Day</router-link></li-->
        <li><router-link to="/week" class="nav-link">Week</router-link></li>
        <li><router-link to="/month" class="nav-link">Month</router-link></li>
        <li><router-link to="/year" class="nav-link">Year</router-link></li>
        <!--li><router-link>Year</router-link></li-->
      </ul>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
};
</script>

<style lang="scss">
#hamburger {
  float: right;
  margin-right: 30px;
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
      background: black;
      position: absolute;
    }
  }
}
</style>
