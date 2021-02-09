<template>
<div>
  <svg viewBox="0 0 100 80" width="40" height="40" v-b-toggle.navbar id='hamburger'>
  <rect width="100" height="7"></rect>
  <rect y="30" width="100" height="7"></rect>
  <rect y="60" width="100" height="7"></rect>
</svg>
  
    <b-sidebar class='w-25' id="navbar" title="Sidebar" shadow >
      <div>
        <router-link>Home</router-link>
        <router-link>Day</router-link>
        <router-link>Week</router-link>
        <router-link>Month</router-link>
        <router-link>Year</router-link>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style lang="scss">

#hamburger{
  float:right;
  margin-right:30px;
}
</style>