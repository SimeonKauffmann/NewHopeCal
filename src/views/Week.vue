<template>
  <div>

    <div id="mobileVersion">
      <div class="display-week">
        <h1>{{ days[0].month }}, {{ `week ${days[0].week}` }}</h1>
      </div>
      <div class="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
          @click="pastDates"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
        <div class="button">
          <b-button
            v-if="days[0].week != today"
            @click="backToday"
            variant="light"
            class="today"
            >Today</b-button
          >
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
          @click="futureDates"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
      </div>

      <div class="week-container">
        <div
          class="days"
          v-for="day in days"
          :key="day.date"
          @click="openDayView(day.date)"
        >
          <div class="text">
            <p>{{ day.dayName }}</p>
            <div class="event-marker" v-if="day.event">Events</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop version -->
    <div id="desktopVersion">
      <div id="month" class="row">
        
        <div class="col-3">
          <div class="button">
          <b-button
            v-if="days[0].week != today"
            @click="backToday"
            variant="light"
            class="today"
            >Today</b-button
          >
        </div>
        </div>
        <div class="col-6">
          <h1>{{ `${days[0].month} week ${days[0].week}` }}</h1>
        </div>
        <div class="col-3"></div>
        </div>
      
      <div class="row">

        <div class="col-2">
          <div class="arrows-left">
            <b-icon
                icon="arrow-left-short"
                animation="fade"
                font-scale="8"
                @click="pastDates"
            ></b-icon>
          </div>
        </div>

        <div class="col-8">
          <div class="week-container">
          <div
            class="days"
            v-for="day in days"
            :key="day.date"
            @click="openDayView(day.date)"
          >
            <div class="text">
              <p>{{ day.dayName }}</p>
              <div class="event-marker" v-if="day.event">Events</div>
            </div>
          </div>
          </div>
        </div>

        <div class="col-2">
          <div class="arrows-right">
            <b-icon
                icon="arrow-right-short"
                animation="fade"
                font-scale="8"
                @click="futureDates"
            ></b-icon>
          </div>
        </div>

      </div>
      
    </div>

      

  </div>
</template>

<script>
  import router from '../router'
  import moment from 'moment'

  export default {
    computed: {
      days() {
        const calander = this.$store.state.publicHoliday

        const days = []
        for (let x = this.startDate; x < this.startDate + 7; x++) {
          // Startdate used here to compute when the loop starts -Simeon
          let date = moment()
            .add(x, 'days')
            .format('YYYY[-]MM[-]DD')

          // Added to check Date if holiday confirmed -Patrik
          let checkDate = moment()
            .add(x, 'days')
            .format('YYYY-MM-DD')
          let specialDay = ''
          for (let i = 0; i < calander.length; i++) {
            if (calander[i].date === checkDate) {
              specialDay = calander[i].localName
              i = calander.length
            } else {
              i++
            }
          }

          // Find events on days, boolean -Simeon
          let event = this.$store.state.events.find(
            event => event.date === date
          )
            ? true
            : false

          // Creating day object - Simeon
          let dayObject = {
            dayName:
              moment()
                .add(x, 'days')
                .format('dddd Do MMMM') +
              ' ' +
              specialDay,
            date: date,
            event: event,
            week: moment()
              .add(x, 'days')
              .format('w'),
            month: moment()
              .add(x, 'days')
              .format('MMMM')
          }

          days.push(dayObject)
        }
        return days
      }
    },
    data() {
      return {
        startDate: 0,
        today: moment().format('w')
      }
    },
    methods: {
      // Methods to change the startdate. used in the computed property to make a list of days -Simeon
      pastDates() {
        this.startDate -= 7
      },
      futureDates() {
        this.startDate += 7
      },
      backToday() {
        this.startDate = 0
      }, // Open the day view -Simeon
      openDayView(date) {
        router.push({ path: `/day/${date}` })
        this.$store.commit('setSelectedDay', {
          // Set the selected day in Vuex -Simeon
          selectedFormatted: moment(date).format('dddd, MMMM Do, YYYY')
        })
      }
    },

    mounted() {
      this.$store.dispatch('fetchAll')
    }
  }
</script>

<style lang="scss" scoped>

#mobileVersion{display: block;}
#desktopVersion{display: none;}

#month {
  width: 100vw;
  height: 100px;
  margin: 0 auto;
  position: fixed;
  background-color: #608b96;
  top: 0;
  box-shadow: 2px 2px 4px #000000;
  z-index: 1;
}
.arrows, .arrows-left, .arrows-right {
  margin: 100px auto 50px;
  width: 60px;
}

.week-container {
  background-color: #608b96;
  width: 95vw;
  height: 100%;
  margin: 40px auto 10px;
  .days {
    margin: 2.5vw auto;
    width: 100%;
    height: 60px;
    background-color: white;
    border: 2px #d3d1c2;
    border-radius: 15px;
    box-shadow: 2px 2px 4px #000000;
  
    .text {
      margin: 5px;
    }
  }
}

.flex {
    display: flex;
    margin-left: 30px;
    margin-right: 40px;
    margin-bottom: 30px;
    .button {
      flex-grow: 3;
      display: flex;
      max-height: 20px;
      
    }
}

.today {
        margin: auto;
        border-radius: 10px;
        box-shadow: 4px 4px 3px rgba(88, 87, 75, 0.5);
      }

.display-week {
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 30px;
}

.arrows {
    margin: 0px auto 2px;
    width: 60px;
}
  




// Change view look when over 960 px width.
@media (min-width: 960px) {
  #mobileVersion{display: none;}
  #desktopVersion{display: block;}

  .week-container{
    width: 100%;
  }
  #month{
    position: unset;
  }

  #month{
    text-align: center;
    padding: 20px;
  }
 
  .arrows-left {position: fixed; left: 0px;}
  .arrows-right{position: fixed; right: 55px}

  #desktopVersion{
    grid-template-columns: 120px 4fr 120px;
    grid-template-areas:
    none;
  }
  
}

</style>
