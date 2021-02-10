<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {},
};
</script>

<style lang="scss">
html {
  background-color: #608b96;
}
#app {
  background-color: #608b96;
  margin: 0;
  font-family: "Cabin", Arial, sans-serif;
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
</style>


