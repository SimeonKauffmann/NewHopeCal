<template>
  <div>
    <div class="week-container">
      <div class="days" v-for="day in days" :key="day">
        <div class="text">
          <p>{{ day }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  computed: {
    days() {
      const days = [];
      for (let x = 0; x < 40; x++) {
        let dayName = moment()
          .add(x, 'days')
          .format('dddd Do');
        days.push(dayName);
      }
      return days;
    },
    month() {
      return moment().format('MMMM');
    }
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
}
.week-container {
  background-color: #608b96;
  width: 95vw;
  height: 100%;
  margin: 100px auto 10px;
  .days {
    margin: 2.5vw auto;
    width: 95vw;
    height: 60px;
    background-color: white;
    border: 2px #d3d1c2;
    border-radius: 15px;
    box-shadow: 2px 2px 4px #000000;
    .text {
      width: 18vw;
      margin: 5px;
    }
  }
}
p {
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
}
h1,
h2,
h3,
h4 {
  font-family: 'Cabin', 'Times New Roman', Times, serif;
}
</style>
