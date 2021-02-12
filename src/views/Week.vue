<template>
  <div>
    <div id="month" class="row">
      <div class="col-6">
        <h1>{{ `${days[0].month} week ${days[0].week}` }}</h1>
      </div>
      <div class="col-3">
        <b-button @click="backToday">Today</b-button>
      </div>
      <div class="col-3"></div>
    </div>

    <div class="arrows">
      <b-icon
        icon="arrow-up-short"
        animation="fade"
        font-scale="4"
        @click="pastDates"
      ></b-icon>
    </div>
    <div class="week-container">
      <div class="days" v-for="day in days" :key="day.date">
        <div class="text">
          <p>{{ day.dayName }}</p>
        </div>
        <div class="event-marker" v-if="day.event"></div>
      </div>
    </div>
    <div class="arrows">
      <b-icon
        icon="arrow-down-short"
        animation="fade"
        font-scale="4"
        @click="futureDates"
      ></b-icon>
    </div>
  </div>
</template>

<script>
import moment from "moment";


export default {

  computed: {
    days() {
      const calander = this.$store.state.publicHoliday;

      const days = [];
      for (let x = this.startDate; x < this.startDate + 7; x++) {
        // let date = parseInt(moment().add(x, "days").format("YYYYMMDD"));
        let date = moment().add(x, "days").format("YYYY[-]MM[-]DD");

        // Added to check Date if holiday confirmed -Patrik
        let checkDate = moment().add(x, "days").format("YYYY-MM-DD")
        let specialDay = ""
        for (let i = 0; i < calander.length; i++){
          if (calander[i].date === checkDate){
            specialDay = calander[i].localName
            i = calander.length
          }
          else{
            i++
          }
        }

        let event = this.$store.state.events.find(
          (event) => event.date === date
        )
          ? true
          : false;

        let dayObject = {
          dayName: moment().add(x, "days").format("dddd Do MMMM") + " " + specialDay,
          date: date,
          event: event,
          week: moment().add(x, "days").format("w"),
          month: moment().add(x, "days").format("MMMM"),
        };

        days.push(dayObject);
      }
      return days;
    },
  },
  data() {
    return {
      startDate: 0,
    };
  },
  methods: {
    pastDates() {
      this.startDate -= 7;
    },
    futureDates() {
      this.startDate += 7;
    },
    backToday() {
      this.startDate = 0;
    },
  },

  mounted(){
    this.$store.dispatch("fetchAll")
  }
};
</script>

<style lang="scss" scoped>
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
.arrows {
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
    width: 95vw;
    height: 60px;
    background-color: white;
    border: 2px #d3d1c2;
    border-radius: 15px;
    box-shadow: 2px 2px 4px #000000;
    .text {
      margin: 5px;
    }
    .event-marker {
      width: 30px;
      height: 30px;
      background-color: red;
      border-radius: 50%;
      float: right;
    }
  }
}
</style>
