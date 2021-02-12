<template>
  <div class="Edit">
    <div id="gridHolder">
      <div class="container">
        <div v-for="event in getTodaysEvents()" :key="event.startTime">
          <div id="note">
            <p id="title">{{ event.title }}</p>
            <span style="margin-right: 2rem"
              >Start Time: {{ event.startTime }}</span
            >
            <span>End Time{{ event.endTime }}</span>
            <dl style="margin-top: 2rem">
              {{ event.text }}
            </dl>
          </div>
        </div>
      </div>
    </div>

    <b-icon-plus-circle
      id="plus"
      class="h1 mb-2"
      @click="onClick"
    ></b-icon-plus-circle>
    <b-modal
      v-model="modalShow"
      @ok="createEvent(title, startTime, endTime, text)"
    >
      <h1>New Event</h1>
      <input
        id="newEventInput"
        v-model="title"
        type="text"
        placeholder="Event Name.."
      />
      <label>
        Starts:
        <input v-model="startTime" placeholder="Starts time.." />
      </label>
      <label> Ends: <input v-model="endTime" placeholder="End time.."/></label>
      <div>
        <label>
          <textarea v-model="text"></textarea>
        </label>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      date: null,
      title: null,
      startTime: null,
      endTime: null,
      text: null,
      modalShow: false,
      id: 0,
    };
  },
  methods: {
    onClick() {
      this.modalShow = true;
    },
    createEvent(title, startTime, endTime, text) {
      this.id++;
      var info = {
        title: title,
        startTime: startTime,
        endTime: endTime,
        text: text,
        date: this.$route.params.day,
      };

      this.$store.dispatch("saveInfo", info);
    },
    getTodaysEvents() {
      var todayEvents = [];
      this.$store.state.events.forEach((element) => {
        if (element.date === this.$route.params.day) {
          todayEvents.push(element);
        }
      });

      return todayEvents;
    },
  },
};
</script>
<style scoped>
#title {
  font-size: 1.5rem;
}
#note {
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
