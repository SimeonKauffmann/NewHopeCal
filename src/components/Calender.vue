<template>
  <b-container class="bv-example-row">
    <b-calendar
      class="calendar-main"
      block
      @selected="onClick"
      v-model="value"
      @context="onContext"
      locale="en-US"
      today-variant="danger"
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
import router from "../router";
export default {
  name: "Calender",

  data() {
    return {
      startDate: null,
      slutDate: null,
      value: "",
      context: null,
      actualYear: null,
      getYear: this.$store.state.year,
    };
  },

  methods: {
    onContext(ctx) {
      this.actualYear = ctx.activeYMD;
      this.context = ctx;
    },

    onClick(ymd) {
      router.push({ path: `/day/${ymd}` });
    },
    cellStyling(ymd) {
      var days = [];
      this.$store.state.events.forEach((element) => {
        days.push(element.date);
      });

      return days.includes(ymd) ? "calendar-cell-marked" : "calendar-cell";
    },
  },
  components: {},
};
</script>

<style>
.calendar-main div {
  border: none;
}
.calendar-main footer {
  display: none;
}
.calendar-cell {
  background-color: white;
  border-radius: 0.8rem;
  margin: 0.5rem;
}
.calendar-cell-marked {
  background-color: rgba(229, 152, 118, 1);
  border-radius: 0.8rem;
  margin: 0.5rem;
}
</style>
