<template>
  <div class="day">
    <p id="date">{{ $store.state.selectedDay.selectedFormatted }}</p>
    <div id="gridHolder">
      <b-card-group deck class="container" style="margin-top:1rem">
        <b-card v-for="event in getTodaysEvents()" :key="event.id">
          <b-icon-x
            id="close"
            style="float:right"
            class="h1 mb-2"
            @click="closeAction(event.id)"
          ></b-icon-x>
          <div id="note">
            <p id="title">{{ event.title }}</p>
            <span style="margin-right: 2rem"
              >Start Time: {{ event.startTime }}</span
            >
            <span>End Time{{ event.endTime }}</span>
            <dl style="margin-top: 2rem">
              {{ event.text }}
            </dl>
            <b-button href="#" variant="info" style="float:right"
              >Edit</b-button
            >
          </div>
        </b-card>
      </b-card-group>
    </div>
    <span id="editHolder"> <Event /></span>
  </div>
</template>

<script>
import Event from "@/components/Edit.vue";

export default {
  name: "Day",

  methods: {
    getTodaysEvents() {
      let todayEvents = [];
      this.$store.state.events.forEach((element) => {
        if (element.date === this.$route.params.day) {
          todayEvents.push(element);
        }
      });

      return todayEvents;
    },
    closeAction(id) {
      this.$store.dispatch("deleteEvent", id);
    },
  },
  components: { Event },
};
</script>

<style scoped>
#close {
  cursor: pointer;
}
#title {
  font-size: 1.5rem;
}
#note {
  background-color: rgba(229, 152, 118, 1);
  padding: 3rem;
  border-radius: 2%;
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

#newEventInput {
  margin-bottom: 1rem;
}
#editHolder {
  float: right;
  margin: auto;
  margin-right: 1rem;
}
#date {
  font-size: 2rem;
  padding-left: 2rem;
  padding-top: 2rem;
}
</style>
