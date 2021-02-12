<template>
  <div>
    <div id="day-view">
      <div id="gridHolder">
        <div class="container">
          <div
            v-for="event in getTodaysEvents()"
            :key="`${event.startTime}${event.endTime}`"
            :style="event.styles"
          >
            <div class="note">
              <h2 class="title">{{ event.title }}</h2>
              <span style="margin-right: 2rem"
                >Start Time: {{ event.startTime }}</span
              >
              <span>End Time: {{ event.endTime }}</span>
              <dl style="margin-top: 2rem">
                {{ event.text }}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Edit />
  </div>
</template>

<script>
import Edit from "@/components/Edit.vue";

export default {
  name: "Day",
  methods: {
    getTodaysEvents() {
      var todayEvents = [];
      this.$store.state.events.forEach((element) => {
        if (element.date === this.$route.params.day) {
          todayEvents.push(element);
        }
      });

      for (let x = 0; x < todayEvents.length; x++) {
        let startNumber = parseInt(todayEvents[x].startTime.slice(0, 2));

        todayEvents[x].startNumber = startNumber;

        let endNumber = parseInt(todayEvents[x].endTime.slice(0, 2));

        todayEvents[x].styles = {
          backgroundColor: todayEvents[x].color,
          height: `${endNumber - startNumber}rem`,
          marginTop: `${startNumber}rem`,
        };
      }

      todayEvents.sort(function (a, b) {
        return a.startNumber - b.startNumber;
      });

      console.log(todayEvents);
      return todayEvents;
    },
  },
  components: { Edit },
};
</script>


<style scoped>
/* .title {
  font-size: 1.5rem;
} */
.note {
  background-color: rgba(229, 152, 118, 1);
  padding: 1rem;
  border-radius: 2%;
  margin-top: 1rem;
}
.container {
  display: grid;
  grid-template-columns: 1fr, 1fr, 1fr;
  grid-template-rows: auto;
}
#plus {
  margin-left: 22rem;
}
#gridHolder {
  border: solid;
  width: 80%;
  height: 70vh;
  background-color: white;
  margin: auto;
  margin-top: 7rem;
  margin-bottom: 3rem;
}
textarea {
  width: 300px;
  height: 150px;
}

#newEventInput {
  margin-bottom: 1rem;
}
</style>
