<template>
  <b-container>
    <b-calendar
      class="calendar-main"
      block
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
import router from '../router';

export default {
  name: 'Calender',

  data() {
    return {
      startDate: null,
      slutDate: null,
      value: '',
      context: null,
      getYear: this.$store.state.year
    };
  },

  methods: {
    onContext(ctx) {
      this.context = ctx;
      this.$store.state.selectedDay = ctx;
    },
    onClick(ymd) {
      router.push({ path: `/day/${ymd}` });
    },
    cellStyling(ymd) {
      var days = [];
      this.$store.state.events.forEach((element) => {
        days.push(element.date);
      });

      return days.includes(ymd) ? 'calendar-cell-marked' : 'calendar-cell';
    }
  }
};
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
</style>
