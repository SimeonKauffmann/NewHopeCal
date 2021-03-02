<template>
  <b-container>
    <b-calendar
      block
      class="calendar-main"
      @selected="onClick"
      v-model="value"
      @context="onContext"
      locale="en-US"
      today-variant="secondary"
      selected-variant="danger"
      hide-header
      nav-button-variant="dark"
      no-key-nav
      :date-info-fn="cellStyling"
      :initial-date="getYear"
    ></b-calendar>
  </b-container>
</template>

<script>
  import router from '../router'

  export default {
    name: 'Calender',

    data() {
      return {
        startDate: null,
        slutDate: null,
        value: '',
        context: null,
        getYear: this.$store.state.year
      }
    },

    methods: {
      //Set selected day in VueX -Sofia
      onContext(ctx) {
        this.context = ctx
        this.$store.commit('setSelectedDay', ctx)
      },
      // Opening the dagsvy-Sofia
      onClick(ymd) {
        router.push({ path: `/day/${ymd}` })
      },
      // Showing the events and holidays with the same url parameter(date) and marked them on calendar -Sofia
      cellStyling(ymd) {
        let redDays = []
        let eventsOfDay = []
        this.$store.state.events.forEach(element => {
          if (element.date == ymd) {
            eventsOfDay.push(element)
          }
        })

        this.$store.state.publicHoliday.forEach(element => {
          redDays.push(element.date)
        })

        if (redDays.includes(ymd)) {
          return 'calendar-cell-red'
        } // Showing the busy days  -Sofia
        else if (eventsOfDay.length > 0 && eventsOfDay.length <= 3) {
          return 'calendar-cell-marked'
        } else if (3 < eventsOfDay.length && eventsOfDay.length <= 5) {
          return 'calendar-cell-marked-medium'
        } else if (5 < eventsOfDay.length) {
          return 'calendar-cell-marked-max'
        } else {
          return 'calendar-cell'
        }
      }
    },
    mounted() {
      this.$store.dispatch('fetchAll')
    }
  }
</script>

<style>
  .container {
    padding: 0;
  }
  .calendar-main div {
    border: none;
  }
  .calendar-main footer {
    display: none;
  }
  .calendar-cell {
    background-color: white;
    border-radius: 10px;
    margin: 0.5rem;
  }
  .calendar-cell-marked {
    background-color: rgb(249, 153, 118);
    box-shadow: 3px 2px 4px rgba(88, 87, 75, 0.5);
    border-radius: 10px;
    margin: 0.5rem;
  }
  .calendar-cell-marked-medium {
    background-color: rgb(208, 115, 82);
    box-shadow: 3px 2px 4px rgba(88, 87, 75, 0.5);
    border-radius: 10px;
    margin: 0.5rem;
  }
  .calendar-cell-marked-max {
    background-color: rgb(191, 89, 51);
    box-shadow: 3px 2px 4px rgba(88, 87, 75, 0.5);
    border-radius: 10px;
    margin: 0.5rem;
  }
  .calendar-cell-red {
    background-color: RGB(158, 42, 43);
    box-shadow: 3px 2px 4px rgb(88, 87, 75, 0.5);
    border-radius: 10px;
    margin: 0.5rem;
  }
</style>
