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
    };
  },
  methods: {
    onContext(ctx) {
      this.context = ctx;
    },

    onClick(ymd) {
      router.push({ path: `/edit/${ymd}` });
    },
    cellStyling(ymd) {
      var days = [];
      this.$store.state.information.forEach((element) => {
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
