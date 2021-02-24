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
      onContext(ctx) {
        console.log(ctx)
        this.context = ctx
        this.$store.commit('setSelectedDay', ctx)
      },
      onClick(ymd) {
        router.push({ path: `/day/${ymd}` })
      },
      cellStyling(ymd) {
        let days = []
        let redDays = []
        this.$store.state.events.forEach(element => {
          days.push(element.date)
        })

        this.$store.state.publicHoliday.forEach(element => {
          redDays.push(element.date)
        })

        if (days.includes(ymd)) {
          return 'calendar-cell-marked'
        } else if (redDays.includes(ymd)) {
          return 'calendar-cell-red'
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
    background-color: rgba(229, 152, 118, 1);
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
