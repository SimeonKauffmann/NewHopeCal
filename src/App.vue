<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  #app{
    background-color: #608B96;
  }
  p{
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  }
  h1, h2, h3, h4{
    font-family: 'Cabin', 'Times New Roman', Times, serif ;
  }
</style>
