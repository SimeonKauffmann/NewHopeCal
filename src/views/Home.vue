<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col class="home-col">
          <h1>New Hope</h1>
        </b-col>
      </b-row>
      <div class="box1" v-for="event in events" :key="event.id">
        <p>
          {{ event.title }}
          <span style="float: right"
            >{{ event.startTime }} {{ event.endTime }}</span
          >
        </p>
      </div>
      <!-- <div class="box1">
        <p>Meeting with ...</p>
      </div>
      <div class="box2">
        <p>Today is ... birthday</p>
      </div>
      <div class="box3">
        <p>Lunch with ...</p>
      </div> -->

      <Popup class="quote" v-if="popupTriggers">
        <h2>Quote of the day</h2>
        <p v-if="quote">"{{ quote }}"</p>

        <button @click="closeButton">Close</button>
      </Popup>
    </b-container>
  </div>
</template>

<script>
import Popup from "@/components/Popup.vue";
import { mapState } from "vuex";
export default {
  name: "Home",

  // @ is an alias to /src
  // import BasicFetch from "@/components/BasicFetch.vue"
  // import VueXStore from "@/components/VuexStore.vue"

  data() {
    return {
<<<<<<< HEAD
      popupTriggers: false,
=======
      popupTriggers: false
>>>>>>> 4e70b69006c7e55531ea62434356405313c52757
    };
  },

  methods: {
    time() {
      setTimeout(() => {
        this.popupTriggers = true;
      }, 500);
    },

    closeButton() {
      this.popupTriggers = false;
<<<<<<< HEAD
    },
=======
    }
>>>>>>> 4e70b69006c7e55531ea62434356405313c52757
  },

  mounted() {
    this.time();
  },

  components: {
    Popup,
    //VueXStore
  },

  created() {
    this.$store.dispatch("fetchAll");
  },

  computed: {
    ...mapState({
      quote: (state) => state.quote,
    }),
    events() {
      let todayEvents = [];
      this.$store.state.events.forEach((element) => {
        if (element.date === this.$store.state.today) {
          todayEvents.push(element);
        }
      });

      return todayEvents;
    },
  },
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

h2 {
  padding: 50px;
  text-align: center;
}

h3 {
  padding-left: 20px;
}

p {
  text-align: left;
  margin: 15px;
}

/* =================
       Layout
    ================*/
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

div {
  border-spacing: 10px;
}

.box1 {
  width: 400px;
  padding: 10px;
  background: #849283;
  border: 1px solid white;
  border-radius: 40px;
  margin: auto;
}

.box2 {
  width: 400px;
  padding: 10px;
  background: #828282;
  border: 1px solid white;
  border-radius: 40px;
  margin: auto;
}

.box3 {
  width: 400px;
  padding: 10px;
  background: #e59876;
  border: 1px solid white;
  border-radius: 40px;
  margin: auto;
}

.quote {
  position: absolute;
<<<<<<< HEAD
  top: 5px;
=======
  top: 5%;
  left: 35%;

>>>>>>> 4e70b69006c7e55531ea62434356405313c52757
  button {
    position: absolute;
    justify-content: center;
    background-color: white;
    border: 1px solid black;
    border-radius: 40px;
    color: black;
    padding: 15px 32px;
    margin: 0px;
    top: 70%;
    left: 70%;
    text-align: center;
    font-size: 16px;
  }

  p {
    font-style: italic;
    text-align: center;
  }
}
</style>
