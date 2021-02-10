<template>
  <div>
    <div id="navbar"><Sidebar /></div>

    <div class="calendar-container">
      <Calender />
    </div>
  </div>
</template>

<script>
import Calender from "@/components/Calender.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Month",
  components: {
    Calender,
    Sidebar,
  },
};
</script>
<style lang="scss" scoped>
#navbar {
  width: 100vw;
  height: 100px;
  padding-top: 1rem;
  position: fixed;
  background-color: #608b96;
  top: 0;
  z-index: 100;
}
.calendar-container {
  width: 95vw;
  height: 100%;
  margin-top: 100px;
  z-index: 50;
}
</style>
