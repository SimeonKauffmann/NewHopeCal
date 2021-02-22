<template>
  <div>
    <div class="calendar-container">
      <Calender class="fade-calendar" />
    </div>
  </div>
</template>

<script>
import Calender from "@/components/Calender.vue";
export default {
  name: "Month",
  components: {
    Calender,
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.year != null) {
      this.$store.commit("setYear", null);
    }
    next();
  },
};
</script>
<style lang="scss" scoped>
.calendar-container {
  margin-top: 100px;
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
</style>
