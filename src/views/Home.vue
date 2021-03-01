<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col class="home-col">
          <h1>New Hope</h1>
        </b-col>
      </b-row>
      <div
        class="box3"
        v-for="event in events"
        :key="event.id"
        @click="openDayView(event.date)"
        :style="eventTypeClass(event)"
      >
        <p>
          {{ event.title }}
          <span style="float: right"
            >{{ event.startTime }} {{ event.endTime }}</span
          >
        </p>
      </div>
      <h2 v-if="!events">No plan for today!</h2>

      <Popup class="quote" v-if="popupTriggers">
        <h2>Quote of the day</h2>
        <p v-if="quote">"{{ quote }}"</p>

        <button @click="closeButton">Close</button>
      </Popup>
    </b-container>
  </div>
</template>

<script>
  import router from '../router'
  import moment from 'moment'
  import Popup from '@/components/Popup.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'Home',

    created() {
      if (!this.$store.state.userName) {
        while (!this.$store.state.userName) {
          this.$store.commit('setUserName', prompt('Choose a username'))
        }
      }
      this.$store.dispatch('fetchAll')
    },

    data() {
      return {
        popupTriggers: false
      }
    },

    methods: {
      eventTypeClass(event) {
        if (event.type === 'Work') {
          return 'background-color: rgba(96, 139, 150, 1)'
        } else if (event.type === 'Sport') {
          return 'background-color: rgba(132, 146, 131, 1)'
        } else if (event.type === 'Fun') {
          return 'background-color: rgb(246, 189, 96)'
        }
        return 'background-color: rgba(229, 152, 118, 1);'
      },
      time() {
        setTimeout(() => {
          this.popupTriggers = true
        }, 500)
      },
      openDayView(date) {
        router.push({ path: `/day/${date}` })
        this.$store.commit('setSelectedDay', {
          selectedFormatted: moment(date).format('dddd, MMMM Do, YYYY')
        })
      },
      closeButton() {
        this.popupTriggers = false
      }
    },

    mounted() {
      this.time()
    },

    components: {
      Popup
      //VueXStore
    },

    computed: {
      ...mapState({
        quote: state => state.quote
      }),
      events() {
        let todayEvents = []
        this.$store.state.events.forEach(element => {
          if (element.date === this.$store.state.today) {
            let startNumber = parseInt(element.startTime.slice(0, 2))
            element.startNumber = startNumber
            todayEvents.push(element)
          }
        })

        todayEvents.sort(function(a, b) {
          return a.startNumber - b.startNumber
        })

        if (todayEvents.length === 0) {
          todayEvents = null
        }

        return todayEvents
      }
    }
  }
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

  .box3 {
    width: 400px;
    padding: 10px;

    border: 1px solid white;
    border-radius: 40px;
    margin: 2vh auto;
  }

  .quote {
    width: 500px;
    height: 350px;
    margin: 5% auto;
    padding: 10px;

    button {
      position: absolute;
      justify-content: center;
      background-color: white;
      border: none;
      box-shadow: 7px 7px 3px rgba(88, 87, 75, 0.5);
      border-radius: 40px;
      //color: black;
      padding: 10px 32px;
      margin: 50px;
      text-align: center;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 515px) {
    .quote {
      width: 370px;
    }
    .box3 {
      width: 370px;
    }
  }
</style>
