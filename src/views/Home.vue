<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col class="home-col">
          <h1>New Hope</h1>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="home-col">
          <h3>What's happening today?</h3>
          <b-col class="home-col">
            <ul>
              <li>Meeting with ...</li>
              <li>Today is ... birthday</li>
              <li>Lunch with ...</li>
            </ul>
          </b-col>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="home-col img-container">
          <router-link to="/month">
            <img alt="new-hope logo" src="../assets/logotyp.svg" />
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped lang="scss">
/*===============
    Typografi
============= */
h1 {
  text-align: center;
  padding: 50px 0px;
}

h3 {
  padding-left: 20px;
}

/* ==================
      Stylings
====================*/
ul {
  padding-left: 20px;
  list-style: none;
  border: none;
  outline: none;

  background: linear-gradient(100deg, rgba(251, 247, 247, 0.568), #608b96 60%);
  border-radius: 16px;
  position: relative;
}
li {
  line-height: 30px;
}
li::before {
  content: " ";
  border: 5px solid #e59876;
  border-radius: 100%;
  position: absolute;
  margin-top: 11px;
  left: 7.5px;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}

/* =================
       Layout
    ================*/
.home {
  height: 100vh;
}
.home-col {
  margin: 15px 0px;
}
.img-container {
  width: 200px;
  height: 200px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
