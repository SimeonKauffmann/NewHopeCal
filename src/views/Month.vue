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
  }
};
</script>
<style lang="scss" scoped>
.calendar-container {
  width: 95vw;
  height: 100%;
  margin-top: 100px;
  z-index: 50;
}
</style>
