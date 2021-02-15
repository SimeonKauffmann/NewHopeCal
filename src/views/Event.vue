<template>
  <div class="Event">
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
  name: "Event",
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
