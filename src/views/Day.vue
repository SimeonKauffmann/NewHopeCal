<template>
  <div class="day">
    <p id="date">{{ $store.state.selectedDay.selectedFormatted }}</p>
    <div id="gridHolder">
      <b-card-group deck class="container" style="margin-top:1rem">
        <b-card v-for="event in getTodaysEvents()" :key="event.id">
          <div id="note">
            <p id="title">{{ event.title }}</p>
            <span style="margin-right: 2rem"
              >Start Time: {{ event.startTime }}</span
            >
            <span>End Time{{ event.endTime }}</span>
            <dl style="margin-top: 2rem">
              {{ event.text }}
            </dl>

            <b-button
              id="edit"
              href="#"
              variant="info"
              @click="editEvent(event)"
              >Edit</b-button
            >
            <span id="remove" class="h1 mb-2" @click="removeAction(event.id)"
              >Remove</span
            >
          </div>
        </b-card>
      </b-card-group>
    </div>
    <span id="editHolder">
      <b-icon-plus-circle
        id="plus"
        class="h1 mb-2"
        @click="createEvent"
      ></b-icon-plus-circle>
    </span>
    <Event
      :show="modalShow"
      @close="onClose"
      @ok="onOk"
      @cancel="onCancel"
      :event="currentEvent"
    />
  </div>
</template>

<script>
import Event from "@/components/Event.vue";

export default {
  name: "Day",
  data() {
    return {
      modalShow: false,
      editShow: false,
      currentEvent: null,
    };
  },

  methods: {
    editEvent(event) {
      this.currentEvent = event;
      this.modalShow = true;
    },
    onCancel() {
      this.currentEvent = null;
      this.modalShow = false;
    },
    onOk() {
      this.currentEvent = null;
      this.modalShow = false;
    },

    createEvent() {
      this.modalShow = true;
    },
    onClose() {
      this.currentEvent = null;
      this.modalShow = false;
    },
    getTodaysEvents() {
      let todayEvents = [];
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
          height: `${(endNumber - startNumber) * 2}rem`,
          marginTop: `${startNumber * 2}rem`,
          position: "absolute",
          width: "60%",
        };
      }

      todayEvents.sort(function(a, b) {
        return a.startNumber - b.startNumber;
      });

      console.log(todayEvents);
      return todayEvents;
    },
    removeAction(id) {
      this.$store.dispatch("deleteEvent", id);
    },
  },
  components: { Event },
};
</script>

<style scoped>
#edit {
  float: right;
}
#remove {
  font-size: 1rem;
  color: aliceblue;
  cursor: pointer;
}
#title {
  font-size: 1.5rem;
}
#note {
  background-color: rgba(229, 152, 118, 1);
  padding: 2rem;
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
