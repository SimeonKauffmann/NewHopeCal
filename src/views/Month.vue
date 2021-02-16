<template>
  <div>
    <div class="calendar-container">
      <Calender />
    </div>
  </div>
</template>

<script>
import Calender from '@/components/Calender.vue';
export default {
  name: 'Month',
  components: {
    Calender
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.year != null) {
      this.$store.commit('setYear', null);
    }
    next();
  }
};
</script>
<style lang="scss" scoped>
.calendar-container {
  margin-top: 100px;
  z-index: 50;
}
</style>
