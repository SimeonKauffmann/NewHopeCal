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
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <!--li><router-link>Day</router-link></li-->
        <li><router-link to="/week">Week</router-link></li>
        <li><router-link to="/month">Month</router-link></li>
        <!--li><router-link>Year</router-link></li-->
      </ul>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style lang="scss">
#hamburger {
  float: right;
  margin-right: 30px;
}
#navbar ul {
  list-style-type: none;
}
</style>
