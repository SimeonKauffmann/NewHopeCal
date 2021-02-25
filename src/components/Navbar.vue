<template>
  <!-- Navbar Sofie -->
  <nav class="hope-navbar">
    <div class="container container-fluid">
      <ul class="d-flex flex-row">
        <li><router-link to="/" class="nav-link">Home</router-link></li>
        <li><router-link to="/week" class="nav-link">Week</router-link></li>
        <li><router-link to="/month" class="nav-link">Month</router-link></li>
        <li><router-link to="/year" class="nav-link">Year</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style lang="scss" scoped>
  $yellow-color: #d3d1c2;
  .hope-navbar {
    background-color: $yellow-color;
    box-shadow: 7px 7px 3px rgba(88, 87, 75, 0.5);
  }

  ul {
    list-style: none;

    li {
      display: block;
      flex: 1;
      font-size: 2em;

      a {
        color: black;
        text-align: center;
        padding: 0.4em 0;

        &:hover {
          background-color: rgba(255, 255, 255, 0.25);
        }

        &.router-link-exact-active {
          position: relative;

          &::before {
            transform: none !important;
            content: '';
            position: absolute;
            bottom: -20px;
            left: calc(50% - 30px);
            // Triangel
            border-left: 30px solid transparent;
            border-right: 30px solid transparent;
            border-top: 20px solid $yellow-color;
          }
        }
      }
    }
  }
</style>
