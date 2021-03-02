<template>
  <div>
    <div class="calendar-container">
      <Calender class="fade-calendar" />
      <div class="holder">
        <div class="square" id="one"></div>
        <label>Holidays</label>
      </div>
      <div class="holder">
        <div class="square" id="two"></div>
        <label>Full days</label>
      </div>
      <div class="holder">
        <div class="square" id="three"></div>
        <label>Almost full days</label>
      </div>
      <div class="holder">
        <div class="square" id="four"></div>
        <label>light days</label>
      </div>
      <div class="holder">
        <div class="square" id="five"></div>
        <label>Free days</label>
      </div>
    </div>
  </div>
</template>

<script>
  import Calender from '@/components/Calender.vue'
  export default {
    name: 'Month',
    components: {
      Calender
    },
    beforeRouteLeave(to, from, next) {
      if (this.$store.state.year != null) {
        this.$store.commit('setYear', null)
      }
      next()
    }
  }
</script>
<style lang="scss" scoped>
  .holder {
    float: right;
    margin-right: 5rem;
    font-size: 10px;
    padding: 0%;
    margin: 2%;
  }
  .square {
    height: 0.5rem;
    width: 0.5rem;
  }
  #one {
    background-color: RGB(158, 42, 43);
  }
  #two {
    background-color: rgb(176, 75, 38);
  }
  #three {
    background-color: rgb(208, 115, 82);
  }
  #four {
    background-color: rgba(229, 152, 118, 1);
  }
  #five {
    background-color: white;
  }
  .calendar-container {
    margin-top: 9rem;
    z-index: 50;
  }
  .fade-calendar {
    animation: 1s ease-in 0s 1 fadeIn;
  }
  @keyframes fadeIn {
    from {
      transform: perspective(500px) translateZ(50px);
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
  @media only screen and (min-width: 975px) {
    .holder {
      font-size: 13px;
    }
    .square {
      height: 1.5rem;
      width: 1.5rem;
    }
  }
</style>
